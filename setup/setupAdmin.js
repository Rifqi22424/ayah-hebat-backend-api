// setup/setupAdmin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

async function setupAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('Admin email or password is not set in environment variables');
    return;
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('Admin user already exists. No action taken.');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      isVerified: true,
    },
  });
  console.log('Admin user created:', adminUser);
}

module.exports = setupAdmin;