# Implementasi Model School

## Deskripsi
Implementasi ini bertujuan untuk memecahkan masalah di mana nama sekolah/kuttab sebelumnya hanya disimpan sebagai teks bebas (`namaKuttab`) di model `Profile`. Dengan implementasi ini, kita beralih ke model relasional dengan entitas `School` tersendiri, yang dikelola secara terpusat oleh Admin.

## Struktur Database (Prisma)

### Model `School` Baru
```prisma
model School {
  id        Int       @id @default(autoincrement())
  name      String    @unique
  profiles  Profile[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

### Perubahan pada Model `Profile`
Ditambahkan relasi ke model `School`:
```prisma
model Profile {
  // ... field lainnya
  schoolId  Int?      // Foreign key ke model School (opsional agar backward compatible)
  school    School?   @relation(fields: [schoolId], references: [id])
}
```

## API Baru (Endpoint)

### 1. Admin Management (CRUD School)
Akses: **Hanya Admin** (Diperlukan token dengan role ADMIN).
- `POST /admin/schools` : Menambah sekolah baru. Payload: `{ "name": "Nama Sekolah" }`
- `GET /admin/schools` : Melihat semua daftar sekolah.
- `PUT /admin/schools/:id` : Mengedit nama sekolah berdasarkan ID. Payload: `{ "name": "Nama Sekolah Baru" }`
- `DELETE /admin/schools/:id` : Menghapus sekolah berdasarkan ID.

### 2. User API (List School)
Akses: **Authenticated**
- `GET /schools` : Mendapatkan daftar semua sekolah untuk ditampilkan di dropdown frontend.
  - Response: `{ "data": [{ "id": 1, "name": "Kuttab Al-Fatih" }, ...] }`

## Perubahan API (Endpoint Lama)

### `POST /profile/add-profile` & `PUT /profile/edit-profile`
- **Payload Baru**: Sekarang bisa menerima parameter `schoolId` (tipe Integer).
- **Logika**: Jika `schoolId` diberikan, ID tersebut akan disimpan ke database `Profile`.

### `GET /profile/get-profile` & `GET /profile/get-user`
- **Response Baru**: Sekarang akan mengembalikan relasi `school`, sehingga frontend bisa mendapatkan objek sekolah lengkap, tidak hanya `schoolId`-nya saja.
  - Contoh Response: 
  ```json
  {
    "profile": {
      "id": 1,
      "nama": "Fulan",
      "schoolId": 1,
      "school": {
        "id": 1,
        "name": "Kuttab Al-Fatih"
      }
    }
  }
  ```

## Catatan Tambahan
Field lama `namaKuttab` tetap dipertahankan di database sementara waktu untuk mencegah hilangnya data lama sebelum frontend sepenuhnya bermigrasi ke input dropdown `schoolId`. Jika ke depannya ingin dibuang, lakukan migrasi data `namaKuttab` ke `School` terlebih dahulu.
