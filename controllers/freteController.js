const CartaFrete = require("../models/cartaFrete")

class FreteController {
    async store (req, res) {
        const freteCadastrado = await CartaFrete.create(req.body);
        return res.status(201).json(freteCadastrado);
    }

    async index(req,res) {
        const fretes = await CartaFrete.find();
        return res.status(200).json(fretes);
    }
}

module.exports = new FreteController()