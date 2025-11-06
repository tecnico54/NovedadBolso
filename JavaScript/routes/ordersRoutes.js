const express = require("express");
const router = express.Router();
const ordersRepository = require("../repositories/ordersRepository");
const shopifyService = require("../services/shopifyService");

/**
 * @swagger
 * tags:
 *   name: Órdenes
 *   description: Endpoints para gestionar órdenes desde Shopify y Firebase
 */

/**
 * @swagger
 * /api/ordenes/shopify:
 *   get:
 *     summary: Obtiene todas las órdenes desde Shopify
 *     tags: [Órdenes]
 */
router.get("/shopify", async (req, res) => {
  try {
    const ordenes = await shopifyService.obtenerOrdenes();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/ordenes:
 *   get:
 *     summary: Obtiene todas las órdenes desde Firebase
 *     tags: [Órdenes]
 */
router.get("/", async (req, res) => {
  try {
    const ordenes = await ordersRepository.getAll();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/ordenes:
 *   post:
 *     summary: Crea una nueva orden en Firebase
 *     tags: [Órdenes]
 */
router.post("/", async (req, res) => {
  try {
    const nueva = await ordersRepository.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
