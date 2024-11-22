const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all office addresses
const getAllAddresses = async (req, res) => {
  try {
    const addresses = await prisma.officeAddress.findMany();
    res.status(200).json({
      message: "Success fetching addresses",
      data: addresses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching addresses", error: error.message });
  }
};

// Create a new office address
const createAddress = async (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    return res
      .status(400)
      .json({ message: "name and address fields are required" });
  }

  try {
    const newAddress = await prisma.officeAddress.create({
      data: {
        name,
        address,
      },
    });
    res.status(201).json({
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating address", error: error.message });
  }
};

// Update an office address
const updateAddress = async (req, res) => {
  const { id } = req.params; // ID dari alamat yang ingin diupdate
  const { name, address } = req.body;

  if (!name && !address) {
    return res
      .status(400)
      .json({ message: "At least one field (name or address) is required" });
  }

  try {
    // Perbarui alamat berdasarkan ID
    const updatedAddress = await prisma.officeAddress.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }), // Hanya update `name` jika ada di body
        ...(address && { address }), // Hanya update `address` jika ada di body
      },
    });

    res.status(200).json({
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating address", error: error.message });
  }
};

module.exports = {
  getAllAddresses,
  createAddress,
  updateAddress,
};
