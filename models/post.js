const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")


const PostSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        maxlength: 120
    },
    texto: {
        type: String,
        required: true,
        maxlength: 500
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    comentarios : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comentario",
        required: true
     }]
},{timestamps: true})

PostSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Post', PostSchema)