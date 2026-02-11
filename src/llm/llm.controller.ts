import { Controller, Post, Body, Get } from '@nestjs/common';
import { LlmService } from './llm.service';

@Controller('api/kanban')
export class LlmController {
    constructor(private readonly llmService: LlmService) { }

    @Post('generate')
    async generate(@Body('user_request') userRequest: string) {
        return this.llmService.generate(userRequest);
    }

    @Get('health')
    async health() {
        const isConnected = await this.llmService.checkLlamaServer();
        return {
            status: isConnected ? 'ok' : 'error',
            llama_server: isConnected ? 'connected' : 'disconnected',
        };
    }
}
