const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createQuestion = async (req, res) => {
    try {
      const { question } = req.body;

      const quest = await prisma.question.create({
        data: {
            question,
        }
      });
  
      res.json({ message: 'Question added successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const answerQuestion = async (req, res) => {
    try {
    
      const questionId = parseInt(req.params.id);
      const { answer } = req.body;
  
  
      const existingQuestion = await prisma.question.findUnique({
        where: { id: questionId },
      });
  
      if (!existingQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      const updatedQuestion = await prisma.question.update({
        where: { id: questionId },
        data: {
            answer,
            isAnswer: true,
        },
      });
  
      res.json({ message: 'Answer updated successfully.', updatedQuestion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getAllQuestion = async (req, res) => {
    try {
      const userId = req.userId;
  
      const quest = await prisma.question.findMany();
  
      res.json(quest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getAllQuestionWithAnswer = async (req, res) => {
    try {
  
      const quest = await prisma.question.findMany({
        where: { 
            isAnswer: true 
        },
      });
  
      res.json(quest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {createQuestion, answerQuestion, getAllQuestion, getAllQuestionWithAnswer};
