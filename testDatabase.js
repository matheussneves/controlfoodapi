const db = require('./config/database'); // Ajuste o caminho para o arquivo database.js

(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS resultado');
    console.log('Conexão bem-sucedida:', rows);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();