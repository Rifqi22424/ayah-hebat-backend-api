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

// admin
// TODO: Update status pinjam buku
const updateStatusBuku = async (req, res) => {
  try {
    const idPeminjaman = parseInt(req.params.id);
    const { status } = req.body;

    const peminjaman = await prisma.peminjaman.findUnique({
      where: { id: idPeminjaman },
      include: { book: true },
    });

    if (!peminjaman) {
      return res.status(404).json({ error: "Peminjaman tidak ditemukan" });
    }

    if (peminjaman.status === status) {
      return res.status(400).json({
        error: "Status peminjaman sudah sama",
      });
    }

    let updatedPeminjaman;

    if (status === "ALLOWED") {
      if (peminjaman.book.stock < 1) {
        return res.status(400).json({ error: "Stok buku tidak cukup" });
      }

      updatedPeminjaman = await prisma.peminjaman.update({
        where: { id: idPeminjaman },
        data: {
          status: "ALLOWED",
          book: { update: { stock: { decrement: 1 } } },
        },
      });
    } else if (status === "TAKEN") {
      updatedPeminjaman = await prisma.peminjaman.update({
        where: { id: idPeminjaman },
        data: {
          status: "TAKEN",
          actualPickUpDate: new Date(),
        },
      });
    } else if (status === "RETURNED") {
      const isLate = new Date() > peminjaman.deadlineDate;
      updatedPeminjaman = await prisma.peminjaman.update({
        where: { id: idPeminjaman },
        data: {
          status: "RETURNED",
          returnDate: new Date(),
          book: { update: { stock: { increment: 1 } } },
        },
      });
      return res.status(200).json({
        message: "Buku dikembalikan",
        data: updatedPeminjaman,
        isLate,
      });
    } else if (status === "CANCELLED") {
      updatedPeminjaman = await prisma.peminjaman.update({
        where: { id: idPeminjaman },
        data: {
          status: "CANCELLED",
          cancelDate: new Date(),
          book: {
            update:
              peminjaman.status === "ALLOWED"
                ? { stock: { increment: 1 } }
                : undefined,
          },
        },
      });
    } else {
      return res.status(400).json({ error: "Status tidak valid" });
    }

    return res.status(200).json({
      message: "Status peminjaman berhasil diperbarui",
      data: updatedPeminjaman,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ error: "Terjadi kesalahan pada server" });
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
