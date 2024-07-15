require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.DB_CONNECTION;

if (!uri) {
    throw new Error('A string de conexão do MongoDB não está definida. Verifique o arquivo .env.');
}

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,          
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

module.exports = mongoose;
