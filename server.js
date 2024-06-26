const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const kegiatanRoutes = require('./routes/kegiatanRoutes.js');
const questionRoutes = require('./routes/questionRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes.js');
const newsRoutes = require('./routes/newsRoutes.js');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('./middlewares/jwtMiddleware.js'); 
var cron = require('node-cron');
const { updateAllUsersTotalScore } = require('./controllers/kegiatanController.js');
// const path = require('path');

require('dotenv').config();
const setupAdmin = require('./setup/setupAdmin.js');

// const { createAgent } = require('@forestadmin/agent');
// const { createSqlDataSource } = require('@forestadmin/datasource-sql');

const app = express();
const prisma = new PrismaClient();

// createAgent({
//   authSecret: process.env.FOREST_AUTH_SECRET,
//   envSecret: process.env.FOREST_ENV_SECRET,
//   isProduction: process.env.NODE_ENV === 'production',

// })
//   .addDataSource(createSqlDataSource(process.env.DATABASE_URL))
//   .mountOnExpress(app)
//   .start();

// app.use(session({ secret: process.env.GOOGLE_CLIENT_SECRET, resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));
app.use('/auth', authRoutes);

// app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));
// app.use(authenticateToken);

app.use('/user', authenticateToken, userRoutes);
app.use('/profile', authenticateToken, profileRoutes);
app.use('/kegiatan', authenticateToken, kegiatanRoutes);
app.use('/question', authenticateToken, questionRoutes);
app.use('/notification', authenticateToken, notificationRoutes);
app.use('/news', authenticateToken, newsRoutes);

cron.schedule('26 1 * * *', async () => {
  console.log('Running daily score update...');
  await updateAllUsersTotalScore();
  console.log('Daily score update completed.');
}, {
  scheduled: true,
  timezone: "Asia/Jakarta"
});

async function initializeApp() {
  try {
    await setupAdmin();
  } catch (e) {
    console.error('Error during initialization:', e);
  } finally {
    await prisma.$disconnect();
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

initializeApp();