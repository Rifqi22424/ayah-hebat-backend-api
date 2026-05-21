# Rencana Pembuatan Endpoint `/all-scores/:time`

**Tujuan:**
Membuat endpoint API baru yang memiliki fitur pagination (`limit` dan `offset`) dan filter waktu (`time`) untuk mengambil skor pengguna, mengikuti pola output dari `getTopUsers`.

## 1. Modifikasi di `controllers/kegiatanController.js`

Akan ditambahkan sebuah fungsi baru bernama `getAllUsersScores`. Fungsi ini akan:
1.  Mengambil `limit` dan `offset` dari `req.query` untuk pagination.
2.  Mengambil `time` dari `req.params` untuk filter waktu (`year`, `month`, `day`).
3.  Menggunakan `prisma.user.findMany()` untuk mengambil data user beserta relasi `profile`-nya.
4.  Mengekspor fungsi tersebut agar bisa digunakan di router.

### Rencana Kode:
```javascript
const getAllUsersScores = async (req, res) => {
  try {
    // 1. Pagination
    const limit = parseInt(req.query.limit) || 10;  
    const offset = parseInt(req.query.offset) || 0;
    
    // 2. Time Filter
    const { time } = req.params;
    let orderByField;

    if (time === 'year') {
      orderByField = 'totalScoreYear';
    } else if (time === 'month') {
      orderByField = 'totalScoreMonth';
    } else if (time === 'day') {
      orderByField = 'totalScoreDay';
    } else {
      return res.status(400).json({ error: 'Invalid time parameter. Please use year, month, or day.' });
    }

    // 3. Ambil data dengan filter dan pagination
    const users = await prisma.user.findMany({
      orderBy: { [orderByField]: 'desc' }, 
      skip: offset,
      take: limit,
      include: {
        profile: true,
      }
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ... jangan lupa export getAllUsersScores di module.exports ...
```

## 2. Modifikasi di `routes/kegiatanRoutes.js`

Akan dilakukan impor fungsi `getAllUsersScores` dari controller dan penambahan definisi route baru.

### Rencana Kode:
```javascript
// Di bagian import (destructuring)
const {
  // ... imports lainnya ...
  getAllUsersScores,
} = require("../controllers/kegiatanController");

// Menambahkan route baru
router.get(
  "/all-scores/:time",
  /* #swagger.tags = ['Kegiatan Controller'] */ getAllUsersScores,
);
```
