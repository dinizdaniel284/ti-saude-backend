const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  perguntas: [
    {
      question: String,
      options: [String] // Array simples de textos
    }
  ]
});

// O terceiro parâmetro 'quizzes' garante que ele use a coleção correta no MongoDB
module.exports = mongoose.model('Quiz', quizSchema, 'quizzes');