const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - Novedad del Bolso",
      version: "1.0.0",
      description:
        "Documentación oficial de la API de Novedad del Bolso. Conexión a Shopify y Firebase.",
      contact: {
        name: "Equipo CrossMedia",
        email: "contacto@novedaddelbolso.com",
      },
    },
    servers: [
      {
        url: "https://novedadbolso.onrender.com",
        description: "Servidor en producción",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor local de desarrollo",
      },
    ],
  },
  apis: ["./JavaScript/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Documentación Swagger disponible en /api-docs");
}

module.exports = swaggerDocs;
