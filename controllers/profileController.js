const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addProfile = async (req, res) => {
  try {
    const { nama, namaIstri, namaAnak, namaKuttab, tahunMasukKuttab, bio, branchId, zoneId } =
      req.body;
    const userId = req.userId;

    if (
      !nama ||
      !namaIstri ||
      !namaAnak ||
      !tahunMasukKuttab ||
      !bio || !namaKuttab
      // (!namaKuttab && (!branchId && !zoneId))
    ) {
      return res
        .status(400)
        .json({ message: "Masukan semua data yang dibutuhkan" });
    }

    const tahunMasukKuttabInt = parseInt(tahunMasukKuttab);
    // const parsedBranchId = branchId ? parseInt(branchId) : null;
    // const parsedZoneId = zoneId ? parseInt(zoneId) : null;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const photoFilename = req.file
      ? req.file.filename
      : user.profile?.photo || null;

    if (user.profile) {
      // If profile exists, update it
      await prisma.profile.update({
        where: { userId },
        data: {
          nama,
          namaIstri,
          namaAnak,
          namaKuttab,
          tahunMasukKuttab: tahunMasukKuttabInt,
          bio,
          photo: photoFilename,
          // ...(parsedBranchId !== null && { branchId: parsedBranchId }),
          // ...(parsedZoneId !== null && { zoneId: parsedZoneId })
        },
      });
      return res.json({ message: "Profile updated successfully." });
    } else {
      // If profile does not exist, create a new one
      await prisma.profile.create({
        data: {
          nama,
          namaIstri,
          namaAnak,
          namaKuttab,
          tahunMasukKuttab: tahunMasukKuttabInt,
          bio,
          photo: photoFilename,
          user: { connect: { id: userId } },
          // ...(parsedBranchId !== null && { branch: { connect: { id: parsedBranchId } } }),
          // ...(parsedZoneId !== null && { zone: { connect: { id: parsedZoneId } } })
        },
      });
      return res.json({ message: "Profile added successfully." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editProfile = async (req, res) => {
  try {
    const { nama, namaIstri, namaAnak, namaKuttab, tahunMasukKuttab, bio, 
      // branchId 
    } =
      req.body;
    const userId = req.userId;

    const tahunMasukKuttabInt = parseInt(tahunMasukKuttab);
    // const parsedBranchId = branchId ? parseInt(branchId) : null;

    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!existingProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    if (existingProfile.user.id !== req.userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const photoFilename = req.file ? req.file.filename : null;

    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        nama,
        namaIstri,
        namaAnak,
        namaKuttab,
        tahunMasukKuttab: tahunMasukKuttabInt,
        photo: photoFilename,
        bio,
        // ...(parsedBranchId !== null && { branchId: parsedBranchId })
      },
    });

    res.json({ message: "Profile updated successfully.", updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
        // branch: {
        //   include: {
        //     zone: true
        //   }
        // },
      },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserPhoto = async (req, res) => {
  try {
    const userId = req.userId;

    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: {
        nama: true,
        photo: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserNProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        branch: {
          include: {
            zone: true
          }
        },
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addProfile,
  editProfile,
  getProfile,
  getUserNProfile,
  getUserPhoto,
};
