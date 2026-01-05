const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  perguntas: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }]
    }
  ]
});

// Usamos 'quizzes' como o nome da coleção no MongoDB
module.exports = mongoose.model('Quiz', quizSchema, 'quizzes');