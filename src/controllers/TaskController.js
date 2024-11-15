const db = require('../database/connection');

class TaskController {
  //login

  static async login(req, res) {
    const { login,senha } = req.body;
    console.log(login + senha);
    try {
      const usuario = await db('usuarios').where({
        email: login,
        senha: senha,
      }).first();
      res.json({autorizado: (usuario.email !== null), id: usuario.id_usuario});
    } catch (error) {
      res.status(500).json({autorizado: false });
    }
  }

  // Usuários
  static async novoUsuario(req, res) {
    const { nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque } = req.body;
    try {
      await db('usuarios').insert({ nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque });
      res.status(201).send('Usuário criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  static async listarUsuarios(req, res) {
    try {
      const usuarios = await db('usuarios').select('*');
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  static async listarUmUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuario = await db('usuarios').where('id_usuario', id).first();
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  static async atualizarUsuario(req, res) {
    const { id } = req.params;
    const { nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque } = req.body;
    try {
      await db('usuarios').where('id_usuario', id).update({ nome, email, senha, acesso_criar_usuario, acesso_dashboard, acesso_criar_pedido, acesso_estoque });
      res.send('Usuário atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  static async removerUsuario(req, res) {
    const { id } = req.params;
    try {
      await db('usuarios').where('id_usuario', id).del();
      res.send('Usuário removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover usuário' });
    }
  }

  // Ingredientes
  static async novoIngrediente(req, res) {
    const { descricao, contem_alergicos, informacoes_nutricionais } = req.body;
    try {
      await db('ingrediente').insert({ descricao, contem_alergicos, informacoes_nutricionais });
      res.status(201).send('Ingrediente criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar ingrediente' });
    }
  }

  static async listarIngredientes(req, res) {
    try {
      const ingredientes = await db('ingrediente').select('*');
      res.json(ingredientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar ingredientes' });
    }
  }

  static async listarUmIngrediente(req, res) {
    const { id } = req.params;
    try {
      const ingrediente = await db('ingrediente').where('Id_ingrediente', id).first();
      res.json(ingrediente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar ingrediente' });
    }
  }

  static async atualizarIngrediente(req, res) {
    const { id } = req.params;
    const { descricao, contem_alergicos, informacoes_nutricionais } = req.body;
    try {
      await db('ingrediente').where('Id_ingrediente', id).update({ descricao, contem_alergicos, informacoes_nutricionais });
      res.send('Ingrediente atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar ingrediente' });
    }
  }

  static async removerIngrediente(req, res) {
    const { id } = req.params;
    try {
      await db('ingrediente').where('Id_ingrediente', id).del();
      res.send('Ingrediente removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover ingrediente' });
    }
  }

  // Histórico de entrada
  static async novoHistorico(req, res) {
    const { data_entrada, quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente } = req.body;
    try {
      await db('historico_entrada').insert({ data_entrada, quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente });
      res.status(201).send('Histórico de entrada criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar histórico de entrada' });
    }
  }

  static async listarHistoricos(req, res) {
    try {
      const historicos = await db('historico_entrada').select('*');
      res.json(historicos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar históricos de entrada' });
    }
  }

  static async listarUmHistorico(req, res) {
    const { id } = req.params;
    try {
      const historico = await db('historico_entrada').where('id_historico', id).first();
      res.json(historico);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar histórico de entrada' });
    }
  }

  static async atualizarHistorico(req, res) {
    const { id } = req.params;
    const { data_entrada, quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente } = req.body;
    try {
      await db('historico_entrada').where('id_historico', id).update({ data_entrada, quantidade, preco_pago, data_vencimento, marca, medida, ingrediente_Id_ingrediente });
      res.send('Histórico de entrada atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar histórico de entrada' });
    }
  }

  static async removerHistorico(req, res) {
    const { id } = req.params;
    try {
      await db('historico_entrada').where('id_historico', id).del();
      res.send('Histórico de entrada removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover histórico de entrada' });
    }
  }

  //estoque

  static async novoEstoque(req, res) {
    const { quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente } = req.body;
    try {
      await db('estoque').insert({
        quantidade,
        medida,
        quantidade_minima,
        ingrediente_Id_ingrediente
      });
      res.status(201).send('Estoque criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar estoque' });
    }
  }

  static async listarEstoques(req, res) {
    try {
      const estoques = await db('estoque').select('*');
      res.json(estoques);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estoques' });
    }
  }

  static async listarUmEstoque(req, res) {
    const { id } = req.params;
    try {
      const estoque = await db('estoque').where({ id_estoque: id }).first();
      res.json(estoque);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estoque' });
    }
  }

  static async atualizarEstoque(req, res) {
    const { id } = req.params;
    const { quantidade, medida, quantidade_minima, ingrediente_Id_ingrediente } = req.body;
    try {
      await db('estoque').where({ id_estoque: id }).update({
        quantidade,
        medida,
        quantidade_minima,
        ingrediente_Id_ingrediente
      });
      res.send('Estoque atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar estoque' });
    }
  }

