require('dotenv').config(); // Carrega as variáveis do .env

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const routes = require('./src/routes/routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ControlFood API',
      version: '1.0.0',
      description: 'API de gerenciamento de restaurante com Swagger',
    },
    servers: [
      {
        url: 'http://localhost:21229/api',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Arquivos onde estão os comentários Swagger
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Rota da documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API
app.use('/api', routes);

// Inicializa servidor
const PORT = process.env.PORT || 21229;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📄 Swagger: http://localhost:${PORT}/api-docs`);
});

