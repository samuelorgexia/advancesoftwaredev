const admin = require("firebase-admin");

const serviceAccount = require("../config/group-1-asd-firebase-adminsdk-g56qa-c8daa96873.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://group-1-asd-default-rtdb.asia-southeast1.firebasedatabase.app",
});

module.exports = {
  realtime: admin.database(),
  admin,
};
