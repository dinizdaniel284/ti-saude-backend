const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz'); // Agora com "Quiz" maiúsculo
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
const mongoURI = "mongodb+srv://diniz-daniel:89272514@cluster0.enuctcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// 🚀 Criar a Rota do Quiz
app.get('/quiz', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ titulo: 'Quiz de Áreas de TI' });
    if (!quiz) {
      // Caso o quiz não exista, cria um novo
      const novoQuiz = new Quiz({
        titulo: 'Quiz de Áreas de TI',
        perguntas: [
          // Adicione as perguntas aqui, conforme sua estrutura
        ],
      });

      await novoQuiz.save();
      console.log('Quiz inicial salvo com sucesso!');
      return res.json(novoQuiz);
    }

    res.json(quiz);
  } catch (error) {
    console.error('Erro ao buscar quiz:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 🚀 Rota para deletar quiz (se necessário)
app.delete('/quiz', async (req, res) => {
  try {
    const resultado = await Quiz.deleteOne({ titulo: 'Quiz de Áreas de TI' });
    if (resultado.deletedCount > 0) {
      console.log('Quiz deletado com sucesso!');
      res.status(200).json({ message: 'Quiz deletado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Nenhum quiz encontrado para deletar.' });
    }
  } catch (err) {
    console.error('Erro ao deletar quiz:', err);
    res.status(500).json({ error: 'Erro ao deletar quiz' });
  }
});

// Definir a porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});