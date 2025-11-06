const express = require('express');
const cors = require('cors');
const app = express();

// --- Importar rutas ---
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Ruta raíz ---
app.get('/', (req, res) => {
  res.send('👜 CHIC 44 funcionando');
});

// --- Usar rutas ---
app.use('/api/productos', productsRoutes);
app.use('/api/ordenes', ordersRoutes);

// --- Iniciar servidor ---
const PORT = 3000;
app.listen(PORT, () => console.log(`🔥 Servidor escuchando en puerto ${PORT}`));

