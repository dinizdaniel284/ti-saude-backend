const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  titulo: String,
  perguntas: [
    {
      enunciado: String,
      opcoes: [
        {
          texto: String,
          categoria: String,
          valor: Number
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Quiz', quizSchema, 'quizzes');
