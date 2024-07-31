const Joi = require('@hapi/joi');

const MotoristaValidator = Joi.object({
  cpf: Joi.string()
    .length(11)
    .pattern(/^[0-9]{11}$/)
    .required()
    .messages({
      'string.length': 'CPF deve ter exatamente 11 caracteres.',
      'string.pattern.base': 'CPF deve conter apenas números.',
      'any.required': 'CPF é obrigatório.'
    }),
  nome: Joi.string()
    .max(120)
    .required()
    .messages({
      'string.max': 'Nome deve ter no máximo 120 caracteres.',
      'any.required': 'Nome é obrigatório.'
    }),
  dataNascimento: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'Data de Nascimento deve ser uma data válida.',
      'any.required': 'Data de Nascimento é obrigatória.'
    }),
  dataAdmissao: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'Data de Admissão deve ser uma data válida.',
      'any.required': 'Data de Admissão é obrigatória.'
    })
});

module.exports = MotoristaValidator;
