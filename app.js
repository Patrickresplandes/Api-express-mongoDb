require('./config/mongoose');
const cors = require('cors');
const express = require('express');
const validator = require('express-joi-validation').createValidator({passError: true})
const PostRoutes = require('./routes/postRoutes')
const ComentarioRoutes = require('./routes/comentarioRoutes')
const UsuarioController = require('./controllers/usuarioController')
const UsuarioValidator = require('./validators/usuarioValidator')
const AuthController = require("./controllers/AuthController")
const AuthValidator = require('./validators/AuthValidator')
const authMiddleware = require("./middlewares/authMiddleware")
const FreteController = require("./controllers/freteController")
const FreteValidator = require("./validators/freteValidator")



const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.use(function(req, res, next) {
    console.log("Requisição recebida:", req.method, req.url);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
   
});

app.options('/auth', (req, res) => {
    console.log("Solicitação OPTIONS recebida para /auth");
    res.sendStatus(200); // ou qualquer outro código de resposta adequado
});



app.post('/auth', validator.body(AuthValidator),AuthController.store, (req, res) => {
    console.log(`Response sent: ${res.statusCode} ${res.statusMessage}`);
});
app.post('/usuarios', validator.body(UsuarioValidator),UsuarioController.store )

app.use(authMiddleware)
app.post('/frete',validator.body(FreteValidator), FreteController.store )
app.get('/frete', FreteController.index )
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
app.listen('3001');
