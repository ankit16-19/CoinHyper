let firebase_admin = require("firebase-admin");
let serviceAccount = require("./serviceAccountKey.json");

let coinpanda = firebase_admin.initializeApp({
    credential: firebase_admin.credential.cert(serviceAccount),
    databaseURL: "https://coinpanda-fb1f8.firebaseio.com"
});
database = firebase_admin.firestore;

module.exports = {
    admin : firebase_admin,
    db : database
}
