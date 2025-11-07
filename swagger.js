const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - CHIC 44",
      version: "1.0.0",
      description:
        "Documentación oficial de la API de CHIC 44. Conexión a Shopify y Firebase.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local de desarrollo",
      },
      {
        url: "https://novedadbolso.onrender.com",
        description: "Servidor en producción",
      },
    ],
  },
  apis: ["./JavaScript/routes/*.js"], // Rutas donde Swagger buscará documentación
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
