// src/middlewares/validate.js
const { body } = require('express-validator');

const validarUsuario = [
  body('email').isEmail().withMessage('E-mail inválido'),
  body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
];

module.exports = { validarUsuario };
