const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  perguntas: [
    {
      question: String,
      options: [String]
    }
  ]
});

// Forçamos o nome da coleção como 'quizzes'
module.exports = mongoose.model('Quiz', quizSchema, 'quizzes');