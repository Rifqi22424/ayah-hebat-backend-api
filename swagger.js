// 1. Ubah konfigurasi untuk menggunakan OpenAPI 3.0
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "Ayah Hebat API",
    description: "Dokumentasi API otomatis menggunakan swagger-autogen",
    version: "1.0.0",
  },
  // 2. Gunakan 'servers' sebagai standar OpenAPI 3.0 (menggantikan host & schemes)
  servers: [
    {
      url: "http://localhost:" + (process.env.PORT || 3000),
      description: "Local server",
    },
  ],
  // 3. Gunakan standar securitySchemes yang sama dengan file YAML Anda
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger-output.json";
const routes = ["./server.js"];

swaggerAutogen(outputFile, routes, doc);
