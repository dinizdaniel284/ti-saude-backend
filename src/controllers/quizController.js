const Quiz = require('../models/Quiz');

const criarOuAtualizarQuiz = async () => {
  try {
    const tituloQuiz = 'Quiz de Áreas de TI';

    // 1. Limpa o banco para remover as perguntas vazias
    await Quiz.deleteMany({});

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

    // 2. Salva as novas perguntas com o formato correto
    const novoQuiz = new Quiz({ titulo: tituloQuiz, perguntas: novasPerguntas });
    await novoQuiz.save();
    console.log('✅ Banco de dados resetado e atualizado com sucesso!');
  } catch (err) {
    console.error("Erro ao resetar banco:", err);
  }
};

// Mantenha as funções obterQuiz e responderQuiz abaixo...