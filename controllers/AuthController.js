const Usuario = require('../models/usuario')

class AuthController {
    async store (req, res){
        const {email, senha } = req.body;

        const usuarioEncontrado = await Usuario.findOne({email});
        
        if(!usuarioEncontrado || !await usuarioEncontrado.compareHashSenha(senha)) {
            return res.status(400).json({error: "E-mail/ senha inválidos"})
        }
        return res.json({token : Usuario.gerarToken(usuarioEncontrado)})
    }
}

module.exports = new AuthController();