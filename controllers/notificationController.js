const { PrismaClient } = require("@prisma/client");
const { photoBaseUrl } = require("../utils/notificationService");
const prisma = new PrismaClient();
const firebaseAdmin = require("../setup/initializeFirebaseAdmin");
// const admin = require('firebase-admin');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// function photoBaseUrl() {
//   return "https://backend.ayahhebat.mangcoding.com/uploads/";
// }

// function photoBaseUrl() {
//   return "https://dhrqldvp-3000.asse.devtunnels.ms/uploads/";
// }

// function getBaseUrl() {
//   return req.protocol + '://' + req.get('host');
// }

async function sendToUser(req, res) {
  const userId = parseInt(req.params.id);
  const { title, body, data } = req.body;
  const imageUrl = req.file ? `${photoBaseUrl()}${req.file.filename}` : null;
  // const imageUrl = req.file ? `${getBaseUrl(req)}/uploads/${req.file.filename}` : null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.fcmToken) {
      return res
        .status(404)
        .json({ error: "User not found or FCM token not available" });
    }

    const notificationData = data ? JSON.parse(data) : null;

    await firebaseAdmin.messaging().send({
      token: user.fcmToken,
      notification: {
        title,
        body,
        imageUrl,
      },
      data: notificationData,
    });

    await prisma.notification.create({
      data: {
        title,
        body,
        data: notificationData,
        imageUrl,
        userId: user.id,
      },
    });

    return res
      .status(200)
      .json({ message: "Notification sent to user successfully" });
  } catch (error) {
    console.error("Error sending notification to user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function sendToAll(req, res) {
  const { title, body, data } = req.body;
  const imageUrl = req.file ? `${photoBaseUrl()}${req.file.filename}` : null;
  // const imageUrl = req.file ? `${getBaseUrl(req)}/uploads/${req.file.filename}` : null;

  try {
    const allUsers = await prisma.user.findMany();

    if (!allUsers.length) {
      return res.status(404).json({ error: "No users found" });
    }

    const tokens = allUsers.map((user) => user.fcmToken);

    const notificationData = data ? JSON.parse(data) : null;

    await firebaseAdmin.messaging().sendEachForMulticast({
      tokens,
      notification: {
        title,
        body,
        imageUrl,
      },
      data: notificationData,
    });

    const notificationPromises = allUsers.map((user) =>
      prisma.notification.create({
        data: {
          title,
          body,
          data: notificationData,
          imageUrl,
          userId: user.id,
        },
      })
    );

    await Promise.all(notificationPromises);

    return res
      .status(200)
      .json({ message: "Notification sent to all users successfully" });
  } catch (error) {
    console.error("Error sending notification to all users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserNotifications(req, res) {
  const userId = req.userId;

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserNotificationById(req, res) {
  const id = parseInt(req.params.id);

  try {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    return res.status(200).json(notification);
  } catch (error) {
    console.error("Error fetching notification:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  sendToUser,
  sendToAll,
  getUserNotifications,
  getUserNotificationById,
};
