const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getKegiatan = async (req, res) => {
  try {
    const userId = req.userId;

    const kegiatan = await prisma.kegiatan.findMany({
      where: { userId },
    });

    res.json(kegiatan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllKegiatan = async (req, res) => {
  try {
    const kegiatan = await prisma.kegiatan.findMany();

    res.json(kegiatan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createKegiatan = async (req, res) => {
  try {
    const { title } = req.body;
    const { file1, file2, file3 } = req.files;
    const userId = req.userId;

    if (!title || !userId) {
      return res.status(400).json({ error: 'Title and userId are required' });
    }


    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    const newKegiatan = await prisma.kegiatan.create({
      data: {
        title,
        user: { connect: { id: userId } },
        file1: file1 ? file1[0].filename : null,
        file2: file2 ? file2[0].filename : null,
        file3: file3 ? file3[0].filename : null,
      },
    });

    res.json(newKegiatan);
  } catch (error) {
    console.error('Error in createKegiatan:', error);

    if (error.code === 'P2025') {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTotalScore = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { kegiatan: { select: { score: true, createdAt: true } } },
    });

    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return;
    }

    const currentDate = new Date();


    const allKegiatan = user.kegiatan;

    const filteredKegiatan = allKegiatan.filter(kegiatan => kegiatan.score !== null);

    const totalScoreYear = filteredKegiatan.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const totalScoreMonth = filteredKegiatan
      .filter(kegiatan => kegiatan.createdAt && kegiatan.createdAt.getMonth() === currentDate.getMonth())
      .reduce((acc, curr) => acc + (curr.score || 0), 0);
    const totalScoreDay = filteredKegiatan
      .filter(kegiatan => kegiatan.createdAt && kegiatan.createdAt.toDateString() === currentDate.toDateString())
      .reduce((acc, curr) => acc + (curr.score || 0), 0);

    const updateData = {
      totalScoreYear,
      totalScoreMonth,
      totalScoreDay,
    };


    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  } catch (error) {
    console.error(error);
  }
};

const evaluateKegiatan = async (req, res) => {
  try {
    const { kegiatanId, score } = req.body;

    const parsedKegiatanId = parseInt(kegiatanId);

    if (!Number.isInteger(parsedKegiatanId)) {
      return res.status(400).json({ error: 'Invalid kegiatanId' });
    }

    const evaluatedKegiatan = await prisma.kegiatan.update({
      where: { id: parsedKegiatanId },
      data: {
        score: parseInt(score),
      },
    });

    const kegiatan = await prisma.kegiatan.findUnique({
      where: { id: parsedKegiatanId },
      select: { userId: true, createdAt: true },
    });

    const dateFilter = {
      AND: [
        { userId: kegiatan.userId },
        { score: { not: null } },
        { createdAt: { gte: kegiatan.createdAt } },
      ],
    };
    
    await updateTotalScore(kegiatan.userId, dateFilter);

    res.json(evaluatedKegiatan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTopUsers = async (req, res) => {
  try {
    const { time } = req.params;
    let orderByField;

    if (time === 'year') {
      orderByField = 'totalScoreYear';
    } else if (time === 'month') {
      orderByField = 'totalScoreMonth';
    } else if (time === 'day') {
      orderByField = 'totalScoreDay';
    }

    const topUsers = await prisma.user.findMany({
      orderBy: { [orderByField]: 'desc' }, 
      take: 3,
      include: {
        profile: true,
      }
    });

    res.json(topUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getKegiatanByScore = async (req, res) => {
  try {
    const { time } = req.params;
    const userId = req.userId;

    let dateFilter = {};

    if (time === 'all') {
    } else if (time === 'year') {
      dateFilter = {
        AND: [
          { userId },
          { score: { not: null } },
          { createdAt: { gte: new Date(new Date().getFullYear(), 0, 1) } },
        ],
      };
    } else if (time === 'month') {
      dateFilter = {
        AND: [
          { userId },
          { score: { not: null } },
          { createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } },
        ],
      };
    } else if (time === 'day') {
      dateFilter = {
        AND: [,
          { userId },
          { score: { not: null } },
          { createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) } },
        ],
      };
    }

    const kegiatan = await prisma.kegiatan.findMany({
      where: dateFilter,
      orderBy: { score: 'desc' },
    });

    res.json(kegiatan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { getKegiatan, createKegiatan, evaluateKegiatan, getKegiatanByScore, getTopUsers, getAllKegiatan };
