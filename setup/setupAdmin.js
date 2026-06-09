// setup/setupAdmin.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/jwtMiddleware");
require("dotenv").config();

const prisma = new PrismaClient();

const ZONE_BRANCHES = [
  {
    zoneName: "JABODETABEK",
    branches: [
      "Cibinong",
      "Beji",
      "Sawangan",
      "Jakarta Timur",
      "Depok (Pusat)",
      "Bogor",
      "Bekasi",
      "Tangerang Selatan",
      "Tangerang Kota",
    ],
  },
  {
    zoneName: "JAWA BARAT",
    branches: ["Bandung Cileunyi", "Bandung Gedebage", "Sukabumi", "Bandung", "Purwakarta"],
  },
  {
    zoneName: "JAWA TENGAH",
    branches: ["Domak", "Yogyakarta", "Semarang", "Tegal", "Purwokerto"],
  },
  {
    zoneName: "JAWA TIMUR",
    branches: ["Sidoarjo", "Gresik", "Jember", "Malang", "Jombang", "Probolinggo", "Kediri", "Surabaya"],
  },
  {
    zoneName: "SUMATERA",
    branches: ["Medan", "Lampung Pagar Alam", "Lampung Kemiling", "Padang", "Pekanbaru", "Banda Aceh"],
  },
  {
    zoneName: "KALIMANTAN - SULAWESI",
    branches: ["Makassar", "Balikpapan"],
  },
];

const ADMIN_ZONES = [
  {
    username: "jabodetabek",
    email: "jabodetabek@admin.com",
    password: "admin123",
    zoneName: "JABODETABEK",
  },
  {
    username: "jabar",
    email: "jabar@admin.com",
    password: "admin123",
    zoneName: "JAWA BARAT",
  },
  {
    username: "jateng",
    email: "jateng@admin.com",
    password: "admin123",
    zoneName: "JAWA TENGAH",
  },
  {
    username: "jatim",
    email: "jatim@admin.com",
    password: "admin123",
    zoneName: "JAWA TIMUR",
  },
  {
    username: "sumatera",
    email: "sumatera@admin.com",
    password: "admin123",
    zoneName: "SUMATERA",
  },
  {
    username: "kalsul",
    email: "kalsul@admin.com",
    password: "admin123",
    zoneName: "KALIMANTAN - SULAWESI",
  },
];

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
} 

async function setupAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("Admin email or password is not set in environment variables");
    return;
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  await setupUser();

  if (existingAdmin) {
    console.log("Admin user already exists. No action taken.");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.create({
    data: {
      username: "admin",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
      hasApproved: "approved",
    },
  });
  console.log("Admin user created:", adminUser);

  // create user
}

async function setupZone() {
  const existingZones = await prisma.zone.count();

  if (existingZones > 0) {
    console.log("Zones already exist. No action taken.");
    return;
  }

  for (const item of ZONE_BRANCHES) {
    await prisma.zone.create({
      data: {
        name: item.zoneName,
      },
    });
    console.log(`Zone created: ${item.zoneName}`);
  }
}

async function setupBranch() {
  const existingBranches = await prisma.branch.count();

  if (existingBranches > 0) {
    console.log("Branches already exist. No action taken.");
    return;
  }

  for (const item of ZONE_BRANCHES) {
    const zone = await prisma.zone.findUnique({
      where: { name: item.zoneName },
    });

    if (!zone) {
      console.log(`Zone not found for branches: ${item.zoneName}`);
      continue;
    }

    for (const branchName of item.branches) {
      await prisma.branch.create({
        data: {
          name: branchName,
          zoneId: zone.id,
        },
      });
      console.log(`Branch created: ${branchName} (${item.zoneName})`);
    }
  }
}

async function setupAdminZone() {
  console.log("ADMIN_ZONES ", ADMIN_ZONES);

  for (const zone of ADMIN_ZONES) {
    console.log("zone ", zone);
    console.log("zone.email ", zone.email);
    const existingUser = await prisma.user.findUnique({
      where: {
        email: zone.email
      }
    });

    if (existingUser) {
      console.log(`Admin Zone ${zone.email} already exists`);
      continue;
    }

    const hashedPassword = await hashPassword(zone.password);

    const adminUser = await prisma.user.create({
      data: {
        username: zone.username,
        email: zone.email,
        password: hashedPassword,
        role: "ADMIN_ZONE",
        isVerified: true,
        hasApproved: "approved",
      }
    });
    console.log("Admin zone created: ", adminUser);
    
  }
}

async function setupAdminZoneProfile() {
  for (const adminZone of ADMIN_ZONES) {
    const user = await prisma.user.findUnique({
      where: { email: adminZone.email },
    });

    if (!user) {
      console.log(`Admin zone user not found: ${adminZone.email}`);
      continue;
    }

    const zone = await prisma.zone.findUnique({
      where: { name: adminZone.zoneName },
    });

    if (!zone) {
      console.log(`Zone not found for admin ${adminZone.email}: ${adminZone.zoneName}`);
      continue;
    }

    await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        zoneId: zone.id,
      },
      create: {
        userId: user.id,
        zoneId: zone.id,
      },
    });

    console.log(`Admin zone profile synced: ${adminZone.email} -> ${adminZone.zoneName}`);
  }
}

async function setupUser() {
  const username = process.env.USER_NAME;
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("User already exists. No action taken.");
    userLogin(existingUser.id);
    return;
  }

  const hashedUserPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedUserPassword,
      role: "USER",
      isVerified: true,
    },
  });

  userLogin(user.id);

  console.log("User created: ", user);
}

async function userLogin(id) {
  const token = generateToken(id);
  console.log("User token: ", token);
}

module.exports = {
  setupAdmin,
  setupZone,
  setupBranch,
  setupAdminZone,
  setupAdminZoneProfile,
};
