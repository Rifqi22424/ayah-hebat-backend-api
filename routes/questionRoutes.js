const express = require('express');
const router = express.Router();
const { createQuestion, answerQuestion, getAllQuestion, getAllQuestionWithAnswer } = require('../controllers/questionController');
const { authorizeAdmin } = require('../middlewares/authorizationMiddleware');

router.post('/', createQuestion);
router.put('/answer/:id', authorizeAdmin, answerQuestion);
router.get('/', getAllQuestion);
router.get('/answer', getAllQuestionWithAnswer);

module.exports = router;