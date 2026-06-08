const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createZone = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const existingZone = await prisma.zone.findUnique({
            where: { name }
        });

        if (existingZone) {
            return res.status(400).json({ message: 'Zone with this name already exists' });
        }

        const zone = await prisma.zone.create({
            data: { name }
        });

        res.status(201).json({ message: 'Zone created successfully', data: zone });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getZones = async (req, res) => {
    try {
        const zones = await prisma.zone.findMany({
            orderBy: { name: 'asc' },
            include: {
                branches: {
                    orderBy: { name: 'asc' }
                }
            }
        });
        res.status(200).json({ data: zones });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateZone = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const existingZone = await prisma.zone.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingZone) {
            return res.status(404).json({ message: 'Zone not found' });
        }

        const zoneWithSameName = await prisma.zone.findFirst({
            where: {
                name,
                id: { not: parseInt(id) }
            }
        });

        if (zoneWithSameName) {
            return res.status(400).json({ message: 'Another zone with this name already exists' });
        }

        const updatedZone = await prisma.zone.update({
            where: { id: parseInt(id) },
            data: { name }
        });

        res.status(200).json({ message: 'Zone updated successfully', data: updatedZone });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteZone = async (req, res) => {
    try {
        const { id } = req.params;

        const existingZone = await prisma.zone.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingZone) {
            return res.status(404).json({ message: 'Zone not found' });
        }

        const branchCount = await prisma.branch.count({
            where: { zoneId: parseInt(id) }
        });

        if (branchCount > 0) {
            return res.status(400).json({ message: 'Zone cannot be deleted because it has branches' });
        }

        await prisma.zone.delete({ /* #swagger.ignore = true */
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: 'Zone deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createZone,
    getZones,
    updateZone,
    deleteZone
};
