export const KANBAN_TOOLS = [
    {
        type: 'function',
        function: {
            name: 'bridge_get_boards',
            description: 'Lists all available boards in the system.',
            parameters: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'bridge_get_board_details',
            description:
                'Switches the view to a specific board and fetches its details.',
            parameters: {
                type: 'object',
                properties: {
                    board_name: {
                        type: 'string',
                        description: 'The exact name of the board to switch to.',
                    },
                },
                required: ['board_name'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'bridge_create_board',
            description:
                'Creates a new board with a specified name and an optional list of columns.',
            parameters: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'The name of the new board.',
                    },
                    columns: {
                        type: 'string',
                        description:
                            "A JSON stringified array of column names, e.g., '[\"Todo\", \"In Progress\", \"Done\"]'.",
                    },
                },
                required: ['name'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'bridge_update_board',
            description: "Updates a board's information, such as renaming it.",
            parameters: {
                type: 'object',
                properties: {
                    current_name: {
                        type: 'string',
                        description: 'The current name of the board to identify it.',
                    },
                    new_name: {
                        type: 'string',
                        description: 'The new name to assign to the board.',
                    },
                },
                required: ['current_name'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'bridge_delete_board',
            description: 'Permanently deletes a board by its name.',
            parameters: {
                type: 'object',
                properties: {
                    board_name: {
                        type: 'string',
                        description: 'The name of the board to delete.',
                    },
                },
                required: ['board_name'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'bridge_create_task',
            description:
                'Creates a new task in a specific column of the currently active board.',
            parameters: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        description: 'The title of the task.',
                    },
                    column_name: {
                        type: 'string',
                        description:
                            "The name of the column where the task should be created (e.g., 'Todo').",
                    },
                    description: {
                        type: 'string',
                        description: 'A brief description of the task.',
                    },
                    subtasks: {
                        type: 'string',
                        description:
                            "A JSON stringified array of subtask titles, e.g., '[\"Subtask 1\", \"Subtask 2\"]'.",
                    },
                },
                required: ['title', 'column_name'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'bridge_update_task',
            description:
                "Updates an existing task's title, description, or moves it to a different column.",
            parameters: {
                type: 'object',
                properties: {
                    current_task_title: {
                        type: 'string',
                        description: 'The current title of the task to locate it.',
                    },
                    new_title: {
                        type: 'string',
                        description: 'The new title for the task.',
                    },
                    new_description: {
                        type: 'string',
                        description: 'The new description for the task.',
                    },
                    target_column_name: {
                        type: 'string',
                        description: 'The name of the column to move the task to.',
                    },
                },
                required: ['current_task_title'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'bridge_delete_task',
            description: 'Deletes a task from the current board using its title.',
            parameters: {
                type: 'object',
                properties: {
                    task_title: {
                        type: 'string',
                        description: 'The title of the task to delete.',
                    },
                },
                required: ['task_title'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'bridge_toggle_subtask',
            description:
                'Updates the completion status of a specific subtask within a task.',
            parameters: {
                type: 'object',
                properties: {
                    parent_task_title: {
                        type: 'string',
                        description: 'The title of the task containing the subtask.',
                    },
                    subtask_title: {
                        type: 'string',
                        description: 'The title of the subtask to toggle.',
                    },
                    is_completed: {
                        type: 'string',
                        enum: ['true', 'false'],
                        description: "The completion status as a string: 'true' or 'false'.",
                    },
                },
                required: ['parent_task_title', 'subtask_title', 'is_completed'],
            },
        },
    },
];
