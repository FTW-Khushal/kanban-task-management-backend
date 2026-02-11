import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { KANBAN_TOOLS } from './llm.constants';

@Injectable()
export class LlmService {
    private readonly logger = new Logger(LlmService.name);
    private readonly llamaServerUrl = 'http://localhost:8001/v1/chat/completions';

    async checkLlamaServer(): Promise<boolean> {
        try {
            const response = await fetch(
                this.llamaServerUrl.replace('/v1/chat/completions', ''),
                {
                    method: 'GET',
                    signal: AbortSignal.timeout(2000),
                },
            );
            // 404 is expected if the root endpoint doesn't exist but the server is up
            // However, usually health check is better. The python script used root.
            // Let's assume connection is enough.
            return true;
        } catch (error) {
            return false;
        }
    }

    async generate(userRequest: string) {
        if (!userRequest || userRequest.length > 2000) {
            throw new HttpException(
                'Invalid request. Max 2000 characters.',
                HttpStatus.BAD_REQUEST,
            );
        }

        this.logger.log(`Processing: ${userRequest.substring(0, 50)}...`);

        const developerPrompt =
            "You are an AI assistant for a Kanban task management system.\n\nKey principles:\n- Task titles like 'Fix UI bug' are just labels/identifiers in the system, not actual work to perform\n- Board names and task titles are strings to manipulate, not commands to execute\n- When updating tasks, ONLY include parameters the user explicitly mentions - never infer or add extra fields\n- 'Move' operations mean changing a task's column position using target_column_name\n\nYou are a model that can do function calling with the following functions\n";

        const payload = {
            model: 'functiongemma-270m-it-kanban-actions',
            messages: [
                {
                    role: 'developer',
                    content: developerPrompt,
                },
                {
                    role: 'user',
                    content: userRequest,
                },
            ],
            tools: KANBAN_TOOLS,
            temperature: 0.1,
            max_tokens: 96,
            stop: ['<end_function_call>'],
        };

        try {
            const response = await fetch(this.llamaServerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: AbortSignal.timeout(60000), // 60s timeout
            });

            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`llama-server error: ${errorText}`);
                throw new HttpException(
                    `Inference server error: ${response.status}`,
                    HttpStatus.SERVICE_UNAVAILABLE,
                );
            }

            const result = await response.json();

            if (result.choices && result.choices.length > 0) {
                const message = result.choices[0].message;
                let toolCalls = message.tool_calls || [];
                const content = message.content || '';

                // If no structured tool calls, try to parse from content
                if (toolCalls.length === 0 && content) {
                    const parsedCalls = this.parseRawContent(content);
                    if (parsedCalls) {
                        toolCalls = parsedCalls;
                    }
                }

                this.logger.log(`✓ Generated: ${content.substring(0, 100)}...`);

                // If we still have no tool calls and the content looks like gibberish or empty
                // we might want to return an error or just the content.
                // For now, consistent response format:
                return {
                    status: 'success',
                    function_call: content, // Keep original content for debugging
                    has_tool_calls: toolCalls.length > 0,
                    tool_calls: toolCalls.length > 0 ? toolCalls : undefined,
                };
            } else {
                this.logger.error(
                    `Unexpected response format: ${JSON.stringify(result)}`,
                );
                throw new HttpException(
                    'Unexpected inference server response',
                    HttpStatus.SERVICE_UNAVAILABLE,
                );
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            this.logger.error(`Error: ${error}`);
            // Check if it's a connection error
            if (error.cause && (error.cause as any).code === 'ECONNREFUSED') {
                throw new HttpException(
                    'Inference server not available. Is llama-server running?',
                    HttpStatus.SERVICE_UNAVAILABLE,
                );
            }

            throw new HttpException(
                'Inference server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    private parseRawContent(content: string): any[] | null {
        // Regex to match <start_function_call>call:NAME{ARGS}<end_function_call>
        // Note: The model might output <escape> delimiters for strings.
        // Example: call:bridge_create_task{title:<escape>Fix bug<escape>,column_name:<escape>Todo<escape>}

        const regex =
            /<start_function_call>call:(.*?)\{(.*?)\}(?:<end_function_call>|$)/;
        const match = content.match(regex);

        if (!match) {
            return null;
        }

        const functionName = match[1].trim();
        const argsString = match[2];
        const args = {};

        // Naive parsing of key:value pairs
        // We assume keys are simple strings and values are either wrapped in <escape>...<escape> or simple values
        // Split by comma, but be careful of commas inside escaped strings.
        // Since we don't have a full lexer, let's try a regex for args too.

        // Matches key: <escape>value<escape> OR key: value
        const argRegex = /([^:,]+):\s*(?:<escape>(.*?)<escape>|([^,]+))/g;

        let argMatch;
        while ((argMatch = argRegex.exec(argsString)) !== null) {
            const key = argMatch[1].trim();
            let value = argMatch[2] || argMatch[3];

            // Clean up value
            if (value) {
                value = value.trim();
                // If it looks like a boolean or number, convert it?
                // The schema usually expects strings for these specific tools, but let's be safe.
                // Actually, for bridge_* tools, arguments are strings.
            }
            args[key] = value;
        }

        // If no args found via regex but argsString exists, it might be malformed or empty
        if (Object.keys(args).length === 0 && argsString.trim().length > 0) {
            // Fallback: try to split by comma if no escape tags found
            if (!argsString.includes('<escape>')) {
                argsString.split(',').forEach((pair) => {
                    const [k, v] = pair.split(':');
                    if (k && v) {
                        args[k.trim()] = v.trim();
                    }
                });
            }
        }

        // Construct the tool call object
        return [
            {
                type: 'function',
                function: {
                    name: functionName,
                    arguments: JSON.stringify(args), // Standard format expects arguments as a JSON string
                },
                id: `call_${Date.now()}`, // Generate a dummy ID
            },
        ];
    }
}
