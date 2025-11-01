// shopifyService.js
const axios = require("axios");
require("dotenv").config();

const SHOP_URL = process.env.SHOP_URL;
const ACCESS_TOKEN = process.env.SHOP_ACCESS_TOKEN;
const API_VERSION = process.env.SHOP_API_VERSION || "2025-10";

const shopifyService = {
  // --- PRODUCTOS ---
  async obtenerProductos() {
    const response = await axios.get(
      `${SHOP_URL}/admin/api/${API_VERSION}/products.json`,
      {
        headers: {
          "X-Shopify-Access-Token": ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.products;
  },

  async obtenerProductoPorId(id) {
    const response = await axios.get(
      `${SHOP_URL}/admin/api/${API_VERSION}/products/${id}.json`,
      {
        headers: { "X-Shopify-Access-Token": ACCESS_TOKEN },
      }
    );
    return response.data.product;
  },

  async crearProducto(producto) {
    const response = await axios.post(
      `${SHOP_URL}/admin/api/${API_VERSION}/products.json`,
      { product: producto },
      {
        headers: { "X-Shopify-Access-Token": ACCESS_TOKEN },
      }
    );
    return response.data.product;
  },

  async actualizarProducto(id, producto) {
    const response = await axios.put(
      `${SHOP_URL}/admin/api/${API_VERSION}/products/${id}.json`,
      { product: producto },
      {
        headers: { "X-Shopify-Access-Token": ACCESS_TOKEN },
      }
    );
    return response.data.product;
  },

  async eliminarProducto(id) {
    await axios.delete(
      `${SHOP_URL}/admin/api/${API_VERSION}/products/${id}.json`,
      {
        headers: { "X-Shopify-Access-Token": ACCESS_TOKEN },
      }
    );
  },

  // --- ÓRDENES (Pedidos) ---
  async obtenerOrdenes() {
    const response = await axios.get(
      `${SHOP_URL}/admin/api/${API_VERSION}/orders.json`,
      {
        headers: { "X-Shopify-Access-Token": ACCESS_TOKEN },
      }
    );
    return response.data.orders;
  },

  async obtenerOrdenPorId(id) {
    const response = await axios.get(
      `${SHOP_URL}/admin/api/${API_VERSION}/orders/${id}.json`,
      {
        headers: { "X-Shopify-Access-Token": ACCESS_TOKEN },
      }
    );
    return response.data.order;
  },

  async crearOrden(data) {
    const response = await axios.post(
      `${SHOP_URL}/admin/api/${API_VERSION}/orders.json`,
      { order: data },
      {
        headers: { "X-Shopify-Access-Token": ACCESS_TOKEN },
      }
    );
    return response.data.order;
  },
};

module.exports = shopifyService;
