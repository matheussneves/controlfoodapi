const db = require('../db/database');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 

// ========== Usuários ==========
// Cria um novo usuário
async function novoUsuario(req, res) {
  const { nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque } = req.body;

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!nome || !email || !senha || acesso_criar_usuario === undefined || acesso_dashboard === undefined || acesso_criar_pedido === undefined || acesso_estoque === undefined) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    // Consulta SQL corrigida
    const [resultado] = await db.query(
      'INSERT INTO usuarios (nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque]
    );

    return res.status(201).json({ message: 'Usuário criado com sucesso', usuario: resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }
}

// Lista todos os usuários
async function listarUsuarios(req, res) {
  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios');
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
}

// Lista um usuário por ID
async function listarUmUsuario(req, res) {
  const { id } = req.params;
  try {
    const [usuario] = await db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    if (usuario.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json(usuario[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar usuário' });
  }
}

// Atualiza um usuário por ID
async function atualizarUsuario(req, res) {
  const { id } = req.params; // Extrai o ID dos parâmetros da URL
  const { nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'O campo id é obrigatório' });
  }

  try {
    const query = senha
      ? 'UPDATE usuarios SET nome = ?, email = ?, senha = ?, acesso_criar_usuario = ?, acesso_dashboard = ?, acesso_criar_pedido = ?, acesso_estoque = ? WHERE id_usuario = ?'
      : 'UPDATE usuarios SET nome = ?, email = ?, acesso_criar_usuario = ?, acesso_dashboard = ?, acesso_criar_pedido = ?, acesso_estoque = ? WHERE id_usuario = ?';

    const params = senha
      ? [nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque, id]
      : [nome, email, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque, id];

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
}

// Remove um usuário por ID
async function removerUsuario(req, res) {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover usuário' });
  }
}

// Realiza o login de um usuário
async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Os campos email e senha são obrigatórios' });
  }

  try {
    // Verifica se o usuário existe no banco de dados
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const usuario = usuarios[0];

    // Verifica se a senha está correta (sem criptografia)
    if (usuario.senha !== senha) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, 'secreta', {
      expiresIn: '1h',
    });

    return res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
}

// ========== Ingredientes ==========

