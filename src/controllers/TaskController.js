const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'controlapi',
  password: '123',
  database: 'controlfood',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');
});

module.exports = connection;

class TaskController {

  // Usuários
  static async novoUsuario(req, res) {
    const { nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque } = req.body;
    try {
      await db.query('INSERT INTO usuarios (nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque]);
      res.status(201).send('Usuário criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  static async listarUsuarios(req, res) {
    try {
      const [usuarios] = await db.query('SELECT * FROM usuarios');
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  static async listarUmUsuario(req, res) {
    const { id } = req.params;
    try {
      const [usuario] = await db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  static async atualizarUsuario(req, res) {
    const { id } = req.params;
    const { nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque } = req.body;
    try {
      await db.query('UPDATE usuarios SET nome = ?, email = ?, senha = ?, acesso_criar_usuario = ?, acesso_dashboard = ?, acesso_criar_pedido = ?, acesso_estoque = ? WHERE id_usuario = ?', 
        [nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque, id]);
      res.send('Usuário atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  static async removerUsuario(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
      res.send('Usuário removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover usuário' });
    }
  }

  // Ingredientes
  static async novoIngrediente(req, res) {
    const { descricao, contem_alergicos, informacoes_nutricionais } = req.body;
    try {
      await db.query('INSERT INTO ingrediente (descricao, contem_alergicos, informacoes_nutricionais) VALUES (?, ?, ?)', 
        [descricao, contem_alergicos, informacoes_nutricionais]);
      res.status(201).send('Ingrediente criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar ingrediente' });
    }
  }

  static async listarIngredientes(req, res) { // busca todos os igredientes
    try {
      const [ingredientes] = await db.query('SELECT * FROM ingrediente');
      res.json(ingredientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar ingredientes' });
    }
  }

  static async listarUmIngrediente(req, res) { // busca um igrediente em específico
    const { id } = req.params;
    try {
      const [ingrediente] = await db.query('SELECT * FROM ingrediente WHERE Id_ingrediente = ?', [id]);
      res.json(ingrediente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar ingrediente' });
    }
  }

  static async atualizarIngrediente(req, res) {
    const { id } = req.params;
    const { descricao, contem_alergicos, informacoes_nutricionais } = req.body;
    try {
      await db.query('UPDATE ingrediente SET descricao = ?, contem_alergicos = ?, informacoes_nutricionais = ? WHERE Id_ingrediente = ?', 
        [descricao, contem_alergicos, informacoes_nutricionais, id]);
      res.send('Ingrediente atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar ingrediente' });
    }
  }

  static async removerIngrediente(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM ingrediente WHERE Id_ingrediente = ?', [id]);
      res.send('Ingrediente removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover ingrediente' });
    }
  }

  // Histórico de entrada
  static async novoHistorico(req, res) {
    const { data_entrada, quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente } = req.body;
    try {
      await db.query('INSERT INTO historico_entrada (data_entrada, quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [data_entrada, quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente]);
      res.status(201).send('Histórico de entrada criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar histórico de entrada' });
    }
  }

  static async listarHistoricos(req, res) {
    try {
      const [historicos] = await db.query('SELECT * FROM historico_entrada');
      res.json(historicos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar históricos de entrada' });
    }
  }

  static async listarUmHistorico(req, res) {
    const { id } = req.params;
    try {
      const [historico] = await db.query('SELECT * FROM historico_entrada WHERE id_historico = ?', [id]);
      res.json(historico);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar histórico de entrada' });
    }
  }

  static async atualizarHistorico(req, res) {
    const { id } = req.params;
    const { data_entrada, quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente } = req.body;
    try {
      await db.query('UPDATE historico_entrada SET data_entrada = ?, quantidade = ?, preco_pago = ?, data_vencimento = ?, marca = ?, medida = ?, ingrediente_Id_ingrediente = ? WHERE id_historico = ?', 
        [data_entrada, quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente, id]);
      res.send('Histórico de entrada atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar histórico de entrada' });
    }
  }

  static async removerHistorico(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM historico_entrada WHERE id_historico = ?', [id]);
      res.send('Histórico de entrada removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover histórico de entrada' });
    }
  }

  // Estoque
  static async novoEstoque(req, res) {
    const { quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente } = req.body;
    try {
      await db.query('INSERT INTO estoque (quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente) VALUES (?, ?, ?, ?)', 
        [quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente]);
      res.status(201).send('Estoque criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar estoque' });
    }
  }

  static async listarEstoques(req, res) {
    try {
      const [estoques] = await db.query('SELECT * FROM estoque');
      res.json(estoques);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estoques' });
    }
  }

  static async listarUmEstoque(req, res) {
    const { id } = req.params;
    try {
      const [estoque] = await db.query('SELECT * FROM estoque WHERE id_estoque = ?', [id]);
      res.json(estoque);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estoque' });
    }
  }

  static async atualizarEstoque(req, res) {
    const { id } = req.params;
    const { quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente } = req.body;
    try {
      await db.query('UPDATE estoque SET quantidade = ?, medida = ?, quantidade_minima = ?, ingrediente_Id_ingrediente = ? WHERE id_estoque = ?', 
        [quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente, id]);
      res.send('Estoque atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar estoque' });
    }
  }

  static async removerEstoque(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM estoque WHERE id_estoque = ?', [id]);
      res.send('Estoque removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover estoque' });
    }
  }

  // Pratos
  static async novoPrato(req, res) {
    const { nome, descricao, preco, tempo_preparo } = req.body;
    try {
      await db.query('INSERT INTO pratos (nome, descricao, preco, tempo_preparo) VALUES (?, ?, ?, ?)', 
        [nome, descricao, preco, tempo_preparo]);
      res.status(201).send('Prato criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar prato' });
    }
  }

  static async listarPratos(req, res) {
    try {
      const [pratos] = await db.query('SELECT * FROM pratos');
      res.json(pratos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pratos' });
    }
  }

  static async listarUmPrato(req, res) {
    const { id } = req.params;
    try {
      const [prato] = await db.query('SELECT * FROM pratos WHERE id_prato = ?', [id]);
      res.json(prato);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar prato' });
    }
  }

  static async atualizarPrato(req, res) {
    const { id } = req.params;
    const { nome, descricao, preco, tempo_preparo } = req.body;
    try {
      await db.query('UPDATE pratos SET nome = ?, descricao = ?, preco = ?, tempo_preparo = ? WHERE id_prato = ?', 
        [nome, descricao, preco, tempo_preparo, id]);
      res.send('Prato atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar prato' });
    }
  }

  static async removerPrato(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM pratos WHERE id_prato = ?', [id]);
      res.send('Prato removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover prato' });
    }
  }

  // Clientes
  static async novoCliente(req, res) {
    const { nome, telefone, endereco } = req.body;
    try {
      await db.query('INSERT INTO cliente (nome, telefone, endereco) VALUES (?, ?, ?)', 
        [nome, telefone, endereco]);
      res.status(201).send('Cliente criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  }

  static async listarClientes(req, res) {
    try {
      const [clientes] = await db.query('SELECT * FROM cliente');
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  }

  static async listarUmCliente(req, res) {
    const { id } = req.params;
    try {
      const [cliente] = await db.query('SELECT * FROM cliente WHERE id_cliente = ?', [id]);
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  }

  static async atualizarCliente(req, res) {
    const { id } = req.params;
    const { nome, telefone, endereco } = req.body;
    try {
      await db.query('UPDATE cliente SET nome = ?, telefone = ?, endereco = ? WHERE id_cliente = ?', 
        [nome, telefone, endereco, id]);
      res.send('Cliente atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }

  static async removerCliente(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM cliente WHERE id_cliente = ?', [id]);
      res.send('Cliente removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover cliente' });
    }
  }

  // Entregadores
  static async novoEntregador(req, res) {
    const { nome, telefone, veiculo } = req.body;
    try {
      await db.query('INSERT INTO entregador (nome, telefone, veiculo) VALUES (?, ?, ?)', 
        [nome, telefone, veiculo]);
      res.status(201).send('Entregador criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar entregador' });
    }
  }

  static async listarEntregadores(req, res) {
    try {
      const [entregadores] = await db.query('SELECT * FROM entregador');
      res.json(entregadores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar entregadores' });
    }
  }

  static async listarUmEntregador(req, res) {
    const { id } = req.params;
    try {
      const [entregador] = await db.query('SELECT * FROM entregador WHERE id_entregador = ?', [id]);
      res.json(entregador);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar entregador' });
    }
  }

  static async atualizarEntregador(req, res) {
    const { id } = req.params;
    const { nome, telefone, veiculo } = req.body;
    try {
      await db.query('UPDATE entregador SET nome = ?, telefone = ?, veiculo = ? WHERE id_entregador = ?', 
        [nome, telefone, veiculo, id]);
      res.send('Entregador atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar entregador' });
    }
  }

  static async removerEntregador(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM entregador WHERE id_entregador = ?', [id]);
      res.send('Entregador removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover entregador' });
    }
  }

  // Pedidos
  static async novoPedido(req, res) {
    const { data_pedido, status, cliente_Id_cliente, entregador_Id_entregador } = req.body;
    try {
      await db.query('INSERT INTO pedidos (data_pedido, status, cliente_Id_cliente, entregador_Id_entregador) VALUES (?, ?, ?, ?)', 
        [data_pedido, status, cliente_Id_cliente, entregador_Id_entregador]);
      res.status(201).send('Pedido criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar pedido' });
    }
  }

  static async listarPedidos(req, res) {
    try {
      const [pedidos] = await db.query('SELECT * FROM pedidos');
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  }

  static async listarUmPedido(req, res) {
    const { id } = req.params;
    try {
      const [pedido] = await db.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id]);
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pedido' });
    }
  }

  static async atualizarPedido(req, res) {
    const { id } = req.params;
    const { data_pedido, status, cliente_Id_cliente, entregador_Id_entregador } = req.body;
    try {
      await db.query('UPDATE pedidos SET data_pedido = ?, status = ?, cliente_Id_cliente = ?, entregador_Id_entregador = ? WHERE id_pedido = ?', 
        [data_pedido, status, cliente_Id_cliente, entregador_Id_entregador, id]);
      res.send('Pedido atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar pedido' });
    }
  }

  static async removerPedido(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
      res.send('Pedido removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover pedido' });
    }
  }
}

module.exports = TaskController;
