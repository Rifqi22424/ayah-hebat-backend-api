const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Ayah Hebat API',
    description: 'Dokumentasi API otomatis menggunakan swagger-autogen',
  },
  host: 'localhost:' + (process.env.PORT || 3000),
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  security: [{ bearerAuth: [] }]
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
    console.log("Swagger UI berhasil di-generate ke swagger-output.json!");
});
