// ordersRepository.js
const db = require("../firebase");
const shopifyService = require("../services/shopifyService");

const ordersRepository = {
  // 🔹 Obtener todas las órdenes desde Shopify
  async getAll() {
    try {
      const ordenes = await shopifyService.obtenerOrdenes();
      return ordenes;
    } catch (error) {
      console.error("Error al obtener órdenes desde Shopify:", error.message);
      // En caso de error, cargar desde Firestore (backup)
      const snapshot = await db.collection("ordenes").get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  },

  // 🔹 Crear orden (manual o interna)
  async create(data) {
    try {
      const nuevaOrden = await shopifyService.crearOrden(data);
      return nuevaOrden;
    } catch (error) {
      console.error("Error al crear orden en Shopify:", error.message);
      // Backup Firestore
      const ref = await db.collection("ordenes").add({
        ...data,
        fecha: new Date().toISOString(),
        estado: "pendiente"
      });
      return { id: ref.id, ...data };
    }
  },

  // 🔹 Obtener una orden específica
  async getById(id) {
    try {
      const orden = await shopifyService.obtenerOrdenPorId(id);
      return orden;
    } catch (error) {
      console.error("Error al obtener orden desde Shopify:", error.message);
      const doc = await db.collection("ordenes").doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    }
  }
};

module.exports = ordersRepository;
