// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productsRoutes = require("./JavaScript/routes/productsRoutes");
const ordersRoutes = require("./JavaScript/routes/ordersRoutes");
const setupSwagger = require("./swagger");

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// 📘 Swagger (debe ir ANTES de las rutas para que Render lo registre)
setupSwagger(app);

// 📦 Rutas principales
app.use("/api/productos", productsRoutes);
app.use("/api/ordenes", ordersRoutes);

// 🌐 Ruta base
app.get("/", (req, res) => {
res.send("🚀 API CHIC 44 está corriendo correctamente.");
});

// 🧠 Manejador de errores generales
app.use((err, req, res, next) => {
console.error("❌ Error general:", err);
res.status(500).json({ error: "Error interno del servidor" });
});

// 🟢 Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`✅ Servidor ejecutándose en puerto ${PORT}`);
console.log(`📘 Documentación Swagger: http://localhost:${PORT}/api-docs`);
});

module.exports = app;
