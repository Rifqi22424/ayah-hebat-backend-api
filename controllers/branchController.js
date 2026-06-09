const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBranches = async (req, res) => {
    try {
        const branches = await prisma.branch.findMany({
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                zone: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        res.status(200).json({ data: branches });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getBranches
};
