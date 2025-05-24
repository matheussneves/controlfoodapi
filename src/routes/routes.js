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
 *               - acesso_criar_usuario
 *               - acesso_dashboard
 *               - acesso_criar_pedido
 *               - acesso_estoque
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               acesso_criar_usuario:
 *                 type: boolean
 *               acesso_dashboard:
 *                 type: boolean
 *               acesso_criar_pedido:
 *                 type: boolean
 *               acesso_estoque:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/usuarios', TaskController.novoUsuario);

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
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/usuarios/:id', TaskController.listarUmUsuario);

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               acesso_criar_usuario:
 *                 type: boolean
 *               acesso_dashboard:
 *                 type: boolean
 *               acesso_criar_pedido:
 *                 type: boolean
 *               acesso_estoque:
 *                 type: boolean
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
 *               - descricao
 *               - contem_alergicos
 *               - informacoes_nutricionais
 *             properties:
 *               descricao:
 *                 type: string
 *               contem_alergicos:
 *                 type: boolean
 *               informacoes_nutricionais:
 *                 type: string
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
 *     summary: Lista um ingrediente por ID
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
 *     summary: Atualiza um ingrediente existente
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
 *             required:
 *               - descricao
 *               - contem_alergicos
 *               - informacoes_nutricionais
 *             properties:
 *               descricao:
 *                 type: string
 *               contem_alergicos:
 *                 type: boolean
 *               informacoes_nutricionais:
 *                 type: string
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
 *     summary: Remove um ingrediente pelo ID
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

// ========== Estoque ==========
/**
 * @swagger
 * /estoque:
 *   post:
 *     summary: Cria um novo item no estoque
 *     tags: [Estoque]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantidade
 *               - medida
 *               - quantidade_minima
 *               - ingrediente_Id_ingrediente
 *             properties:
 *               quantidade:
 *                 type: number
 *               medida:
 *                 type: string
 *               quantidade_minima:
 *                 type: number
 *               ingrediente_Id_ingrediente:
 *                 type: integer
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
 *     summary: Lista um item do estoque por ID
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
 *         description: Item de estoque não encontrado
 */
router.get('/estoque/:id', TaskController.listarUmEstoque);

/**
 * @swagger
 * /estoque/{id}:
 *   put:
 *     summary: Atualiza um item do estoque por ID
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
 *             required:
 *               - quantidade
 *               - medida
 *               - quantidade_minima
 *               - ingrediente_Id_ingrediente
 *             properties:
 *               quantidade:
 *                 type: number
 *               medida:
 *                 type: string
 *               quantidade_minima:
 *                 type: number
 *               ingrediente_Id_ingrediente:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item de estoque atualizado com sucesso
 *       404:
 *         description: Item de estoque não encontrado
 */
router.put('/estoque/:id', TaskController.atualizarEstoque);

/**
 * @swagger
 * /estoque/{id}:
 *   delete:
 *     summary: Remove um item do estoque por ID
 *     tags: [Estoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item de estoque removido com sucesso
 *       404:
 *         description: Item de estoque não encontrado
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
 *               - descricao
 *               - preco
 *               - tempo
 *               - ingredientes
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               tempo:
 *                 type: number
 *               ingredientes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id_ingrediente
 *                     - quantidade
 *                     - medida
 *                   properties:
 *                     id_ingrediente:
 *                       type: integer
 *                     quantidade:
 *                       type: number
 *                     medida:
 *                       type: string
 *     responses:
 *       201:
 *         description: Prato criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /pratos:
 *   get:
 *     summary: Lista todos os pratos
 *     tags: [Pratos]
 *     responses:
 *       200:
 *         description: Lista de pratos com seus ingredientes
 */

/**
 * @swagger
 * /pratos/{id}:
 *   get:
 *     summary: Lista um prato por ID
 *     tags: [Pratos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prato encontrado com seus ingredientes
 *       404:
 *         description: Prato não encontrado
 */

/**
 * @swagger
 * /pratos/{id}:
 *   put:
 *     summary: Atualiza um prato por ID
 *     tags: [Pratos]
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
 *             required:
 *               - nome
 *               - descricao
 *               - preco
 *               - tempo
 *               - ingredientes
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               tempo:
 *                 type: number
 *               ingredientes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id_ingrediente
 *                     - quantidade
 *                     - medida
 *                   properties:
 *                     id_ingrediente:
 *                       type: integer
 *                     quantidade:
 *                       type: number
 *                     medida:
 *                       type: string
 *     responses:
 *       200:
 *         description: Prato atualizado com sucesso
 *       404:
 *         description: Prato não encontrado
 */

