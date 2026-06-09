const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getZones = async (req, res) => {
    try {
        const zones = await prisma.zone.findMany({
            orderBy: { name: 'asc' },
            // include: {
            //     branches: {
            //         orderBy: { name: 'asc' },
            //         select: {
            //             id: true,
            //             name: true
            //         }
            //     }
            // }
        });
        res.status(200).json({ data: zones });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getZones
};
