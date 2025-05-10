const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ControlFood API',
      version: '1.0.0',
      description: 'API para gerenciamento de restaurante',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local de desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes.js'], // Referência ao arquivo das rotas
};

// Definindo a documentação Swagger
const specs = swaggerJsdoc(options);

module.exports = (app) => {
  // Usando Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};