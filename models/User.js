const mongoose = require('mongoose');

// Definir o schema para o usuário
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true,
    minlength: [2, 'O nome deve ter pelo menos 2 caracteres']
  },
  idade: {
    type: Number,
    required: [true, 'A idade é obrigatória'],
    min: [16, 'A idade mínima é 16 anos'],
    max: [120, 'A idade máxima é 120 anos'],
    validate: {
      validator: Number.isInteger,
      message: 'A idade deve ser um número inteiro'
    }
  },
  profissao: {
    type: String,
    required: [true, 'A profissão é obrigatória'],
    trim: true
  },
  interesse: {
    type: String,
    required: [true, 'O interesse é obrigatório'],
    trim: true
  }
}, { timestamps: true });

// Criar e exportar o modelo
const User = mongoose.model('User', userSchema);
module.exports = User;
