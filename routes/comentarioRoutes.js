const routes = require("express").Router();
const ComentarioController = require('../controllers/comentarioController')
const validator = require('express-joi-validation').createValidator({passError: true});
const ComentarioValidators = require('../validators/comentarioValidator')

routes.post('/post/:postId',validator.body(ComentarioValidators) ,ComentarioController.store);
routes.patch('/like/:comentarioId', ComentarioController.like)


module.exports = routes;
