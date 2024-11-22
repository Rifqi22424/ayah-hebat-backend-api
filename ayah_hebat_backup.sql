-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: ayah_hebat
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('4177a30c-4732-4b0c-9e96-2921f8078e16','76ef8b504a91314510b25bdf73a7f70bf7befdd5ac7247b23e19cb59808266e9','2024-11-14 05:43:04.938','20241114054303_init_migration_book',NULL,NULL,'2024-11-14 05:43:03.349',1),('6f61fc5f-a930-436b-ad7b-9bfa5c10a0e1','ad28d6de968fec3b0a5e8d13457e7dc8a09ce38b3b6cccca3b232f0661428b48','2024-11-21 08:52:26.527','20241121084447_add_location_to_book',NULL,NULL,'2024-11-21 08:52:26.469',1),('94403dc8-6c8a-4b95-b6e3-87c85a3e4f3c','6d5de214b4bc062e3e1d88c97a0f492c9c18a9a942b245bd67cd690f9074126c',NULL,'20241121052637_edit_enum_pinjam_buku','A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20241121052637_edit_enum_pinjam_buku\n\nDatabase error code: 1265\n\nDatabase error:\nData truncated for column \'status\' at row 6\n\nPlease check the query number 1 from the migration file.\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name=\"20241121052637_edit_enum_pinjam_buku\"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name=\"20241121052637_edit_enum_pinjam_buku\"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:201','2024-11-21 05:43:03.381','2024-11-21 05:26:37.809',0),('948e9a85-5977-4c73-84a6-8f94b24a9a2a','f313047188bf29bac296fa20b966cd9c9ef91fe28b474610ed25dc09ecb774a0','2024-11-18 13:21:14.648','20241118132114_change_description_of_comment_book_to_text',NULL,NULL,'2024-11-18 13:21:14.584',1),('fc02fd59-18dd-4f94-94c3-f51b3ba3f560','6d5de214b4bc062e3e1d88c97a0f492c9c18a9a942b245bd67cd690f9074126c','2024-11-21 05:43:03.384','20241121052637_edit_enum_pinjam_buku','',NULL,'2024-11-21 05:43:03.384',0);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` int NOT NULL,
  `imageurl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',0,'photo-1731905658877-124497388.png',''),(2,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',-1,'photo-1731909810551-922254709.png',''),(3,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',2,'photo-1731910304208-30028576.png',''),(4,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',4,'photo-1731910310666-593460260.png',''),(5,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',4,'photo-1731910314310-95640008.png',''),(6,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',4,'photo-1731910319418-637980005.png',''),(7,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',4,'photo-1731910324644-810384089.png',''),(8,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',4,'photo-1731910328596-483269226.png',''),(9,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',4,'photo-1731910333503-239851420.png',''),(10,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',4,'photo-1731910339142-884756403.png',''),(12,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',4,'photo-1732074877710-477866345.png',''),(13,'Meniti Jalan Hidup di Bawah Naungan Al-Qur\'an','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',4,'photo-1732075193731-528840599.png',''),(14,'Coba','Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.',4,'photo-1732075224292-66159416.png','');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookcategories`
--

DROP TABLE IF EXISTS `bookcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookcategories` (
  `bookId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`categoryId`,`bookId`),
  KEY `BookCategories_bookId_fkey` (`bookId`),
  CONSTRAINT `BookCategories_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BookCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookcategories`
--

