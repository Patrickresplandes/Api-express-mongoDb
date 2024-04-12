const mongoose = require("mongoose")

const ComentarioSchema = new mongoose.Schema({
    texto: { 
        type: String,
        required: true,
        maxLength: 500
     },
     likes :{
        type: Number,
        require: true
     },
     autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required:  true
     },
     post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
     }
}, {timestamps: true});

module.exports = mongoose.model('Comentario', ComentarioSchema);
