// --- Importaciones ---
const admin = require("firebase-admin");
const serviceAccount = require("/etc/secrets/serviceAccountKey.json");

// --- Inicialización de Firebase ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Cambia esta URL por la de tu proyecto Firestore real (de la pestaña "Configuración del proyecto")
  databaseURL: "https://novedad-del-bolso.firebaseio.com"
});

// --- Inicialización de Firestore ---
const db = admin.firestore();

// (Opcional pero recomendable): configuración de timestamps
db.settings({ ignoreUndefinedProperties: true });

// --- Exportación ---
module.exports = db;
