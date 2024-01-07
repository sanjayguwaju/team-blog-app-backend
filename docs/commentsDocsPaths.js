const commentPaths = {
    '/comments/savecomment': {
        post: {
            tags: ['Comments'],
            summary: 'Save a comment',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Comment'
                        }
                    }
                },
                required: true
            },
            responses: {
                '201': {
                    description: 'Successfully saved the comment'
                },
                '400': {
                    description: 'Error during saving the comment',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        }
    },
    '/comments/updatecomment': {
        put: {
            tags: ['Comments'],
            summary: 'Update a comment',
            parameters: [
                {
                    in: 'header',
                    name: 'authorization',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Comment'
                        }
                    }
                },
                required: true
            },
            responses: {
                '200': {
                    description: 'Successfully updated the comment'
                },
                '400': {
                    description: 'Error updating the comment'
                }
            }
        }
    }
};

module.exports = commentPaths;