const userPaths = {
    '/users/register': {
        post: {
            tags: ['Users'],
            summary: 'Register a new user',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/RegisterUser'
                        }
                    }
                },
                required: true
            },
            responses: {
                '201': {
                    description: 'Successfully registered the user'
                },
                '400': {
                    description: 'Error during registration',
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
    '/users/login': {
        post: {
            tags: ['Users'],
            summary: 'Login a new user',
            parameters: [
                {
                    in: 'header',
                    name: 'authorization',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'body',
                    name: 'content',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'Successfully Logged in'
                },
                '400': {
                    description: 'Error Logging in'
                }
            }
        }
    },
    '/users/token': {
        post: {
          tags: ['Users'],
          summary: 'Create new token',
          parameters: [
            {
              in: 'header',
              name: 'authorization',
              required: true,
              schema: {
                type: 'string'
              }
            },
            {
              in: 'body',
              name: 'content',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Successfully created new token'
            },
            '400': {
              description: 'Error creating new token'
            }
          }
        }
    },
    '/users/logout': {
        delete: { // HTTP methods should be lowercase
          tags: ['Users'],
          summary: 'User logout',
          parameters: [
            {
              in: 'header',
              name: 'authorization',
              required: true,
              schema: {
                type: 'string'
              }
            },
            {
              in: 'body',
              name: 'content',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Successfully logged out'
            },
            '400': {
              description: 'Error logging out'
            }
          }
        }
      }
};

module.exports = userPaths;