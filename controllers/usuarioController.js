const Usuario = require('../models/usuario');

class UsuarioController {
    async store (req, res) {
        const { email } = req.body;

        try {
            // Verifica se o usuário já existe
            if (await Usuario.findOne({ email })) {
                return res.status(400).json({ success: false, message: 'Usuário já existe' });
            }

            // Cria um novo usuário
            const usuariosCadastrado = await Usuario.create(req.body);

            // Retorna o usuário criado com uma mensagem de sucesso
            return res.status(201).json({
                success: true,
                message: 'Usuário registrado com sucesso!',
                data: usuariosCadastrado
            });
        } catch (error) {
            // Trata possíveis erros de servidor
            return res.status(500).json({ success: false, message: 'Erro ao registrar usuário.' });
        }
    }

    async index(req, res) {
        try {
            const usuarios = await Usuario.find();
            return res.status(200).json({ success: true, data: usuarios });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar usuários.' });
        }
    }
}

module.exports = new UsuarioController();
