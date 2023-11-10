const blogPaths = {
    '/blogs/createblog': {
      post: {
        tags: ['Blogs'],
        summary: 'Create a new blog posts',
        parameters: [
          {
            in: 'header',
            name: 'authorization',
            description: 'Authorization token',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'content',
            description: 'Content of the blog post',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Successfully created blog post'
          },
          '400': {
            description: 'Error creating blog post'
          }
        }
      }
    },
  
    '/blogs/updateblog': {
      put: {
        tags: ['Blogs'],
        summary: 'Update a blog post',
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
            description: 'Successfully updated blog post'
          },
          '400': {
            description: 'Error updating blog post'
          }
        }
      }
    },
  
    '/blogs/getallblog': {
      get: {
        tags: ['Blogs'],
        summary: 'Get all blogs',
        responses: {
          '200': {
            description: 'Successfully retrieved all blogs',
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
          '400': {
            description: 'Error retrieving blogs'
          }
        }
      }
    },
  
    '/blogs/getblogpostbyid/{id}': {
      get: {
        tags: ['Blogs'],
        summary: 'Get a blog post by id',
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
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved the blog post',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BlogPost'
                }
              }
            }
          },
          '400': {
            description: 'Error retrieving the blog post'
          }
        }
      }
    }
  };
  
  module.exports = blogPaths;