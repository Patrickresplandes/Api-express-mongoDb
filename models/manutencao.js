const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ManutencaoSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: true,
    maxlength: 7,
    validate: {
      validator: function(v) {
        return /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(v);  // Validação básica de placa brasileira
      },
      message: props => `${props.value} não é uma placa válida!`
    }
  },
  dataEntrada: {
    type: Date,
    required: true
  },
  dataSaida: {
    type: Date
  },
  observacao: {
    type: String,
    maxlength: 500
  },
  valor: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

ManutencaoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Manutencao', ManutencaoSchema);
