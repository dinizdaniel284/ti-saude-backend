const Quiz = require('../models/Quiz');

const criarOuAtualizarQuiz = async () => {
  const tituloQuiz = 'Quiz de Áreas de TI';

  const novasPerguntas = [
    { question: "Qual atividade mais te atrai?", options: ["Criar APIs", "Analisar Dados", "Cibersegurança", "UX Design"] },
    { question: "O que prefere resolver?", options: ["Integrar Sistemas", "Gerar Relatórios", "Privacidade/LGPD", "Interfaces Médicas"] },
    { question: "O que estudaria hoje?", options: ["Node.js ou Java", "Python/Dados", "Criptografia", "React/Design"] },
    { question: "Lidando com muitos dados:", options: ["Processamento", "Padrões Ocultos", "Auditoria", "Clareza Visual"] },
    { question: "Se o sistema cair, você:", options: ["Olha o Código", "Analisa a Falha", "Checa Invasão", "Apoia o Usuário"] },
    { question: "Foco principal do software:", options: ["Performance", "Precisão", "Segurança", "Usabilidade"] },
    { question: "Sua área favorita:", options: ["Lógica", "Estatística", "Ética Digital", "Psicologia"] },
    { question: "Ferramenta para o SUS:", options: ["Agendamento", "Previsão Surtos", "Identidade", "Portal Cidadão"] },
    { question: "Seu superpoder:", options: ["Resolver Bugs", "Ler Números", "Cautela", "Empatia"] },
    { question: "Ambiente ideal:", options: ["Backstage", "Insights", "Perímetro", "Laboratório UX"] }
  ];

  try {
    await Quiz.deleteMany({});
    const novoQuiz = new Quiz({ titulo: tituloQuiz, perguntas: novasPerguntas });
    await novoQuiz.save();
    console.log('✅ Banco de dados sincronizado com o Model!');
  } catch (err) {
    console.error("Erro ao popular banco:", err);
  }
};

const obterQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ titulo: 'Quiz de Áreas de TI' });
    if (!quiz) return res.status(404).json({ erro: 'Quiz não encontrado' });
    res.json({ perguntas: quiz.perguntas });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

const responderQuiz = async (req, res) => {
  const { respostas } = req.body;
  if (!respostas) return res.status(400).json({ erro: 'Sem respostas' });
  res.json({ resultado: "OK" });
};

module.exports = { criarOuAtualizarQuiz, obterQuiz, responderQuiz };