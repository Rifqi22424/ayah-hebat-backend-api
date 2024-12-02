const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBooks = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0
  const search = req.query.search || "";
  const category = req.query.category || "";
  const status = req.query.status || "DITERIMA";
  try {
    const books = await prisma.book.findMany({
      where: {
        name: {
          contains: search
        },
        status,
        ...(category && {
          categories: {
            some: {
              category: {
                name: {
                  contains: category
                }
              }
            }
          }
        })
      },
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        stock: true,
        imageurl: true,
        categories: {
          select: {
            category: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

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

  const book = await prisma.book.findUnique({
    where: {
      id
    },
    select: {
      name: true,
      description: true,
      imageurl: true,
      stock: true,
      categories: {
        select: {
          category: {
            select: {
              name: true
            }
          }
        }
      },
      comment_book: {
        select: {
          id: true,
          description: true,
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: {
                  nama: true,
                  photo: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return res.status(200).json({
    message: "succses show comment",
    data: book,
  });
};

const createBook = async (req, res) => {
  try {
    const { name, description, stock, categoryIds } = req.body;
    const userId = req.userId;

    // Validasi body agar tidak kosong
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "Name is required and must be a non-empty string" });
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      return res.status(400).json({
        message: "Description is required and must be a non-empty string",
      });
    }

    if (!stock || isNaN(parseInt(stock)) || parseInt(stock) <= 0) {
      return res
        .status(400)
        .json({ message: "Stock is required and must be a positive number" });
    }

    if (
      !categoryIds ||
      typeof categoryIds !== "string" ||
      categoryIds.trim() === ""
    ) {
      return res.status(400).json({
        message:
          "CategoryIds must be a comma-separated string and cannot be empty",
      });
    }

    if (categoryIds == null) {
      return res.status(400).json({
        message: "categoryIds must at least one",
      });
    }
    categoryArray = categoryIds.split(",").map(Number);

    const imageurl = req.file ? req.file.filename : null;

    const book = await prisma.book.create({
      data: {
        name,
        description,
        stock: parseInt(stock),
        userId,
        status: "ACCEPTED",
        imageurl,
        categories: {
          create: categoryArray.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
    });
    res.status(201).json({
      message: "create success",
      data: book,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: error.message });
  }
};

const getMyBookRequests = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const userId = parseInt(req.userId);
  try {
    const books = await prisma.book.findMany({
      where: {
        userId,
      },
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        stock: true,
        status: true,
        sentAt: true,
        imageurl: true,
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        peminjaman: {
          where: {
            status: "TAKEN",
          },
        },
      },
    });

    const booksWithBorrowedCount = books.map((book) => ({
      ...book,
      borrowedCount: book.peminjaman.length,
    }));

    res.status(200).json({
      message: "success get data",
      data: booksWithBorrowedCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Error getting your book requests" });
  }
};

const createBookRequest = async (req, res) => {
  try {
    const { name, description, categoryIds, stock, sentAt } = req.body;
    const userId = req.userId;

    // Validasi body agar tidak kosong
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "Name is required and must be a non-empty string" });
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      return res.status(400).json({
        message: "Description is required and must be a non-empty string",
      });
    }

    if (!stock || isNaN(parseInt(stock)) || parseInt(stock) <= 0) {
      return res
        .status(400)
        .json({ message: "Stock is required and must be a positive number" });
    }

    if (
      !categoryIds ||
      typeof categoryIds !== "string" ||
      categoryIds.trim() === ""
    ) {
      return res.status(400).json({
        message:
          "CategoryIds must be a comma-separated string and cannot be empty",
      });
    }

    if (!sentAt || isNaN(Date.parse(sentAt))) {
      return res
        .status(400)
        .json({ message: "sentAt is required and must be a valid date" });
    }

    if (!categoryIds) {
      return res.status(400).json({
        message: "categoryIds must at least one",
      });
    }

    const categoryArray = categoryIds.split(",").map(Number);
    const imageurl = req.file ? req.file.filename : null;

    const book = await prisma.book.create({
      data: {
        name,
        description,
        stock: parseInt(stock),
        imageurl,
        userId,
        status: "PENDING", // Status default untuk pengajuan
        categories: {
          create: categoryArray.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
        sentAt: new Date(sentAt),
      },
    });

    res.status(201).json({
      message: "Book request submitted successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error creating book request:", error);
    res.status(500).json({ error: "Error creating book request" });
  }
};

const updateBookRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const validStatuses = ["PENDING", "ACCEPTED", "REJECTED", "CANCELED"];

    if (!validStatuses.includes(status)) {
      return res.status(404).json({ error: "Invalid Status" });
    }
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
  const { name, description, stock, imageurl, categoryIds, status } = req.body;

  try {

    const updatedData = {
      name,
      description,
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
  getBooks,
  createBook,
  createBookRequest,
  updateBookRequestStatus,
  updateBook,
  deleteBook,
  getBookById
};
