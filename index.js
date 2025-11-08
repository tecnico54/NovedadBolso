const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerDocs = require("./swagger");

// Inicializar app
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// 📘 Documentación Swagger (debe ir antes de las rutas)
swaggerDocs(app);

// 🔹 Rutas principales
const productsRoutes = require("./JavaScript/routes/productsRoutes");
const ordersRoutes = require("./JavaScript/routes/ordersRoutes");

app.use("/api/productos", productsRoutes);
app.use("/api/ordenes", ordersRoutes);

// 🔹 Ruta de prueba base
app.get("/", (req, res) => {
  res.send("🚀 API CHIC 44 funcionando correctamente.");
});

// 🔹 Configurar puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor ejecutándose en el puerto ${PORT}`));
