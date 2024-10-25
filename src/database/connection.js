var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'mysql.controlfood.kinghost.net',
        user : 'controlfood', 
        password : 'controlfood2024',
        database : 'controlfood'
     }
});
module.exports = knex;
