const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BookService = require('../services/bookService');

const getAllBooks = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0
  const search = req.query.search || "";
  const category = req.query.category || "";
  const status = req.query.status || "DITERIMA";
  try {
    console.log(limit, offset, search, category, status);
    
    const books = await BookService.getAll(limit, offset, search, category, status);

    res.status(200).json({
      message: "success get data",
      data: books
    });

  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

const getBookById = async (req, res) => {
  const id = parseInt(req.params.id);

  if(!id){
    return res.status(400).json({
      message: "id must provided"
    });
  }

  const book = await BookService.getById(id);

  return res.status(200).json({
    message: "succses show comment",
    data: book
  });


}

const createBook = async (req, res) => {
  try {
  console.log("eaeae  ")
    const { name, description, stock, location, categoryIds } = req.body;
    
    if(categoryIds == null){
      return res.status(400).json({
        message: "categoryIds must at least one"
      });
    }
    categoryArray = categoryIds.split(',').map(Number);
    
    const imageurl = req.file ? req.file.filename : null;

    const createdBook = BookService.create(name, description, stock, location, imageurl, categoryArray, activeAt, "DITERIMA");
    
    res.status(201).json({
      message: "create success",
      data: createdBook
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: error.message });
  }
};

const createBookRequest = async (req, res) => {
  try {
    const { name, description, location, categoryIds, stock, activeAt} = req.body;

    if (!categoryIds) {
      return res.status(400).json({
        message: "categoryIds must at least one"
      });
    }

    const categoryArray = categoryIds.split(',').map(Number);
    const imageurl = req.file ? req.file.filename : null;

    const book = BookService.create(name, description, stock, location, imageurl, categoryArray, activeAt, "PENGAJUAN");


    res.status(201).json({
      message: "Book request submitted successfully",
      data: book
    });
  } catch (error) {
    console.error('Error creating book request:', error);
    res.status(500).json({ error: 'Error creating book request' });
  }
};

const updateBookRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        status: status,
      },
    });


    res.status(200).json({
      message: "Book request edited successfully",
      data: updatedBook
    });
  } catch (error) {
    console.error('Error editing book request:', error);
    res.status(500).json({ error: 'Error editing book request' });
  }
};



const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, location , imageurl, categoryIds, status } = req.body;

  try {

    const updatedData = {
      name,
      description,
      location,
      stock,
      status,
      imageurl,
    };

    if(await checkBook(parseInt(id))){
      return res.status(404).json({
        message: "book not found"
      })
    }

    await prisma.$transaction(async (prisma) => {
      if (Array.isArray(categoryIds) && categoryIds.length > 0) {
        // Delete old categories
        await prisma.bookCategories.deleteMany({
          where: { bookId: parseInt(id) },
        });

        // Add new categories
        await prisma.bookCategories.createMany({
          data: categoryIds.map(categoryId => ({
            bookId: parseInt(id),
            categoryId: categoryId,
          })),
        });
      }
    });


    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: updatedData,
      include: {
        categories: true
      }
    });

    return res.status(200).json({
      message: "success update data",
      data: book
    });
  } catch (error) {console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error updating book' });
  }
};


const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {

    if(await checkBook(parseInt(id))){
      return res.status(404).json({
        message: "book not found"
      })
    }

    // Hapus relasi terkait terlebih dahulu (BookCategories, Peminjaman, CommentBook)
    await prisma.bookCategories.deleteMany({
      where: { bookId: parseInt(id) },
    });

    // Setelah semua relasi terkait dihapus, hapus buku
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error deleting book' });
  }
};

async function checkBook(id) {
  return !await prisma.book.findUnique({
    where: {
      id
    }
  });
}


module.exports = {
  getBooks: getAllBooks,
  createBook,
  createBookRequest,
  updateBookRequestStatus,
  updateBook,
  deleteBook,
  getBookById
};
