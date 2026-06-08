const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBranch = async (req, res) => {
    try {
        const { name, zoneId } = req.body;
        const parsedZoneId = zoneId ? parseInt(zoneId) : null;

        if (!name || !parsedZoneId) {
            return res.status(400).json({ message: 'Name and zoneId are required' });
        }

        const existingZone = await prisma.zone.findUnique({
            where: { id: parsedZoneId }
        });

        if (!existingZone) {
            return res.status(404).json({ message: 'Zone not found' });
        }

        const existingBranch = await prisma.branch.findFirst({
            where: { name, zoneId: parsedZoneId }
        });

        if (existingBranch) {
            return res.status(400).json({ message: 'Branch with this name already exists in the zone' });
        }

        const branch = await prisma.branch.create({
            data: { name, zoneId: parsedZoneId }
        });

        res.status(201).json({ message: 'Branch created successfully', data: branch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getBranches = async (req, res) => {
    try {
        const branches = await prisma.branch.findMany({
            orderBy: { name: 'asc' },
            include: {
                zone: true
            }
        });
        res.status(200).json({ data: branches });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, zoneId } = req.body;
        const parsedZoneId = zoneId ? parseInt(zoneId) : null;

        if (!name && !parsedZoneId) {
            return res.status(400).json({ message: 'Name or zoneId is required' });
        }

        const existingBranch = await prisma.branch.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingBranch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        if (parsedZoneId) {
            const existingZone = await prisma.zone.findUnique({
                where: { id: parsedZoneId }
            });

            if (!existingZone) {
                return res.status(404).json({ message: 'Zone not found' });
            }
        }

        const nextName = name || existingBranch.name;
        const nextZoneId = parsedZoneId || existingBranch.zoneId;

        const branchWithSameName = await prisma.branch.findFirst({
            where: {
                name: nextName,
                zoneId: nextZoneId,
                id: { not: parseInt(id) }
            }
        });

        if (branchWithSameName) {
            return res.status(400).json({ message: 'Another branch with this name already exists in the zone' });
        }

        const updatedBranch = await prisma.branch.update({
            where: { id: parseInt(id) },
            data: {
                ...(name && { name }),
                ...(parsedZoneId && { zoneId: parsedZoneId })
            }
        });

        res.status(200).json({ message: 'Branch updated successfully', data: updatedBranch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;

        const existingBranch = await prisma.branch.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingBranch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        await prisma.branch['delete']({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createBranch,
    getBranches,
    updateBranch,
    deleteBranch
};
