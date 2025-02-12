const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCategories = async (req, res) => {

  // const limit =  parseInt(req.query.limit) || 5;
  // const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || "";

  try {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: search
        }
      },
    });

    const result = [{ id: 0, name: "Semua" }, ...categories];

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};


const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Error updating category' });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Error deleting category' });
  }
};


module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
