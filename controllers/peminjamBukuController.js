const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// user
// TODO: buat request pinjam buku
const pinjamBuku = async (req, res) => {
  try {
    let { bookId, startDate, endDate } = req.body;
    const userId = req.userId;

    bookId = parseInt(bookId);

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (book.stock < 1) {
      return res.status(404).json({
        message: "stock kosong",
      });
    }

    // const borrowedBook = await prisma.peminjaman.findMany({
    //     where: {
    //         userId: userId,
    //         status: {
    //             in: ['SUDAH_DIAMBIL']
    //         }
    //     }
    // })

    // if(borrowedBook.length > 0){
    //     return res.status(400).json({
    //         message: "anda masih memiliki buku yang dipinjam"
    //     })
    // }

    if (new Date(endDate) < new Date()) {
      return res.status(400).json({
        error: "end date must be greater than today",
      });
    }

    const peminjaman = await prisma.peminjaman.create({
      data: {
        bookId: bookId,
        userId: userId,
        status: "PENGAJUAN",
        startDate: new Date(startDate),
        endDate: new Date(endDate),
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
        idPeminjaman: peminjaman.id,
        bookName: book.name,
        endDate: peminjaman.endDate,
        from: "KUTAB ALFATIH",
        to: user.username,
      },
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

const getMyPeminjamanBuku = async (req, res) => {
  const userId = parseInt(req.userId);
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const peminjaman = await prisma.peminjaman.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        status: true,
        startDate: true,
        endDate: true,
        book: {
            include: true,
        }
      },
      orderBy: [{ id: "desc" }],
      skip: offset,
      take: limit,
    });

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

// admin
// TODO: Update status pinjam buku
const updateStatusBuku = async (req, res) => {
  try {
    const idPeminjaman = parseInt(req.params.id);
    const status = req.body.status;

    const isExist = await prisma.peminjaman.findUnique({
      where: {
        id: idPeminjaman,
      },
      include: {
        book: true,
      },
    });

    if (!isExist) {
      return res.status(404).json({
        error: "peminjaman not found",
      });
    }

    if (isExist.status === status) {
      return res.status(400).json({
        error: "Status peminjaman sudah sama",
      });
    }

    if (status === "DIIZINKAN_DIAMBIL" && isExist.book.stock < 1) {
      return res.status(400).json({
        error: "Stok buku tidak cukup untuk dipinjam",
      });
    }

    let book = null;
    if (status === "DIIZINKAN_DIAMBIL") {
      book = await prisma.peminjaman.update({
        where: {
          id: idPeminjaman,
        },
        data: {
          status: "DIIZINKAN_DIAMBIL",
          book: {
            update: {
              stock: {
                decrement: 1,
              },
            },
          },
        },
      });
    } else if (status === "SUDAH_DIAMBIL") {
      book = await prisma.peminjaman.update({
        where: {
          id: idPeminjaman,
        },
        data: {
          status: "SUDAH_DIAMBIL",
        },
      });
    } else if (status === "SUDAH_DIKEMBALIKAN") {
      book = await prisma.peminjaman.update({
        where: {
          id: idPeminjaman,
        },
        data: {
          status: "SUDAH_DIKEMBALIKAN",
          book: {
            update: {
              stock: {
                increment: 1,
              },
            },
          },
        },
      });
    } else if (status === "DIBATALKAN") {
      book = await prisma.peminjaman.update({
        where: {
          id: idPeminjaman,
        },
        data: {
          status: "DIBATALKAN",
          book: {
            update: {
              stock:
                isExist.status === "DIIZINKAN_DIAMBIL"
                  ? { increment: 1 }
                  : undefined,
            },
          },
        },
      });
    } else {
      return res.status(400).json({
        error: "status not on the list",
      });
    }

    return res.status(200).json({
      message: "update success",
      data: book,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({
      error: "internal server error",
    });
  }
};

const getPeminjamanBuku = async (req, res) => {
  const { status } = req.query;
  const limit = parseInt(req.query.limit) || 5;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const peminjaman = await prisma.peminjaman.findMany({
      where: {
        status,
      },
      skip: offset,
      take: limit,
    });

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

module.exports = {
  pinjamBuku,
  updateStatusBuku,
  getPeminjamanBuku,
  getMyPeminjamanBuku,
};
