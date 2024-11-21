const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// function photoBaseUrl() {
//   return "https://backend.ayahhebat.mangcoding.com/uploads/";
// }
function photoBaseUrl() {
  return "https://dhrqldvp-3000.asse.devtunnels.ms/uploads/";
}

const createNews = async (req, res) => {
    try {
      const { title, subTitle, content, author } = req.body;
      const imageUrl = req.file ? `${photoBaseUrl()}${req.file.filename}` : null;

      const news = await prisma.news.create({
        data: {
            title,
            subTitle,
            content,
            author,
            imageUrl
        }
      });
  
      res.json({ message: 'News added successfully.', news });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const editNews = async (req, res) => {
    try {
    
      const newsId = parseInt(req.params.id);
      const { title, subTitle, content, author } = req.body;
      const imageUrl = req.file ? `${photoBaseUrl()}${req.file.filename}` : null;
  
      const existingNews = await prisma.news.findUnique({
        where: { id: newsId },
      });
  
      if (!existingNews) {
        return res.status(404).json({ error: 'News not found' });
      }
  
      const updatedNews = await prisma.news.update({
        where: { id: newsId },
        data: {
            title,
            subTitle,
            content,
            author,
            imageUrl
        },
      });
  
      res.json({ message: 'News updated successfully.', updatedNews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getAllNews = async (req, res) => {
    try {
      const news = await prisma.news.findMany();
  
      res.json(news);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getNewestNews = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;  
      const offset = parseInt(req.query.offset) || 0;
  
      const news = await prisma.news.findMany({
        select: {
          id: true,
          title: true,
          subTitle: true,
          author: true,
          imageUrl: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: offset,
        take: limit,
      });
  
      res.json(news);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const getPopularNews = async (req, res) => {
    try {
      const news = await prisma.news.findMany({
        select: {
            id: true,
            title: true,
            imageUrl: true
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
      });
  
      res.json(news);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getNewsById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const news = await prisma.news.findUnique({
       where : { id } 
      });
  
      res.json(news);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const deleteNewsById = async (req, res) => {
    try {
      const newsId = parseInt(req.params.id);
  
      const existingNews = await prisma.news.findUnique({
        where: { id: newsId },
      });
  
      if (!existingNews) {
        return res.status(404).json({ error: 'News not found' });
      }
  
      await prisma.news.delete({
        where: { id: newsId },
      });
  
      res.json({ message: 'News deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const deleteAllNews = async (req, res) => {
    try {
      await prisma.news.deleteMany();
  
      res.json({ message: 'All news deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {createNews, editNews, getAllNews, getPopularNews, getNewestNews, getNewsById, deleteNewsById, deleteAllNews};
