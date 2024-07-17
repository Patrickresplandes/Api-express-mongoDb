const Usuario = require('../models/usuario');

class UserController {
  async show(req, res) {
    try {
      const usuario = await Usuario.findById(req.UsuarioId).select('-senha');
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.json({
        email: usuario.email,
      });
    } catch (error) {
      console.error('Erro ao recuperar informações do usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new UserController();
