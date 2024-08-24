const Joi = require('@hapi/joi');

const ManutencaoValidator = Joi.object({
  placa: Joi.string()
    .length(7)
    .pattern(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/)
    .required()
    .messages({
      'string.length': 'Placa deve ter exatamente 7 caracteres.',
      'string.pattern.base': 'Placa deve seguir o formato padrão de placas brasileiras (ex: ABC1D23).',
      'any.required': 'Placa é obrigatória.'
    }),
  dataEntrada: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'Data de Entrada deve ser uma data válida.',
      'any.required': 'Data de Entrada é obrigatória.'
    }),
  dataSaida: Joi.date()
    .iso()
    .allow('')
    .messages({
      'date.base': 'Data de Saída deve ser uma data válida.'
    }),
  observacao: Joi.string()
    .max(500)
    .allow('')
    .messages({
      'string.max': 'Observação deve ter no máximo 500 caracteres.'
    }),
  valor: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'Valor deve ser um número.',
      'number.positive': 'Valor deve ser um número positivo.',
      'any.required': 'Valor é obrigatório.'
    })
});

module.exports = ManutencaoValidator;
