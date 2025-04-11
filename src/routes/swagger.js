const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'ControlFood API',
    version: '1.0.0',
    description: 'Documentação da API do sistema de gerenciamento de restaurante',
  },
  host: 'localhost:21229',
  basePath: '/',
  schemes: ['http'],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/routes.js'], // Caminho para ler os comentários nas rotas
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;