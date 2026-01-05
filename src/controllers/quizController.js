const Quiz = require('../models/Quiz');

const criarOuAtualizarQuiz = async () => {
  try {
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

    await Quiz.deleteMany({});
    await Quiz.create({ titulo: tituloQuiz, perguntas: novasPerguntas });
    console.log('✅ Banco de dados Resetado!');
  } catch (err) {
    console.error("Erro ao resetar:", err);
  }
};

const obterQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ titulo: 'Quiz de Áreas de TI' });
    if (!quiz) return res.status(404).json({ erro: 'Quiz não encontrado' });
    return res.status(200).json(quiz.perguntas); // Retorna direto o array
  } catch (err) {
    return res.status(500).json({ erro: 'Erro no Servidor' });
  }
};

const responderQuiz = async (req, res) => {
  res.status(200).json({ status: "ok" });
};

module.exports = { criarOuAtualizarQuiz, obterQuiz, responderQuiz };