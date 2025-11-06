const express = require("express");
const router = express.Router();
const productsRepository = require("../repositories/productsRepository");
const shopifyService = require("../services/shopifyService");

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para gestionar productos desde Shopify y Firebase
 */

/**
 * @swagger
 * /api/productos/shopify:
 *   get:
 *     summary: Obtiene todos los productos directamente desde Shopify
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 */
router.get("/shopify", async (req, res) => {
  try {
    const productos = await shopifyService.obtenerProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene todos los productos desde Firebase
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 */
router.get("/", async (req, res) => {
  try {
    const productos = await productsRepository.getAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 */
router.get("/:id", async (req, res) => {
  try {
    const producto = await productsRepository.getById(req.params.id);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 */
router.post("/", async (req, res) => {
  try {
    const nuevo = await productsRepository.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Productos]
 */
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await productsRepository.update(
      req.params.id,
      req.body
    );
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Productos]
 */
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await productsRepository.remove(req.params.id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
