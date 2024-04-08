const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const kegiatanRoutes = require('./routes/kegiatanRoutes');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('./middlewares/jwtMiddleware'); 
const cron = require('node-cron');
const { updateAllUsersTotalScore } = require('./controllers/kegiatanController')

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));
app.use('/user', userRoutes);

app.use(authenticateToken);

app.use('/profile', profileRoutes);
app.use('/kegiatan', kegiatanRoutes);

cron.schedule('0 0 * * *', async () => {
  console.log('Running daily score update...');
  await updateAllUsersTotalScore();
  console.log('Daily score update completed.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
