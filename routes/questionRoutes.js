const express = require('express');
const router = express.Router();
const { createQuestion, answerQuestion, getAllQuestion, getAllQuestionWithAnswer } = require('../controllers/questionController');
const { authorizeAdmin } = require('../middlewares/authorizationMiddleware');

router.post('/', /* #swagger.tags = ['Question Controller'] */ createQuestion);
router.put('/answer/:id', /* #swagger.tags = ['Question Controller'] */ authorizeAdmin, answerQuestion);
router.get('/', /* #swagger.tags = ['Question Controller'] */ getAllQuestion);
router.get('/answer', /* #swagger.tags = ['Question Controller'] */ getAllQuestionWithAnswer);

module.exports = router;
