const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

const authorizeAdmin = async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await prisma.user.findUnique({
            where: {id: userId},
        });

        if (user.role == 'ADMIN') {
            next();
        } else {
            res.status(403).json({ error: 'Access denied'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

module.exports = { authorizeAdmin };