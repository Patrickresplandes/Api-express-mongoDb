const models = require("../models");

class ComentarioController {
    async store (req,res) {
        const comentarioCadastrado = await models.comentario.create({
            ...req.body,
            likes: 0,
            autor: req.UsuarioId,
            post: req.params.postId
        })
        const post = await models.post.findById(req.params.postId);
        post.comentarios.push(comentarioCadastrado.id);
        await post.save();
        return res.sendStatus(201);
    }

    async like (req,res){

        await models.comentario.findByIdAndUpdate(req.params.comentarioId, {
            $inc : {likes: 1}
        })
        return res.sendStatus(200)
    }
}

module.exports= new ComentarioController();
