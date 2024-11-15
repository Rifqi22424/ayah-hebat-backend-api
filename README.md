## HOW TO RUN LOCALLY
### 1. Clone Repository
```bash
git clone https://github.com/Rifqi22424/ayah-hebat-backend-api
```

### 2. Install dependency
``` javascript
npm install
```

### 3. Run 
#### 3.1 run server
```javascript
npm run test
```
#### 3.2 run server with reload development
```javascript
npm run dev
```

## API DOCUMENTATION
make sure you already run the server, and go to localhost:3000/api-docs
### Authorizing
Post email and password in /auth/login (auth controller), copy the token and fill the value in "Authorize"


#  Simple livechat ayah hebat (temporary, still on development)
- Cara konek ke websocket
- Cara kirim message ke koneksi lain

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