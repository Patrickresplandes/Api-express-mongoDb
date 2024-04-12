const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const authConfig = require("../config/authConfig")

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
        maxlength: 200
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 250,
        lowercase: true
    },
    senha: {
        type:String,
        require: true 
    }
}, {timestamps: true});

UsuarioSchema.pre('save', async function (next){
    if(!this.isModified('senha')){
        return next();
    }
    this.senha = await bcrypt.hash(this.senha, 8);
    next()
})

UsuarioSchema.methods = {
    compareHashSenha (senha){
        return bcrypt.compare(senha, this.senha)
    }
}

UsuarioSchema.statics = {
    gerarToken ({id}){
        return jwt.sign({id}, authConfig.secret, {
            expiresIn: authConfig.ttl
        })
    }
}

module.exports = mongoose.model('Usuario', UsuarioSchema)