## API Requirement Dashboard Ayah Hebat App

Ada 2 module yang dibutuhkan dengan segera:

- **Book Module**  
- **BorrowBook Module**  

### Book Module  

1. Buat routes dan controller admin untuk book.  

#### Kebutuhan API Book Module:  

2. **Get all books**  
   - Tambahkan pagination, tapi yang dimasukkan di parameter itu **bukan offset** melainkan **page dan limit**  
     *(untuk contohnya bisa dilihat di `getInfaqHistory` - `InfaqController.js`).*  
   - Output yang dikeluarkan itu tambahkan **“pagination”** *(contohnya bisa dilihat di `getInfaqHistory` – `InfaqController.js`).*  
     Format:  
     ```json
     {
       "message": "Message",
       "data": data,
       "pagination": {
         "currentPage": Number(page),
         "totalPage": totalPage,
         "totalItems": totalItems,
         "itemsPerPage": Number(limit)
       }
     }
     ```
   - Menambahkan **query by category book** dan **by search** untuk mencari suatu book berdasarkan **book name**.  
   - Bawa juga **pembuat buku/user yang mendonasikan buku** tersebut.  
     *(Jadi, di dalam book itu ada user-nya, ambil saja itu.)*  
   - Tambahkan **query by status**:  
     - `PENDING` / `ACCEPTED` / `REJECTED` / `CANCELLED`  
     - *(Bisa dilihat di schema Prisma `BookStatus`).*  
     - Secara **default**, akan mengambil yang **ACCEPTED** *(karena berarti book tersebut sudah diterima oleh pihak Ayah Hebat dan siap dipinjam oleh user lain).*  

3. **Get book by id**  
   - Keluaran akan mencakup:  
     - **Book**  
     - **Comment book**  
     - **Pengaju buku (user)**  

4. **Create Book**  
   - Bisa membuat suatu buku dengan **status auto-accepted**.  
   - Untuk **user yang membuatnya adalah admin**.  

5. **Delete Book**  
   - Ada **soft delete** dan **hard delete**:  
     - **Soft delete**:  
       - Akan menambahkan **`deletedAt`** di schema Prisma.  
       - Secara **default**, `deletedAt` **kosong/null**.  
       - Jika `deletedAt` ada (berisi `Date`), maka **book dianggap telah dihapus**.  
     - **Hard delete**:  
       - Book akan **terhapus dari database** sepenuhnya.  


### Borrow Book Module
Menyusul  