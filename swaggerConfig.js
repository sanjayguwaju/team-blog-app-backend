const userPaths = require('./docs/userDocsPaths');
const blogPaths = require('./docs/blogDocsPaths')
const components = require('./docs/components/schemas/swaggerComponents');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Blogsphere App',
    version: '1.0.0',
  },
  apis: ['./routes/*.js', './docs/*.js'],
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
    {
      url: 'https://dev-team-blog-app-backend.onrender.com',
      description: 'Development server'
    }
  ],
  paths:{...userPaths,...blogPaths},
  components,
};

module.exports = swaggerDefinition;