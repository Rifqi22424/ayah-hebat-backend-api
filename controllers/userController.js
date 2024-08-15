const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authController = require('./authController');

const saveDeviceToken = async (req, res) => {
  try {
    const userId = req.userId;
    const { token } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        fcmToken: token, 
      },
    });

    res.json({ message: 'Device token saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createDeleteAccountVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newVerificationCode = authController.generateVerificationCode();

    await prisma.user.update({
      where: { id: user.id },
      data: {
      deleteAccountVerficationCode: newVerificationCode,
      },
    });

    authController.sendVerificationEmail(email, newVerificationCode);

    res.json({ message: 'Verification code successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const verifyDeleteAccount = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.deleteAccountVerficationCode !== verificationCode) {
      return res.status(401).json({ error: 'Invalid verification code' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        deleteAccountVerficationCode: null, 
      },
    });

    res.json({ message: 'User verified successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const resendDeleteAccountVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // if (user.isVerified) {
    //   return res.status(400).json({ error: 'User is already verified' });
    // }

    const newVerificationCode = authController.generateVerificationCode();

    await prisma.user.update({
      where: { id: user.id },
      data: {
        deleteAccountVerficationCode: newVerificationCode,
      },
    });

    authController.sendVerificationEmail(email, newVerificationCode);

    res.json({ message: 'Verification code resent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email, password, reason } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        deleteReason: reason, 
        // isActive: false,
      },
    });

    const addDeletedUser = await prisma.userDeleted.create({
      data: {
        email: user.email,
        deleteReason: reason,
      }
    })

    const deleteUser = await prisma.user.delete({
      where: { id: user.id },
    });

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const sendForgotToGmail = async (email, token) => {
//   const nodemailer = require('nodemailer');

//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",  
//     port: 465,
//     secure: true,
//     auth: {
//       user: "ayahhebatmangcoding@gmail.com",
//       pass: "citl rjsa irmx tpcx",
//     },
//   });
  
//   await new Promise((resolve, reject) => {
//     transporter.verify(function (error, success) {
//         if (error) {
//             console.log(error);
//             reject(error);
//         } else {
//             console.log("Server is ready to take our messages");
//             resolve(success);
//         }
//     });
// });

//   const mailOptions = {
//     from: 'ayahhebatmangcoding@gmail.com',
//     to: email,
//     subject: 'Lupa Password',
//     text: `https://backend.ayahhebat.mangcoding.com/forgotPass/data=${token}`,
//   };

//   await new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(info);
//         }
//     });
// });
// };

module.exports = { saveDeviceToken, createDeleteAccountVerificationCode, resendDeleteAccountVerificationCode, verifyDeleteAccount, deleteUser };