  static async removerEstoque(req, res) {
    const { id } = req.params;
    try {
      await db('estoque').where({ id_estoque: id }).del();
      res.send('Estoque removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover estoque' });
    }
  }

  //prato

  static async novoPrato(req, res) {
    const { nome, descricao, preco, tempo_preparo } = req.body;
    try {
      await db('pratos').insert({ nome, descricao, preco, tempo_preparo });
      res.status(201).send('Prato criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar prato' });
    }
  }

  static async listarPratos(req, res) {
    try {
      const pratos = await db('pratos').select('*');
      res.json(pratos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pratos' });
    }
  }

  static async listarUmPrato(req, res) {
    const { id } = req.params;
    try {
      const prato = await db('pratos').where({ id_prato: id }).first();
      res.json(prato);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar prato' });
    }
  }

  static async atualizarPrato(req, res) {
    const { id } = req.params;
    const { nome, descricao, preco, tempo_preparo } = req.body;
    try {
      await db('pratos').where({ id_prato: id }).update({ nome, descricao, preco, tempo_preparo });
      res.send('Prato atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar prato' });
    }
  }

  static async removerPrato(req, res) {
    const { id } = req.params;
    try {
      await db('pratos').where({ id_prato: id }).del();
      res.send('Prato removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover prato' });
    }
  }

   //cliente
  static async novoCliente(req, res) {
    const { nome, telefone, endereco } = req.body;
    try {
      await db('cliente').insert({ nome, telefone, endereco });
      res.status(201).send('Cliente criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  }

  static async listarClientes(req, res) {
    try {
      const clientes = await db('cliente').select('*');
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  }

  static async listarUmCliente(req, res) {
    const { id } = req.params;
    try {
      const cliente = await db('cliente').where({ id_cliente: id }).first();
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  }

  static async atualizarCliente(req, res) {
    const { id } = req.params;
    const { nome, telefone, endereco } = req.body;
    try {
      await db('cliente').where({ id_cliente: id }).update({ nome, telefone, endereco });
      res.send('Cliente atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }

  static async removerCliente(req, res) {
    const { id } = req.params;
    try {
      await db('cliente').where({ id_cliente: id }).del();
      res.send('Cliente removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover cliente' });
    }
  }

 //entregador
  static async novoEntregador(req, res) {
    const { nome, telefone, veiculo, placa, senha } = req.body;
    try {
      await db('entregador').insert({ nome, telefone, veiculo, placa, senha });
      res.status(201).send('Entregador criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar entregador' });
    }
  }

  static async listarEntregadores(req, res) {
    try {
      const entregadores = await db('entregador').select('*');
      res.json(entregadores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar entregadores' });
    }
  }

  static async listarUmEntregador(req, res) {
    const { id } = req.params;
    try {
      const entregador = await db('entregador').where('id_entregador', id).first();
      res.json(entregador);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar entregador' });
    }
  }

  static async atualizarEntregador(req, res) {
    const { id } = req.params;
    const { nome, telefone, veiculo, placa, senha } = req.body;
    try {
      await db('entregador').where('id_entregador', id).update({ nome, telefone, veiculo, placa, senha });
      res.send('Entregador atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar entregador' });
    }
  }

  static async removerEntregador(req, res) {
    const { id } = req.params;
    try {
      await db('entregador').where('id_entregador', id).del();
      res.send('Entregador removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover entregador' });
    }
  }

 //entrega
  static async novaEntrega(req, res) {
    const { data_retirada, data_entrega, endereco } = req.body;
    try {
      await db('entrega').insert({ data_retirada, data_entrega, endereco });
      res.status(201).send('Entrega criada');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar entrega' });
    }
  }

  static async listarEntregas(req, res) {
    try {
      const entregas = await db('entrega').select('*');
      res.json(entregas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar entregas' });
    }
  }

  static async listarUmaEntrega(req, res) {
    const { id } = req.params;
    try {
      const entrega = await db('entrega').where('id_entrega', id).first();
      res.json(entrega);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar entrega' });
    }
  }

  static async atualizarEntrega(req, res) {
    const { id } = req.params;
    const { data_retirada, data_entrega, endereco } = req.body;
    try {
      await db('entrega').where('id_entrega', id).update({ data_retirada, data_entrega, endereco });
      res.send('Entrega atualizada');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar entrega' });
    }
  }

  static async removerEntrega(req, res) {
    const { id } = req.params;
    try {
      await db('entrega').where('id_entrega', id).del();
      res.send('Entrega removida');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover entrega' });
    }
  }

  //pedido
  static async novoPedido(req, res) {
    const { cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, entrega_id_entrega, data_pedido, tempo_estimado } = req.body;
    try {
      await db('pedidos').insert({
        cliente_id_cliente,
        entregador_id_entregador,
        usuarios_id_usuario,
        entrega_id_entrega,
        data_pedido,
        tempo_estimado
      });
      res.status(201).send('Pedido criado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar pedido' });
    }
  }

  static async listarPedidos(req, res) {
    try {
      const pedidos = await db('pedidos').select('*');
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  }

  static async listarUmPedido(req, res) {
    const { id } = req.params;
    try {
      const pedido = await db('pedidos').where('id_pedido', id).first();
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pedido' });
    }
  }

  static async atualizarPedido(req, res) {
    const { id } = req.params;
    const { cliente_id_cliente, entregador_id_entregador, usuarios_id_usuario, entrega_id_entrega, data_pedido, tempo_estimado } = req.body;
    try {
      await db('pedidos').where('id_pedido', id).update({
        cliente_id_cliente,
        entregador_id_entregador,
        usuarios_id_usuario,
        entrega_id_entrega,
        data_pedido,
        tempo_estimado
      });
      res.send('Pedido atualizado');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar pedido' });
    }
  }

  static async removerPedido(req, res) {
    const { id } = req.params;
    try {
      await db('pedidos').where('id_pedido', id).del();
      res.send('Pedido removido');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover pedido' });
    }
  }

}

module.exports = TaskController;
