const mongoose = require('mongoose');

// Definir o schema para o quiz
const quizSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'O título do quiz é obrigatório'],
      trim: true
    },
    perguntas: [
      {
        enunciado: {
          type: String,
          required: [true, 'O enunciado da pergunta é obrigatório'],
          trim: true
        },
        opcoes: [
          {
            texto: {
              type: String,
              required: [true, 'O texto da opção é obrigatório']
            },
            categoria: {
              type: String,
              required: [true, 'A categoria é obrigatória']
            }
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

const Quiz = mongoose.model('Quiz', quizSchema, 'quizzes');
module.exports = Quiz;

// Função para criar ou atualizar quiz sem duplicar perguntas
const criarOuAtualizarQuiz = async () => {
  try {
    let quizExistente = await Quiz.findOne({ titulo: 'Quiz de Áreas de TI' });

    const novasPerguntas = [
      {
        enunciado: 'Qual é o seu interesse principal na área de TI?',
        opcoes: [
          { texto: 'Desenvolvimento de Software', categoria: 'Desenvolvimento' },
          { texto: 'Infraestrutura e Redes', categoria: 'Infraestrutura' },
          { texto: 'Segurança da Informação', categoria: 'Segurança' },
          { texto: 'Ciência de Dados e IA', categoria: 'Dados' }
        ]
      },
      {
        enunciado: 'Você prefere trabalhar mais com...',
        opcoes: [
          { texto: 'Lógica e algoritmos', categoria: 'Desenvolvimento' },
          { texto: 'Configuração de servidores e redes', categoria: 'Infraestrutura' },
          { texto: 'Análise de riscos e proteção de sistemas', categoria: 'Segurança' },
          { texto: 'Manipulação de grandes volumes de dados', categoria: 'Dados' }
        ]
      },
      {
        enunciado: 'Você gosta mais de...',
        opcoes: [
          { texto: 'Criar aplicativos e sites', categoria: 'Desenvolvimento' },
          { texto: 'Monitorar servidores e redes', categoria: 'Infraestrutura' },
          { texto: 'Testar e fortalecer a segurança digital', categoria: 'Segurança' },
          { texto: 'Analisar padrões e criar previsões', categoria: 'Dados' }
        ]
      },
      {
        enunciado: 'Qual é o seu nível de interesse por programação?',
        opcoes: [
          { texto: 'Alta', categoria: 'Desenvolvimento' },
          { texto: 'Médio', categoria: 'Infraestrutura' },
          { texto: 'Baixa', categoria: 'Segurança' }
        ]
      },
      {
        enunciado: 'Você tem interesse em trabalhar com dados e análise de informações?',
        opcoes: [
          { texto: 'Sim, adoraria!', categoria: 'Dados' },
          { texto: 'Talvez, depende do projeto', categoria: 'Dados' },
          { texto: 'Não, prefiro outras áreas', categoria: 'Infraestrutura' }
        ]
      },
      {
        enunciado: 'Qual dessas tecnologias você tem mais interesse em aprender?',
        opcoes: [
          { texto: 'Machine Learning', categoria: 'Dados' },
          { texto: 'Redes de Computadores', categoria: 'Infraestrutura' },
          { texto: 'Cibersegurança', categoria: 'Segurança' },
          { texto: 'Desenvolvimento Web', categoria: 'Desenvolvimento' }
        ]
      }
    ];

    if (!quizExistente) {
      const quizNovo = new Quiz({
        titulo: 'Quiz de Áreas de TI',
        perguntas: novasPerguntas
      });
      await quizNovo.save();
      console.log('✅ Quiz inicial criado com sucesso!');
    } else {
      // Filtrar perguntas já existentes para evitar duplicatas
      const perguntasExistentes = quizExistente.perguntas.map(p => p.enunciado);
      const novasSemDuplicatas = novasPerguntas.filter(
        pergunta => !perguntasExistentes.includes(pergunta.enunciado)
      );

      if (novasSemDuplicatas.length > 0) {
        quizExistente.perguntas.push(...novasSemDuplicatas);
        await quizExistente.save();
        console.log('✅ Quiz atualizado com novas perguntas!');
      } else {
        console.log('📌 Nenhuma nova pergunta para adicionar.');
      }
    }
  } catch (err) {
    console.error('❌ Erro ao salvar ou atualizar quiz:', err);
  }
};

// Executar a função
criarOuAtualizarQuiz();