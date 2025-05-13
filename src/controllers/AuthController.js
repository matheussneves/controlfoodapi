// src/controllers/AuthController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/usermodel');

const AuthController = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Senha inválida' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno' });
    }
  }
};

module.exports = AuthController;
