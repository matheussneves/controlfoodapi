const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

// Rotas para login
router.post('/login', TaskController.login);

// Rotas para usuários
router.post('/usuarios', TaskController.novoUsuario);
router.get('/usuarios', TaskController.listarUsuarios);
router.get('/usuarios/:id', TaskController.listarUmUsuario);
router.put('/usuarios/:id', TaskController.atualizarUsuario);
router.delete('/usuarios/:id', TaskController.removerUsuario);

// Rotas para ingredientes
router.post('/ingredientes', TaskController.novoIngrediente);
router.get('/ingredientes', TaskController.listarIngredientes);
router.get('/ingredientes/:id', TaskController.listarUmIngrediente);
router.put('/ingredientes/:id', TaskController.atualizarIngrediente);
router.delete('/ingredientes/:id', TaskController.removerIngrediente);

// Rotas para histórico de entrada
router.post('/historico', TaskController.novoHistorico);
router.get('/historico', TaskController.listarHistoricos);
router.get('/historico/:id', TaskController.listarUmHistorico);
router.put('/historico/:id', TaskController.atualizarHistorico);
router.delete('/historico/:id', TaskController.removerHistorico);

// Rotas para estoque
router.post('/estoque', TaskController.novoEstoque);
router.get('/estoque', TaskController.listarEstoques);
router.get('/estoque/:id', TaskController.listarUmEstoque);
router.put('/estoque/:id', TaskController.atualizarEstoque);
router.delete('/estoque/:id', TaskController.removerEstoque);

// Rotas para pratos
router.post('/pratos', TaskController.novoPrato);
router.get('/pratos', TaskController.listarPratos);
router.get('/pratos/:id', TaskController.listarUmPrato);
router.put('/pratos/:id', TaskController.atualizarPrato);
router.delete('/pratos/:id', TaskController.removerPrato);

// Rotas para clientes
router.post('/clientes', TaskController.novoCliente);
router.get('/clientes', TaskController.listarClientes);
router.get('/clientes/:id', TaskController.listarUmCliente);
router.put('/clientes/:id', TaskController.atualizarCliente);
router.delete('/clientes/:id', TaskController.removerCliente);

// Exporte as rotas
module.exports = router;
