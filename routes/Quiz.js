const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- Schema ---
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

const Quiz = mongoose.model('Quiz', quizSchema, 'quizzes');

// --- Função para popular o banco com perguntas ---
const criarOuAtualizarQuiz = async () => {
  const tituloQuiz = 'Quiz de Áreas de TI';

  const novasPerguntas = [
    {
      enunciado: 'Qual destas áreas da TI mais te desperta curiosidade?',
      opcoes: [
        { texto: 'Desenvolvimento de Software', categoria: 'Desenvolvimento', valor: 1 },
        { texto: 'Infraestrutura de Redes', categoria: 'Infraestrutura', valor: 1 },
        { texto: 'Análise de Dados', categoria: 'Dados', valor: 1 },
        { texto: 'Cibersegurança', categoria: 'Segurança', valor: 1 }
      ]
    },
    {
      enunciado: 'Você se imagina trabalhando com interpretação e visualização de dados?',
      opcoes: [
        { texto: 'Sim, adoro isso!', categoria: 'Dados', valor: 1 },
        { texto: 'Não muito, prefiro outra área', categoria: 'Outra', valor: 1 }
      ]
    },
    {
      enunciado: 'Se pudesse escolher agora, onde preferiria atuar?',
      opcoes: [
        { texto: 'Frontend (interface do usuário)', categoria: 'Desenvolvimento', valor: 1 },
        { texto: 'Backend (lógica por trás)', categoria: 'Desenvolvimento', valor: 1 },
        { texto: 'Fullstack (ambos)', categoria: 'Desenvolvimento', valor: 1 }
      ]
    },
    {
      enunciado: 'Machine Learning parece interessante para você?',
      opcoes: [
        { texto: 'Com certeza!', categoria: 'Dados', valor: 1 },
        { texto: 'Acho confuso', categoria: 'Outra', valor: 1 },
        { texto: 'Tenho curiosidade, mas não conheço muito', categoria: 'Dados', valor: 1 }
      ]
    },
    {
      enunciado: 'Você gostaria de trabalhar com bancos de dados e grandes volumes de informação?',
      opcoes: [
        { texto: 'Sim, gosto dessa área', categoria: 'Dados', valor: 1 },
        { texto: 'Não, prefiro outras áreas', categoria: 'Outra', valor: 1 },
        { texto: 'Talvez, dependendo do projeto', categoria: 'Dados', valor: 1 }
      ]
    },
    {
      enunciado: 'Segurança digital te parece um campo importante e empolgante?',
      opcoes: [
        { texto: 'Sim, totalmente!', categoria: 'Segurança', valor: 1 },
        { texto: 'Não é o que me atrai', categoria: 'Outra', valor: 1 },
        { texto: 'Talvez, tenho interesse crescente', categoria: 'Segurança', valor: 1 }
      ]
    },
    {
      enunciado: 'Você prefere resolver problemas lógicos ou lidar com pessoas e processos?',
      opcoes: [
        { texto: 'Problemas lógicos', categoria: 'Desenvolvimento', valor: 1 },
        { texto: 'Pessoas e processos', categoria: 'Infraestrutura', valor: 1 },
        { texto: 'Um pouco dos dois', categoria: 'Outra', valor: 1 }
      ]
    },
    {
      enunciado: 'Como você se sente aprendendo novas linguagens de programação?',
      opcoes: [
        { texto: 'Motivado, gosto de aprender', categoria: 'Desenvolvimento', valor: 1 },
        { texto: 'Um pouco perdido, mas animado', categoria: 'Outra', valor: 1 },
        { texto: 'Não gosto muito', categoria: 'Outra', valor: 1 }
      ]
    },
    {
      enunciado: 'Você se vê criando soluções para facilitar o dia a dia de profissionais da saúde?',
      opcoes: [
        { texto: 'Sim! Quero fazer a diferença', categoria: 'Dados', valor: 1 },
        { texto: 'Talvez, dependendo da área', categoria: 'Outra', valor: 1 },
        { texto: 'Prefiro trabalhar nos bastidores', categoria: 'Infraestrutura', valor: 1 }
      ]
    },
    {
      enunciado: 'Prefere projetos com resultados visuais ou que otimizem o funcionamento interno de sistemas?',
      opcoes: [
        { texto: 'Visuais', categoria: 'Desenvolvimento', valor: 1 },
        { texto: 'Funcionamento interno', categoria: 'Desenvolvimento', valor: 1 },
        { texto: 'Ambos são legais', categoria: 'Desenvolvimento', valor: 1 }
      ]
    }
  ];

  await Quiz.deleteMany({});
  const novoQuiz = new Quiz({ titulo: tituloQuiz, perguntas: novasPerguntas });
  await novoQuiz.save();
  console.log('✅ Quiz atualizado com perguntas melhoradas!');
};

criarOuAtualizarQuiz();

// --- GET /quiz ---
router.get('/quiz', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ titulo: 'Quiz de Áreas de TI' });
    if (!quiz) return res.status(404).json({ erro: 'Quiz não encontrado' });
    res.json({ perguntas: quiz.perguntas });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// --- POST /quiz/responder ---
router.post('/quiz/responder', async (req, res) => {
  const respostas = req.body.respostas; // Ex: [{ categoria: 'Desenvolvimento' }, { categoria: 'Dados' }, ...]

  if (!respostas || !Array.isArray(respostas)) {
    return res.status(400).json({ erro: 'Respostas inválidas' });
  }

  const pontuacao = {};

  respostas.forEach((resp) => {
    if (resp.categoria) {
      pontuacao[resp.categoria] = (pontuacao[resp.categoria] || 0) + 1;
    }
  });

  const resultadoFinal = Object.entries(pontuacao).sort((a, b) => b[1] - a[1])[0];
  const categoriaMaisForte = resultadoFinal ? resultadoFinal[0] : null;

  res.json({ resultado: categoriaMaisForte });
});

module.exports = router;