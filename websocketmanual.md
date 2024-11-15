
#  Simple livechat ayah hebat (temporary, still on development)
- Cara konek ke websocket
- Cara kirim message ke websocket lain

## Cara koneksi
\
\
![Alt text](https://www.dotcom-monitor.com/wp-content/uploads/sites/3/2020/05/websocket-handshake.png "Title")

\
\
\
Client membukan koneksi dengan server melalui http upgrade (handshake) di url ws://localhost:3000 dengan headers
```
- 
- 
- 
-
Authorization: Bearer eyblablablabla
```
Authorization dikirim untuk autentikasi ketika upgrade koneksi http ke ws, bila koneksi sudah berhasil dibangun berarti client sudah bisa menerima message dari websocket server.


## Cara kirim message
Untuk mengirim sebuah pesan dari user ke penerima gunakan json untuk isi message nya, contoh:

\
asumsikan userId = 1 <- ini hasil dari jwt ketika autentikasi 
``` json
{
    "receipentId" : 2, // <- user id penerima
    "content" : "eaeaeaeae"
}

```
makan penerima akan mendapatkan
```json
{
    "content": "eaeaeaeae",
    "senderId": 1
}

```

untuk coba coba websocket, bisa menggunakan postman terlebih dahulu sebelum implementasi di bagian frontend

### Feature on development
- kirim gambar
- history chat
- kirim notifikasi ketika penerima tidak membuka koneksi websocket