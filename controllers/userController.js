const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

module.exports = { saveDeviceToken };
