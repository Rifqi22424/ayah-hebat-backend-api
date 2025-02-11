const prisma = require("../prisma/client");
const generateRandomCode = require("../utils/generateRandomCode");

const createAllocationType = async (req, res) => {
  try {
    const { name } = req.body;

    code = generateRandomCode();

    if (!name)
      return res.status(400).json({
        error: "Name is required",
      });

    // check if allocation type already exists
    const existingAllocationType = await prisma.allocationType.findFirst({
      where: {
        OR: [{ name }, { code }],
      },
    });

    if (existingAllocationType)
      return res.status(400).json({ error: "Allocation type already exists" });

    const allocationType = await prisma.allocationType.create({
      data: {
        name,
        code,
      },
    });

    res.status(201).json({
      message: "Allocation type created successfully",
      data: allocationType,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getAllocationTypes = async (req, res) => {
  try {
    const allocationTypes = await prisma.allocationType.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        code: true,
      },
    });

    res.status(200).json({
      message: "Allocation types retrieved successfully",
      data: allocationTypes,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const editAllocationType = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const allocationType = await prisma.allocationType.update({
      where: { id },
      data: {
        name,
      },
    });

    if (!allocationType) {
      return res.status(404).json({
        error: "Allocation type not found",
      });
    }

    res.status(200).json({
      message: "Allocation type updated successfully",
      data: allocationType,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateAllocationTypeStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { isActive } = req.body;

    console.log(isActive);

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        error: "isActive is required and must be a boolean",
      });
    }

    const allocationType = await prisma.allocationType.update({
      where: { id },
      data: {
        isActive,
      },
    });

    if (!allocationType) {
      return res.status(404).json({
        error: "Allocation type not found",
      });
    }

    res.status(200).json({
      message: "Allocation type non-activated successfully",
      data: allocationType,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createAllocationType,
  getAllocationTypes,
  editAllocationType,
  updateAllocationTypeStatus,
};