/**
 * @swagger
 * /pratos/{id}:
 *   delete:
 *     summary: Remove um prato por ID
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
 *     summary: Lista um prato por ID
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
 *     summary: Atualiza um prato por ID
 *     tags: [Pratos]
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
 *             required:
 *               - nome
 *               - descricao
 *               - preco
 *               - tempo
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               tempo:
 *                 type: number
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
 *     summary: Remove um prato por ID
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
 *     summary: Cria um novo cliente
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
 *               - endereco
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
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
 *     summary: Lista um cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *     summary: Atualiza um cliente por ID
 *     tags: [Clientes]
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
 *             required:
 *               - nome
 *               - telefone
 *               - endereco
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               endereco:
 *                 type: string
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
 *     summary: Cria um novo entregador
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
 *               - veiculo
 *               - placa
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               veiculo:
 *                 type: string
 *               placa:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Entregador criado com sucesso
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
 *     summary: Lista um entregador por ID
 *     tags: [Entregadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *     summary: Atualiza um entregador por ID
 *     tags: [Entregadores]
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
 *             required:
 *               - nome
 *               - telefone
 *               - veiculo
 *               - placa
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               veiculo:
 *                 type: string
 *               placa:
 *                 type: string
 *               senha:
 *                 type: string
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
 *     summary: Remove um entregador por ID
 *     tags: [Entregadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entregador removido com sucesso
 *       404:
 *         description: Entregador não encontrado
 */
router.delete('/entregadores/:id', TaskController.removerEntregador);

// ========== Histórico ==========
/**
 * @swagger
 * /historico:
 *   post:
 *     summary: Cria um novo registro de histórico
 *     tags: [Histórico]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantidade
 *               - preco_pago
 *               - data_vencimento
 *               - marca
 *               - medida
 *               - ingrediente_Id_ingrediente
 *             properties:
 *               quantidade:
 *                 type: number
 *               preco_pago:
 *                 type: number
 *               data_vencimento:
 *                 type: string
 *                 format: date
 *               marca:
 *                 type: string
 *               medida:
 *                 type: string
 *               ingrediente_Id_ingrediente:
 *                 type: integer
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
 *         description: Lista de registros de histórico
 */
router.get('/historico', TaskController.listarHistoricos);

/**
 * @swagger
 * /historico/{id}:
 *   get:
 *     summary: Lista um registro de histórico por ID
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de histórico encontrado
 *       404:
 *         description: Registro de histórico não encontrado
 */
router.get('/historico/:id', TaskController.listarUmHistorico);

/**
 * @swagger
 * /historico/{id}:
 *   put:
 *     summary: Atualiza um registro de histórico por ID
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
 *             required:
 *               - quantidade
 *               - preco_pago
 *               - data_vencimento
 *               - marca
 *               - medida
 *               - ingrediente_Id_ingrediente
 *             properties:
 *               quantidade:
 *                 type: number
 *               preco_pago:
 *                 type: number
 *               data_vencimento:
 *                 type: string
 *                 format: date
 *               marca:
 *                 type: string
 *               medida:
 *                 type: string
 *               ingrediente_Id_ingrediente:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Registro de histórico atualizado com sucesso
 *       404:
 *         description: Registro de histórico não encontrado
 */
router.put('/historico/:id', TaskController.atualizarHistorico);

/**
 * @swagger
 * /historico/{id}:
 *   delete:
 *     summary: Remove um registro de histórico por ID
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de histórico removido com sucesso
 *       404:
 *         description: Registro de histórico não encontrado
 */
router.delete('/historico/:id', TaskController.removerHistorico);

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
 *               - cliente_id_cliente
 *               - entregador_id_entregador
 *               - usuarios_id_usuario
 *               - data_pedido
 *               - tempo_estimado
 *               - entrega
 *               - pratos
 *             properties:
 *               cliente_id_cliente:
 *                 type: integer
 *               entregador_id_entregador:
 *                 type: integer
 *               usuarios_id_usuario:
 *                 type: integer
 *               data_pedido:
 *                 type: string
 *                 format: date
 *               tempo_estimado:
 *                 type: integer
 *               entrega:
 *                 type: object
 *                 required:
 *                   - data_retirada
 *                   - data_entrega
 *                   - endereco
 *                 properties:
 *                   data_retirada:
 *                     type: string
 *                     format: date
 *                   data_entrega:
 *                     type: string
 *                     format: date
 *                   endereco:
 *                     type: string
 *               pratos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id_prato
 *                   properties:
 *                     id_prato:
 *                       type: integer
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
 *         description: Lista de pedidos com informações detalhadas
 */
router.get('/pedidos', TaskController.listarPedidos);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Lista um pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado com informações detalhadas
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/pedidos/:id', TaskController.listarUmPedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido por ID
 *     tags: [Pedidos]
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
 *             required:
 *               - cliente_id_cliente
 *               - entregador_id_entregador
 *               - usuarios_id_usuario
 *               - data_pedido
 *               - tempo_estimado
 *               - entrega
 *               - pratos
 *             properties:
 *               cliente_id_cliente:
 *                 type: integer
 *               entregador_id_entregador:
 *                 type: integer
 *               usuarios_id_usuario:
 *                 type: integer
 *               data_pedido:
 *                 type: string
 *                 format: date
 *               tempo_estimado:
 *                 type: integer
 *               entrega:
 *                 type: object
 *                 required:
 *                   - data_retirada
 *                   - data_entrega
 *                   - endereco
 *                 properties:
 *                   data_retirada:
 *                     type: string
 *                     format: date
 *                   data_entrega:
 *                     type: string
 *                     format: date
 *                   endereco:
 *                     type: string
 *               pratos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id_prato
 *                   properties:
 *                     id_prato:
 *                       type: integer
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
 *     summary: Remove um pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido, entrega e pratos removidos com sucesso
 *       404:
 *         description: Pedido ou entrega não encontrados
 */
router.delete('/pedidos/:id', TaskController.removerPedido);

module.exports = router;