LOCK TABLES `bookcategories` WRITE;
/*!40000 ALTER TABLE `bookcategories` DISABLE KEYS */;
INSERT INTO `bookcategories` VALUES (1,2),(2,1),(3,3),(4,1),(5,1),(6,1),(7,1),(8,1),(9,5),(10,6),(12,2),(13,2),(13,4),(14,1),(14,2),(14,3),(14,4),(14,5);
/*!40000 ALTER TABLE `bookcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Politics'),(2,'Islamic'),(3,'Education'),(4,'Horror'),(5,'Science Fiction'),(6,'Emotional');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `postId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Comment_userId_fkey` (`userId`),
  KEY `Comment_postId_fkey` (`postId`),
  CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentbook`
--

DROP TABLE IF EXISTS `commentbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentbook` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `bookId` int NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CommentBook_userId_fkey` (`userId`),
  KEY `CommentBook_bookId_fkey` (`bookId`),
  CONSTRAINT `CommentBook_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `CommentBook_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentbook`
--

LOCK TABLES `commentbook` WRITE;
/*!40000 ALTER TABLE `commentbook` DISABLE KEYS */;
INSERT INTO `commentbook` VALUES (1,2,1,'coba','2024-11-18 13:14:56.568','2024-11-18 13:14:56.568'),(2,2,1,'Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.','2024-11-18 13:21:25.763','2024-11-18 13:21:25.763'),(3,2,1,'Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.','2024-11-18 13:21:43.685','2024-11-18 13:21:43.685'),(4,2,1,'Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.','2024-11-18 13:21:46.208','2024-11-18 13:21:46.208'),(5,2,2,'Buku ini mengajak pembaca untuk memahami dan menghayati nilai-nilai Al-Qur\'an dalam kehidupan sehari-hari. Setiap bab mengupas konsep penting dalam Islam, seperti ketakwaan, sabar, dan ikhlas, dengan penjelasan yang mudah dipahami dan penuh hikmah. Cocok untuk mereka yang ingin memperdalam spiritualitas dan menjalani hidup lebih bermakna sesuai ajaran Islam.','2024-11-18 13:21:57.978','2024-11-18 13:21:57.978');
/*!40000 ALTER TABLE `commentbook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentlike`
--

DROP TABLE IF EXISTS `commentlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentlike` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `commentId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CommentLike_userId_fkey` (`userId`),
  KEY `CommentLike_commentId_fkey` (`commentId`),
  CONSTRAINT `CommentLike_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CommentLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentlike`
--

LOCK TABLES `commentlike` WRITE;
/*!40000 ALTER TABLE `commentlike` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentlike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `errorlog`
--

DROP TABLE IF EXISTS `errorlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `errorlog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `errorMessage` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `stackTrace` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `errorlog`
--

LOCK TABLES `errorlog` WRITE;
/*!40000 ALTER TABLE `errorlog` DISABLE KEYS */;
INSERT INTO `errorlog` VALUES (1,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:34:49.700'),(2,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:35:12.048'),(3,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:35:29.169'),(4,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:35:39.906'),(5,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:35:53.931'),(6,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:38:39.845'),(7,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:39:12.936'),(8,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:41:33.499'),(9,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:43:03.543'),(10,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:43:17.418'),(11,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:44:34.401'),(12,'ENOENT: no such file or directory, open \'D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\uploads\\books\\photo-1731905125188-748673962.png\'','Error: ENOENT: no such file or directory, open \'D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\uploads\\books\\photo-1731905125188-748673962.png\'','2024-11-18 04:45:25.203'),(13,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:46:20.220'),(14,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:46:34.117'),(15,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:46:45.762'),(16,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:47:27.405'),(17,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:200:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:47:45.621'),(18,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:47:53.218'),(19,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:48:20.543'),(20,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:49:03.386'),(21,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:49:20.168'),(22,'Unexpected field','MulterError: Unexpected field\n    at wrappedFileFilter (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\index.js:40:19)\n    at Multipart.<anonymous> (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\multer\\lib\\make-middleware.js:107:7)\n    at Multipart.emit (node:events:517:28)\n    at HeaderParser.cb (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:358:14)\n    at HeaderParser.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:162:20)\n    at SBMH.ssCb [as _cb] (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:394:37)\n    at feed (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:248:10)\n    at SBMH.push (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\streamsearch\\lib\\sbmh.js:104:16)\n    at Multipart._write (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\busboy\\lib\\types\\multipart.js:567:19)\n    at writeOrBuffer (node:internal/streams/writable:392:12)','2024-11-18 04:49:51.621'),(23,'ENOENT: no such file or directory, open \'D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\uploads\\books\\photo-1731905530182-599108746.png\'','Error: ENOENT: no such file or directory, open \'D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\uploads\\books\\photo-1731905530182-599108746.png\'','2024-11-18 04:52:10.190'),(24,'ENOENT: no such file or directory, open \'D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\uploads\\books\\photo-1731905586803-316114896.png\'','Error: ENOENT: no such file or directory, open \'D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\uploads\\books\\photo-1731905586803-316114896.png\'','2024-11-18 04:53:06.808'),(25,'ENOENT: no such file or directory, open \'D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\uploads\\books\\photo-1731905600068-581060453.png\'','Error: ENOENT: no such file or directory, open \'D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\uploads\\books\\photo-1731905600068-581060453.png\'','2024-11-18 04:53:20.077'),(26,'Cannot find module \'../encodings\'\nRequire stack:\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\iconv-lite\\lib\\index.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\raw-body\\index.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\body-parser\\lib\\read.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\body-parser\\lib\\types\\json.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\body-parser\\index.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\express\\lib\\express.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\express\\index.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\server.js','Error: Cannot find module \'../encodings\'\nRequire stack:\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\iconv-lite\\lib\\index.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\raw-body\\index.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\body-parser\\lib\\read.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\body-parser\\lib\\types\\json.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\body-parser\\index.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\express\\lib\\express.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\express\\index.js\n- D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\server.js\n    at Module._resolveFilename (node:internal/modules/cjs/loader:1134:15)\n    at Module._load (node:internal/modules/cjs/loader:975:27)\n    at Module.require (node:internal/modules/cjs/loader:1225:19)\n    at require (node:internal/modules/helpers:177:18)\n    at Object.getCodec (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\iconv-lite\\lib\\index.js:65:27)\n    at Object.getDecoder (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\iconv-lite\\lib\\index.js:127:23)\n    at getDecoder (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\raw-body\\index.js:46:18)\n    at readStream (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\raw-body\\index.js:194:15)\n    at getRawBody (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\raw-body\\index.js:116:12)\n    at read (D:\\NodeJs\\ayah_hebat_github\\ayah-hebat-backend-api\\node_modules\\body-parser\\lib\\read.js:79:3)','2024-11-21 05:58:40.175');
/*!40000 ALTER TABLE `errorlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kegiatan`
--

DROP TABLE IF EXISTS `kegiatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kegiatan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `file1` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file2` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file3` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `score` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Kegiatan_userId_fkey` (`userId`),
  CONSTRAINT `Kegiatan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kegiatan`
--

LOCK TABLES `kegiatan` WRITE;
/*!40000 ALTER TABLE `kegiatan` DISABLE KEYS */;
INSERT INTO `kegiatan` VALUES (1,'MasaIyah (Magrib sampai Isya ditemanI ayah)',NULL,NULL,NULL,3,10,'2024-11-15 03:40:31.537','2024-11-15 03:40:31.537'),(2,'MasaIyah (Magrib sampai Isya ditemanI ayah)',NULL,NULL,NULL,2,10,'2024-11-15 03:48:32.981','2024-11-15 03:48:32.981'),(3,'Berkisah',NULL,NULL,NULL,6,10,'2024-11-15 03:48:52.985','2024-11-15 03:48:52.985');
/*!40000 ALTER TABLE `kegiatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subTitle` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (11,'Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','author','https://dhrqldvp-3000.asse.devtunnels.ms/uploads/photo-1731641963652-493603247.png','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita. Namun, bahaya anak dan ponsel cerdas yang tidak terawasi dengan baik dapat menimbulkan berbagai bahaya dan risiko.\nArtikel ini akan membahas bahaya yang mungkin terjadi ketika anak-anak menggunakan ponsel cerdas tanpa pengawasan yang memadai.\n# Akibat buat Anak :\n1. Penurunan Kualitas Hidup: Penggunaan ponsel cerdas yang berlebihan dapat mengganggu kegiatan sehari-hari yang penting, seperti tidur yang cukup, berinteraksi secara langsung dengan keluarga dan teman, atau berpartisipasi dalam aktivitas fisik dan kreatif.\n2. Gangguan Belajar dan Akademik: Penggunaan ponsel cerdas tanpa pengawasan yang memadai dapat mengganggu fokus dan konsentrasi anak-anak dalam belajar.\n3. Perubahan Pola Tidur: Ponsel cerdas sering kali digunakan anak-anak di malam hari, yang dapat mengganggu pola tidur yang sehat. Paparan cahaya biru dari layar ponsel cerdas dapat mengganggu produksi hormon tidur dan menghambat kualitas tidur, yang pada gilirannya dapat berdampak negatif pada kesehatan fisik dan mental anak-anak.\n4. Menurunnya Aktivitas Fisik: Penggunaan ponsel cerdas yang berlebihan dapat mengurangi waktu yang dihabiskan anak-anak untuk berpartisipasi dalam aktivitas fisik dan olahraga.\n5. Tidak Menjalin Hubungan yang Kuat dengan Orang Lain: Penggunaan ponsel cerdas yang berlebihan dapat menghambat kemampuan anak-anak untuk menjalin hubungan yang kuat dan bermakna dengan orang lain.\n6. Gangguan pada Kesehatan Mental: Penggunaan ponsel cerdas yang berlebihan tanpa pengawasan dapat berdampak negatif pada kesehatan mental anak-anak. Mereka mungkin terjebak dalam pola perilaku yang tidak sehat, seperti kecanduan media sosial, permainan online, atau pembandingan diri yang berlebihan dengan orang lain.\n7. Risiko Keamanan dan Privasi: Penggunaan ponsel cerdas oleh anak-anak yang tidak terawasi juga dapat meningkatkan risiko keamanan dan privasi. Anak-anak mungkin tidak menyadari risiko yang terkait dengan berbagi informasi pribadi secara online atau berinteraksi dengan orang asing melalui media sosial atau aplikasi pesan.\nBeberapa poin dan informasi diatas mudah-mudahan dapat memberikan sebuah perhatian untuk kita semua sebagai orang tua yang berperan penting untuk pertumbuhan anak-anak kita, Jika ada saran atau tanggapan yang dapat membangun untuk kemajuan bersama, silahkan dapat kirimkan melalui Email atau form Kontak Kami.','2024-11-15 03:39:23.763','2024-11-15 03:39:23.763'),(12,'Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','author','https://dhrqldvp-3000.asse.devtunnels.ms/uploads/photo-1731641969908-509892298.png','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita. Namun, bahaya anak dan ponsel cerdas yang tidak terawasi dengan baik dapat menimbulkan berbagai bahaya dan risiko.\nArtikel ini akan membahas bahaya yang mungkin terjadi ketika anak-anak menggunakan ponsel cerdas tanpa pengawasan yang memadai.\n# Akibat buat Anak :\n1. Penurunan Kualitas Hidup: Penggunaan ponsel cerdas yang berlebihan dapat mengganggu kegiatan sehari-hari yang penting, seperti tidur yang cukup, berinteraksi secara langsung dengan keluarga dan teman, atau berpartisipasi dalam aktivitas fisik dan kreatif.\n2. Gangguan Belajar dan Akademik: Penggunaan ponsel cerdas tanpa pengawasan yang memadai dapat mengganggu fokus dan konsentrasi anak-anak dalam belajar.\n3. Perubahan Pola Tidur: Ponsel cerdas sering kali digunakan anak-anak di malam hari, yang dapat mengganggu pola tidur yang sehat. Paparan cahaya biru dari layar ponsel cerdas dapat mengganggu produksi hormon tidur dan menghambat kualitas tidur, yang pada gilirannya dapat berdampak negatif pada kesehatan fisik dan mental anak-anak.\n4. Menurunnya Aktivitas Fisik: Penggunaan ponsel cerdas yang berlebihan dapat mengurangi waktu yang dihabiskan anak-anak untuk berpartisipasi dalam aktivitas fisik dan olahraga.\n5. Tidak Menjalin Hubungan yang Kuat dengan Orang Lain: Penggunaan ponsel cerdas yang berlebihan dapat menghambat kemampuan anak-anak untuk menjalin hubungan yang kuat dan bermakna dengan orang lain.\n6. Gangguan pada Kesehatan Mental: Penggunaan ponsel cerdas yang berlebihan tanpa pengawasan dapat berdampak negatif pada kesehatan mental anak-anak. Mereka mungkin terjebak dalam pola perilaku yang tidak sehat, seperti kecanduan media sosial, permainan online, atau pembandingan diri yang berlebihan dengan orang lain.\n7. Risiko Keamanan dan Privasi: Penggunaan ponsel cerdas oleh anak-anak yang tidak terawasi juga dapat meningkatkan risiko keamanan dan privasi. Anak-anak mungkin tidak menyadari risiko yang terkait dengan berbagi informasi pribadi secara online atau berinteraksi dengan orang asing melalui media sosial atau aplikasi pesan.\nBeberapa poin dan informasi diatas mudah-mudahan dapat memberikan sebuah perhatian untuk kita semua sebagai orang tua yang berperan penting untuk pertumbuhan anak-anak kita, Jika ada saran atau tanggapan yang dapat membangun untuk kemajuan bersama, silahkan dapat kirimkan melalui Email atau form Kontak Kami.','2024-11-15 03:39:30.021','2024-11-15 03:39:30.021'),(13,'Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','author','https://dhrqldvp-3000.asse.devtunnels.ms/uploads/photo-1731641978308-447447724.png','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita. Namun, bahaya anak dan ponsel cerdas yang tidak terawasi dengan baik dapat menimbulkan berbagai bahaya dan risiko.\nArtikel ini akan membahas bahaya yang mungkin terjadi ketika anak-anak menggunakan ponsel cerdas tanpa pengawasan yang memadai.\n# Akibat buat Anak :\n1. Penurunan Kualitas Hidup: Penggunaan ponsel cerdas yang berlebihan dapat mengganggu kegiatan sehari-hari yang penting, seperti tidur yang cukup, berinteraksi secara langsung dengan keluarga dan teman, atau berpartisipasi dalam aktivitas fisik dan kreatif.\n2. Gangguan Belajar dan Akademik: Penggunaan ponsel cerdas tanpa pengawasan yang memadai dapat mengganggu fokus dan konsentrasi anak-anak dalam belajar.\n3. Perubahan Pola Tidur: Ponsel cerdas sering kali digunakan anak-anak di malam hari, yang dapat mengganggu pola tidur yang sehat. Paparan cahaya biru dari layar ponsel cerdas dapat mengganggu produksi hormon tidur dan menghambat kualitas tidur, yang pada gilirannya dapat berdampak negatif pada kesehatan fisik dan mental anak-anak.\n4. Menurunnya Aktivitas Fisik: Penggunaan ponsel cerdas yang berlebihan dapat mengurangi waktu yang dihabiskan anak-anak untuk berpartisipasi dalam aktivitas fisik dan olahraga.\n5. Tidak Menjalin Hubungan yang Kuat dengan Orang Lain: Penggunaan ponsel cerdas yang berlebihan dapat menghambat kemampuan anak-anak untuk menjalin hubungan yang kuat dan bermakna dengan orang lain.\n6. Gangguan pada Kesehatan Mental: Penggunaan ponsel cerdas yang berlebihan tanpa pengawasan dapat berdampak negatif pada kesehatan mental anak-anak. Mereka mungkin terjebak dalam pola perilaku yang tidak sehat, seperti kecanduan media sosial, permainan online, atau pembandingan diri yang berlebihan dengan orang lain.\n7. Risiko Keamanan dan Privasi: Penggunaan ponsel cerdas oleh anak-anak yang tidak terawasi juga dapat meningkatkan risiko keamanan dan privasi. Anak-anak mungkin tidak menyadari risiko yang terkait dengan berbagi informasi pribadi secara online atau berinteraksi dengan orang asing melalui media sosial atau aplikasi pesan.\nBeberapa poin dan informasi diatas mudah-mudahan dapat memberikan sebuah perhatian untuk kita semua sebagai orang tua yang berperan penting untuk pertumbuhan anak-anak kita, Jika ada saran atau tanggapan yang dapat membangun untuk kemajuan bersama, silahkan dapat kirimkan melalui Email atau form Kontak Kami.','2024-11-15 03:39:38.412','2024-11-15 03:39:38.412'),(14,'Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','author','https://dhrqldvp-3000.asse.devtunnels.ms/uploads/photo-1731641979611-482537215.png','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita. Namun, bahaya anak dan ponsel cerdas yang tidak terawasi dengan baik dapat menimbulkan berbagai bahaya dan risiko.\nArtikel ini akan membahas bahaya yang mungkin terjadi ketika anak-anak menggunakan ponsel cerdas tanpa pengawasan yang memadai.\n# Akibat buat Anak :\n1. Penurunan Kualitas Hidup: Penggunaan ponsel cerdas yang berlebihan dapat mengganggu kegiatan sehari-hari yang penting, seperti tidur yang cukup, berinteraksi secara langsung dengan keluarga dan teman, atau berpartisipasi dalam aktivitas fisik dan kreatif.\n2. Gangguan Belajar dan Akademik: Penggunaan ponsel cerdas tanpa pengawasan yang memadai dapat mengganggu fokus dan konsentrasi anak-anak dalam belajar.\n3. Perubahan Pola Tidur: Ponsel cerdas sering kali digunakan anak-anak di malam hari, yang dapat mengganggu pola tidur yang sehat. Paparan cahaya biru dari layar ponsel cerdas dapat mengganggu produksi hormon tidur dan menghambat kualitas tidur, yang pada gilirannya dapat berdampak negatif pada kesehatan fisik dan mental anak-anak.\n4. Menurunnya Aktivitas Fisik: Penggunaan ponsel cerdas yang berlebihan dapat mengurangi waktu yang dihabiskan anak-anak untuk berpartisipasi dalam aktivitas fisik dan olahraga.\n5. Tidak Menjalin Hubungan yang Kuat dengan Orang Lain: Penggunaan ponsel cerdas yang berlebihan dapat menghambat kemampuan anak-anak untuk menjalin hubungan yang kuat dan bermakna dengan orang lain.\n6. Gangguan pada Kesehatan Mental: Penggunaan ponsel cerdas yang berlebihan tanpa pengawasan dapat berdampak negatif pada kesehatan mental anak-anak. Mereka mungkin terjebak dalam pola perilaku yang tidak sehat, seperti kecanduan media sosial, permainan online, atau pembandingan diri yang berlebihan dengan orang lain.\n7. Risiko Keamanan dan Privasi: Penggunaan ponsel cerdas oleh anak-anak yang tidak terawasi juga dapat meningkatkan risiko keamanan dan privasi. Anak-anak mungkin tidak menyadari risiko yang terkait dengan berbagi informasi pribadi secara online atau berinteraksi dengan orang asing melalui media sosial atau aplikasi pesan.\nBeberapa poin dan informasi diatas mudah-mudahan dapat memberikan sebuah perhatian untuk kita semua sebagai orang tua yang berperan penting untuk pertumbuhan anak-anak kita, Jika ada saran atau tanggapan yang dapat membangun untuk kemajuan bersama, silahkan dapat kirimkan melalui Email atau form Kontak Kami.','2024-11-15 03:39:39.727','2024-11-15 03:39:39.727'),(15,'Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','author','https://dhrqldvp-3000.asse.devtunnels.ms/uploads/photo-1731641980865-347281494.png','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita. Namun, bahaya anak dan ponsel cerdas yang tidak terawasi dengan baik dapat menimbulkan berbagai bahaya dan risiko.\nArtikel ini akan membahas bahaya yang mungkin terjadi ketika anak-anak menggunakan ponsel cerdas tanpa pengawasan yang memadai.\n# Akibat buat Anak :\n1. Penurunan Kualitas Hidup: Penggunaan ponsel cerdas yang berlebihan dapat mengganggu kegiatan sehari-hari yang penting, seperti tidur yang cukup, berinteraksi secara langsung dengan keluarga dan teman, atau berpartisipasi dalam aktivitas fisik dan kreatif.\n2. Gangguan Belajar dan Akademik: Penggunaan ponsel cerdas tanpa pengawasan yang memadai dapat mengganggu fokus dan konsentrasi anak-anak dalam belajar.\n3. Perubahan Pola Tidur: Ponsel cerdas sering kali digunakan anak-anak di malam hari, yang dapat mengganggu pola tidur yang sehat. Paparan cahaya biru dari layar ponsel cerdas dapat mengganggu produksi hormon tidur dan menghambat kualitas tidur, yang pada gilirannya dapat berdampak negatif pada kesehatan fisik dan mental anak-anak.\n4. Menurunnya Aktivitas Fisik: Penggunaan ponsel cerdas yang berlebihan dapat mengurangi waktu yang dihabiskan anak-anak untuk berpartisipasi dalam aktivitas fisik dan olahraga.\n5. Tidak Menjalin Hubungan yang Kuat dengan Orang Lain: Penggunaan ponsel cerdas yang berlebihan dapat menghambat kemampuan anak-anak untuk menjalin hubungan yang kuat dan bermakna dengan orang lain.\n6. Gangguan pada Kesehatan Mental: Penggunaan ponsel cerdas yang berlebihan tanpa pengawasan dapat berdampak negatif pada kesehatan mental anak-anak. Mereka mungkin terjebak dalam pola perilaku yang tidak sehat, seperti kecanduan media sosial, permainan online, atau pembandingan diri yang berlebihan dengan orang lain.\n7. Risiko Keamanan dan Privasi: Penggunaan ponsel cerdas oleh anak-anak yang tidak terawasi juga dapat meningkatkan risiko keamanan dan privasi. Anak-anak mungkin tidak menyadari risiko yang terkait dengan berbagi informasi pribadi secara online atau berinteraksi dengan orang asing melalui media sosial atau aplikasi pesan.\nBeberapa poin dan informasi diatas mudah-mudahan dapat memberikan sebuah perhatian untuk kita semua sebagai orang tua yang berperan penting untuk pertumbuhan anak-anak kita, Jika ada saran atau tanggapan yang dapat membangun untuk kemajuan bersama, silahkan dapat kirimkan melalui Email atau form Kontak Kami.','2024-11-15 03:39:40.971','2024-11-15 03:39:40.971'),(16,'Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','author','https://dhrqldvp-3000.asse.devtunnels.ms/uploads/photo-1731641982204-991424903.png','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita. Namun, bahaya anak dan ponsel cerdas yang tidak terawasi dengan baik dapat menimbulkan berbagai bahaya dan risiko.\nArtikel ini akan membahas bahaya yang mungkin terjadi ketika anak-anak menggunakan ponsel cerdas tanpa pengawasan yang memadai.\n# Akibat buat Anak :\n1. Penurunan Kualitas Hidup: Penggunaan ponsel cerdas yang berlebihan dapat mengganggu kegiatan sehari-hari yang penting, seperti tidur yang cukup, berinteraksi secara langsung dengan keluarga dan teman, atau berpartisipasi dalam aktivitas fisik dan kreatif.\n2. Gangguan Belajar dan Akademik: Penggunaan ponsel cerdas tanpa pengawasan yang memadai dapat mengganggu fokus dan konsentrasi anak-anak dalam belajar.\n3. Perubahan Pola Tidur: Ponsel cerdas sering kali digunakan anak-anak di malam hari, yang dapat mengganggu pola tidur yang sehat. Paparan cahaya biru dari layar ponsel cerdas dapat mengganggu produksi hormon tidur dan menghambat kualitas tidur, yang pada gilirannya dapat berdampak negatif pada kesehatan fisik dan mental anak-anak.\n4. Menurunnya Aktivitas Fisik: Penggunaan ponsel cerdas yang berlebihan dapat mengurangi waktu yang dihabiskan anak-anak untuk berpartisipasi dalam aktivitas fisik dan olahraga.\n5. Tidak Menjalin Hubungan yang Kuat dengan Orang Lain: Penggunaan ponsel cerdas yang berlebihan dapat menghambat kemampuan anak-anak untuk menjalin hubungan yang kuat dan bermakna dengan orang lain.\n6. Gangguan pada Kesehatan Mental: Penggunaan ponsel cerdas yang berlebihan tanpa pengawasan dapat berdampak negatif pada kesehatan mental anak-anak. Mereka mungkin terjebak dalam pola perilaku yang tidak sehat, seperti kecanduan media sosial, permainan online, atau pembandingan diri yang berlebihan dengan orang lain.\n7. Risiko Keamanan dan Privasi: Penggunaan ponsel cerdas oleh anak-anak yang tidak terawasi juga dapat meningkatkan risiko keamanan dan privasi. Anak-anak mungkin tidak menyadari risiko yang terkait dengan berbagi informasi pribadi secara online atau berinteraksi dengan orang asing melalui media sosial atau aplikasi pesan.\nBeberapa poin dan informasi diatas mudah-mudahan dapat memberikan sebuah perhatian untuk kita semua sebagai orang tua yang berperan penting untuk pertumbuhan anak-anak kita, Jika ada saran atau tanggapan yang dapat membangun untuk kemajuan bersama, silahkan dapat kirimkan melalui Email atau form Kontak Kami.','2024-11-15 03:39:42.324','2024-11-15 03:39:42.324');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` json NOT NULL,
  `userId` int NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Notification_userId_fkey` (`userId`),
  CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peminjaman`
--

DROP TABLE IF EXISTS `peminjaman`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peminjaman` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookId` int NOT NULL,
  `userId` int NOT NULL,
  `status` enum('PENGAJUAN','DIIZINKAN_DIAMBIL','SUDAH_DIAMBIL','SUDAH_DIKEMBALIKAN','DIBATALKAN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENGAJUAN',
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Peminjaman_bookId_fkey` (`bookId`),
  KEY `Peminjaman_userId_fkey` (`userId`),
  CONSTRAINT `Peminjaman_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Peminjaman_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peminjaman`
--

LOCK TABLES `peminjaman` WRITE;
/*!40000 ALTER TABLE `peminjaman` DISABLE KEYS */;
INSERT INTO `peminjaman` VALUES (1,1,2,'DIIZINKAN_DIAMBIL','2024-11-21 06:06:36.718','2024-11-24 17:00:00.000','2024-11-21 06:06:36.719'),(2,1,2,'DIIZINKAN_DIAMBIL','2024-11-21 06:10:13.418','2024-11-24 17:00:00.000','2024-11-21 06:10:13.420'),(3,1,2,'PENGAJUAN','2024-11-21 06:10:14.645','2024-11-24 17:00:00.000','2024-11-21 06:10:14.647'),(4,1,2,'PENGAJUAN','2024-11-21 06:10:15.850','2024-11-24 17:00:00.000','2024-11-21 06:10:15.852'),(5,1,2,'PENGAJUAN','2024-11-21 06:10:16.935','2024-11-24 17:00:00.000','2024-11-21 06:10:16.936'),(6,3,2,'DIIZINKAN_DIAMBIL','2024-11-21 06:12:36.506','2024-11-24 17:00:00.000','2024-11-21 06:12:36.510'),(7,3,2,'PENGAJUAN','2024-11-21 06:12:37.725','2024-11-24 17:00:00.000','2024-11-21 06:12:37.727');
/*!40000 ALTER TABLE `peminjaman` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Post_userId_fkey` (`userId`),
  CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,6,'halo','2024-11-15 03:49:51.808','2024-11-15 03:49:51.808');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postdislike`
--

DROP TABLE IF EXISTS `postdislike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postdislike` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `PostDislike_userId_fkey` (`userId`),
  KEY `PostDislike_postId_fkey` (`postId`),
  CONSTRAINT `PostDislike_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PostDislike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postdislike`
--

LOCK TABLES `postdislike` WRITE;
/*!40000 ALTER TABLE `postdislike` DISABLE KEYS */;
/*!40000 ALTER TABLE `postdislike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postlike`
--

DROP TABLE IF EXISTS `postlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postlike` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `PostLike_userId_fkey` (`userId`),
  KEY `PostLike_postId_fkey` (`postId`),
  CONSTRAINT `PostLike_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PostLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postlike`
--

LOCK TABLES `postlike` WRITE;
/*!40000 ALTER TABLE `postlike` DISABLE KEYS */;
/*!40000 ALTER TABLE `postlike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `namaIstri` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `namaKuttab` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `namaAnak` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tahunMasukKuttab` int DEFAULT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Profile_userId_key` (`userId`),
  CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'Rifqi','Seorang','photo-1731630291460-171911377.png','Aisyah','Kutab Alfatih Sukabumi','Ujang',2022,2),(2,'siapa','hidup mulia atau mati syahids','photo-1731642197629-275435792.png','uhuy',NULL,'hasem',2021,5),(3,'siapa','hidup mulia atau mati syahids','photo-1731642230031-315341583.png','uhuy',NULL,'hasem',2021,6),(4,'ilham','Seorang','photo-1731640269767-56900591.png','aisyah','Kutab Alfatih Sukabumi','ujang',2000,3),(5,NULL,'hidup mulia atau mati syahid',NULL,'Nabila',NULL,'Husain',2022,7);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isAnswer` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `commentId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Reply_userId_fkey` (`userId`),
  KEY `Reply_commentId_fkey` (`commentId`),
  CONSTRAINT `Reply_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reply_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replylike`
--

DROP TABLE IF EXISTS `replylike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `replylike` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `replyId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ReplyLike_userId_fkey` (`userId`),
  KEY `ReplyLike_replyId_fkey` (`replyId`),
  CONSTRAINT `ReplyLike_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `reply` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ReplyLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replylike`
--

LOCK TABLES `replylike` WRITE;
/*!40000 ALTER TABLE `replylike` DISABLE KEYS */;
/*!40000 ALTER TABLE `replylike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int DEFAULT NULL,
  `commentId` int DEFAULT NULL,
  `replyId` int DEFAULT NULL,
  `reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Report_userId_fkey` (`userId`),
  KEY `Report_postId_fkey` (`postId`),
  KEY `Report_commentId_fkey` (`commentId`),
  KEY `Report_replyId_fkey` (`replyId`),
  CONSTRAINT `Report_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Report_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Report_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `reply` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Report_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `verificationCode` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleteAccountVerficationCode` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleteReason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `fcmToken` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totalScoreYear` int DEFAULT '0',
  `totalScoreMonth` int DEFAULT '0',
  `totalScoreDay` int DEFAULT '0',
  `role` enum('ADMIN','USER') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','$2b$10$myTRjJegdYxrm6R1LBNUc.n2iBTD2vkrhJrey7RrQkMmjKSNIiicS',1,NULL,NULL,NULL,1,NULL,0,0,0,'ADMIN'),(2,'username','rifqi@gmail.com','$2b$10$e5y0JXNmAAmA/uDyFjYPGeUr13WR.Bog4UeB2BVgFXE6J03OzyIFa',1,NULL,NULL,NULL,1,'cNqemd4zQ_GHKAbDmSQlzU:APA91bHbfKw3H8byguwvTW5y4Y8IDqJHdKcrixBPPHEBHySqGZBgVfmMZF30AROjBDXugscKhwbOwlYAGlDvSatU1WZhHJkEu3LwNg-aHDYRSVQMcESLJU8',10,10,10,'USER'),(3,'username1','gmail@gmail.com','$2b$10$.jC/ETnFK20hi701LUoDr.1RLceGx1Gzp4Yipx10nUUPyqsDjXh5u',1,NULL,NULL,NULL,1,'cNqemd4zQ_GHKAbDmSQlzU:APA91bHbfKw3H8byguwvTW5y4Y8IDqJHdKcrixBPPHEBHySqGZBgVfmMZF30AROjBDXugscKhwbOwlYAGlDvSatU1WZhHJkEu3LwNg-aHDYRSVQMcESLJU8',10,10,10,'USER'),(5,'username2','gmail1@gmail.com','$2b$10$WsZstNmAlyq/5NP469cZcefqkFEzDVF1XUO7jq6Tiyq.pEanCbobC',1,NULL,NULL,NULL,1,NULL,0,0,0,'USER'),(6,'username3','gmail2@gmail.com','$2b$10$EOb2Pv5wTCCKb5o.v6qjq.Uwzy7pMD6vpMu/H9knLqwvMuNnM1dAW',1,NULL,NULL,NULL,1,'cNqemd4zQ_GHKAbDmSQlzU:APA91bHbfKw3H8byguwvTW5y4Y8IDqJHdKcrixBPPHEBHySqGZBgVfmMZF30AROjBDXugscKhwbOwlYAGlDvSatU1WZhHJkEu3LwNg-aHDYRSVQMcESLJU8',10,10,10,'USER'),(7,'username4','gmail3@gmail.com','$2b$10$si7Uq9QWmdGNPYGfAEcRSukuWA1uurDa.sVpxasRN0HHPZ9Q4Y37e',1,NULL,NULL,NULL,1,NULL,0,0,0,'USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdeleted`
--

DROP TABLE IF EXISTS `userdeleted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdeleted` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleteReason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `deletedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdeleted`
--

LOCK TABLES `userdeleted` WRITE;
/*!40000 ALTER TABLE `userdeleted` DISABLE KEYS */;
/*!40000 ALTER TABLE `userdeleted` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-21 16:02:54
