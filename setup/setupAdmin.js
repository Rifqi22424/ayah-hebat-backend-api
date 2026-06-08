// setup/setupAdmin.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/jwtMiddleware");
require("dotenv").config();

const prisma = new PrismaClient();

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

  setupUser();

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

async function setupAdminZone() {
  const ADMIN_ZONES = [
    {
      username: "jabodetabek",
      email: "jabodetabek@admin.com",
      password: "admin123"
    },
    {
      username: "jabar",
      email: "jabar@admin.com",
      password: "admin123"
    },
    {
      username: "jateng",
      email: "jateng@admin.com",
      password: "admin123"
    },
    {
      username: "jatim",
      email: "jatim@admin.com",
      password: "admin123"
    },
    {
      username: "sumatera",
      email: "sumatera@admin.com",
      password: "admin123"
    },
    {
      username: "kalsul",
      email: "kalsul@admin.com",
      password: "admin123"
    },
  ];
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

module.exports = {setupAdmin, setupAdminZone};
