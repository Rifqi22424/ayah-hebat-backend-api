const firebaseAdmin  = require("../setup/initializeFirebaseAdmin");

function photoBaseUrl() {
  return "https://backend.ayahhebat.mangcoding.com/uploads/";
}

/**
 * Send a notification to a single user.
 * @param {string} fcmToken - The user's FCM token.
 * @param {string} title - Notification title.
 * @param {string} body - Notification body.
 * @param {string|null} imageUrl - Optional image URL.
 * @param {Object|null} data - Optional data payload.
 */
const sendNotificationToUser = async (
  fcmToken,
  title,
  body,
  imageUrl = null,
  data = null
) => {
  try {
    const message = {
      token: fcmToken,
      notification: {
        title,
        body,
        ...(imageUrl && { imageUrl }),
      },
      data: data || {},
    };
    await firebaseAdmin.messaging().send(message);
    console.log(
      `Notification sent to user with FCM token ${fcmToken} successfully.`
    );
  } catch (error) {
    console.log("Error sending notification ", error);
    throw new Error("Failed to send notification");
  }
};

module.exports = { sendNotificationToUser, photoBaseUrl, photoBaseUrl };
