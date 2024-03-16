const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addProfile = async (req, res) => {
    try {
      const { nama, namaIstri, namaAnak, namaKuttab, tahunMasukKuttab, bio } = req.body;
      const userId = req.userId;

      const tahunMasukKuttabInt = parseInt(tahunMasukKuttab);
  
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const photoFilename = req.file ? req.file.filename : null;
  
      const profile = await prisma.profile.create({
        data: {
          nama,
          namaIstri,
          namaAnak,
          namaKuttab,
          tahunMasukKuttab: tahunMasukKuttabInt,
          bio,
          photo: photoFilename,
          user: { connect: { id: userId } }, 
        },
      });
  
      res.json({ message: 'Profile added successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const editProfile = async (req, res) => {
    try {
      const { nama, namaIstri, namaAnak, namaKuttab,tahunMasukKuttab, bio } = req.body;
      const userId = req.userId;
  
      const tahunMasukKuttabInt = parseInt(tahunMasukKuttab);
  
      const existingProfile = await prisma.profile.findUnique({
        where: { id: userId },
        include: { user: true }, 
      });
  
      if (!existingProfile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      if (existingProfile.user.id !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
  
      const photoFilename = req.file ? req.file.filename : null;

      const updatedProfile = await prisma.profile.update({
        where: { id: userId },
        data: {
          nama,
          namaIstri,
          namaAnak,
          namaKuttab,
          tahunMasukKuttab: tahunMasukKuttabInt,
          photo: photoFilename,
          bio,
        },
      });
  
      res.json({ message: 'Profile updated successfully.', updatedProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getProfile = async (req, res) => {
    try {
      const userId = req.userId;
  
      const profile = await prisma.profile.findUnique({
        where: { userId },
        select: {
          id: true,
          nama: true,
          bio: true,
          photo: true,
          namaIstri: true,
          namaAnak: true,
          namaKuttab: true,
          tahunMasukKuttab: true,
        },
      });
  
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      res.json({ profile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getUserNProfile = async (req, res) => {
    try {
      const userId = req.userId;
  
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: true,
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { addProfile, editProfile, getProfile, getUserNProfile };
