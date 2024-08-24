require('./config/mongoose');
const express = require('express');
const cors = require('cors');
const validator = require('express-joi-validation').createValidator({ passError: true });

const PostRoutes = require('./routes/postRoutes');
const ComentarioRoutes = require('./routes/comentarioRoutes');
const UsuarioController = require('./controllers/usuarioController');
const UsuarioValidator = require('./validators/usuarioValidator');
const AuthController = require('./controllers/AuthController');
const AuthValidator = require('./validators/AuthValidator');
const authMiddleware = require('./middlewares/authMiddleware');
const FreteController = require('./controllers/freteController');
const FreteValidator = require('./validators/FreteValidator');
const userController = require('./controllers/userController');
const MotoristaController = require('./controllers/MotoristaController'); 
const MotoristaValidator = require('./validators/MotoristaValidator');
const ManutencaoRoutes = require('./routes/manutencaoRoutes');

const app = express();
app.use(express.json());

// Configuração do CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'https://caminhao.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    console.log('Requisição recebida:', req.method, req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Rota de teste
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Rotas para motorista
app.post('/motoristas', validator.body(MotoristaValidator), MotoristaController.create);
app.get('/motoristas', MotoristaController.list);
app.get('/motoristas/:id', MotoristaController.getById);
app.put('/motoristas/:id', validator.body(MotoristaValidator), MotoristaController.update);
app.delete('/motoristas/:id', MotoristaController.delete);

//Rotas para Manutenção
app.use('/manutencao', ManutencaoRoutes);

// Rota para autenticação
app.post('/auth', validator.body(AuthValidator), AuthController.store);
app.get('/auth', authMiddleware, userController.show);

// Rota para usuários
app.post('/usuarios', validator.body(UsuarioValidator), UsuarioController.store);

// Middleware de autenticação
app.use(authMiddleware);

// Rotas para fretes
app.post('/frete', validator.body(FreteValidator), FreteController.store);
app.get('/frete', FreteController.index);

// Rotas para posts e comentários
app.use('/posts', PostRoutes);
app.use('/comentarios', ComentarioRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            tipo: err.type,
            mensagem: err.error.toString(),
        });
    } else {
        next(err);
    }
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
