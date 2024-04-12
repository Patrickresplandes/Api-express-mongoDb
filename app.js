require('./config/mongoose');
const express = require('express');
const validator = require('express-joi-validation').createValidator({passError: true})
const PostRoutes = require('./routes/postRoutes')
const ComentarioRoutes = require('./routes/comentarioRoutes')
const UsuarioController = require('./controllers/usuarioController')
const UsuarioValidator = require('./validators/usuarioValidator')
const AuthController = require("./controllers/AuthController")
const AuthValidator = require('./validators/AuthValidator')
const authMiddleware = require("./middlewares/authMiddleware")


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.post('/auth', validator.body(AuthValidator),AuthController.store)
app.post('/usuarios', validator.body(UsuarioValidator),UsuarioController.store )
app.get('/usuarios', UsuarioController.index)

app.use(authMiddleware)

app.use('/posts', PostRoutes)
app.use('/comentarios', ComentarioRoutes)
app.use((err, req, res, next) => {
    if(err && err.error && err.error.isJoi){
        res.status(400).json({
            tipo: err.type,
            mensagem: err.error.toString(),
        })
    } else {
        next(err);
    }
})
app.listen('3000');
