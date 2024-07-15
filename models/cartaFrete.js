
const mongoose = require("mongoose")

const CartaFrete = mongoose.Schema({
    motorista : {
        required: true,
        maxLength: 200,
        type: String
    },
    inicioJornada: {
        type: String,
        required: true,
        maxlength: 10
    },
    fazenda: {
        required: true,
        maxLength: 200,
        type: String
    },
    jornadaAcumulada: {
        type: String,
        required: true,
        maxLength: 5
    },
    fimJornada: {
        type: String,
        required: true,
        maxLength: 10
    },
    placa:{
        type: String,
        required: true,
        maxLength: 10
    },
    kmInicio: {
        type: Number,
        required: true,
        min: 0,
        maxLength: 100
    },
    kmFim: {
        type: Number,
        required: true,
        min: 0,
        maxLength: 100
    },
    abastecimento: {
        type: Number, 
        required: true,
        maxLength: 100
    }
}, {timestamps: true})

module.exports = mongoose.model('Registro', CartaFrete)