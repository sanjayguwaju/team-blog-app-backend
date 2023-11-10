const components = {
  schemas: {
    BlogPost: {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          description: 'The unique identifier for the blog post'
        },
        title: {
          type: 'string',
          description: 'The title of the blog post'
        },
        content: {
          type: 'string',
          description: 'The content of the blog post'
        },
        author: {
          type: 'string',
          description: 'The author of the blog post'
        },
      }
    },
    User: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: {
          type: 'string',
          example: 'John Doe',
          trim: true
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'john.doe@example.com',
          unique: true,
          trim: true,
          lowercase: true
        },
        password: {
          type: 'string',
          format: 'password',
          example: 'SecurePassword123!'
        },
        image: {
          type: 'string',
          example: 'https://example.com/path-to-image.jpg'
        },
        refreshToken: {
          type: 'string',
          example: 'SomeRefreshTokenString123'
        },
        timestamps: {
          type: 'object',
          properties: {
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
      }
    },
    Comment: {
      type: 'object',
      required: ['comment_message', 'author', 'blogpost'],
      properties: {
        comment_message: {
          type: 'string',
          example: 'This is a comment on the blog post.'
        },
        author: {
          $ref: '#/components/schemas/User'
        },
        blogpost: {
          $ref: '#/components/schemas/BlogPost'
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2023-01-01T12:00:00Z'
        }
      }
    }
  },
  responses: {
    BlogPostResponse: {
      description: 'A single blog post response',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/BlogPost'
          }
        }
      }
    },
    BlogPostListResponse: {
      description: 'A list of blog posts',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/BlogPost'
            }
          }
        }
      }
    },
    UserResponse: {
      description: 'User data response',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User'
          }
        }
      }
    },
    CommentResponse: {
      description: 'A single comment response',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Comment'
          }
        }
      }
    },
    CommentListResponse: {
      description: 'A list of comments',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Comment'
            }
          }
        }
      }
    },
    ErrorResponse: {
      description: 'Error response',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'A message describing the error'
              },
              code: {
                type: 'integer',
                format: 'int32',
                description: 'An error code'
              }
            }
          }
        }
      }
    }
    // Add other response types as needed
  }
}
module.exports = components;