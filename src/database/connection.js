var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '',
        user : '', 
        password : '',
        database : 'controlfood'
     }
});
module.exports = knex;