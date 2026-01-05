const Quiz = require('../models/Quiz');

// Popular ou atualizar quiz
const criarOuAtualizarQuiz = async () => {
  const tituloQuiz = 'Quiz de Áreas de TI';

  // Inserindo as 10 perguntas direto no código do Backend
  const novasPerguntas = [
    { "question": "Qual dessas atividades mais te atrai?", "options": ["Estruturar APIs", "Analisar Dados", "Cibersegurança", "UX Design"] },
    { "question": "O que prefere resolver no hospital?", "options": ["Integração de Sistemas", "Gargalos via BI", "Privacidade/LGPD", "Interfaces Médicas"] },
    { "question": "O que você estudaria hoje?", "options": ["Node.js ou Java", "Python/Data Science", "Criptografia", "React/Design"] },
    { "question": "Lidando com grandes volumes de dados:", "options": ["Processamento eficiente", "Padrões ocultos", "Auditoria de acesso", "Clareza visual"] },
    { "question": "Se o sistema cair, onde você atua?", "options": ["Código e Banco", "Histórico de falhas", "Investigação de invasão", "Plano de UX"] },
    { "question": "Mais importante no software médico:", "options": ["Performance bruta", "Precisão estatística", "Segurança total", "Facilidade de uso"] },
    { "question": "Área da ciência favorita:", "options": ["Lógica", "Estatística", "Ética Digital", "Psicologia"] },
    { "question": "Ferramenta para o SUS:", "options": ["Motor de agendamento", "Previsão de surtos", "Identidade segura", "Portal amigável"] },
    { "question": "Seu superpoder no trabalho:", "options": ["Resolver bugs", "Ler números", "Cautela extrema", "Entender o usuário"] },
    { "question": "Ambiente ideal:", "options": ["Backstage/Infra", "Relatórios e Insights", "Proteção de perímetro", "Testes com usuários"] }
  ];

  try {
    await Quiz.deleteMany({});
    const novoQuiz = new Quiz({ titulo: tituloQuiz, perguntas: novasPerguntas });
    await novoQuiz.save();
    console.log('✅ Quiz atualizado com 10 perguntas no Banco!');
  } catch (err) {
    console.error("Erro ao resetar quiz:", err);
  }
};

// GET /quiz
const obterQuiz = async (req, res) => {
  try {
    // Busca pelo título exato definido acima
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