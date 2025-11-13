const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../middlewares/jwtMiddleware");
const crypto = require("crypto");
// const smtpPassword = process.env.SMTP_PASSWORD;

const userNodemailer = process.env.USERNAME_NODEMAILER;
const passNodemailer = process.env.PASSWORD_NODEMAILER;
const portNodemailer = process.env.PORT_NODEMAILER;
const hostNodemailer = process.env.HOST_NODEMAILER;
const secureNodemailer = process.env.SECURE_NODEMAILER === "true";
const mailFrom = process.env.MAIL_FROM;

const prisma = new PrismaClient();
const saltRounds = 10;

const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    console.log(req.body);

    // Validasi input
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });
    }

    // Cek apakah username atau email sudah ada
    const existingUser = await prisma.user.findUnique({ where: { email } });
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser && existingUser.isVerified) {
      return res
        .status(400)
        .json({ error: "Email is already registered and verified" });
    }

    if (existingUsername && existingUsername.isVerified) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Jika email sudah ada tetapi belum diverifikasi
    if (existingUser && !existingUser.isVerified) {
      const verificationCode = generateVerificationCode();
      await prisma.user.update({
        where: { email },
        data: {
          username,
          email,
          password: await bcrypt.hash(password, saltRounds),
          verificationCode,
        },
      });
      sendVerificationEmail(email, verificationCode);
      return res.json({
        message: "Email verification resent. Please check your email.",
      });
    }

    // Jika username sudah ada tetapi belum diverifikasi
    if (existingUsername && !existingUsername.isVerified) {
      const verificationCode = generateVerificationCode();
      await prisma.user.update({
        where: { username },
        data: {
          username,
          email,
          password: await bcrypt.hash(password, saltRounds),
          verificationCode,
        },
      });
      sendVerificationEmail(email, verificationCode);
      return res.json({
        message: "Email verification resent. Please check your email.",
      });
    }

    // Jika belum ada di database, buat user baru
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

    res.json({
      message:
        "User registered successfully. Check your email for verification.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(401).json({ error: "Invalid verification code" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationCode: null,
      },
    });

    res.json({ message: "User verified successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "User is already verified" });
    }

    const newVerificationCode = generateVerificationCode();

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationCode: newVerificationCode,
      },
    });

    sendVerificationEmail(email, newVerificationCode);

    res.json({ message: "Verification code resent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: "User is not verified" });
    }

    const token = generateToken(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateVerificationCode = () => {
  const min = 100000;
  const max = 999999;
  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomCode.toString();
};

const generateResetCode = () => {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
};

const sendVerificationEmail = async (email, verificationCode) => {
  const nodemailer = require("nodemailer");

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: "ayahhebatmangcoding@gmail.com",
  //     pass: smtpPassword,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    host: hostNodemailer,
    port: portNodemailer,
    secure: secureNodemailer,
    auth: {
      user: userNodemailer,
      pass: passNodemailer,
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
    from: mailFrom,
    to: email,
    subject: "Verifikasi Akun",
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

const sendResetEmail = async (email, username, resetURL) => {
  const nodemailer = require("nodemailer");

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: "ayahhebatmangcoding@gmail.com",
  //     pass: smtpPassword,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    host: hostNodemailer,
    port: portNodemailer,
    secure: secureNodemailer,
    auth: {
      user: userNodemailer,
      pass: passNodemailer,
    },
  });

  // 2. Verify (mengikuti format Anda)
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

  // 3. Buat mailOptions (diubah untuk reset password)
  const mailOptions = {
    from: mailFrom,
    to: email,
    subject: "Permintaan Reset Password",
    text: `Halo ${username},\n\nAnda meminta untuk reset password. Silakan klik link di bawah ini:\n\n${resetURL}\n\nLink ini akan kedaluwarsa dalam 5 menit.`,
  };

  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");

    await transporter.sendMail(mailOptions);
    console.log("Email reset terkirim ke:", email);
  } catch (error) {
    console.error("Error di dalam sendResetEmail:", error);
    throw new Error("Gagal mengirim email reset.");
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid old password" });
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm new password do not match" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedNewPassword,
      },
    });

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(200).json({
        message: "Email reset password telah dikirim.",
      });
    }

    const resetCode = generateResetCode();
    const expires = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        profile: {
          upsert: {
            // Ini akan jalan jika Profile BELUM ADA
            create: {
              forgotCode: resetCode,
              forgotExpiredAt: expires,
            },
            // Ini akan jalan jika Profile SUDAH ADA
            update: {
              forgotCode: resetCode,
              forgotExpiredAt: expires,
            },
          },
        },
      },
    });

    // PENTING: Ganti 'http://localhost:3000' dengan URL Frontend Anda
    const resetURL = `https://backend.ayahhebat.mangcoding.com/auth/reset-password?code=${resetCode}`;

    await sendResetEmail(user.email, user.username, resetURL);

    res.status(200).json({ message: "Email reset password telah dikirim." });
  } catch (error) {
    console.error("Error di forgotPassword:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

const showResetForm = async (req, res) => {
  try {
    const { code } = req.query;

    const profileWithCode = await prisma.profile.findFirst({
      where: {
        forgotCode: code,
        forgotExpiredAt: { gt: new Date() },
      },
    });

    // Jika kode tidak valid atau expired
    if (!profileWithCode) {
      // Tampilkan halaman error atau form yang dinonaktifkan
      return res.render("reset-password", {
        // Nama file EJS Anda
        error: "Reset link invalid or expired.",
        code: null,
      });
    }

    // Jika kode valid, tampilkan form
    res.render("reset-password", {
      error: null,
      code: code, // Kirim kodenya ke EJS
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan pada server.");
  }
};

const resetPassword = async (req, res) => {
  console.log("ISI REQ BODY YANG DITERIMA:", req.body);
  const { code, newPassword, newConfirmationPassword } = req.body;

  if (!code || !newPassword || !newConfirmationPassword) {
    return res
      .status(400)
      .json({ message: "Token dan password baru diperlukan." });
  }

  if (newPassword !== newConfirmationPassword) {
    return res.status(400).json({ message: "Password tidak cocok." });
  }

  try {
    const profileWithCode = await prisma.profile.findFirst({
      where: {
        forgotCode: code,
        forgotExpiredAt: { gt: new Date() }, // Cek belum kedaluwarsa
      },
    });

    if (!profileWithCode) {
      return res
        .status(400)
        .json({ message: "Token tidak valid atau sudah kedaluwarsa." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.profile.update({
      where: { id: profileWithCode.id },
      data: {
        forgotCode: null,
        forgotExpiredAt: null,
        user: {
          update: {
            password: hashedPassword,
          },
        },
      },
    });

    res
      .status(200)
      .json({ message: "Password berhasil direset. Silakan login." });
  } catch (error) {
    console.error("Error di resetPassword:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  resendVerificationCode,
  changePassword,
  generateVerificationCode,
  sendVerificationEmail,
  forgotPassword,
  resetPassword,
  generateResetCode,
  showResetForm,
};
