// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerDocs = require("./swagger");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const productsRoutes = require("./JavaScript/routes/productsRoutes");
const ordersRoutes = require("./JavaScript/routes/ordersRoutes");

app.use("/api/productos", productsRoutes);
app.use("/api/ordenes", ordersRoutes);

// Swagger
swaggerDocs(app);

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📘 Swagger disponible en: http://localhost:${PORT}/api-docs`);
});
