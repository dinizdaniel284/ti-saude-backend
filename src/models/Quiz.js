const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  perguntas: [
    {
      question: String,
      options: [String] // Isso permite salvar a lista de textos direto
    }
  ]
});

// O 'quizzes' no final garante que ele use a coleção correta
module.exports = mongoose.model('Quiz', quizSchema, 'quizzes');