const Motorista = require('../models/motorista');

// Controlador para motoristas
const MotoristaController = {
  // Criar um novo motorista
  async create(req, res) {
    try {
      const motorista = new Motorista(req.body);
      await motorista.save();
      res.status(201).json(motorista);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Listar todos os motoristas com paginação
  async list(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const motoristas = await Motorista.paginate({}, { page, limit });
      res.json(motoristas);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obter detalhes de um motorista por ID
  async getById(req, res) {
    try {
      const motorista = await Motorista.findById(req.params.id);
      if (!motorista) {
        return res.status(404).json({ error: 'Motorista não encontrado' });
      }
      res.json(motorista);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Atualizar um motorista por ID
  async update(req, res) {
    try {
      const motorista = await Motorista.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!motorista) {
        return res.status(404).json({ error: 'Motorista não encontrado' });
      }
      res.json(motorista);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Excluir um motorista por ID
  async delete(req, res) {
    try {
      const motorista = await Motorista.findByIdAndDelete(req.params.id);
      if (!motorista) {
        return res.status(404).json({ error: 'Motorista não encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = MotoristaController;
