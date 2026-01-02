const express = require('express');
const router = express.Router();
const { criarOuAtualizarQuiz, obterQuiz, responderQuiz } = require('../controllers/quizController');

// Popular quiz (será executado quando a função serverless "acordar")
criarOuAtualizarQuiz().catch(err => console.error("Erro ao popular quiz:", err));

// Remova o '/quiz' e deixe apenas '/'
// Agora o acesso será via: https://.../quiz
router.get('/', obterQuiz);

// Remova o '/quiz' e deixe apenas '/responder'
// Agora o acesso será via: https://.../quiz/responder
router.post('/responder', responderQuiz);

module.exports = router;