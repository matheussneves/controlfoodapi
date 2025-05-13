const db = require('../config/database');

const UserModel = {
  async findByEmail(email) {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return user[0]; // retorna um único usuário
  }
};

module.exports = UserModel;
