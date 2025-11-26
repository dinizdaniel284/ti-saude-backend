const Quiz = require('../models/Quiz');

// Popular ou atualizar quiz
const criarOuAtualizarQuiz = async () => {
  const tituloQuiz = 'Quiz de Áreas de TI';

  const novasPerguntas = [
    /* suas 10 perguntas já definidas */
  ];

  await Quiz.deleteMany({});
  const novoQuiz = new Quiz({ titulo: tituloQuiz, perguntas: novasPerguntas });
  await novoQuiz.save();
  console.log('✅ Quiz atualizado com perguntas melhoradas!');
};

// GET /quiz
const obterQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ titulo: 'Quiz de Áreas de TI' });
    if (!quiz) return res.status(404).json({ erro: 'Quiz não encontrado' });
    res.json({ perguntas: quiz.perguntas });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// POST /quiz/responder
const responderQuiz = async (req, res) => {
  const respostas = req.body.respostas;

  if (!respostas || !Array.isArray(respostas)) {
    return res.status(400).json({ erro: 'Respostas inválidas' });
  }

  const pontuacao = {};
  respostas.forEach((resp) => {
    if (resp.categoria) pontuacao[resp.categoria] = (pontuacao[resp.categoria] || 0) + 1;
  });

  const resultadoFinal = Object.entries(pontuacao).sort((a, b) => b[1] - a[1])[0];
  const categoriaMaisForte = resultadoFinal ? resultadoFinal[0] : null;

  res.json({ resultado: categoriaMaisForte });
};

module.exports = { criarOuAtualizarQuiz, obterQuiz, responderQuiz };
