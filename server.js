const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const kegiatanRoutes = require('./routes/kegiatanRoutes');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('./middlewares/jwtMiddleware'); 

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));
app.use('/user', userRoutes);

app.use(authenticateToken);

app.use('/profile', profileRoutes);
app.use('/kegiatan', kegiatanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