// Cria um novo ingrediente
async function novoIngrediente(req, res) {
  const { descricao, contem_alergicos, informacoes_nutricionais } = req.body;

  // Validação para garantir que todos os campos sejam enviados
  if (!descricao || contem_alergicos === undefined || !informacoes_nutricionais) {
    return res.status(400).json({ message: 'Os campos descricao, contem_alergicos e informacoes_nutricionais são obrigatórios' });
  }

  try {
    // Inserção no banco de dados
    const [resultado] = await db.query(
      'INSERT INTO ingrediente (descricao, contem_alergicos, informacoes_nutricionais) VALUES (?, ?, ?)',
      [descricao, contem_alergicos, informacoes_nutricionais]
    );

    return res.status(201).json({ message: 'Ingrediente criado com sucesso', ingrediente: resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar ingrediente' });
  }
}

// Lista todos os ingredientes
async function listarIngredientes(req, res) {
  try {
    // Consulta ao banco de dados
    const [ingredientes] = await db.query('SELECT * FROM ingrediente');

    // Retorna a lista de ingredientes
    return res.status(200).json(ingredientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar ingredientes' });
  }
}

// Lista um ingrediente por ID
async function listarUmIngrediente(req, res) {
  const { id } = req.params;

  try {
    // Consulta ao banco de dados
    const [ingrediente] = await db.query('SELECT * FROM ingrediente WHERE id_ingrediente = ?', [id]);

    if (ingrediente.length === 0) {
      return res.status(404).json({ message: 'Ingrediente não encontrado' });
    }

    return res.status(200).json(ingrediente[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar ingrediente' });
  }
}

// Atualiza um ingrediente por ID
async function atualizarIngrediente(req, res) {
  const { id } = req.params; // Extrai o ID dos parâmetros da URL
  const { descricao, contem_alergicos, informacoes_nutricionais } = req.body;

  // Validação para garantir que todos os campos sejam enviados
  if (!descricao || contem_alergicos === undefined || !informacoes_nutricionais) {
    return res.status(400).json({ message: 'Os campos descricao, contem_alergicos e informacoes_nutricionais são obrigatórios' });
  }

  try {
    // Atualização no banco de dados
    const [resultado] = await db.query(
      'UPDATE ingrediente SET descricao = ?, contem_alergicos = ?, informacoes_nutricionais = ? WHERE id_ingrediente = ?',
      [descricao, contem_alergicos, informacoes_nutricionais, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Ingrediente não encontrado' });
    }

    return res.status(200).json({ message: 'Ingrediente atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar ingrediente' });
  }
}

// Remove um ingrediente por ID
async function removerIngrediente(req, res) {
  const { id } = req.params;

  try {
    // Remoção no banco de dados
    const [resultado] = await db.query('DELETE FROM ingrediente WHERE id_ingrediente = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Ingrediente não encontrado' });
    }

    return res.status(200).json({ message: 'Ingrediente removido com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover ingrediente' });
  }
}

// ========== Estoque ==========

// Cria um novo item no estoque
async function novoEstoque(req, res) {
  const { quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente } = req.body;

  // Validação para garantir que todos os campos sejam enviados
  if (!quantidade || !medida || !quantidade_minima || !ingrediente_Id_ingrediente) {
    return res.status(400).json({ message: 'Os campos quantidade, medida, quantidade_minima e ingrediente_Id_ingrediente são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO estoque (quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente) VALUES (?, ?, ?, ?)',
      [quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente]
    );
    return res.status(201).json({ message: 'Item de estoque criado com sucesso', estoque: resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar item de estoque' });
  }
}

// Lista todos os itens do estoque
async function listarEstoques(req, res) {
  try {
    const [estoques] = await db.query('SELECT * FROM estoque');
    return res.status(200).json(estoques);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar estoques' });
  }
}

// Lista um item do estoque por ID
async function listarUmEstoque(req, res) {
  const { id } = req.params; // Extrai o ID dos parâmetros da URL

  try {
    const [estoque] = await db.query('SELECT * FROM estoque WHERE id_estoque = ?', [id]);
    if (estoque.length === 0) {
      return res.status(404).json({ message: 'Item de estoque não encontrado' });
    }
    return res.status(200).json(estoque[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar item de estoque' });
  }
}

// Atualiza um item do estoque por ID
async function atualizarEstoque(req, res) {
  const { id } = req.params; // Extrai o ID dos parâmetros da URL
  const { quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente } = req.body; // Extrai os dados do corpo da requisição

  // Validação para garantir que todos os campos sejam enviados
  if (!quantidade || !medida || !quantidade_minima || !ingrediente_Id_ingrediente) {
    return res.status(400).json({ message: 'Os campos quantidade, medida, quantidade_minima e ingrediente_Id_ingrediente são obrigatórios' });
  }

  try {
    // Atualização no banco de dados
    const [resultado] = await db.query(
      'UPDATE estoque SET quantidade = ?, medida = ?, quantidade_minima = ?, ingrediente_Id_ingrediente = ? WHERE id_estoque = ?',
      [quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Item de estoque não encontrado' });
    }

    return res.status(200).json({ message: 'Item de estoque atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar item de estoque' });
  }
}

// Remove um item do estoque por ID
async function removerEstoque(req, res) {
  const { id } = req.params;

  try {
    const [resultado] = await db.query('DELETE FROM estoque WHERE id_estoque = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Item de estoque não encontrado' });
    }

    return res.status(200).json({ message: 'Item de estoque removido com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover item de estoque' });
  }
}

// ========== Pratos ==========

// Cria um novo prato
async function novoPrato(req, res) {
  const { nome, descricao, preco, tempo } = req.body;

  // Validação para garantir que todos os campos sejam enviados
  if (!nome || !descricao || !preco || !tempo) {
    return res.status(400).json({ message: 'Os campos nome, descricao, preco e tempo são obrigatórios' });
  }

  // Validação para garantir que o preço seja um número float
  if (typeof preco !== 'number' || !Number.isFinite(preco)) {
    return res.status(400).json({ message: 'O campo preco deve ser um número válido (float)' });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO pratos (nome, descricao, preco, tempo) VALUES (?, ?, ?, ?)',
      [nome, descricao, preco, tempo]
    );
    return res.status(201).json({ message: 'Prato criado com sucesso', prato: resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar prato' });
  }
}

// Lista todos os pratos
async function listarPratos(req, res) {
  try {
    const [pratos] = await db.query('SELECT * FROM pratos');
    return res.status(200).json(pratos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar pratos' });
  }
}

// Lista um prato por ID
async function listarUmPrato(req, res) {
  const { id } = req.params;

  try {
    const [prato] = await db.query('SELECT * FROM pratos WHERE id_prato = ?', [id]);
    if (prato.length === 0) {
      return res.status(404).json({ message: 'Prato não encontrado' });
    }
    return res.status(200).json(prato[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar prato' });
  }
}

// Atualiza um prato por ID
async function atualizarPrato(req, res) {
  const { id } = req.params;
  const { nome, descricao, preco, tempo } = req.body;

  // Validação para garantir que todos os campos sejam enviados
  if (!nome || !descricao || !preco || !tempo) {
    return res.status(400).json({ message: 'Os campos nome, descricao, preco e tempo são obrigatórios' });
  }

  // Validação para garantir que o preço seja um número float
  if (typeof preco !== 'number' || !Number.isFinite(preco)) {
    return res.status(400).json({ message: 'O campo preco deve ser um número válido (float)' });
  }

  try {
    const [resultado] = await db.query(
      'UPDATE pratos SET nome = ?, descricao = ?, preco = ?, tempo = ? WHERE id_prato = ?',
      [nome, descricao, preco, tempo, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Prato não encontrado' });
    }

    return res.status(200).json({ message: 'Prato atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar prato' });
  }
}

// Remove um prato por ID
async function removerPrato(req, res) {
  const { id } = req.params;

  try {
    const [resultado] = await db.query('DELETE FROM pratos WHERE id_prato = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Prato não encontrado' });
    }

    return res.status(200).json({ message: 'Prato removido com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover prato' });
  }
}

// Adiciona um ingrediente a um prato
async function adicionarIngredienteAoPrato(req, res) {
  const { id } = req.params; // ID do prato
  const { ingredienteId, quantidade } = req.body;

  if (!ingredienteId || !quantidade) {
    return res.status(400).json({ message: 'Os campos ingredienteId e quantidade são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO ingrediente_has_pratos (prato_id, ingrediente_id, quantidade) VALUES (?, ?, ?)',
      [id, ingredienteId, quantidade]
    );
    return res.status(201).json({ message: 'Ingrediente adicionado ao prato com sucesso', resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao adicionar ingrediente ao prato' });
  }
}

// Lista os ingredientes de um prato
async function listarIngredientesDoPrato(req, res) {
  const { id } = req.params; // ID do prato

  try {
    const [ingredientes] = await db.query(
      'SELECT i.id, i.nome, i.unidade, ip.quantidade FROM ingrediente_has_pratos ip JOIN ingredientes i ON ip.ingrediente_id = i.id WHERE ip.prato_id = ?',
      [id]
    );
    return res.status(200).json(ingredientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar ingredientes do prato' });
  }
}

// Remove um ingrediente de um prato
async function removerIngredienteDoPrato(req, res) {
  const { id, ingredienteId } = req.params; // ID do prato e do ingrediente

  try {
    const [resultado] = await db.query(
      'DELETE FROM ingrediente_has_pratos WHERE prato_id = ? AND ingrediente_id = ?',
      [id, ingredienteId]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Ingrediente não encontrado no prato' });
    }

    return res.status(200).json({ message: 'Ingrediente removido do prato com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover ingrediente do prato' });
  }
}

// ========== Clientes ==========

// Cria um novo cliente
async function novoCliente(req, res) {
  const { nome, telefone, endereco } = req.body;

  if (!nome || !telefone || !endereco) {
    return res.status(400).json({ message: 'Os campos nome e telefone são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO cliente (nome, telefone, endereco) VALUES (?, ?, ?)',
      [nome, telefone, endereco]
    );
    return res.status(201).json({ message: 'Cliente criado com sucesso', cliente: resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar cliente' });
  }
}

// Lista todos os clientes
async function listarClientes(req, res) {
  try {
    const [clientes] = await db.query('SELECT * FROM cliente');
    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar clientes' });
  }
}

// Lista um cliente por ID
async function listarUmCliente(req, res) {
  const { id } = req.params;

  try {
    const [cliente] = await db.query('SELECT * FROM cliente WHERE id_cliente = ?', [id]);
    if (cliente.length === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    return res.status(200).json(cliente[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar cliente' });
  }
}

// Atualiza um cliente por ID
async function atualizarCliente(req, res) {
  const { id } = req.params;
  const { nome, telefone, endereco } = req.body;

  if (!nome || !telefone || !endereco || !id) {
    return res.status(400).json({ message: 'Os campos nome e telefone são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'UPDATE cliente SET nome = ?, telefone = ?, endereco = ? WHERE id_cliente = ?',
      [nome, telefone, endereco, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    return res.status(200).json({ message: 'Cliente atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar cliente' });
  }
}

// Remove um cliente por ID
async function removerCliente(req, res) {
  const { id } = req.params;

  try {
    const [resultado] = await db.query('DELETE FROM cliente WHERE id_cliente = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    return res.status(200).json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover cliente' });
  }
}

// ========== Entregadores ==========

// Cria um novo entregador
async function novoEntregador(req, res) {
  const { nome, telefone, veiculo, placa, senha } = req.body;

  if (!nome || !telefone || !veiculo || !placa || !senha) {
    return res.status(400).json({ message: 'Os campos nome e telefone são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO entregador (nome, telefone, veiculo, placa, senha ) VALUES (?, ?, ?, ?, ?)',
      [nome, telefone, veiculo, placa, senha ]
    );
    return res.status(201).json({ message: 'Entregador criado com sucesso', entregador: resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar entregador' });
  }
}

// Lista todos os entregadores
async function listarEntregadores(req, res) {
  try {
    const [entregadores] = await db.query('SELECT * FROM entregador');
    return res.status(200).json(entregadores);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar entregadores' });
  }
}

// Lista um entregador por ID
async function listarUmEntregador(req, res) {
  const { id } = req.params;

  try {
    const [entregador] = await db.query('SELECT * FROM entregador WHERE id_entregador = ?', [id]);
    if (entregador.length === 0) {
      return res.status(404).json({ message: 'Entregador não encontrado' });
    }
    return res.status(200).json(entregador[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar entregador' });
  }
}

// Atualiza um entregador por ID
async function atualizarEntregador(req, res) {
  const { id } = req.params;
  const { nome, telefone, veiculo, placa, senha  } = req.body;

  if (!nome || !telefone || !veiculo || !placa || !senha || !id) {
    return res.status(400).json({ message: 'Os campos nome e telefone são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'UPDATE entregador SET nome = ?, telefone = ?, veiculo = ?, placa = ?, senha = ? WHERE id_entregador = ?',
      [nome, telefone, veiculo, placa, senha, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Entregador não encontrado' });
    }

    return res.status(200).json({ message: 'Entregador atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar entregador' });
  }
}

// Remove um entregador por ID
async function removerEntregador(req, res) {
  const { id } = req.params;

  try {
    const [resultado] = await db.query('DELETE FROM entregador WHERE id_entregador = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Entregador não encontrado' });
    }

    return res.status(200).json({ message: 'Entregador removido com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover entregador' });
  }
}

// ========== Entregas ==========

// Cria uma nova entrega
async function novaEntrega(req, res) {
  const { data_retirada, data_entrega, endereco } = req.body;

  if (!data_retirada || !data_entrega || !endereco) {
    return res.status(400).json({ message: 'Os campos cliente_id, endereco e status são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO entrega (data_retirada, data_entrega, endereco ) VALUES (?, ?, ?)',
      [ data_retirada, data_entrega, endereco ]
    );
    return res.status(201).json({ message: 'Entrega criada com sucesso', entrega: resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar entrega' });
  }
}

// Lista todas as entregas
async function listarEntregas(req, res) {
  try {
    const [entregas] = await db.query('SELECT * FROM entrega');
    return res.status(200).json(entregas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar entregas' });
  }
}

// Lista uma entrega por ID
async function listarUmaEntrega(req, res) {
  const { id } = req.params;

  try {
    const [entrega] = await db.query('SELECT * FROM entrega WHERE id_entrega = ?', [id]);
    if (entrega.length === 0) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }
    return res.status(200).json(entrega[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar entrega' });
  }
}

// Atualiza uma entrega por ID
async function atualizarEntrega(req, res) {
  const { id } = req.params;
  const { data_retirada, data_entrega, endereco } = req.body;

  if (!data_retirada || !data_entrega || !endereco || !id) {
    return res.status(400).json({ message: 'Os campos cliente_id, endereco e status são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'UPDATE entrega SET data_retirada = ?, data_entrega = ?, endereco = ? WHERE id_entrega = ?',
      [data_retirada, data_entrega, endereco , id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }

    return res.status(200).json({ message: 'Entrega atualizada com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar entrega' });
  }
}

// Remove uma entrega por ID
async function removerEntrega(req, res) {
  const { id } = req.params;

  try {
    const [resultado] = await db.query('DELETE FROM entrega WHERE id_entrega = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }

    return res.status(200).json({ message: 'Entrega removida com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover entrega' });
  }
}

// ========== Histórico ==========

// Cria um novo registro de histórico
async function novoHistorico(req, res) {
  const { quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente } = req.body;

  // Validação para garantir que todos os campos sejam enviados
  if (!quantidade || !preco_pago || !data_vencimento || !marca || !medida || !ingrediente_Id_ingrediente) {
    return res.status(400).json({ message: 'Os campos são obrigatórios' });
  }

  try {
    // Inserção no banco de dados
    const [resultado] = await db.query(
      'INSERT INTO historico_entrada (quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente) VALUES (?, ?, ?, ?, ?, ?)',
      [quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente]
    );

    return res.status(201).json({ message: 'Histórico criado com sucesso', historico: resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar histórico' });
  }
}

// Lista todos os registros de histórico
async function listarHistoricos(req, res) {
  try {
    // Consulta ao banco de dados
    const [historicos] = await db.query('SELECT * FROM historico_entrada');

    // Retorna a lista de históricos
    return res.status(200).json(historicos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar históricos' });
  }
}

// Lista um registro de histórico por ID
async function listarUmHistorico(req, res) {
  const { id } = req.params;

  try {
    // Consulta ao banco de dados
    const [historico] = await db.query('SELECT * FROM historico_entrada WHERE id_historico = ?', [id]);

    if (historico.length === 0) {
      return res.status(404).json({ message: 'Histórico não encontrado' });
    }

    return res.status(200).json(historico[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar histórico' });
  }
}

// Atualiza um registro de histórico por ID
async function atualizarHistorico(req, res) {
  const { id } = req.params;
  const { quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente } = req.body;

  // Validação para garantir que todos os campos sejam enviados
  if (!quantidade || !preco_pago || !data_vencimento || !marca || !medida || !ingrediente_Id_ingrediente) {
    return res.status(400).json({ message: 'Os campos quantidade, preco_pago, data_vencimento, marca, medida e ingrediente_Id_ingrediente são obrigatórios' });
  }

  try {
    // Atualização no banco de dados
    const [resultado] = await db.query(
      'UPDATE historico_entrada SET quantidade = ?, preco_pago = ?, data_vencimento = ?, marca = ?, medida = ?, ingrediente_Id_ingrediente = ? WHERE id_historico = ?',
      [quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Histórico não encontrado' });
    }

    return res.status(200).json({ message: 'Histórico atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar histórico' });
  }
}

// Remove um registro de histórico por ID
async function removerHistorico(req, res) {
  const { id } = req.params;

  try {
    // Remoção no banco de dados
    const [resultado] = await db.query('DELETE FROM historico_entrada WHERE id_historico = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Histórico não encontrado' });
    }

    return res.status(200).json({ message: 'Histórico removido com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover histórico' });
  }
}

// ========== Pedidos ==========

// Cria um novo pedido
async function novoPedido(req, res) {
  const {cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, entrega_id_entrega } = req.body;

  if ( !cliente_id_cliente || !entregador_id_entregador || !usuarios_id_usuario || !data_pedido || !tempo_estimado || !entrega_id_entrega) {
    return res.status(400).json({ message: 'Os campos entregador_id_entregador, usuarios_id_usuario, id_pedido, data_pedido, tempo_estimado e entrega_id_entrega são obrigatórios' });

  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO pedidos (cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, entrega_id_entrega) VALUES (?, ?, ?, ?, ?, ?)',
      [cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, entrega_id_entrega]
    );
    return res.status(201).json({ message: 'Pedido criado com sucesso', pedido: resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar pedido' });
  }
}

// Lista todos os pedidos
async function listarPedidos(req, res) {
  try {
    const [pedidos] = await db.query(`
      SELECT
        t1.id_pedido AS pedido_id,
        t2.nome AS cliente_nome,
        t2.telefone AS cliente_telefone,
        t2.endereco AS cliente_endereco,
        t3.nome AS entregador_nome,
        t3.telefone AS entregador_telefone,
        t3.veiculo AS entregador_veiculo,
        t5.nome AS prato_nome,
        t5.descricao AS prato_descricao,
        t5.preco AS prato_preco
      FROM pedidos AS t1
      JOIN cliente AS t2
        ON t1.cliente_id_cliente = t2.id_cliente
      JOIN entregador AS t3
        ON t1.entregador_id_entregador = t3.id_entregador
      JOIN pedidos_has_pratos AS t4
        ON t1.id_pedido = t4.pedidos_id_pedido
      JOIN pratos AS t5
        ON t4.pratos_id_prato = t5.id_prato
    `);

    return res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar pedidos' });
  }
}

// Lista um pedido por ID
async function listarUmPedido(req, res) {
  const { id } = req.params;

  try {
    const [pedido] = await db.query(`
	SELECT
	t1.id_pedido,
	t2.nome as nome_cliente,
	t2.telefone as tel_cliente,
	t2.endereco,
	t3.nome as nome_entregador,
	t3.telefone as tel_entregador,
	t3.veiculo,
	t5.nome as pedido,
	t5.preco
FROM pedidos as t1
	JOIN cliente as t2
		ON t1.cliente_id_cliente = t2.id_cliente
	JOIN entregador as t3
		ON t1.entregador_id_entregador = t3.id_entregador
	JOIN pedidos_has_pratos as t4
		ON t1.id_pedido = t4.pedidos_id_pedido
	JOIN pratos as t5
		ON t4.pedidos_id_pedido = t5.id_prato
WHERE t1.id_pedido = ?
     ` , [id]);
    if (pedido.length === 0) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    return res.status(200).json(pedido[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar pedido' });
  }
}

// Atualiza um pedido por ID
async function atualizarPedido(req, res) {
  const { id } = req.params;
  const {cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, entrega_id_entrega } = req.body;

  if ( !cliente_id_cliente || !entregador_id_entregador || !usuarios_id_usuario || !data_pedido || !tempo_estimado || !entrega_id_entrega) {
    return res.status(400).json({ message: 'Os campos cliente_id, prato_id e quantidade são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'UPDATE pedidos SET cliente_id_cliente = ?, entregador_id_entregador = ?, usuarios_id_usuario = ?, data_pedido = ?, tempo_estimado = ?, entrega_id_entrega = ? WHERE id_pedido = ?',
      [cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, entrega_id_entrega, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    return res.status(200).json({ message: 'Pedido atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar pedido' });
  }
}

// Remove um pedido por ID
async function removerPedido(req, res) {
  const { id } = req.params;

  try {
    const [resultado] = await db.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    return res.status(200).json({ message: 'Pedido removido com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover pedido' });
  }
}

// ========== Exportação ==========
module.exports = {
  // Usuários
  novoUsuario,
  listarUsuarios,
  listarUmUsuario,
  atualizarUsuario,
  removerUsuario,
  login,

  // Ingredientes
  novoIngrediente,
  listarIngredientes,
  listarUmIngrediente,
  atualizarIngrediente,
  removerIngrediente,

  // Estoque
  novoEstoque,
  listarEstoques,
  listarUmEstoque,
  atualizarEstoque,
  removerEstoque,

  // Pratos
  novoPrato,
  listarPratos,
  listarUmPrato,
  atualizarPrato,
  removerPrato,
  adicionarIngredienteAoPrato,
  listarIngredientesDoPrato,
  removerIngredienteDoPrato,

  // Clientes
  novoCliente,
  listarClientes,
  listarUmCliente,
  atualizarCliente,
  removerCliente,

  // Entregadores
  novoEntregador,
  listarEntregadores,
  listarUmEntregador,
  atualizarEntregador,
  removerEntregador,

  // Entregas
  novaEntrega,
  listarEntregas,
  listarUmaEntrega,
  atualizarEntrega,
  removerEntrega,

  // Histórico
  novoHistorico,
  listarHistoricos,
  listarUmHistorico,
  atualizarHistorico,
  removerHistorico,

  // Pedidos
  novoPedido,
  listarPedidos,
  listarUmPedido,
  atualizarPedido,
  removerPedido,
};

