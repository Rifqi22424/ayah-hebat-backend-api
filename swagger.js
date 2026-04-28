// 1. Ubah konfigurasi untuk menggunakan OpenAPI 3.0
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const fs = require("fs");

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

// 4. Tambahkan filter untuk membersihkan parameter ganda otomatis
swaggerAutogen(outputFile, routes, doc).then(({ data }) => {
  if (data && data.paths) {
    // Hapus paksa parameter 'authorization' yang dideteksi otomatis pada semua rute
    Object.keys(data.paths).forEach((path) => {
      Object.keys(data.paths[path]).forEach((method) => {
        let params = data.paths[path][method].parameters;
        if (params) {
          data.paths[path][method].parameters = params.filter(
            (p) => p.name !== "authorization",
          );
        }
      });
    });

    // Tulis ulang file JSON dengan data yang sudah bersih
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log(
      "Swagger UI berhasil di-generate dan dibersihkan dari parameter authorization ganda!",
    );
  }
});
