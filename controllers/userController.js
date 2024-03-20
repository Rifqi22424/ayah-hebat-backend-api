const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { generateToken } = require('../middlewares/jwtMiddleware');

const prisma = new PrismaClient();
const saltRounds = 10;

const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Password and confirm password do not match' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const verificationCode = generateVerificationCode(); 

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        verificationCode,
      },
    });

    sendVerificationEmail(email, verificationCode); 

    res.json({ message: 'User registered successfully. Check your email for verification.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(401).json({ error: 'Invalid verification code' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true, 
        verificationCode: null, 
      },
    });

    res.json({ message: 'User verified successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'User is already verified' });
    }

    const newVerificationCode = generateVerificationCode();

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationCode: newVerificationCode,
      },
    });

    sendVerificationEmail(email, newVerificationCode);

    res.json({ message: 'Verification code resent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: 'User is not verified' });
    }

    const token = generateToken(user.id);

    res.json({ token, user: { id: user.id, username: user.username, email: user.email, profile: user.profile } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const generateVerificationCode = () => {
  const min = 100000;
  const max = 999999;
  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomCode.toString();
};


const sendVerificationEmail = async (email, verificationCode) => {
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  
    port: 465,
    secure: true,
    auth: {
      user: "ayahhebatmangcoding@gmail.com",
      pass: "citl rjsa irmx tpcx",
    },
  });
  

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});

  const mailOptions = {
    from: 'ayahhebatmangcoding@gmail.com',
    to: email,
    subject: 'Verifikasi Akun',
    text: `Kode verifikasi Anda: ${verificationCode}`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            reject(err);
        } else {
            resolve(info);
        }
    });
});
};

const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid old password' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: 'New password and confirm new password do not match' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedNewPassword,
      },
    });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { registerUser, loginUser, verifyUser, resendVerificationCode, changePassword };
