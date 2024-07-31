const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MotoristaSchema = new mongoose.Schema({
  cpf: {
    type: String,
    required: true,
    unique: true,
    length: 11,
    validate: {
      validator: function(v) {
        return /^[0-9]{11}$/.test(v);
      },
      message: props => `${props.value} is not a valid CPF number!`
    }
  },
  nome: {
    type: String,
    required: true,
    maxlength: 120
  },
  dataNascimento: {
    type: Date,
    required: true
  },
  dataAdmissao: {
    type: Date,
    required: true
  }
}, { timestamps: true });

MotoristaSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Motorista', MotoristaSchema);
