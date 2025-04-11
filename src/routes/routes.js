const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');


// ========== Login ==========
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post('/login', TaskController.login);

// ========== Usuários ==========
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/usuarios', TaskController.listarUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Lista um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 */
router.get('/usuarios/:id', TaskController.listarUmUsuario);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou faltando
 */
router.post('/usuarios', TaskController.novoUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Oliveira
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               senha:
 *                 type: string
 *                 example: novaSenha123
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

router.put('/usuarios/:id', TaskController.atualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser removido
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

router.delete('/usuarios/:id', TaskController.removerUsuario);

// ========== Ingredientes ==========

/**
 * @swagger
 * /ingredientes:
 *   post:
 *     summary: Cria um novo ingrediente
 *     tags: [Ingredientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - quantidade
 *               - unidade
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Tomate
 *               quantidade:
 *                 type: number
 *                 example: 10
 *               unidade:
 *                 type: string
 *                 example: kg
 *     responses:
 *       201:
 *         description: Ingrediente criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

router.post('/ingredientes', TaskController.novoIngrediente);

/**
 * @swagger
 * /ingredientes:
 *   get:
 *     summary: Lista todos os ingredientes
 *     tags: [Ingredientes]
 *     responses:
 *       200:
 *         description: Lista de ingredientes
 */

router.get('/ingredientes', TaskController.listarIngredientes);

/**
 * @swagger
 * /ingredientes/{id}:
 *   get:
 *     summary: Retorna um ingrediente por ID
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingrediente encontrado
 *       404:
 *         description: Ingrediente não encontrado
 */

router.get('/ingredientes/:id', TaskController.listarUmIngrediente);

/**
 * @swagger
 * /ingredientes/{id}:
 *   put:
 *     summary: Atualiza um ingrediente por ID
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Tomate Cereja
 *               quantidade:
 *                 type: number
 *                 example: 15
 *               unidade:
 *                 type: string
 *                 example: kg
 *     responses:
 *       200:
 *         description: Ingrediente atualizado com sucesso
 *       404:
 *         description: Ingrediente não encontrado
 */

router.put('/ingredientes/:id', TaskController.atualizarIngrediente);

/**
 * @swagger
 * /ingredientes/{id}:
 *   delete:
 *     summary: Remove um ingrediente por ID
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingrediente removido com sucesso
 *       404:
 *         description: Ingrediente não encontrado
 */

router.delete('/ingredientes/:id', TaskController.removerIngrediente);

// ========== Histórico ==========

/**
 * @swagger
 * /historico:
 *   post:
 *     summary: Cria um novo histórico de ações
 *     tags: [Histórico]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - acao
 *               - usuarioId
 *             properties:
 *               acao:
 *                 type: string
 *                 example: Criou um novo prato
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Histórico criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

router.post('/historico', TaskController.novoHistorico);

/**
 * @swagger
 * /historico:
 *   get:
 *     summary: Lista todos os registros de histórico
 *     tags: [Histórico]
 *     responses:
 *       200:
 *         description: Lista de históricos
 */

router.get('/historico', TaskController.listarHistoricos);

/**
 * @swagger
 * /historico/{id}:
 *   get:
 *     summary: Retorna um registro de histórico pelo ID
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico encontrado
 *       404:
 *         description: Histórico não encontrado
 */

router.get('/historico/:id', TaskController.listarUmHistorico);

/**
 * @swagger
 * /historico/{id}:
 *   put:
 *     summary: Atualiza um registro de histórico pelo ID
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               acao:
 *                 type: string
 *                 example: Atualizou dados de cliente
 *               usuarioId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Histórico atualizado com sucesso
 *       404:
 *         description: Histórico não encontrado
 */

router.put('/historico/:id', TaskController.atualizarHistorico);

/**
 * @swagger
 * /historico/{id}:
 *   delete:
 *     summary: Remove um registro de histórico pelo ID
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico removido com sucesso
 *       404:
 *         description: Histórico não encontrado
 */

router.delete('/historico/:id', TaskController.removerHistorico);

// ========== Estoque ==========

/**
 * @swagger
 * /estoque:
 *   post:
 *     summary: Adiciona um novo item ao estoque
 *     tags: [Estoque]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ingredienteId
 *               - quantidade
 *             properties:
 *               ingredienteId:
 *                 type: integer
 *                 example: 3
 *               quantidade:
 *                 type: number
 *                 example: 20.5
 *     responses:
 *       201:
 *         description: Item de estoque criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

router.post('/estoque', TaskController.novoEstoque);

/**
 * @swagger
 * /estoque:
 *   get:
 *     summary: Lista todos os itens do estoque
 *     tags: [Estoque]
 *     responses:
 *       200:
 *         description: Lista de itens do estoque
 */

router.get('/estoque', TaskController.listarEstoques);

/**
 * @swagger
 * /estoque/{id}:
 *   get:
 *     summary: Busca um item do estoque pelo ID
 *     tags: [Estoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item de estoque encontrado
 *       404:
 *         description: Item não encontrado
 */

router.get('/estoque/:id', TaskController.listarUmEstoque);

/**
 * @swagger
 * /estoque/{id}:
 *   put:
 *     summary: Atualiza um item do estoque pelo ID
 *     tags: [Estoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredienteId:
 *                 type: integer
 *                 example: 3
 *               quantidade:
 *                 type: number
 *                 example: 15.0
 *     responses:
 *       200:
 *         description: Item de estoque atualizado com sucesso
 *       404:
 *         description: Item não encontrado
 */

router.put('/estoque/:id', TaskController.atualizarEstoque);

/**
 * @swagger
 * /estoque/{id}:
 *   delete:
 *     summary: Remove um item do estoque pelo ID
 *     tags: [Estoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       404:
 *         description: Item não encontrado
 */

router.delete('/estoque/:id', TaskController.removerEstoque);

// ========== Pratos ==========

/**
 * @swagger
 * /pratos:
 *   post:
 *     summary: Cria um novo prato
 *     tags: [Pratos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *             properties:
 *               nome:
 *                 type: string
 *                 example: lasanha
 *               preco:
 *                 type: number
 *                 example: 25,20
 *     responses:
 *       201:
 *         description: Ingrediente criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

router.post('/pratos', TaskController.novoPrato);

/**
 * @swagger
 * /pratos:
 *   get:
 *     summary: Lista todos os pratos
 *     tags: [Pratos]
 *     responses:
 *       200:
 *         description: Lista de pratos
 */

router.get('/pratos', TaskController.listarPratos);

/**
 * @swagger
 * /pratos/{id}:
 *   get:
 *     summary: Busca um prato pelo ID
 *     tags: [Pratos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prato encontrado
 *       404:
 *         description: Prato não encontrado
 */

router.get('/pratos/:id', TaskController.listarUmPrato);

/**
 * @swagger
 * /pratos/{id}:
 *   put:
 *     summary: Atualiza um prato existente
 *     tags: [Pratos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do prato a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Pizza Marguerita
 *               preco:
 *                 type: number
 *                 example: 30.00
 *     responses:
 *       200:
 *         description: Prato atualizado com sucesso
 *       404:
 *         description: Prato não encontrado
 */

router.put('/pratos/:id', TaskController.atualizarPrato);

/**
 * @swagger
 * /pratos/{id}:
 *   delete:
 *     summary: Remove um prato pelo ID
 *     tags: [Pratos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prato removido com sucesso
 *       404:
 *         description: Prato não encontrado
 */

router.delete('/pratos/:id', TaskController.removerPrato);

// ========== Clientes ==========

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Ana Paula
 *               telefone:
 *                 type: string
 *                 example: (11) 98765-4321
 *     responses:
 *       201:
 *         description: Cliente cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */

router.post('/clientes', TaskController.novoCliente);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */

router.get('/clientes', TaskController.listarClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Busca um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 */

router.get('/clientes/:id', TaskController.listarUmCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza os dados de um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Ana Silva
 *               telefone:
 *                 type: string
 *                 example: (11) 99876-5432
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */

router.put('/clientes/:id', TaskController.atualizarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Remove um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 */

router.delete('/clientes/:id', TaskController.removerCliente);

// ========== Entregadores ==========

/**
 * @swagger
 * /entregadores:
 *   post:
 *     summary: Cadastra um novo entregador
 *     tags: [Entregadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Mendes
 *               telefone:
 *                 type: string
 *                 example: (11) 91234-5678
 *     responses:
 *       201:
 *         description: Entregador cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */

router.post('/entregadores', TaskController.novoEntregador);

/**
 * @swagger
 * /entregadores:
 *   get:
 *     summary: Lista todos os entregadores
 *     tags: [Entregadores]
 *     responses:
 *       200:
 *         description: Lista de entregadores
 */

router.get('/entregadores', TaskController.listarEntregadores);

/**
 * @swagger
 * /entregadores/{id}:
 *   get:
 *     summary: Busca um entregador pelo ID
 *     tags: [Entregadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do entregador
 *     responses:
 *       200:
 *         description: Entregador encontrado
 *       404:
 *         description: Entregador não encontrado
 */

router.get('/entregadores/:id', TaskController.listarUmEntregador);

/**
 * @swagger
 * /entregadores/{id}:
 *   put:
 *     summary: Atualiza os dados de um entregador
 *     tags: [Entregadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do entregador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Souza
 *               telefone:
 *                 type: string
 *                 example: (11) 99999-8888
 *     responses:
 *       200:
 *         description: Entregador atualizado com sucesso
 *       404:
 *         description: Entregador não encontrado
 */

router.put('/entregadores/:id', TaskController.atualizarEntregador);

/**
 * @swagger
 * /entregadores/{id}:
 *   delete:
 *     summary: Remove um entregador pelo ID
 *     tags: [Entregadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do entregador
 *     responses:
 *       200:
 *         description: Entregador removido com sucesso
 *       404:
 *         description: Entregador não encontrado
 */

router.delete('/entregadores/:id', TaskController.removerEntregador);

// ========== Entregas ==========

/**
 * @swagger
 * /entregas:
 *   post:
 *     summary: Cria uma nova entrega
 *     tags: [Entregas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pedido_id
 *               - entregador_id
 *               - status
 *             properties:
 *               pedido_id:
 *                 type: integer
 *                 example: 1
 *               entregador_id:
 *                 type: integer
 *                 example: 2
 *               status:
 *                 type: string
 *                 example: Em rota
 *     responses:
 *       201:
 *         description: Entrega criada com sucesso
 *       400:
 *         description: Dados inválidos
 */

router.post('/entregas', TaskController.novaEntrega);

/**
 * @swagger
 * /entregas:
 *   get:
 *     summary: Lista todas as entregas
 *     tags: [Entregas]
 *     responses:
 *       200:
 *         description: Lista de entregas
 */

router.get('/entregas', TaskController.listarEntregas);

/**
 * @swagger
 * /entregas/{id}:
 *   get:
 *     summary: Busca uma entrega pelo ID
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da entrega
 *     responses:
 *       200:
 *         description: Entrega encontrada
 *       404:
 *         description: Entrega não encontrada
 */

router.get('/entregas/:id', TaskController.listarUmaEntrega);

/**
 * @swagger
 * /entregas/{id}:
 *   put:
 *     summary: Atualiza os dados de uma entrega
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da entrega
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedido_id:
 *                 type: integer
 *                 example: 1
 *               entregador_id:
 *                 type: integer
 *                 example: 2
 *               status:
 *                 type: string
 *                 example: Entregue
 *     responses:
 *       200:
 *         description: Entrega atualizada com sucesso
 *       404:
 *         description: Entrega não encontrada
 */

router.put('/entregas/:id', TaskController.atualizarEntrega);

/**
 * @swagger
 * /entregas/{id}:
 *   delete:
 *     summary: Remove uma entrega pelo ID
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da entrega
 *     responses:
 *       200:
 *         description: Entrega removida com sucesso
 *       404:
 *         description: Entrega não encontrada
 */

router.delete('/entregas/:id', TaskController.removerEntrega);

// ========== Pedidos ==========

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cliente_id
 *               - prato_id
 *               - quantidade
 *             properties:
 *               cliente_id:
 *                 type: integer
 *                 example: 1
 *               prato_id:
 *                 type: integer
 *                 example: 2
 *               quantidade:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

router.post('/pedidos', TaskController.novoPedido);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */

router.get('/pedidos', TaskController.listarPedidos);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Busca um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */

router.get('/pedidos/:id', TaskController.listarUmPedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza os dados de um pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente_id:
 *                 type: integer
 *                 example: 1
 *               prato_id:
 *                 type: integer
 *                 example: 2
 *               quantidade:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */

router.put('/pedidos/:id', TaskController.atualizarPedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Remove um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido removido com sucesso
 *       404:
 *         description: Pedido não encontrado
 */

router.delete('/pedidos/:id', TaskController.removerPedido);

module.exports = router;

