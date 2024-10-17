const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBooks = async (req, res) => {
  const limit = parseInt(req.query.limit) || 6;
  const offset = parseInt(req.query.offset) || 0
  const search = req.query.search || "";
  const category = req.query.category || "";
  try {
    const books = await prisma.book.findMany({
      where: {
        name: {
          contains: search
        },
        categories: {
          some: {
            category: {
              name: {
                contains: category
              }
            }
          }
        }
      },
      skip: offset,
      take: limit,
    });

    res.status(200).json({
      message: "success get data",
      data: books
    });

  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

const createBook = async (req, res) => {
  const { name, description, stock, imageurl, categoryIds } = req.body;

  // Validasi categoryIds
  if (!categoryIds || !Array.isArray(categoryIds)) {
    return res.status(400).json({ error: 'categoryIds must be an array' });
  }

  try {
    const book = await prisma.book.create({
      data: {
        name,
        description,
        stock,
        imageurl,
        categories: {
          create: categoryIds.map(categoryId => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
    });
    res.status(201).json({
      message: "create success",
      data: book
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, imageurl, categoryIds } = req.body;

  try {

    await checkBook(parseInt(id));

    const updatedData = {
      name,
      description,
      stock,
      imageurl,
    };

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

    if(await checkBook(parseInt(id))){
      return res.status(404).json({
        message: "book not found"
      })
    }

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
  } catch (error) {
    console.error('Error updating book:', error);
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
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
