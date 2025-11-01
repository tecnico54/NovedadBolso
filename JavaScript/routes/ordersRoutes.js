const express = require('express');
const router = express.Router();
const ordersRepository = require('../repositories/ordersRepository');

// --- ENDPOINTS CRUD (Órdenes) ---

// Obtener todas las órdenes
router.get('/', async (req, res) => {
  try {
    const ordenes = await ordersRepository.getAll();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una orden por ID
router.get('/:id', async (req, res) => {
  try {
    const orden = await ordersRepository.getById(req.params.id);
    if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva orden
router.post('/', async (req, res) => {
  try {
    const nueva = await ordersRepository.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estado de una orden
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await ordersRepository.updateStatus(req.params.id, req.body.estado);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una orden
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await ordersRepository.remove(req.params.id);
    res.json(eliminado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
