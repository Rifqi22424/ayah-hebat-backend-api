const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  const { status, lte, gte, username, submissionDate, actualPickUpDate, createdAt, cancelDate, deadlineDate, plannedPickUpDate, returnDate } = req.query;
  const limit = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;

  const offset = (page - 1) * limit;
  

  try {
    const dateParams = {
      submissionDate,
      actualPickUpDate,
      createdAt,
      cancelDate,
      deadlineDate,
      plannedPickUpDate,
      returnDate
    }

    const trueValueFields = Object.entries(dateParams).filter(([, value]) => value === 'true');

    if(trueValueFields.length > 1){
      return res.status(400).json({error: "hanya satu parameter tanggal yang diperbolehkan"});
    }

    const dateCondition = trueValueFields.length === 1 ? {
      [trueValueFields[0][0]]: {
        ...(gte ? {gte: new Date(gte+"T23:59:59.100Z")} : {}),
        ...(lte ? {lte: new Date(lte+"T23:59:59.100Z")} : {})
      }
    }
    : {};

    const peminjaman = await prisma.peminjaman.findMany({
      where: {
        ...dateCondition,
        ...(status ? { status } : {}),
        ...(username ? {user: {username}} : {})
      },
      skip: offset,
      take: limit,
      include:
      {
        user: true,
        book: true
      }
    });

    const totalCount = await prisma.peminjaman.count({
      where: {
        ...dateCondition,
        ...(status ? { status } : {}),
        ...(username ? {user: {username}} : {})
      },
    });

    const totalPage = Math.ceil(totalCount / limit);

    return res.status(200).json({
      message: "success get data",
      data: peminjaman,
      pagination: {
        page,
        totalPage,
        limit,
        totalData: totalCount,
      }
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(
      {
      error: "internal server error",
    });
  }
};

module.exports = {
  updateStatusBuku,
  getPeminjamanBuku
}