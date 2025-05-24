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

    res.json({ token, usuarios: { id: usuario.id_usuario, email: usuario.email } });
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
  // Verifica se já existe um registro de estoque para o ingrediente
  try {
    const [existente] = await db.query(
      'SELECT quantidade FROM estoque WHERE ingrediente_Id_ingrediente = ?',
      [ingrediente_Id_ingrediente]
    );

    if (existente.length > 0) {
      // Se já existe, soma a quantidade e atualiza o registro
      const novaQuantidade = Number(existente[0].quantidade) + Number(quantidade);
      await db.query(
        'UPDATE estoque SET quantidade = ? WHERE ingrediente_Id_ingrediente = ?',
        [novaQuantidade, ingrediente_Id_ingrediente]
      );
      return res.status(200).json({ message: 'Quantidade de estoque atualizada com sucesso', quantidade: novaQuantidade });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao verificar estoque existente' });
  }
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

async function diminuirEstoqueIngrediente(req, res) {
  const { id } = req.params; 
  const { quantidade } = req.body;

  if (!id || !quantidade || isNaN(Number(quantidade))) {
    return res.status(400).json({ message: 'Os campos ingrediente_Id_ingrediente e quantidade são obrigatórios e válidos' });
  }

  try {
    // Busca o estoque atual do ingrediente
    const [estoque] = await db.query(
      'SELECT quantidade FROM estoque WHERE ingrediente_Id_ingrediente = ?',
      [id]
    );

    if (estoque.length === 0) {
      return res.status(404).json({ message: 'Ingrediente não encontrado no estoque' });
    }

    const quantidadeAtual = Number(estoque[0].quantidade);
    const quantidadeNova = quantidadeAtual - Number(quantidade);

    if (quantidadeNova < 0) {
      return res.status(400).json({ message: 'Quantidade insuficiente no estoque' });
    }

    await db.query(
      'UPDATE estoque SET quantidade = ? WHERE ingrediente_Id_ingrediente = ?',
      [quantidadeNova, id]
    );

    return res.status(200).json({ message: 'Estoque atualizado com sucesso', quantidade: quantidadeNova });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao diminuir estoque do ingrediente' });
  }
}

// ========== Pratos ==========

// Cria um novo prato
async function novoPrato(req, res) {
  const { nome, descricao, preco, tempo, ingredientes } = req.body;

  // Validação para garantir que todos os campos sejam enviados
  if (!nome || !descricao || !preco || !tempo) {
    return res.status(400).json({ message: 'Os campos nome, descricao, preco e tempo são obrigatórios' });
  }

  // Validação para garantir que o preço seja um número float
  if (typeof preco !== 'number' || !Number.isFinite(preco)) {
    return res.status(400).json({ message: 'O campo preco deve ser um número válido (float)' });
  }

  // Validação para o array de ingredientes
  if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
    return res.status(400).json({ message: 'O campo ingredientes deve ser um array com pelo menos um item' });
  }

  try {
    // Inserção do prato no banco de dados
    const [resultadoPrato] = await db.query(
      'INSERT INTO pratos (nome, descricao, preco, tempo) VALUES (?, ?, ?, ?)',
      [nome, descricao, preco, tempo]
    );

    const pratoId = resultadoPrato.insertId;

    // Inserção dos ingredientes relacionados ao prato
    const ingredientesPromises = ingredientes.map(({ pratos_id_pratos, quantidade, medida }) => {
      return db.query(
        'INSERT INTO ingrediente_has_pratos (pratos_id_prato, ingrediente_id_ingrediente, quantidade, medida) VALUES (?, ?, ?, ?)',
        [pratoId, pratos_id_pratos, quantidade, medida]
      );
    });

    await Promise.all(ingredientesPromises);

    return res.status(201).json({ message: 'Prato criado com sucesso', pratoId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar prato' });
  }
}

// Lista todos os pratos
async function listarPratos(req, res) {
  try {
 

    // Adiciona os ingredientes para cada prato
    // Busca todos os pratos com seus ingredientes em um array chamado 'Ingredientes'
    const [pratosComIngredientes] = await db.query(`
      SELECT 
      p.id_prato,
      p.nome,
      p.descricao,
      p.preco,
      p.tempo,
      JSON_ARRAYAGG(
        JSON_OBJECT(
        'id_ingrediente', i.id_ingrediente,
        'descricao', i.descricao,
        'quantidade', ip.quantidade,
        'medida', ip.medida,
        'estoque', IFNULL(e.quantidade, 0)
        )
      ) AS Ingredientes
      FROM pratos p
      JOIN ingrediente_has_pratos ip ON p.id_prato = ip.pratos_id_prato
      JOIN ingrediente i ON ip.ingrediente_id_ingrediente = i.id_ingrediente
      LEFT JOIN estoque e ON e.ingrediente_Id_ingrediente = i.id_ingrediente
      GROUP BY p.id_prato
      HAVING MIN(IFNULL(e.quantidade, 0) - IFNULL(e.quantidade_minima, 0)) > 0
       AND COUNT(*) = SUM(IF(e.quantidade IS NOT NULL, 1, 0))
    `);

 
    
      return res.status(200).json(pratosComIngredientes); 
  
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

    const [ingredientes] = await db.query(
      'SELECT i.id_ingrediente, i.descricao, ip.quantidade, ip.medida FROM ingrediente_has_pratos ip JOIN ingrediente i ON ip.ingrediente_id_ingrediente = i.id_ingrediente WHERE ip.pratos_id_prato = ?',
      [id]
    );

    return res.status(200).json({ ...prato[0], ingredientes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar prato' });
  }
}

// Atualiza um prato por ID
async function atualizarPrato(req, res) {
  const { id } = req.params;
  const { nome, descricao, preco, tempo, ingredientes } = req.body;

  // Validação para garantir que todos os campos sejam enviados
  if (!nome || !descricao || !preco || !tempo || !Array.isArray(ingredientes)) {
    return res.status(400).json({ message: 'Os campos nome, descricao, preco, tempo e ingredientes são obrigatórios' });
  }

  try {
    // Atualiza o prato
    const [resultado] = await db.query(
      'UPDATE pratos SET nome = ?, descricao = ?, preco = ?, tempo = ? WHERE id_prato = ?',
      [nome, descricao, preco, tempo, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Prato não encontrado' });
    }

    // Remove os ingredientes antigos
    await db.query('DELETE FROM ingrediente_has_pratos WHERE pratos_id_prato = ?', [id]);

    // Adiciona os novos ingredientes
    const ingredientesPromises = ingredientes.map(({ id_ingrediente, quantidade, medida }) => {
      return db.query(
        'INSERT INTO ingrediente_has_pratos (pratos_id_prato, ingrediente_id_ingrediente, quantidade, medida) VALUES (?, ?, ?, ?)',
        [id, id_ingrediente, quantidade, medida]
      );
    });

    await Promise.all(ingredientesPromises);

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
    // Remove os ingredientes relacionados ao prato
    await db.query('DELETE FROM ingrediente_has_pratos WHERE pratos_id_prato = ?', [id]);

    // Remove o prato
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
      [nome, telefone, veiculo, placa, senha]
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
  const { nome, telefone, veiculo, placa, senha } = req.body;

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

// Atualiza uma entrega por ID

// Remove uma entrega por ID


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
    const [historicos] = await db.query(`
      SELECT 
      h.*, 
      i.descricao AS ingrediente_descricao, 
      i.contem_alergicos, 
      i.informacoes_nutricionais 
      FROM historico_entrada h
      JOIN ingrediente i 
      ON h.ingrediente_Id_ingrediente = i.id_ingrediente
    `);

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
    const [historico] = await db.query(`SELECT h.*, 
      i.descricao AS ingrediente_descricao, 
      i.contem_alergicos, 
      i.informacoes_nutricionais 
      FROM historico_entrada h
      JOIN ingrediente i 
      ON h.ingrediente_Id_ingrediente = i.id_ingrediente WHERE id_historico = ?`, [id]);

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
  const { cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, entrega } = req.body;

  if (!cliente_id_cliente || !entregador_id_entregador || !usuarios_id_usuario || !data_pedido || !tempo_estimado || !entrega) {
    return res.status(400).json({ message: 'Os campos cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado e entrega são obrigatórios' });
  }

  try {
    // Cria a entrega
    const { data_retirada, data_entrega, endereco } = entrega;

    if (!data_retirada || !data_entrega || !endereco) {
      return res.status(400).json({ message: 'Os campos data_retirada, data_entrega e endereco são obrigatórios para a entrega' });
    }

    const [resultadoEntrega] = await db.query(
      'INSERT INTO entrega (data_retirada, data_entrega, endereco) VALUES (?, ?, ?)',
      [data_retirada, data_entrega, endereco]
    );

    const entrega_id_entrega = resultadoEntrega.insertId;

    // Cria o pedido
    const [resultadoPedido] = await db.query(
      'INSERT INTO pedidos (cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, entrega_id_entrega) VALUES (?, ?, ?, ?, ?, ?)',
      [cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, entrega_id_entrega]
    );

    const pedido_id_pedido = resultadoPedido.insertId;

    // Popula a tabela pedidos_has_pratos
    const { pratos } = req.body; // Array de objetos com id_prato e quantidade
    if (!Array.isArray(pratos) || pratos.length === 0) {
      return res.status(400).json({ message: 'O campo pratos deve ser um array com pelo menos um item' });
    }

    const pratosPromises = pratos.map(({ id_prato }) => {
      if (!id_prato) {
        throw new Error('Os campos id_prato e quantidade são obrigatórios para cada prato');
      }
      return db.query(
        'INSERT INTO pedidos_has_pratos (pedidos_id_pedido, pratos_id_prato) VALUES (?, ?)',
        [pedido_id_pedido, id_prato]
      );
    });

    await Promise.all(pratosPromises);

    return res.status(201).json({ message: 'Pedido criado com sucesso', pedido: resultadoPedido });
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
        t1.id_pedido,
        t2.nome as nome_cliente,
        t2.telefone as tel_cliente,
        t2.endereco,
        t3.nome as nome_entregador,
        t3.telefone as tel_entregador,
        t3.veiculo,
        t5.preco,
        t6.data_retirada,
        t6.data_entrega
      FROM pedidos as t1
        JOIN cliente as t2
          ON t1.cliente_id_cliente = t2.id_cliente
        JOIN entregador as t3
          ON t1.entregador_id_entregador = t3.id_entregador
        JOIN pedidos_has_pratos as t4
          ON t1.id_pedido = t4.pedidos_id_pedido
        JOIN pratos as t5
          ON t4.pratos_id_prato = t5.id_prato
        JOIN entrega as t6
          ON t1.entrega_id_entrega = t6.id_entrega
      `);

    const [pratos] = await db.query(`SELECT t1.nome, t1.descricao, t1.preco, t1.tempo , t2.pedidos_id_pedido FROM pratos as t1
          JOIN pedidos_has_pratos as t2
          ON t1.id_prato = t2.pratos_id_prato 
          JOIN pedidos as t3
          ON t2.pedidos_id_pedido = t3.id_pedido`);

    const pedidosComEntregas = pedidos.map((pedido) => {
      const prato = pratos.find((prato) => prato.pedidos_id_pedido === pedido.id_pedido);
      return { ...pedido, prato };
    });

    return res.status(200).json(pedidosComEntregas);
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
        t5.preco,
        t6.data_retirada,
        t6.data_entrega
      FROM pedidos as t1
        JOIN cliente as t2
          ON t1.cliente_id_cliente = t2.id_cliente
        JOIN entregador as t3
          ON t1.entregador_id_entregador = t3.id_entregador
        JOIN pedidos_has_pratos as t4
          ON t1.id_pedido = t4.pedidos_id_pedido
        JOIN pratos as t5
          ON t4.pratos_id_prato = t5.id_prato
        JOIN entrega as t6
          ON t1.entrega_id_entrega = t6.id_entrega
      WHERE t1.id_pedido = ?
    `, [id]);
    const [pratos] = await db.query(`SELECT t1.nome, t1.descricao, t1.preco, t1.tempo, t2.pedidos_id_pedido  FROM pratos as t1
  JOIN pedidos_has_pratos as t2
          ON t1.id_prato = t2.pratos_id_prato 
          JOIN pedidos as t3
          ON t2.pedidos_id_pedido = t3.id_pedido WHERE t3.id_pedido = ?`, [id]);
    if (pedido.length === 0) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    return res.status(200).json({ pedido: pedido[0], Pratos: pratos[0] });



  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar pedido' });
  }
}

// Atualiza um pedido por ID
async function atualizarPedido(req, res) {
  const { id } = req.params;
  const { cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, entrega, pratos } = req.body;

  // Validação para garantir que todos os campos sejam enviados
  if (!cliente_id_cliente || !entregador_id_entregador || !usuarios_id_usuario || !data_pedido || !tempo_estimado || !entrega || !Array.isArray(pratos)) {
    return res.status(400).json({ message: 'Os campos cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, entrega e pratos são obrigatórios' });
  }

  try {
    // Atualiza o pedido
    const [resultadoPedido] = await db.query(
      'UPDATE pedidos SET cliente_id_cliente = ?, entregador_id_entregador = ?, usuarios_id_usuario = ?, data_pedido = ?, tempo_estimado = ? WHERE id_pedido = ?',
      [cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, data_pedido, tempo_estimado, id]
    );

    if (resultadoPedido.affectedRows === 0) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // Atualiza a entrega
    const { data_retirada, data_entrega, endereco } = entrega;

    if (!data_retirada || !data_entrega || !endereco) {
      return res.status(400).json({ message: 'Os campos data_retirada, data_entrega e endereco são obrigatórios para a entrega' });
    }
    const [id_entrega] = await db.query(`SELECT entrega_id_entrega FROM pedidos WHERE id_pedido = ?`, [id]);

    const [resultadoEntrega] = await db.query(
      'UPDATE entrega SET data_retirada = ?, data_entrega = ?, endereco = ? WHERE id_entrega = ?',
      [data_retirada, data_entrega, endereco, id_entrega[0].entrega_id_entrega]
    );

    if (resultadoEntrega.affectedRows === 0) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }

    // Remove os pratos antigos associados ao pedido
    await db.query('DELETE FROM pedidos_has_pratos WHERE pedidos_id_pedido = ?', [id]);

    // Adiciona os novos pratos ao pedido
    const pratosPromises = pratos.map(({ id_prato }) => {
      if (!id_prato) {
        throw new Error('Os campos id_prato e quantidade são obrigatórios para cada prato');
      }
      return db.query(
        'INSERT INTO pedidos_has_pratos (pedidos_id_pedido, pratos_id_prato) VALUES (?, ?)',
        [id, id_prato]
      );
    });

    await Promise.all(pratosPromises);

    return res.status(200).json({ message: 'Pedido, entrega e pratos atualizados com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar pedido, entrega e pratos' });
  }
}

// Remove um pedido por ID
async function removerPedido(req, res) {
  const { id } = req.params;

  try {
    // Remove os pratos associados ao pedido
    await db.query('DELETE FROM pedidos_has_pratos WHERE pedidos_id_pedido = ?', [id]);

    // Remove o pedido
    const [pedidoResultado] = await db.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    if (pedidoResultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // Remove a entrega associada ao pedido
    const [entregaResultado] = await db.query('DELETE FROM entrega WHERE id_entrega = ?', [id]);
    if (entregaResultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }

    return res.status(200).json({ message: 'Pedido, entrega e pratos removidos com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao remover pedido, entrega e pratos' });
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
  diminuirEstoqueIngrediente,

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

