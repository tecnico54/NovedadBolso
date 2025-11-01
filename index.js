// index.js (dentro de /functions)
const functions = require("firebase-functions");
const app = require("./JavaScript/server");

// Exporta la API como función HTTPS
exports.api = functions.https.onRequest(app);
