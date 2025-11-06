const express = require("express");
const cors = require("cors");
const swaggerDocs = require("./swagger");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- Ruta raíz ---
app.get('/', (req, res) => {
    res.send('👜 CHICK 44 funcionando');
});

// Rutas
app.use("/api/productos", require("./JavaScript/routes/productsRoutes"));
app.use("/api/ordenes", require("./JavaScript/routes/ordersRoutes"));

// Swagger (asegúrate de llamarlo DESPUÉS de definir app y rutas)
swaggerDocs(app);

// Servidor local (para pruebas)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
console.log(`📘 Swagger Docs en http://localhost:${PORT}/api-docs`);
});
