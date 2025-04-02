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
            },
            valor: {
              type: Number,
              default: 0,
              required: false // Deixar como opcional
            }
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

// Criar e exportar o modelo Quiz
const Quiz = mongoose.model('Quiz', quizSchema, 'quizzes');  // Associado à coleção 'quizzes'
module.exports = Quiz;

// Criar ou atualizar o quiz inicial com mais perguntas
const criarOuAtualizarQuiz = async () => {
  try {
    // Buscar o quiz existente pelo título
    let quizExistente = await Quiz.findOne({ titulo: 'Quiz de Áreas de TI' });

    // Novas perguntas para adicionar ao quiz
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
          { texto: 'Médio', categoria: 'Desenvolvimento' },
          { texto: 'Baixa', categoria: 'Desenvolvimento' }
        ]
      },
      {
        enunciado: 'Você tem interesse em trabalhar com dados e análise de informações?',
        opcoes: [
          { texto: 'Sim, adoraria!', categoria: 'Dados' },
          { texto: 'Talvez, depende do projeto', categoria: 'Dados' },
          { texto: 'Não, prefiro outras áreas', categoria: 'Dados' }
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

    // Verifica se o quiz já existe, caso contrário, cria um novo
    if (quizExistente) {
      // Verifica se o quiz já contém todas as perguntas e evita duplicação
      quizExistente.perguntas = [...quizExistente.perguntas, ...novasPerguntas];
      await quizExistente.save();
      console.log('✅ Quiz atualizado com sucesso!');
    } else {
      // Criar o quiz inicial se não existir
      const quizExemplo = new Quiz({
        titulo: 'Quiz de Áreas de TI',
        perguntas: novasPerguntas
      });
      await quizExemplo.save();
      console.log('✅ Quiz inicial salvo com sucesso!');
    }
  } catch (err) {
    console.error('❌ Erro ao salvar ou atualizar quiz:', err);
  }
};

// Chama a função para criar ou atualizar o quiz
criarOuAtualizarQuiz(); // cria ou atualiza o quiz