const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// user
// TODO: buat request pinjam buku
const pinjamBuku = async (req, res) => {
  try {
    let { bookId, plannedPickUpDate, deadlineDate } = req.body;
    const userId = req.userId;

    bookId = parseInt(bookId);

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (book.stock < 1) {
      return res.status(404).json({
        message: "Stock buku tersebut kosong",
      });
    }

    if (new Date(deadlineDate) <= new Date()) {
      return res.status(400).json({
        error: "deadline date must be greater than today",
      });
    }

    const peminjaman = await prisma.peminjaman.create({
      data: {
        bookId,
        userId,
        status: "PENDING",
        plannedPickUpDate: new Date(plannedPickUpDate),
        deadlineDate: new Date(deadlineDate),
      },
      include: {
        book: {
          select: {
            name: true,
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
          },
        },
      },
    });

    if (!peminjaman) {
      return res.status(500).json({
        error: "failed lend book",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return res.status(202).json({
      message: "success",
      data: {
        // idPeminjaman: peminjaman.id,
        // bookName: book.name,
        // imageUrl: book.imageurl,
        // submissionDate: peminjaman.submissionDate,
        // deadlineDate: peminjaman.deadlineDate,
        // from: "KUTAB ALFATIH",
        // to: user.username,
        id: peminjaman.id,
        status: peminjaman.status,
        submissionDate: peminjaman.submissionDate,
        deadlineDate: peminjaman.deadlineDate,
        plannedPickUpDate: peminjaman.plannedPickUpDate,
        actualPickUpDate: peminjaman.actualPickUpDate,
        returnDate: peminjaman.returnDate,
        cancelDate: peminjaman.cancelDate,
        book: peminjaman.book,
        // name: peminjaman.book.name,
        // imageurl: peminjaman.book.imageurl,
        // categories: peminjaman.book.categories.map((cat) => ({
        //   name: cat.category.name,
        // })),
      },
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

const getPinjamBukuById = async (req, res) => {
  const id = parseInt(req.params.id);
  // const userId = parseInt(req.userId);

  // const peminjaman = await prisma.peminjaman.findUnique({
  //   where: {
  //     id,
  //   },
  // });

  // if (!peminjaman) {
  //   return res.status(404).json({
  //     error: "Peminjaman tidak ditemukan",
  //   });
  // }

  // if (peminjaman.userId !== userId) {
  //   return res.status(403).json({
  //     error: "Forbidden",
  //   });
  // }

  try {
    const peminjaman = await prisma.peminjaman.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        submissionDate: true,
        deadlineDate: true,
        plannedPickUpDate: true,
        actualPickUpDate: true,
        returnDate: true,
        deadlineDate: true,
        cancelDate: true,
        book: {
          select: {
            name: true,
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
          },
        },
      },
    });

    if (!peminjaman) {
      return res.status(404).json({
        error: "Peminjaman tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "success get data",
      data: peminjaman,
    });
  } catch (e) {
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

const getMyPeminjamanBuku = async (req, res) => {
  const userId = parseInt(req.userId);
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  const offset = (page - 1) * limit;

  try {
    const peminjaman = await prisma.peminjaman.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        status: true,
        submissionDate: true,
        deadlineDate: true,
        plannedPickUpDate: true,
        actualPickUpDate: true,
        returnDate: true,
        deadlineDate: true,
        cancelDate: true,
        book: {
          select: {
            name: true,
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
          },
        },
      },
      orderBy: [{ id: "desc" }],
      skip: offset,
      take: limit,
    });

    const totalCount = await prisma.peminjaman.count({
      where: {
        userId,
      },
    });

    const totalPage = Math.ceil(totalCount / limit);

    return res.status(200).json({
      message: "success get data",
      data: peminjaman,
      pagination: {
        currentPage: page,
        totalPage,
        totalItems: totalCount,
        itemsPerPage: limit,
      },
    });
  } catch (e) {
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

module.exports = {
  pinjamBuku,
  getPinjamBukuById,
  getMyPeminjamanBuku,
};
