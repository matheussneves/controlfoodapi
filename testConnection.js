const knex = require('./src/database/connection');

knex.raw('SELECT 1')
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    });