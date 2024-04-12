const Usuario = require('../models/usuario');

class UsuarioController {
    async store (req, res){
        const {email} = req.body;

        if(await Usuario.findOne( { email } )){
            return res.status(400).json({ error: 'Usuário já existe' });
        }
        
        const usuariosCadastrado = await Usuario.create(req.body);

        return res.status(201).json(usuariosCadastrado);
    }

    async index(req,res) {
        const usuarios = await Usuario.find();
        return res.status(200).json(usuarios);
    }
}

module.exports = new UsuarioController()