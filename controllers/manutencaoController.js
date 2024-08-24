const Manutencao = require('../models/manutencao');

// Controlador para manutenção
const ManutencaoController = {
  // Criar uma nova manutenção
  async create(req, res) {
    try {
      const manutencao = new Manutencao(req.body);
      await manutencao.save();
      res.status(201).json(manutencao); 
    } catch (error) {
      console.error('Erro ao criar manutenção:', error);
      res.status(400).json({ error: error.message });
    }
  },
  // Listar todas as manutenções com paginação
  async list(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const manutencoes = await Manutencao.paginate({}, { page, limit });
      res.json(manutencoes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obter detalhes de uma manutenção por ID
  async getById(req, res) {
    try {
      const manutencao = await Manutencao.findById(req.params.id);
      if (!manutencao) {
        return res.status(404).json({ error: 'Manutenção não encontrada' });
      }
      res.json(manutencao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Atualizar uma manutenção por ID
  async update(req, res) {
    try {
      const manutencao = await Manutencao.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!manutencao) {
        return res.status(404).json({ error: 'Manutenção não encontrada' });
      }
      res.json(manutencao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Excluir uma manutenção por ID
  async delete(req, res) {
    try {
      const manutencao = await Manutencao.findByIdAndDelete(req.params.id);
      if (!manutencao) {
        return res.status(404).json({ error: 'Manutenção não encontrada' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = ManutencaoController;
