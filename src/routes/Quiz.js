const express = require('express');
const router = express.Router();
const { criarOuAtualizarQuiz, obterQuiz, responderQuiz } = require('../controllers/quizController');

// Popular quiz apenas no backend (não expor em produção)
criarOuAtualizarQuiz();

router.get('/quiz', obterQuiz);
router.post('/quiz/responder', responderQuiz);

module.exports = router;
