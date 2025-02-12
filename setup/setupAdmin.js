// setup/setupAdmin.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/jwtMiddleware");
require("dotenv").config();

const prisma = new PrismaClient();

async function setupAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error(
      "Admin email or password is not set in environment variables"
    );
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
    },
  });
  console.log("Admin user created:", adminUser);

  // create user
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

module.exports = setupAdmin;
