// productsRepository.js
const db = require("../firebase");
const shopifyService = require("../services/shopifyService");

const productsRepository = {
  // 🔹 Obtener productos (desde Shopify)
  async getAll() {
    try {
      const productos = await shopifyService.obtenerProductos();
      return productos;
    } catch (error) {
      console.error("Error al obtener productos desde Shopify:", error.message);
      // Si Shopify falla, intentar cargar desde Firestore como respaldo
      const snapshot = await db.collection("productos").get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  },

  // 🔹 Obtener un solo producto
  async getById(id) {
    try {
      const producto = await shopifyService.obtenerProductoPorId(id);
      return producto;
    } catch (error) {
      console.error("Error al obtener producto por ID:", error.message);
      // Backup Firestore
      const doc = await db.collection("productos").doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    }
  },

  // 🔹 Crear producto
  async create(data) {
    try {
      const nuevo = await shopifyService.crearProducto(data);
      return nuevo;
    } catch (error) {
      console.error("Error al crear producto en Shopify:", error.message);
      // Backup Firestore
      const ref = await db.collection("productos").add(data);
      return { id: ref.id, ...data };
    }
  },

  // 🔹 Actualizar producto
  async update(id, data) {
    try {
      const actualizado = await shopifyService.actualizarProducto(id, data);
      return actualizado;
    } catch (error) {
      console.error("Error al actualizar producto en Shopify:", error.message);
      await db.collection("productos").doc(id).update(data);
      const updated = await db.collection("productos").doc(id).get();
      return { id: updated.id, ...updated.data() };
    }
  },

  // 🔹 Eliminar producto
  async remove(id) {
    try {
      await shopifyService.eliminarProducto(id);
      return { message: "Producto eliminado de Shopify correctamente" };
    } catch (error) {
      console.error("Error al eliminar producto en Shopify:", error.message);
      await db.collection("productos").doc(id).delete();
      return { message: "Producto eliminado localmente (Firestore)" };
    }
  }
};

module.exports = productsRepository;
