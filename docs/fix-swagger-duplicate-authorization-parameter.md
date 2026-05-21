# Rencana Perbaikan Parameter Authorization Ganda pada Swagger

**Permasalahan:**
Pada halaman dokumentasi API (Swagger), muncul field input `authorization` secara manual di dalam tab **Parameters**. Hal ini merupakan redundansi, karena sudah ada fitur autentikasi bawaan OpenAPI yang menggunakan ikon gembok pada sudut kanan atas (di mana token bearer biasanya dimasukkan).

**Penyebab:**
Library `swagger-autogen` yang digunakan (versi `2.23.7`) memiliki fitur statis *auto-detection* yang membaca berkas kode sumber. Pada berkas `middlewares/jwtMiddleware.js`, terdapat pemanggilan `req.headers.authorization`. Pembacaan properti ini membuat `swagger-autogen` secara otomatis menambahkan parameter `authorization` ke header setiap route yang melewati middleware tersebut.

**Solusi:**
Untuk menghilangkan input parameter manual ini (karena skema security `bearerAuth` sudah didefinisikan secara global di file `swagger.js`), kita perlu menonaktifkan fitur `autoHeaders` yang secara default bernilai `true` pada saat inisialisasi `swagger-autogen`.

## Rencana Implementasi

1. **Modifikasi `swagger.js`**
   Akan ditambahkan properti `autoHeaders: false` pada *options object* inisialisasi `swagger-autogen`.

   **Dari:**
   ```javascript
   const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
   ```

   **Menjadi:**
   ```javascript
   const swaggerAutogen = require("swagger-autogen")({ 
     openapi: "3.0.0", 
     autoHeaders: false 
   });
   ```

2. **Generate Ulang Konfigurasi Swagger**
   Menjalankan perintah `npm run swagger` untuk memperbarui file keluaran dokumentasi API (`swagger-output.json`), sehingga parameter manual `authorization` terhapus dari berkas output tersebut.
