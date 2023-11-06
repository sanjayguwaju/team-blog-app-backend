const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogsphere App',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // point to the directory where your route files are
};

const specs = swaggerJsdoc(options);

module.exports = specs;