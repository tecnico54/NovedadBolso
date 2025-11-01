const express = require('express');
const router = express.Router();
const productsRepository = require('../repositories/productsRepository');

// --- ENDPOINTS CRUD (Productos) ---

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await productsRepository.getAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await productsRepository.getById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo producto
router.post('/', async (req, res) => {
  try {
    const nuevo = await productsRepository.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await productsRepository.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await productsRepository.remove(req.params.id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
