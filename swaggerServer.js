const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/routes/swagger'); // Importa o arquivo swagger.js

const app = express();

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota inicial para indicar que o Swagger está rodando
app.get('/', (req, res) => {
  res.send('Acesse a documentação da API em <a href="/api-docs">/api-docs</a>');
});

// Porta do servidor
const PORT = process.env.PORT || 21229;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});