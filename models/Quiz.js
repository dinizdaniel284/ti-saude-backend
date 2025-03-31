const mongoose = require('mongoose');

// Definir o schema para as perguntas do quiz
const quizSchema = new mongoose.Schema({
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
          // Adicionar mais campos conforme necessário, como uma pontuação ou uma descrição
          valor: {
            type: Number,
            default: 0
          }
        }
      ]
    }
  ]
}, { timestamps: true });

// Criar e exportar o modelo Quiz
const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

// Criar um quiz inicial com mais perguntas
const criarQuizInicial = async () => {
  const quizExistente = await Quiz.findOne({ titulo: 'Quiz de Áreas de TI' });
  if (!quizExistente) {
    const quizExemplo = new Quiz({
      titulo: 'Quiz de Áreas de TI',
      perguntas: [
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
        }
      ]
    });

    try {
      await quizExemplo.save();
      console.log('Quiz inicial salvo com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar quiz:', err);
    }
  } else {
    console.log('O quiz já existe no banco de dados.');
  }
};

// Chama a função para criar o quiz inicial
criarQuizInicial();