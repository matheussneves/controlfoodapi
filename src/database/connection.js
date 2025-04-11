require('dotenv').config(); // ← importa as variáveis do .env

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST, // ← usa a variável de ambiente
        user : process.env.DB_USER, // ← usa a variável de ambiente
        password : process.env.DB_PASSWORD, // ← usa a variável de ambiente
        database : process.env.DB_NAME // ← usa a variável de ambiente
     }
});
module.exports = knex;
