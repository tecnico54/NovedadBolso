// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - CHIC 44",
      version: "1.0.0",
      description:
        "Documentación oficial de la API CHIC 44. Conexión a Shopify y Firebase.",
      contact: {
        name: "Equipo CrossMedia",
        email: "contacto@novedaddelbolso.com",
      },
    },
    servers: [
      {
        url: "https://novedadbolso.onrender.com",
        description: "Servidor en Render (Producción)",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor Local (Desarrollo)",
      },
    ],
  },
  // 🗂️ Usa __dirname para que funcione tanto en Render como en local
  apis: [path.join(__dirname, "JavaScript/routes/*.js")],
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger listo en /api-docs");
}

module.exports = setupSwagger;
