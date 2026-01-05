const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  titulo: String,
  perguntas: [
    {
      question: String, // Mudamos de enunciado para question
      options: [String] // Mudamos de opcoes (objeto) para um array de Strings simples
    }
  ]
});

module.exports = mongoose.model('Quiz', quizSchema, 'quizzes');