const express = require('express');
const cors = require('cors');
const router = require('./src/routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/routes/swagger.js'); // Importando a configuração pronta
require('dotenv').config();

const app = express();
const porta = process.env.PORT || 21229;

// Middlewares
app.use(cors());
app.use(express.json({
  verify: function (req, res, buf) {
    req.rawBody = buf;
  }
}));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API
app.use(router);

// Rota raiz
app.get('/', (req, res) => {
  res.send("Autenticação feita com sucesso");
});

// Inicia o servidor
app.listen(porta, () => {
  console.log(`Aplicação rodando na porta ${porta}`);
  console.log(`Documentação Swagger disponível em http://localhost:${porta}/api-docs`);
});

