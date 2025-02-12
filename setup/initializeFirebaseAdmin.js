const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../ayah-hebat-app-firebase-adminsdk-wu50j-4869861ec0.json");

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

module.exports = firebaseAdmin;
