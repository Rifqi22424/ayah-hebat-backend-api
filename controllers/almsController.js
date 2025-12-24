const prisma = require("../prisma/client");

// Create infaq transaction
const createAlms = async (req, res) => {
  try {
    const userId = req.userId;
    const rawAmount = req.body.amount;
    const { message, allocationTypeCode } = req.body;
    const imageUrl = req.file ? req.file.filename : null;

    const amount = parseFloat(rawAmount);

    if (!amount || !allocationTypeCode) {
      return res.status(400).json({
        error: "Amount and allocation type are required",
      });
    }

    validAllocationTypes = await prisma.allocationType.findUnique({
      where: { code: allocationTypeCode },
    });

    if (!validAllocationTypes)
      return res.status(400).json({ error: "Invalid allocation type" });

    // Save alms data to the database
    const alms = await prisma.alms.create({
      data: {
        userId,
        amount,
        allocationTypeCode,
        evidenceImageUrl: imageUrl,
        status: "pending",
        message,
      },
    });

    res.status(200).json({
      message: "Berhasil membuat infaq",
      data: alms,
    });
  } catch (error) {
    console.error("Error creating infaq:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user infaq history
const getAlmsHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const history = await prisma.alms.findMany({
      where: { userId },
      skip,
      take,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        amount: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const totalItems = await prisma.alms.count({
      where: { userId },
    });

    const totalPage = Math.ceil(totalItems / Number(limit));

    res.status(200).json({
      message: "Berhasil mengambil history infaq",
      data: history,
      pagination: {
        currentPage: Number(page),
        totalPage,
        totalItems,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error getting infaq history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTotalAmountAlmsUser = async (req, res) => {
  try {
    const userId = req.userId;

    const totalAmount = await prisma.alms.aggregate({
      where: {
        userId,
        status: "success",
      },
      _sum: { amount: true },
    });

    res.status(200).json({
      message: "Berhasil mengambil total amount infaq",
      data: totalAmount._sum.amount || 0,
    });
  } catch (error) {
    console.error("Error getting total amount infaq:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllAlms = async (req, res) => {
  try {
    const { allocationTypeCode, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const whereClause = {
      ...(allocationTypeCode && { allocationTypeCode }),
    };

    const allAlms = await prisma.alms.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalAmount = await prisma.alms.aggregate({
      where: {
        ...whereClause,
        status: "success",
      },
      _sum: { amount: true },
    });

    const totalItems = await prisma.alms.count({
      where: whereClause,
    });

    const totalPage = Math.ceil(totalItems / Number(limit));

    return res.status(200).json({
      message: "Berhasil mengambil semua infaq",
      data: { totalAmount: totalAmount._sum.amount || 0, alms: allAlms },
      pagination: {
        currentPage: Number(page),
        totalPage,
        totalItems,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error getting all infaq:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changeAlmStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: "Status type are required",
      });
    }

    const validStatuses = ["success", "pending", "failed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: "Status are not valid",
      });
    }

    const alm = await prisma.alms.findUnique({
      where: { id },
    });

    if (!alm) return res.status(404).json({ error: "Infaq not found" });

    const newAlm = await prisma.alms.update({
      where: { id },
      data: {
        status,
      },
    });

    res.status(200).json({
      message: "Berhasil mengganti status infaq",
      data: newAlm,
    });
  } catch (error) {
    console.error("Error change status infaq:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAlmsById = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    const alms = await prisma.alms.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        amount: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        allocationTypeCode: true,
      },
    });

    if (!alms) return res.status(404).json({ error: "Infaq not found" });

    const almsType = await prisma.allocationType.findUnique({
      where: {
        code: alms.allocationTypeCode,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (alms.userId !== userId)
      return res.status(403).json({ error: "Forbidden" });

    const { userId: _, allocationTypeCode: __, ...filteredInfaq } = alms;

    return res.status(200).json({
      message: "Berhasil mengambil alms",
      data: {
        ...filteredInfaq,
        almsType,
      },
    });
  } catch (error) {
    console.error("Error getting infaq by id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAlms,
  getAlmsHistory,
  getAllAlms,
  getAlmsById,
  getTotalAmountAlmsUser,
  changeAlmStatus,
};
