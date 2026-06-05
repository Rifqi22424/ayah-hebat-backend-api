const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSchools = async (req, res) => {
    try {
        const schools = await prisma.school.findMany({
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true
            }
        });
        res.status(200).json({ data: schools });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getSchools
};
