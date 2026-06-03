const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSchool = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const existingSchool = await prisma.school.findUnique({
            where: { name }
        });

        if (existingSchool) {
            return res.status(400).json({ message: 'School with this name already exists' });
        }

        const school = await prisma.school.create({
            data: { name }
        });

        res.status(201).json({ message: 'School created successfully', data: school });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSchools = async (req, res) => {
    try {
        const schools = await prisma.school.findMany({
            orderBy: { name: 'asc' }
        });
        res.status(200).json({ data: schools });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const existingSchool = await prisma.school.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingSchool) {
            return res.status(404).json({ message: 'School not found' });
        }

        const schoolWithSameName = await prisma.school.findFirst({
            where: {
                name,
                id: { not: parseInt(id) }
            }
        });

        if (schoolWithSameName) {
            return res.status(400).json({ message: 'Another school with this name already exists' });
        }

        const updatedSchool = await prisma.school.update({
            where: { id: parseInt(id) },
            data: { name }
        });

        res.status(200).json({ message: 'School updated successfully', data: updatedSchool });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteSchool = async (req, res) => {
    try {
        const { id } = req.params;

        const existingSchool = await prisma.school.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingSchool) {
            return res.status(404).json({ message: 'School not found' });
        }

        await prisma.school['delete']({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createSchool,
    getSchools,
    updateSchool,
    deleteSchool
};
