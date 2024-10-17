const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        categories: true,
      },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
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
    res.json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Error creating book' });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, imageurl, categoryIds } = req.body;

  try {
    const updatedData = {
      name,
      description,
      stock,
      imageurl,
    };

    // Jika categoryIds ada dan merupakan array, proses kategori
    if (Array.isArray(categoryIds) && categoryIds.length > 0) {
      // Hapus kategori yang lama terlebih dahulu
      await prisma.bookCategories.deleteMany({
        where: { bookId: parseInt(id) },
      });

      // Tambahkan kategori yang baru
      updatedData.categories = {
        create: categoryIds.map(categoryId => ({
          category: { connect: { id: categoryId } },
        })),
      };
    }

    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error updating book' });
  }
};


const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    // Hapus relasi terkait terlebih dahulu (BookCategories, Peminjaman, CommentBook)
    await prisma.bookCategories.deleteMany({
      where: { bookId: parseInt(id) },
    });

    // Setelah semua relasi terkait dihapus, hapus buku
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error deleting book' });
  }
};


module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
