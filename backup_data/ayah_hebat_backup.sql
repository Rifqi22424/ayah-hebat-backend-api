-- MySQL dump 10.19  Distrib 10.3.39-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ayah_hebat
-- ------------------------------------------------------
-- Server version	10.3.39-MariaDB-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `body` text NOT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CommentLike`
--

DROP TABLE IF EXISTS `CommentLike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CommentLike` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CommentLike`
--

LOCK TABLES `CommentLike` WRITE;
/*!40000 ALTER TABLE `CommentLike` DISABLE KEYS */;
/*!40000 ALTER TABLE `CommentLike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ErrorLog`
--

DROP TABLE IF EXISTS `ErrorLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ErrorLog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `errorMessage` text NOT NULL,
  `stackTrace` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ErrorLog`
--

LOCK TABLES `ErrorLog` WRITE;
/*!40000 ALTER TABLE `ErrorLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `ErrorLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Kegiatan`
--

DROP TABLE IF EXISTS `Kegiatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Kegiatan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `file1` varchar(191) DEFAULT NULL,
  `file2` varchar(191) DEFAULT NULL,
  `file3` varchar(191) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Kegiatan_userId_fkey` (`userId`),
  CONSTRAINT `Kegiatan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Kegiatan`
--

LOCK TABLES `Kegiatan` WRITE;
/*!40000 ALTER TABLE `Kegiatan` DISABLE KEYS */;
INSERT INTO `Kegiatan` VALUES (1,'Diari (Dialog iman sekali sehari)','file1-1711515688334-573882543.png',NULL,NULL,1,10,'2024-03-27 05:01:28.338','2024-03-27 05:01:28.338'),(2,'Diari (Dialog iman sekali sehari)','file1-1711515711967-266864860.mp4',NULL,NULL,1,10,'2024-03-27 05:01:51.981','2024-03-27 05:01:51.981'),(3,'Berkisah',NULL,NULL,NULL,1,10,'2024-03-27 05:01:59.035','2024-03-27 05:01:59.035'),(4,'Diari (Dialog iman sekali sehari)','file1-1711515945875-206643942.png','file2-1711515945877-607030042.png','file3-1711515945879-538732308.png',2,10,'2024-03-27 05:05:45.884','2024-03-27 05:05:45.884'),(5,'Berkisah',NULL,NULL,NULL,2,10,'2024-03-27 05:06:22.681','2024-03-27 05:06:22.681'),(6,'Sajarah (Satu jam bersama ayah)',NULL,NULL,NULL,2,10,'2024-03-27 05:06:26.376','2024-03-27 05:06:26.376'),(7,'MasaIyah (Magrib sampai Isya ditemanI ayah)',NULL,NULL,NULL,1,10,'2024-04-01 07:38:08.334','2024-04-01 07:38:08.334'),(8,'Sajarah (Satu jam bersama ayah)',NULL,NULL,NULL,1,10,'2024-04-01 07:38:12.944','2024-04-01 07:38:12.944'),(9,'MasaIyah (Magrib sampai Isya ditemanI ayah)','file1-1712297871601-72744189.png',NULL,NULL,1,10,'2024-04-05 06:17:51.606','2024-04-05 06:17:51.606'),(10,'Berkisah','file1-1712328195654-336352917.png',NULL,NULL,8,10,'2024-04-05 14:43:15.667','2024-04-05 14:43:15.667'),(11,'MasaIyah (Magrib sampai Isya ditemanI ayah)','file1-1712328237065-541136965.png',NULL,NULL,8,10,'2024-04-05 14:43:57.073','2024-04-05 14:43:57.073'),(12,'Sajarah (Satu jam bersama ayah)','file1-1712500156530-219300973.png',NULL,NULL,4,10,'2024-04-07 14:29:16.551','2024-04-07 14:29:16.551'),(13,'Sajarah (Satu jam bersama ayah)','file1-1712551701698-983128348.png',NULL,NULL,4,10,'2024-04-08 04:48:21.711','2024-04-08 04:48:21.711'),(14,'Diari (Dialog iman sekali sehari)',NULL,NULL,NULL,1,10,'2024-04-08 06:54:27.966','2024-04-08 06:54:27.966'),(15,'Sajarah (Satu jam bersama ayah)','file1-1713796065353-44576843.png',NULL,NULL,10,10,'2024-04-22 14:27:45.380','2024-04-22 14:27:45.380'),(16,'hanif bersama bibinya di Cianjur','file1-1713796435838-910078158.png',NULL,NULL,11,10,'2024-04-22 14:33:55.854','2024-04-22 14:33:55.854'),(17,'Diari (Dialog iman sekali sehari)',NULL,NULL,NULL,20,10,'2024-06-09 07:34:51.325','2024-06-09 07:34:51.325'),(18,'MasaIyah (Magrib sampai Isya ditemanI ayah)',NULL,NULL,NULL,1,10,'2024-06-09 08:36:06.537','2024-06-09 08:36:06.537'),(19,'Berkisah',NULL,NULL,NULL,1,10,'2024-06-09 08:49:17.430','2024-06-09 08:49:17.430'),(20,'Berkisah','file1-1719127325634-828872958.png',NULL,NULL,4,10,'2024-06-23 07:22:05.643','2024-06-23 07:22:05.643'),(21,'MasaIyah (Magrib sampai Isya ditemanI ayah)','file1-1727360480682-979003269.png',NULL,NULL,35,10,'2024-09-26 14:21:20.875','2024-09-26 14:21:20.875');
/*!40000 ALTER TABLE `Kegiatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `News`
--

DROP TABLE IF EXISTS `News`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `News` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `subTitle` varchar(191) NOT NULL,
  `author` varchar(191) NOT NULL,
  `imageUrl` varchar(191) DEFAULT NULL,
  `content` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `News`
--

LOCK TABLES `News` WRITE;
/*!40000 ALTER TABLE `News` DISABLE KEYS */;
INSERT INTO `News` VALUES (1,'Peran Penting Orang Tua Dalam Membesarkan Anak','Peran penting orang tua adalah memiliki tanggung jawab yang besar dalam membimbing dan merawat anak-anak mereka... ','ayahebat','https://backend.ayahhebat.mangcoding.com/uploads/photo-1717844239896-498905138.png','Peran penting orang tua adalah memiliki tanggung jawab yang besar dalam membimbing dan merawat anak-anak mereka. Bukan hanya sebagai pelindung fisik, tetapi juga sebagai pengajar, pemberi contoh, dan penentu arah hidup bagi anak-anak.\n\nArtikel ini akan membahas kewajiban sebagai orang tua dan peran pentingnya dalam membesarkan seorang anak.\n\nDalam menjalankan peran mereka, orang tua memiliki kewajiban yang harus dipenuhi untuk memastikan anak-anak mereka tumbuh dan berkembang dengan baik.\n\n# Kewajiban sebagai orang tua\n## 1. Memberikan Nama yang Bermakna\n\nPemberian nama yang baik adalah salah satu langkah awal dalam menjalankan tanggung jawab sebagai orang tua.\n\nNama merupakan identitas seseorang sepanjang hidupnya, oleh karena itu, penting untuk memilih nama yang memiliki makna positif dan dapat menjadi kebanggaan bagi anak. Hindari memberikan nama yang dapat menjadi beban atau bahan ejekan bagi anak di masa depan.\n\n## 2. Memenuhi Kebutuhan Dasar\n\nSandang, pangan, dan papan merupakan kebutuhan dasar yang harus dipenuhi oleh orang tua bagi anak-anak mereka. Memberikan pakaian yang layak, makanan bergizi, dan tempat tinggal yang aman adalah kewajiban yang tidak dapat diabaikan.\n\nOrang tua perlu berusaha sekuat tenaga untuk memastikan kebutuhan dasar anak tercukupi, meskipun tidak selalu harus mewah dan mahal.\n\n## 3. Memberikan Pendidikan\n\nPendidikan adalah kunci untuk membuka pintu masa depan yang cerah bagi anak-anak. Orang tua memiliki tanggung jawab untuk memberikan pendidikan yang baik kepada anak-anak mereka, baik secara formal maupun informal.\n\nHal ini mencakup memberikan akses terhadap sekolah yang berkualitas serta memberikan pengajaran tentang nilai-nilai kehidupan yang penting.\n\n## 4. Mengajarkan Nilai-nilai dan Karakter yang Baik\n\nSelain memberikan pendidikan formal, orang tua juga bertanggung jawab untuk mengajarkan anak-anak tentang nilai-nilai dan karakter yang baik. Ini meliputi kedisiplinan, kemandirian, sopan santun, dan nilai-nilai moral lainnya.\n\nOrang tua harus menjadi contoh yang baik bagi anak-anak mereka dan membimbing mereka untuk menjadi individu yang bertanggung jawab dan berakhlak baik.\n\n## 5. Memberikan Kasih Sayang\n\nKasih sayang adalah elemen penting dalam pembentukan kepribadian dan kesejahteraan emosional anak-anak. Orang tua perlu memberikan cinta, perhatian, dan dukungan kepada anak-anak mereka sepanjang waktu.\n\nIni mencakup memberikan ASI, mendengarkan anak-anak ketika berkomunikasi, mendampingi mereka dalam aktivitas sehari-hari, serta melindungi dan menyayangi mereka dengan tulus.\n\nSelain memiliki tanggung jawab yang besar terhadap anak-anak, peran ibu dan ayah dalam keluarga juga sangat penting. Karena tanpa ibu dan ayah, seorang anak akan kehilangan rumahnya dan psikis anak bisa terganggu.\n\n# Peran Ibu dalam Keluarga\n## 1. Mengelola Keuangan :\n\nBiasanya, ibu memiliki peran dalam mengatur keuangan keluarga dan memastikan bahwa kebutuhan keluarga terpenuhi secara finansial.\n\n## 2. Menjadi Guru bagi Anak-anak :\n\nIbu sering menjadi guru pertama bagi anak-anak mereka, mengajarkan mereka berbagai keterampilan dan nilai-nilai penting dalam kehidupan.\n\n## 3. Mengurus Rumah Tangga :\n\nMerupakan tanggung jawab ibu untuk mengurus rumah tangga dan memastikan segala sesuatunya berjalan dengan lancar di rumah.\n\n## 4. Membentuk Mental dan Emosional Anak:\n\nIbu memiliki peran besar dalam membentuk kepribadian dan kesejahteraan emosional anak-anak, menjadi sumber dukungan dan keamanan bagi mereka.\n\n## 5. Menjadi Koki :\n\nIbu sering menjadi koki di rumah, menyediakan makanan yang enak dan menyehatkan bagi keluarga mereka.\n\n# Peran Ayah dalam Keluarga\n## 1. Memberikan Nafkah :\n\nTanggung jawab utama seorang ayah adalah memberikan nafkah bagi keluarga mereka, memastikan kebutuhan finansial keluarga tercukupi.\n\n## 2. Mengambil Keputusan :\n\nAyah sering kali menjadi pengambil keputusan utama dalam keluarga, memimpin keluarga dalam hal-hal penting seperti pendidikan, karier, dan keuangan.\n\n## 3. Mendisiplinkan Anggota Keluarga :\n\nAyah memiliki peran dalam mendisiplinkan anggota keluarga, mengajarkan tanggung jawab dan kedisiplinan\n\nBeberapa poin dan informasi diatas mudah-mudahan dapat memberikan sebuah perhatian untuk kita semua sebagai orang tua yang berperan penting untuk pertumbuhan anak-anak kita, Jika ada saran atau tanggapan yang dapat membangun untuk kemajuan bersama, silahkan dapat kirimkan melalui Email atau form Kontak Kami.','2024-06-08 10:57:19.901','2024-06-08 10:57:19.901'),(2,'Peran Orang Tua dalam Pendidikan Agama','Peran orang tua dalam pendidikan agama memiliki peran sentral dalam membentuk identitas agama anak dan memperkuat nilai-nilai keagamaan dalam kehidupan sehari-hari...','ayahebat','https://backend.ayahhebat.mangcoding.com/uploads/photo-1717844766041-918168513.png','Peran orang tua dalam pendidikan agama memiliki peran sentral dalam membentuk identitas agama anak dan memperkuat nilai-nilai keagamaan dalam kehidupan sehari-hari.\n\nOrang tua memegang peran yang sangat penting dalam pendidikan agama anak-anak mereka. Berikut ini adalah beberapa peran utama yang dimainkan oleh orang tua dalam pendidikan agama :\n\n# Peran Utama\n- Membangun Cinta dan Keterikatan dengan Agama: Orang tua harus membantu anak-anak untuk mengembangkan cinta dan keterikatan yang kuat terhadap agama mereka.\n- Memberikan Teladan: Orang tua adalah teladan pertama bagi anak-anak dalam hal praktik keagamaan. Mereka harus mempraktikkan nilai-nilai agama dalam kehidupan sehari-hari dan menunjukkan komitmen terhadap ajaran agama yang mereka anut.\n- Memberikan Pemahaman tentang Nilai-nilai Agama: Orang tua harus membantu anak-anak memahami nilai-nilai agama yang mendasari ajaran agama mereka. Ini termasuk nilai-nilai seperti keadilan, kasih sayang, tolong-menolong, kejujuran, dan kesabaran.\n- Mengajarkan Etika dan Moral Agama: Agama tidak hanya tentang ibadah, tetapi juga tentang etika dan moral yang harus diterapkan dalam kehidupan sehari-hari. Orang tua perlu mengajarkan anak-anak tentang nilai-nilai etika dan moral agama, seperti kejujuran, keadilan, kasih sayang, dan kerja keras.\n- Membimbing dalam Menghadapi Tantangan Keagamaan: Dalam dunia yang semakin kompleks, anak-anak seringkali dihadapkan pada tantangan yang berkaitan dengan agama. Orang tua harus memberikan bimbingan dan dukungan kepada anak-anak untuk menghadapi pertanyaan-pertanyaan sulit, konflik nilai, dan situasi yang menantang terkait agama.','2024-06-08 11:06:06.087','2024-06-08 11:06:06.087'),(3,'Mendukung Kemandirian Anak dalam Keluarga','Kemandirian anak dalam keluarga adalah keterampilan yang penting untuk dikembangkan pada anak-anak. Kemampuan untuk mengambil tanggung jawab atas tugas dan keputusan mereka sendiri','ayahebat','https://backend.ayahhebat.mangcoding.com/uploads/photo-1717845555545-244279648.png','Kemandirian anak dalam keluarga adalah keterampilan yang penting untuk dikembangkan pada anak-anak. Kemampuan untuk mengambil tanggung jawab atas tugas dan keputusan mereka sendiri\n\nHal itu akan membantu mereka menjadi individu yang mandiri, percaya diri, dan siap menghadapi tantangan dalam kehidupan. Adanya kemandirian anak dapat berguna ketika ia mendapatkan masalah, dalam hal ini ada beberapa cara diantaranya\n\n# Diantaranya\n1. Memberikan Keterampilan Hidup: Seiring dengan memberikan tanggung jawab kepada anak-anak, penting untuk mengajarkan mereka keterampilan hidup yang praktis. Ini termasuk hal-hal seperti memasak makanan sederhana, membersihkan rumah, atau mengatur keuangan pribadi.\n2. Ajarkan Keterampilan Komunikasi dan Negosiasi: Keterampilan komunikasi yang efektif adalah aspek penting dari kemandirian. Ajarkan anak-anak tentang pentingnya menyampaikan pikiran dan perasaan mereka dengan jelas dan hormat kepada orang lain.\n3. Libatkan Anak dalam Pemecahan Masalah Keluarga: Melibatkan anak-anak dalam proses pemecahan masalah keluarga dapat membantu mereka merasa memiliki peran yang penting dalam keluarga. Diskusikan masalah atau keputusan keluarga bersama-sama dan dengarkan pendapat mereka. \n4. Memberikan Kesempatan untuk Mengambil Keputusan: Memberikan anak kesempatan untuk mengambil keputusan sejak dini adalah langkah awal dalam mengembangkan kemandirian. Berikan mereka ruang untuk memilih antara beberapa pilihan yang sesuai dengan usia dan tingkat perkembangan mereka.\n5. Menetapkan Tugas Tanggung Jawab Sesuai Usia: Menugaskan tugas-tugas rumah tangga kepada anak-anak sesuai dengan usia dan kemampuan mereka adalah cara lain untuk mendukung kemandirian. Misalnya, memberikan tanggung jawab kepada anak untuk merapikan tempat tidur mereka sendiri, menyimpan mainan mereka, atau membantu dengan pekerjaan ringan di dapur.\n6. Memupuk Rasa Percaya Diri: Memberikan pujian dan dorongan yang tulus kepada anak saat mereka berhasil melakukan sesuatu dengan mandiri sangat penting. Ini akan membangun rasa percaya diri mereka dan mendorong mereka untuk terus mengembangkan kemandirian.','2024-06-08 11:19:15.548','2024-06-08 11:19:15.548'),(4,'Keluarga Tetaplah Keluarga, Support System yang Kuat','Keluarga adalah Support System yang Kuat sebuah unit sosial yang terdiri dari individu-individu yang saling terkait oleh ikatan darah','ayahebat','https://backend.ayahhebat.mangcoding.com/uploads/photo-1717845781838-295199028.png','Keluarga adalah Support System yang Kuat sebuah unit sosial yang terdiri dari individu-individu yang saling terkait oleh ikatan darah, perkawinan, atau adopsi. Keluarga juga memiliki berbagai peran penting dalam kehidupan individu.\n\nMereka memberikan kasih sayang, dukungan emosional, dan keamanan. Mereka adalah orang-orang yang dapat kita andalkan dalam segala situasi.\n\nNamun, terkadang keluarga mengalami konflik dan masalah internal. Dalam situasi seperti ini, penting untuk memperkuat support system keluarga. Komunikasi yang terbuka dan jujur adalah kunci dalam memecahkan masalah.\n\nMendengarkan dengan empati, menghargai perbedaan pendapat, dan mencari solusi bersama adalah langkah-langkah penting dalam membangun kekuatan keluarga.\n\nDalam dunia yang terus berkembang dan kompleks ini, keluarga tetaplah menjadi dasar yang kokoh. Mereka adalah support system yang paling penting dalam kehidupan kita. Dukungan dan kasih sayang yang diberikan oleh keluarga tidak dapat digantikan oleh apapun.\n\nDengan memperkuat ikatan keluarga dan membangun support system yang kuat, kita dapat menghadapi segala situasi dalam hidup dengan lebih percaya diri dan tenang.\n\nSelain itu, keluarga juga dapat memperluas support system melalui hubungan dengan keluarga luas, teman dekat, dan jaringan sosial lainnya.\n\nMelibatkan orang lain dalam kehidupan keluarga dapat memberikan perspektif baru, saran, dan dukungan tambahan. Jaringan sosial yang kuat juga dapat membantu dalam mengatasi stres dan menghadapi tantangan hidup.','2024-06-08 11:23:01.841','2024-06-08 11:23:01.841'),(5,'Peran Keluarga dalam Masyarakat yang jarang diketahui','Peran Keluarga dalam Masyarakat sangat penting dalam kehidupan individu. Mereka memberikan kasih sayang, dukungan emosional, dan keamanan.','ayahebat','https://backend.ayahhebat.mangcoding.com/uploads/photo-1717846071892-483166000.png','Peran Keluarga dalam Masyarakat sangat penting dalam kehidupan individu. Mereka memberikan kasih sayang, dukungan emosional, dan keamanan. Keluarga juga bertanggung jawab untuk memberikan pemenuhan kebutuhan dasar seperti pangan, sandang, dan papan. Selain itu, keluarga berperan dalam pendidikan dan pengasuhan anak, membantu dalam pengembangan keterampilan sosial, moral, dan intelektual. Adapun peran peran dari keluarga diantaranya yaitu :\n\n- Dukungan Emosional dan Psikologis: Keluarga menyediakan dukungan emosional yang penting dalam kehidupan individu. Mereka menjadi tempat di mana anggota keluarga saling berbagi kegembiraan, kesedihan, dan kekhawatiran.\n- Membangun Hubungan Sosial dan Jaringan Dukungan: Keluarga dapat membantu individu dalam membangun hubungan sosial yang sehat di masyarakat. Mereka memperkenalkan anak-anak dengan keluarga luas, tetangga, dan teman-teman.\n- Stabilitas dan Keamanan: Keluarga memberikan stabilitas dan keamanan bagi anggota-anggotanya. Dalam dunia yang serba kompleks dan tidak stabil, keluarga menjadi tempat yang dapat diandalkan di mana individu merasa aman, dilindungi, dan diterima.\n- Peran Sosial dan Partisipasi Masyarakat: Keluarga memberikan individu pengalaman awal tentang interaksi sosial dan partisipasi dalam masyarakat. Melalui keluarga, anak-anak belajar tentang kewajiban mereka sebagai anggota masyarakat, pentingnya etika, tanggung jawab sosial, dan partisipasi dalam kegiatan sosial.\n- Pembentukan dan Pemeliharaan Nilai-nilai Moral: Keluarga merupakan tempat pertama di mana individu belajar tentang nilai-nilai moral, etika, dan perilaku yang diharapkan dalam masyarakat. Orang tua berperan dalam memberikan contoh yang baik, mengajarkan anak-anak tentang integritas, empati, tanggung jawab, dan menghargai perbedaan.\n- Peran Sosial dan Partisipasi Masyarakat: Keluarga memberikan individu pengalaman awal tentang interaksi sosial dan partisipasi dalam masyarakat. Melalui keluarga, anak-anak belajar tentang kewajiban mereka sebagai anggota masyarakat, pentingnya etika, tanggung jawab sosial, dan partisipasi dalam kegiatan sosial.','2024-06-08 11:27:51.894','2024-06-08 11:27:51.894'),(6,'Merawat Keluarga atau Sahabat yang Sakit Berat','Merawat keluarga atau sahabat yang mengalami penyakit berat adalah tugas yang membutuhkan perhatian, kepedulian, dan dedikasi.','ayahebat','https://backend.ayahhebat.mangcoding.com/uploads/photo-1717907214697-95542300.png','Merawat keluarga atau sahabat yang mengalami penyakit berat adalah tugas yang membutuhkan perhatian, kepedulian, dan dedikasi. Dalam artikel ini, kita akan membahas beberapa langkah penting yang dapat diambil untuk merawat mereka dengan baik.\n\n1. Bantu dengan Kegiatan Sehari-hari: Dalam kasus penyakit yang membatasi mobilitas atau kemampuan fisik, anggota keluarga atau sahabat mungkin membutuhkan bantuan dalam melakukan kegiatan sehari-hari seperti makan, mandi, atau berpindah tempat tidur.\n2. Berikan Ruang untuk Ekspresi Emosi: Orang yang sakit berat mungkin mengalami berbagai macam emosi, termasuk marah, frustrasi, atau kesedihan. Penting untuk memberikan mereka ruang untuk mengungkapkan emosi mereka tanpa dihakimi atau diabaikan.\n3. Jaga Komunikasi yang Terbuka: Komunikasi yang terbuka adalah kunci dalam merawat seseorang yang sakit berat. Terus terhubung dengan anggota keluarga atau sahabat tersebut dan beri tahu mereka tentang perkembangan terkini, perubahan dalam perawatan, atau informasi penting lainnya.\n4. Berikan Dukungan Fisik dan Praktis: Selain dukungan emosional, mereka mungkin juga membutuhkan dukungan fisik dan praktis. Pastikan mereka mendapatkan perawatan medis yang tepat, ikuti panduan dokter, dan bantu mereka dengan kebutuhan sehari-hari seperti makanan, obat-obatan, dan perawatan pribadi.\n5. Jaga Kualitas Hidup: Selain perawatan medis, penting untuk membantu menjaga kualitas hidup anggota keluarga atau sahabat yang sakit berat. Dukung mereka dalam melakukan aktivitas yang mereka nikmati, seperti membaca buku, menonton film, atau bermain game.\n6. Dukung Proses Pemulihan: Setelah pengobatan atau perawatan intensif, proses pemulihan adalah tahap penting dalam perawatan mereka. Dukung mereka dengan memastikan mereka menjalani gaya hidup sehat, mengikuti instruksi medis, dan memberikan motivasi dan dukungan untuk memulihkan kekuatan fisik dan mental.\n\nBeberapa poin dan informasi diatas mudah-mudahan dapat memberikan sebuah perhatian untuk kita semua sebagai keluarga dan masyarakat untuk saling mambantu dalam kebaikan, Jika ada saran atau tanggapan yang dapat membangun untuk kemajuan bersama, silahkan dapat kirimkan melalui Email atau form Kontak Kami.','2024-06-09 04:26:54.700','2024-06-09 04:26:54.700'),(7,'Alasan Boleh Mengembalikan Suami atau Istri kepada Keluarganya','Pernikahan adalah ikatan sakral antara dua individu yang berkomitmen untuk saling mencintai, menghormati, dan mendukung satu sama lain sepanjang hidup. ','ayahebat','https://backend.ayahhebat.mangcoding.com/uploads/photo-1717907700562-718401316.png','Pernikahan adalah ikatan sakral antara dua individu yang berkomitmen untuk saling mencintai, menghormati, dan mendukung satu sama lain sepanjang hidup. Pernikahan adalah institusi yang penting dalam masyarakat karena memberikan dasar bagi pembentukan keluarga, stabilitas, dan hubungan yang erat antara pasangan.\n\nDalam pernikahan, pasangan saling berbagi tanggung jawab, kegembiraan, dan kesedihan. Mereka bekerja sama dalam menghadapi tantangan hidup, membangun kepercayaan, dan memperkuat ikatan emosional.\nPernikahan juga memberikan lingkungan yang stabil dan aman bagi pertumbuhan dan perkembangan anak-anak, serta menyediakan dukungan sosial dan emosional yang penting. Dalam beberapa kasus, ada alasan yang dapat membenarkan keputusan untuk mengembalikan suami atau istri kepada keluarganya. Artikel ini akan membahas beberapa alasan tersebut.\n## Alasannya\n1. Ketidakcocokan yang Mendalam: Terkadang, dalam hubungan pernikahan, terjadi ketidakcocokan yang mendalam antara suami dan istri. Perbedaan nilai-nilai, tujuan hidup, atau pandangan tentang masa depan dapat menjadi alasan kuat untuk mempertimbangkan mengembalikan suami atau istri kepada keluarganya.\n2. Gangguan Kesehatan Mental yang Parah: Gangguan kesehatan mental yang parah dapat memengaruhi kemampuan seseorang untuk menjalani kehidupan pernikahan yang sehat dan bahagia. Jika suami atau istri Anda menderita gangguan mental yang mengganggu fungsi mereka sehari-hari, dan mereka tidak mampu atau enggan mencari bantuan yang diperlukan, mengembalikan mereka kepada keluarganya mungkin menjadi langkah yang perlu.\n3. Tidak Adanya Perubahan atau Perbaikan: Jika masalah dalam pernikahan telah lama berlangsung dan tidak ada tanda-tanda perubahan atau perbaikan, mengembalikan suami atau istri kepada keluarganya bisa menjadi pilihan.\n4. Penghinaan dan Perlakuan Buruk yang Konstan: Jika suami atau istri Anda secara terus-menerus melakukan penghinaan, pelecehan, atau perlakuan buruk lainnya yang merugikan secara emosional atau fisik, mengembalikan mereka kepada keluarganya dapat memberikan perlindungan dan keselamatan.\n5. Kesenjangan Komunikasi yang Tidak Teratasi: Komunikasi yang buruk atau kesenjangan dalam komunikasi dapat menjadi beban besar dalam pernikahan.\n6. Kekerasan dalam Rumah Tangga: Kekerasan dalam rumah tangga adalah salah satu alasan yang paling serius untuk mempertimbangkan mengembalikan suami atau istri kepada keluarganya. Jika pasangan Anda terlibat dalam perilaku fisik, emosional, atau seksual yang merugikan, tindakan ini dapat diambil untuk melindungi diri Anda dan anak-anak, jika ada.\n7. Ketidaksetiaan yang Berulang: Ketidaksetiaan dapat menghancurkan kepercayaan dalam pernikahan. Jika suami atau istri Anda terus-menerus terlibat dalam perselingkuhan atau perilaku yang melanggar kesetiaan, mengembalikan mereka kepada keluarganya bisa menjadi pilihan yang dipertimbangkan.\n\nBeberapa poin dan informasi diatas mudah-mudahan dapat memberikan sebuah perhatian untuk kita semua sebagai pasangan yang berkomitmen untuk saling mencintai, menghormati, dan mendukung satu sama lain sepanjang hidup, Jika ada saran atau tanggapan yang dapat membangun untuk kemajuan bersama, silahkan dapat kirimkan melalui Email atau form Kontak Kami.','2024-06-09 04:35:00.564','2024-06-09 04:35:00.564'),(8,'Bahaya Anak dan Ponsel Cerdas Tanpa Pengawasan','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita.','ayahebat','https://backend.ayahhebat.mangcoding.com/uploads/photo-1717907974186-551761743.png','Perkembangan teknologi, khususnya ponsel cerdas, telah mengubah cara kita hidup dan berinteraksi dengan dunia di sekitar kita. Namun, bahaya anak dan ponsel cerdas yang tidak terawasi dengan baik dapat menimbulkan berbagai bahaya dan risiko.\n\nArtikel ini akan membahas bahaya yang mungkin terjadi ketika anak-anak menggunakan ponsel cerdas tanpa pengawasan yang memadai.\n\n# Akibat buat Anak :\n1. Penurunan Kualitas Hidup: Penggunaan ponsel cerdas yang berlebihan dapat mengganggu kegiatan sehari-hari yang penting, seperti tidur yang cukup, berinteraksi secara langsung dengan keluarga dan teman, atau berpartisipasi dalam aktivitas fisik dan kreatif.\n2. Gangguan Belajar dan Akademik: Penggunaan ponsel cerdas tanpa pengawasan yang memadai dapat mengganggu fokus dan konsentrasi anak-anak dalam belajar.\n3. Perubahan Pola Tidur: Ponsel cerdas sering kali digunakan anak-anak di malam hari, yang dapat mengganggu pola tidur yang sehat. Paparan cahaya biru dari layar ponsel cerdas dapat mengganggu produksi hormon tidur dan menghambat kualitas tidur, yang pada gilirannya dapat berdampak negatif pada kesehatan fisik dan mental anak-anak.\n4. Menurunnya Aktivitas Fisik: Penggunaan ponsel cerdas yang berlebihan dapat mengurangi waktu yang dihabiskan anak-anak untuk berpartisipasi dalam aktivitas fisik dan olahraga.\n5. Tidak Menjalin Hubungan yang Kuat dengan Orang Lain: Penggunaan ponsel cerdas yang berlebihan dapat menghambat kemampuan anak-anak untuk menjalin hubungan yang kuat dan bermakna dengan orang lain.\n6. Gangguan pada Kesehatan Mental: Penggunaan ponsel cerdas yang berlebihan tanpa pengawasan dapat berdampak negatif pada kesehatan mental anak-anak. Mereka mungkin terjebak dalam pola perilaku yang tidak sehat, seperti kecanduan media sosial, permainan online, atau pembandingan diri yang berlebihan dengan orang lain.\n7. Risiko Keamanan dan Privasi: Penggunaan ponsel cerdas oleh anak-anak yang tidak terawasi juga dapat meningkatkan risiko keamanan dan privasi. Anak-anak mungkin tidak menyadari risiko yang terkait dengan berbagi informasi pribadi secara online atau berinteraksi dengan orang asing melalui media sosial atau aplikasi pesan.\nBeberapa poin dan informasi diatas mudah-mudahan dapat memberikan sebuah perhatian untuk kita semua sebagai orang tua yang berperan penting untuk pertumbuhan anak-anak kita, Jika ada saran atau tanggapan yang dapat membangun untuk kemajuan bersama, silahkan dapat kirimkan melalui Email atau form Kontak Kami.','2024-06-09 04:39:34.188','2024-06-09 04:39:34.188');
/*!40000 ALTER TABLE `News` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `body` varchar(191) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` int(11) NOT NULL,
  `imageUrl` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Notification_userId_fkey` (`userId`),
  CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
INSERT INTO `Notification` VALUES (107,'Penyambutan dan Pengenalan Fitur Aplikasi Ayah Hebat','Kami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat.','{\"content\":\"Assalamu\'alaikum Warahmatullahi Wabarakatuh,\\nKami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat. Aplikasi ini dirancang untuk membantu keluarga Anda dalam mendokumentasikan dan mengelola kegiatan islami anak dengan lebih mudah dan efektif. Berikut adalah beberapa fitur utama yang dapat Anda manfaatkan:\\n## 1. Dokumentasi Kegiatan Islami Anak\\nAnda dapat mengunggah foto atau video kegiatan islami anak Anda untuk didokumentasikan. Fitur ini memungkinkan Anda menyimpan momen-momen berharga dan berbagi pengalaman spiritual keluarga.\\n## 2. Leaderboard Kegiatan Islami\\nNikmati fitur leaderboard yang menampilkan keluarga dengan kegiatan islami terbanyak dan terberkualitas. Fitur ini bertujuan untuk memotivasi dan menginspirasi keluarga lain dalam menjalankan aktivitas islami sehari-hari.\\n## 3. Berita dan Artikel\\nDapatkan berita dan artikel terkini seputar dunia islami, parenting, dan edukasi anak. Kami menyediakan konten yang bermanfaat untuk memperkaya pengetahuan dan wawasan Anda.\\n## 4. Fitur FAQ\\nTemukan jawaban atas pertanyaan umum mengenai penggunaan aplikasi dan berbagai topik terkait melalui fitur FAQ yang tersedia.\\n## 5. Fitur Pengumuman\\nTetap terinformasi dengan pengumuman penting dari tim Ayah Hebat mengenai update aplikasi, acara, dan informasi penting lainnya.\\n## 6. Layanan Pelanggan (Customer Service)\\nJika Anda membutuhkan bantuan atau memiliki pertanyaan lebih lanjut, fitur customer service kami siap membantu Anda. Anda akan diarahkan ke WhatsApp untuk komunikasi yang lebih cepat dan mudah.\\nKami berharap fitur-fitur ini dapat membantu Anda dalam mendidik dan membimbing anak-anak dalam kegiatan islami dengan lebih baik. Terima kasih telah memilih Ayah Hebat sebagai pendamping keluarga Anda dalam perjalanan spiritual ini.\\nWassalamu\'alaikum Warahmatullahi Wabarakatuh,\\nTim Ayah Hebat\",\"routes\":\"/\"}',31,'https://backend.ayahhebat.mangcoding.com/uploads/photo-1725954264635-174416811.png','2024-09-10 07:44:25.030','2024-09-10 07:44:25.030'),(108,'Penyambutan dan Pengenalan Fitur Aplikasi Ayah Hebat','Kami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat.','{\"content\":\"Assalamu\'alaikum Warahmatullahi Wabarakatuh,\\nKami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat. Aplikasi ini dirancang untuk membantu keluarga Anda dalam mendokumentasikan dan mengelola kegiatan islami anak dengan lebih mudah dan efektif. Berikut adalah beberapa fitur utama yang dapat Anda manfaatkan:\\n## 1. Dokumentasi Kegiatan Islami Anak\\nAnda dapat mengunggah foto atau video kegiatan islami anak Anda untuk didokumentasikan. Fitur ini memungkinkan Anda menyimpan momen-momen berharga dan berbagi pengalaman spiritual keluarga.\\n## 2. Leaderboard Kegiatan Islami\\nNikmati fitur leaderboard yang menampilkan keluarga dengan kegiatan islami terbanyak dan terberkualitas. Fitur ini bertujuan untuk memotivasi dan menginspirasi keluarga lain dalam menjalankan aktivitas islami sehari-hari.\\n## 3. Berita dan Artikel\\nDapatkan berita dan artikel terkini seputar dunia islami, parenting, dan edukasi anak. Kami menyediakan konten yang bermanfaat untuk memperkaya pengetahuan dan wawasan Anda.\\n## 4. Fitur FAQ\\nTemukan jawaban atas pertanyaan umum mengenai penggunaan aplikasi dan berbagai topik terkait melalui fitur FAQ yang tersedia.\\n## 5. Fitur Pengumuman\\nTetap terinformasi dengan pengumuman penting dari tim Ayah Hebat mengenai update aplikasi, acara, dan informasi penting lainnya.\\n## 6. Layanan Pelanggan (Customer Service)\\nJika Anda membutuhkan bantuan atau memiliki pertanyaan lebih lanjut, fitur customer service kami siap membantu Anda. Anda akan diarahkan ke WhatsApp untuk komunikasi yang lebih cepat dan mudah.\\nKami berharap fitur-fitur ini dapat membantu Anda dalam mendidik dan membimbing anak-anak dalam kegiatan islami dengan lebih baik. Terima kasih telah memilih Ayah Hebat sebagai pendamping keluarga Anda dalam perjalanan spiritual ini.\\nWassalamu\'alaikum Warahmatullahi Wabarakatuh,\\nTim Ayah Hebat\",\"routes\":\"/\"}',35,'https://backend.ayahhebat.mangcoding.com/uploads/photo-1727347269267-846324119.png','2024-09-26 10:41:09.525','2024-09-26 10:41:09.525'),(109,'Penyambutan dan Pengenalan Fitur Aplikasi Ayah Hebat','Kami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat.','{\"content\":\"Assalamu\'alaikum Warahmatullahi Wabarakatuh,\\nKami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat. Aplikasi ini dirancang untuk membantu keluarga Anda dalam mendokumentasikan dan mengelola kegiatan islami anak dengan lebih mudah dan efektif. Berikut adalah beberapa fitur utama yang dapat Anda manfaatkan:\\n## 1. Dokumentasi Kegiatan Islami Anak\\nAnda dapat mengunggah foto atau video kegiatan islami anak Anda untuk didokumentasikan. Fitur ini memungkinkan Anda menyimpan momen-momen berharga dan berbagi pengalaman spiritual keluarga.\\n## 2. Leaderboard Kegiatan Islami\\nNikmati fitur leaderboard yang menampilkan keluarga dengan kegiatan islami terbanyak dan terberkualitas. Fitur ini bertujuan untuk memotivasi dan menginspirasi keluarga lain dalam menjalankan aktivitas islami sehari-hari.\\n## 3. Berita dan Artikel\\nDapatkan berita dan artikel terkini seputar dunia islami, parenting, dan edukasi anak. Kami menyediakan konten yang bermanfaat untuk memperkaya pengetahuan dan wawasan Anda.\\n## 4. Fitur FAQ\\nTemukan jawaban atas pertanyaan umum mengenai penggunaan aplikasi dan berbagai topik terkait melalui fitur FAQ yang tersedia.\\n## 5. Fitur Pengumuman\\nTetap terinformasi dengan pengumuman penting dari tim Ayah Hebat mengenai update aplikasi, acara, dan informasi penting lainnya.\\n## 6. Layanan Pelanggan (Customer Service)\\nJika Anda membutuhkan bantuan atau memiliki pertanyaan lebih lanjut, fitur customer service kami siap membantu Anda. Anda akan diarahkan ke WhatsApp untuk komunikasi yang lebih cepat dan mudah.\\nKami berharap fitur-fitur ini dapat membantu Anda dalam mendidik dan membimbing anak-anak dalam kegiatan islami dengan lebih baik. Terima kasih telah memilih Ayah Hebat sebagai pendamping keluarga Anda dalam perjalanan spiritual ini.\\nWassalamu\'alaikum Warahmatullahi Wabarakatuh,\\nTim Ayah Hebat\",\"routes\":\"/\"}',34,'https://backend.ayahhebat.mangcoding.com/uploads/photo-1727347274656-224048197.png','2024-09-26 10:41:14.783','2024-09-26 10:41:14.783'),(110,'Penyambutan dan Pengenalan Fitur Aplikasi Ayah Hebat','Kami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat.','{\"content\":\"Assalamu\'alaikum Warahmatullahi Wabarakatuh,\\nKami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat. Aplikasi ini dirancang untuk membantu keluarga Anda dalam mendokumentasikan dan mengelola kegiatan islami anak dengan lebih mudah dan efektif. Berikut adalah beberapa fitur utama yang dapat Anda manfaatkan:\\n## 1. Dokumentasi Kegiatan Islami Anak\\nAnda dapat mengunggah foto atau video kegiatan islami anak Anda untuk didokumentasikan. Fitur ini memungkinkan Anda menyimpan momen-momen berharga dan berbagi pengalaman spiritual keluarga.\\n## 2. Leaderboard Kegiatan Islami\\nNikmati fitur leaderboard yang menampilkan keluarga dengan kegiatan islami terbanyak dan terberkualitas. Fitur ini bertujuan untuk memotivasi dan menginspirasi keluarga lain dalam menjalankan aktivitas islami sehari-hari.\\n## 3. Berita dan Artikel\\nDapatkan berita dan artikel terkini seputar dunia islami, parenting, dan edukasi anak. Kami menyediakan konten yang bermanfaat untuk memperkaya pengetahuan dan wawasan Anda.\\n## 4. Fitur FAQ\\nTemukan jawaban atas pertanyaan umum mengenai penggunaan aplikasi dan berbagai topik terkait melalui fitur FAQ yang tersedia.\\n## 5. Fitur Pengumuman\\nTetap terinformasi dengan pengumuman penting dari tim Ayah Hebat mengenai update aplikasi, acara, dan informasi penting lainnya.\\n## 6. Layanan Pelanggan (Customer Service)\\nJika Anda membutuhkan bantuan atau memiliki pertanyaan lebih lanjut, fitur customer service kami siap membantu Anda. Anda akan diarahkan ke WhatsApp untuk komunikasi yang lebih cepat dan mudah.\\nKami berharap fitur-fitur ini dapat membantu Anda dalam mendidik dan membimbing anak-anak dalam kegiatan islami dengan lebih baik. Terima kasih telah memilih Ayah Hebat sebagai pendamping keluarga Anda dalam perjalanan spiritual ini.\\nWassalamu\'alaikum Warahmatullahi Wabarakatuh,\\nTim Ayah Hebat\",\"routes\":\"/\"}',31,'https://backend.ayahhebat.mangcoding.com/uploads/photo-1727363515425-7455839.png','2024-09-26 15:11:55.640','2024-09-26 15:11:55.640'),(111,'Penyambutan dan Pengenalan Fitur Aplikasi Ayah Hebat','Kami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat.','{\"content\":\"Assalamu\'alaikum Warahmatullahi Wabarakatuh,\\nKami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat. Aplikasi ini dirancang untuk membantu keluarga Anda dalam mendokumentasikan dan mengelola kegiatan islami anak dengan lebih mudah dan efektif. Berikut adalah beberapa fitur utama yang dapat Anda manfaatkan:\\n## 1. Dokumentasi Kegiatan Islami Anak\\nAnda dapat mengunggah foto atau video kegiatan islami anak Anda untuk didokumentasikan. Fitur ini memungkinkan Anda menyimpan momen-momen berharga dan berbagi pengalaman spiritual keluarga.\\n## 2. Leaderboard Kegiatan Islami\\nNikmati fitur leaderboard yang menampilkan keluarga dengan kegiatan islami terbanyak dan terberkualitas. Fitur ini bertujuan untuk memotivasi dan menginspirasi keluarga lain dalam menjalankan aktivitas islami sehari-hari.\\n## 3. Berita dan Artikel\\nDapatkan berita dan artikel terkini seputar dunia islami, parenting, dan edukasi anak. Kami menyediakan konten yang bermanfaat untuk memperkaya pengetahuan dan wawasan Anda.\\n## 4. Fitur FAQ\\nTemukan jawaban atas pertanyaan umum mengenai penggunaan aplikasi dan berbagai topik terkait melalui fitur FAQ yang tersedia.\\n## 5. Fitur Pengumuman\\nTetap terinformasi dengan pengumuman penting dari tim Ayah Hebat mengenai update aplikasi, acara, dan informasi penting lainnya.\\n## 6. Layanan Pelanggan (Customer Service)\\nJika Anda membutuhkan bantuan atau memiliki pertanyaan lebih lanjut, fitur customer service kami siap membantu Anda. Anda akan diarahkan ke WhatsApp untuk komunikasi yang lebih cepat dan mudah.\\nKami berharap fitur-fitur ini dapat membantu Anda dalam mendidik dan membimbing anak-anak dalam kegiatan islami dengan lebih baik. Terima kasih telah memilih Ayah Hebat sebagai pendamping keluarga Anda dalam perjalanan spiritual ini.\\nWassalamu\'alaikum Warahmatullahi Wabarakatuh,\\nTim Ayah Hebat\",\"routes\":\"/\"}',31,'https://backend.ayahhebat.mangcoding.com/uploads/photo-1727363518087-595453276.png','2024-09-26 15:11:58.244','2024-09-26 15:11:58.244'),(112,'Penyambutan dan Pengenalan Fitur Aplikasi Ayah Hebat','Kami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat.','{\"content\":\"Assalamu\'alaikum Warahmatullahi Wabarakatuh,\\nKami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat. Aplikasi ini dirancang untuk membantu keluarga Anda dalam mendokumentasikan dan mengelola kegiatan islami anak dengan lebih mudah dan efektif. Berikut adalah beberapa fitur utama yang dapat Anda manfaatkan:\\n## 1. Dokumentasi Kegiatan Islami Anak\\nAnda dapat mengunggah foto atau video kegiatan islami anak Anda untuk didokumentasikan. Fitur ini memungkinkan Anda menyimpan momen-momen berharga dan berbagi pengalaman spiritual keluarga.\\n## 2. Leaderboard Kegiatan Islami\\nNikmati fitur leaderboard yang menampilkan keluarga dengan kegiatan islami terbanyak dan terberkualitas. Fitur ini bertujuan untuk memotivasi dan menginspirasi keluarga lain dalam menjalankan aktivitas islami sehari-hari.\\n## 3. Berita dan Artikel\\nDapatkan berita dan artikel terkini seputar dunia islami, parenting, dan edukasi anak. Kami menyediakan konten yang bermanfaat untuk memperkaya pengetahuan dan wawasan Anda.\\n## 4. Fitur FAQ\\nTemukan jawaban atas pertanyaan umum mengenai penggunaan aplikasi dan berbagai topik terkait melalui fitur FAQ yang tersedia.\\n## 5. Fitur Pengumuman\\nTetap terinformasi dengan pengumuman penting dari tim Ayah Hebat mengenai update aplikasi, acara, dan informasi penting lainnya.\\n## 6. Layanan Pelanggan (Customer Service)\\nJika Anda membutuhkan bantuan atau memiliki pertanyaan lebih lanjut, fitur customer service kami siap membantu Anda. Anda akan diarahkan ke WhatsApp untuk komunikasi yang lebih cepat dan mudah.\\nKami berharap fitur-fitur ini dapat membantu Anda dalam mendidik dan membimbing anak-anak dalam kegiatan islami dengan lebih baik. Terima kasih telah memilih Ayah Hebat sebagai pendamping keluarga Anda dalam perjalanan spiritual ini.\\nWassalamu\'alaikum Warahmatullahi Wabarakatuh,\\nTim Ayah Hebat\",\"routes\":\"/\"}',31,'https://backend.ayahhebat.mangcoding.com/uploads/photo-1727363520555-590706496.png','2024-09-26 15:12:00.714','2024-09-26 15:12:00.714'),(113,'Penyambutan dan Pengenalan Fitur Aplikasi Ayah Hebat','Kami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat.','{\"content\":\"Assalamu\'alaikum Warahmatullahi Wabarakatuh,\\nKami dengan gembira menyambut Anda sebagai pengguna baru aplikasi Ayah Hebat. Aplikasi ini dirancang untuk membantu keluarga Anda dalam mendokumentasikan dan mengelola kegiatan islami anak dengan lebih mudah dan efektif. Berikut adalah beberapa fitur utama yang dapat Anda manfaatkan:\\n## 1. Dokumentasi Kegiatan Islami Anak\\nAnda dapat mengunggah foto atau video kegiatan islami anak Anda untuk didokumentasikan. Fitur ini memungkinkan Anda menyimpan momen-momen berharga dan berbagi pengalaman spiritual keluarga.\\n## 2. Leaderboard Kegiatan Islami\\nNikmati fitur leaderboard yang menampilkan keluarga dengan kegiatan islami terbanyak dan terberkualitas. Fitur ini bertujuan untuk memotivasi dan menginspirasi keluarga lain dalam menjalankan aktivitas islami sehari-hari.\\n## 3. Berita dan Artikel\\nDapatkan berita dan artikel terkini seputar dunia islami, parenting, dan edukasi anak. Kami menyediakan konten yang bermanfaat untuk memperkaya pengetahuan dan wawasan Anda.\\n## 4. Fitur FAQ\\nTemukan jawaban atas pertanyaan umum mengenai penggunaan aplikasi dan berbagai topik terkait melalui fitur FAQ yang tersedia.\\n## 5. Fitur Pengumuman\\nTetap terinformasi dengan pengumuman penting dari tim Ayah Hebat mengenai update aplikasi, acara, dan informasi penting lainnya.\\n## 6. Layanan Pelanggan (Customer Service)\\nJika Anda membutuhkan bantuan atau memiliki pertanyaan lebih lanjut, fitur customer service kami siap membantu Anda. Anda akan diarahkan ke WhatsApp untuk komunikasi yang lebih cepat dan mudah.\\nKami berharap fitur-fitur ini dapat membantu Anda dalam mendidik dan membimbing anak-anak dalam kegiatan islami dengan lebih baik. Terima kasih telah memilih Ayah Hebat sebagai pendamping keluarga Anda dalam perjalanan spiritual ini.\\nWassalamu\'alaikum Warahmatullahi Wabarakatuh,\\nTim Ayah Hebat\",\"routes\":\"/\"}',31,'https://backend.ayahhebat.mangcoding.com/uploads/photo-1727363521840-157064031.png','2024-09-26 15:12:01.957','2024-09-26 15:12:01.957');
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `body` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PostDislike`
--

DROP TABLE IF EXISTS `PostDislike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PostDislike` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PostDislike`
--

LOCK TABLES `PostDislike` WRITE;
/*!40000 ALTER TABLE `PostDislike` DISABLE KEYS */;
/*!40000 ALTER TABLE `PostDislike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PostLike`
--

DROP TABLE IF EXISTS `PostLike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PostLike` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PostLike`
--

LOCK TABLES `PostLike` WRITE;
/*!40000 ALTER TABLE `PostLike` DISABLE KEYS */;
/*!40000 ALTER TABLE `PostLike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profile`
--

DROP TABLE IF EXISTS `Profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(191) DEFAULT NULL,
  `bio` varchar(191) DEFAULT NULL,
  `photo` varchar(191) DEFAULT NULL,
  `namaIstri` varchar(191) DEFAULT NULL,
  `namaAnak` varchar(191) DEFAULT NULL,
  `tahunMasukKuttab` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `namaKuttab` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Profile_userId_key` (`userId`),
  CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profile`
--

LOCK TABLES `Profile` WRITE;
/*!40000 ALTER TABLE `Profile` DISABLE KEYS */;
INSERT INTO `Profile` VALUES (1,'Admin ','seorang yang ingin mencoba menjadi yang terbaik ','photo-1712196773760-194653831.png','Aisyah ','Ilham',2020,1,'Kutab Alfatih Sukabumi'),(2,'Ahmad','Seorang ayah','photo-1711616485326-604416843.png','Aisyah','Ujang',2022,2,'Kutab Alfatih Sukabumi'),(3,'Usman','Seorang yang baik','photo-1712208826261-480375937.png','Aisyah ','Ujang',2022,3,'Kutab Alfatih Sukabumi'),(4,'Nugraha','Nothing to be something. Pencari Ridho Allah','photo-1712551739185-68391194.png','Nabilla Nazla M.A.Z','Maryam Fukayna Kaneez',2022,4,'Kutab Alfatih Sukabumi'),(5,'Muamar Hasan Albana','seseorang yang sedang berusaha menjadi calon ayah ideal menurut islam','photo-1712318506164-7247562.png','pulan','silmi kaffah',2024,5,'Kutab Alfatih Sukabumi'),(6,'𝚜𝚞𝚓𝚊𝚗𝚊','𝚜𝚎𝚘𝚛𝚊𝚗𝚐 𝚔𝚞𝚕𝚒 𝚢𝚊𝚗𝚐 𝚖𝚎𝚖𝚒𝚕𝚒𝚔𝚒 5 𝚊𝚗𝚊𝚔','photo-1712325611764-879164605.png','𝚌𝚞𝚌𝚞 𝚗𝚒𝚊 𝚔𝚞𝚛𝚗𝚒𝚊','𝙰𝚖𝚖𝚊𝚛 𝚑𝚊𝚏𝚒𝚣𝚑 𝚜𝚢𝚊𝚞𝚚𝚒𝚕𝚕𝚊𝚑',2022,7,'Kutab Alfatih Sukabumi'),(7,'Abu Keita','Seorang yg senantiasa memperbaiki diri agar Allah Ridho','photo-1712328153010-962768427.png','Ummu Keita','Keita Kaiya Kaffah',2019,8,'Kutab Alfatih Sukabumi'),(8,'abu misk','ada pelajaran di setiap tempat,setiap waktu dan setiap jiwa','photo-1713795946859-648344773.png','Ummu misk','m Ibrahim Saeful k',2018,10,'Kutab Alfatih Sukabumi'),(9,'Hilman Abdurohman ','Mengabdi untuk kebesaran generasi','photo-1713796087126-290724771.png','Khoirunnisa D. S','Hanif Abdurrahman',2022,11,'Kutab Alfatih Sukabumi'),(10,'Angga Pradana','Seorang Ayah yg belajar utk jadi Ayah yg bisa menjaga dirinya dan keluarganya dr api neraka, dan berharap ridho Allah agar berjumpa keluarga d Surga nya Allah','photo-1713796717442-97454891.png','Rahayu Syarief','AlulaAbqoryAsma',2022,13,'Kutab Alfatih Sukabumi'),(11,'Hendra Muharom','Insan yg selalu ingin belajar dan berharap Husnul Khotimah','photo-1713797781517-820434548.png','drg. Yuniar Handayaningsih Wisnu','Muhammad \'Arsya Najmulhaq',2021,15,'Kutab Alfatih Sukabumi'),(12,'kafsukabumi','Pendidik yang Berbahagia','photo-1715848973135-902114036.png','kafsukabumi','kafsukabumi',2021,16,'Kutab Alfatih Sukabumi'),(13,'mangcoding','p','photo-1716256636305-432143354.png','Aisyah','Ujang',2021,18,'Kutab Alfatih Sukabumi'),(14,'Anwa','Seorang ayah yang ingin terbaik untuk anakn','photo-1717920710170-83608766.png','Aisyah','Ujang',2022,20,'Kutab Alfatih Sukabumi'),(15,'irpansyah ','Gemilang di usia belia','photo-1718715232283-908688208.png','Res Rahayu ','Aisha Azalea syafia ',2021,9,'Kutab Alfatih Sukabumi'),(16,'Sujana','orang tua dari 5 anak yang berusaha menjaga fitrah seorang muslim.','photo-1719126835580-139908818.png','Cucu Nia Kurnia','Ammar dan Althaf',2022,22,'Kutab Alfatih Sukabumi'),(17,'Harun Arrasyid','Seorang Ayah yang ingin menjadi Hebat','photo-1719126917892-99109573.png','Inri Okta Ridwanty','M. Al Fatih Rasyid',2022,24,'Kutab Alfatih Sukabumi'),(18,'Fajar Nurdiansyah Saputra','ayah hebat','photo-1719127802029-378540652.png','Utari Dwi Agustina','Maryam Hawa Elshanum',2021,25,'Kutab Alfatih Sukabumi'),(19,'Ridwan','Ayah dengan 2 anak pemberani','photo-1719209175833-410243486.png','Umi','Abu Bakar Muharrar',2020,23,'Kutab Alfatih Sukabumi'),(20,'tes','ini tes','photo-1720062691020-266266283.png','tes','tes',2010,27,'Kutab Alfatih Sukabumi'),(22,'Rifqi Muzakki','Seorang yang bajk','photo-1725942006586-694269968.png','Istri saya','Ujang',2022,30,'Kutab Alfatih Sukabumi'),(23,'Julaiha','Seorang yang','photo-1725949992816-407466425.png','Aisyah','Asep',2020,31,'Kutab Alfatih Sukabumi'),(24,'Sehun','Seorang pengusaha','photo-1726751056426-109233987.png','aisyah','levi',2022,32,'Kutab Alfatih Sukabumi'),(25,'Jhon Doe','Seorang ayah yang baik','photo-1727346929368-660639745.png','Aisyah','Ujang',2020,35,'Kutab Alfatih Sukabumi'),(26,'Uhe','-','photo-1727346942784-632501556.png','gak ada ','rifki',2022,34,'Kutab Alfatih Sukabumi');
/*!40000 ALTER TABLE `Profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Question`
--

DROP TABLE IF EXISTS `Question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `answer` text DEFAULT NULL,
  `isAnswer` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Question`
--

LOCK TABLES `Question` WRITE;
/*!40000 ALTER TABLE `Question` DISABLE KEYS */;
INSERT INTO `Question` VALUES (1,'Bagaimana cara mengunggah foto/video ke dalam dokumentasi?','Untuk mengunggah foto atau video ke dalam dokumentasi, pertama-tama Anda perlu menekan kotak yang berada di tengah halaman utama (Home Page). Setelah itu, akan muncul jendela pop-up yang meminta Anda untuk memilih jenis media yang ingin diunggah. Jika Anda ingin mengunggah foto, pilih opsi \'Pilih Foto\'. Jika Anda ingin mengunggah video, pilih opsi \'Pilih Video\'.\n Setelah memilih jenis media yang diinginkan, pilihlah foto atau video dari galeri Anda. Setelah memilih foto atau video tersebut, isi nama kegiatannya pada kolom yang tersedia. Terakhir, kirim dokumen tersebut dengan menekan tombol pesawat kertas di pojok kanan bawah layar.\n Dengan demikian, foto atau video tersebut akan menjadi bagian dari dokumentasi kegiatan islami keluarga Anda atau anak Anda, membantu Anda menyimpan dan mengelola dokumentasi dengan lebih efektif.',1,'2024-06-09 03:04:05.698','2024-06-09 03:10:29.824'),(2,'Apakah bisa menggunakan nama kegiatan sesuai dengan keinginan sendiri?','Ya, Anda dapat menggunakan nama kegiatan yang disesuaikan dengan keinginan Anda sendiri. Selain menggunakan nama kegiatan yang sudah tersedia secara default, Anda juga dapat memasukkan nama kegiatan yang diinginkan. Untuk melakukannya, tekan bidang teks yang ada di bagian paling bawah halaman utama (Home Page) dan ketik nama kegiatan sesuai preferensi Anda.',1,'2024-06-09 03:14:13.071','2024-06-09 03:14:16.763'),(3,'Bagaimana cara mengajukan unggahan berita?','Anda dapat mengajukan berita untuk dipublikasikan di aplikasi Ayah Hebat dengan menghubungi layanan pelanggan Mangcoding yang tersedia di halaman profil dan pengaturan (Profile and Setting Page).',1,'2024-06-09 04:19:49.424','2024-06-09 04:20:02.861');
/*!40000 ALTER TABLE `Question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reply`
--

DROP TABLE IF EXISTS `Reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `body` text NOT NULL,
  `commentId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reply`
--

LOCK TABLES `Reply` WRITE;
/*!40000 ALTER TABLE `Reply` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReplyLike`
--

DROP TABLE IF EXISTS `ReplyLike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ReplyLike` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `replyId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReplyLike`
--

LOCK TABLES `ReplyLike` WRITE;
/*!40000 ALTER TABLE `ReplyLike` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReplyLike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Report`
--

DROP TABLE IF EXISTS `Report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `postId` int(11) DEFAULT NULL,
  `commentId` int(11) DEFAULT NULL,
  `replyId` int(11) DEFAULT NULL,
  `reason` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Report`
--

LOCK TABLES `Report` WRITE;
/*!40000 ALTER TABLE `Report` DISABLE KEYS */;
/*!40000 ALTER TABLE `Report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0,
  `verificationCode` varchar(191) DEFAULT NULL,
  `totalScoreYear` int(11) DEFAULT 0,
  `totalScoreMonth` int(11) DEFAULT 0,
  `totalScoreDay` int(11) DEFAULT 0,
  `fcmToken` varchar(191) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT 'USER',
  `deleteAccountVerficationCode` varchar(191) DEFAULT NULL,
  `deleteReason` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Rifqi ','rifqimuzakki45@gmail.com','$2b$10$MLe1tKcb4nMFWJyceWr5yem6y.G.y8wyHUlYPDUWq3Py7.cqXYtBO',1,NULL,90,0,0,'drAS27r5TvWBLTri7gXBlb:APA91bGU13H99fuO6V7jMYVOQoJGYb3gug-ywcoquSsEOj9Ev_KJ3p8aELtohTOL2UX9ey1sw-EbfPuIeI1R3nfbzgtnXsAeWJdBlIqFWTR3V_7eicdCFyDnL_olD8QRbp-txBCZcZM6','USER',NULL,NULL,1),(2,'rifqimuzakki4545@gmail.com','rifqimuzakki4545@gmail.com','$2b$10$N9wQbfYNCbgNStqKvySRPuP/1/Q7ih30anrGQ1a/D.Sr3JvmQp.za',1,NULL,30,0,0,'cyrOlLp5Q9CvgL4-ADnfyS:APA91bGonIewEXERweCzyOqf_x8dgKaNoKWUxvjsXPvv8mLzBrvYZ29QLoSOn9wqiFaX-LeHn19nYj4UDHaq7i-ccbu-m2JpxYPEcTPHYGTBPEODYkKFMPCIF-Q4a5gs0wZiP95eOkzo','USER',NULL,NULL,1),(3,'rifqimuzakki4545@gmail.com','rifqimuzakki454@gmail.com','$2b$10$zvNlIQZuelgIefUlf7ZAHefq3x13ysu8qNM5E/j2sL6.JqzAHp2.e',1,NULL,0,0,0,NULL,'USER',NULL,NULL,1),(4,'nugraha','contact.nugraha@gmail.com','$2b$10$wLM8a5jvFtyJYduXEe5K6e3ofw14zYkt4NOTd5hw5HkqkH038zaGC',1,NULL,30,0,0,'dy53uo5JQE-C0_ZOwa-n4y:APA91bGaCNykUIwE2JQtPYp-XIR2SDbMlZKXKBt0gmMLsbz2uHYqKkMUEDhmKXFB06uYNbPdWM1f3uxBpyZPzdMizDU7NhdsdvPgZpfY7XhCycnBN_J1BtUaUY7kMShVTpeGMj_urFN_','USER',NULL,NULL,1),(5,'ayah amar','muamar171215@gmail.com','$2b$10$KAflbe3PriCHrpxZcfHxQeesW8cxFPPycUQCq6vcdr/LqB1sGc9lO',1,NULL,0,0,0,NULL,'USER',NULL,NULL,1),(6,'Abu Faqih','aariyawan56@gmail.com','$2b$10$vDycPy5XZB6BPNwDEPlEJO22gEWILRr7bx7KqHXS8bp3nGeRKM80i',1,NULL,0,0,0,NULL,'USER',NULL,NULL,1),(7,'𝚜𝚞𝚓𝚊𝚗𝚊','djanaputra@gmail.com','$2b$10$AqiwFIRots8JM5/Mewi8/OCCHkGqzjHvhWie9a80tgqYzD4zwlyRC',1,NULL,0,0,0,NULL,'USER',NULL,NULL,1),(8,'Luthfi','fiealman17@gmail.com','$2b$10$p1HfVwa02Rlrj/dLXV8nZOa6tzWt6glscYpE7QPGdBTaK4aQgPTL.',1,NULL,20,0,0,NULL,'USER',NULL,NULL,1),(9,'irpansyah ','ivheirpansyah@gmail.com','$2b$10$P1yAlXtEvxulRCfiTprzCuhpD.HNjqlcJ.6vUxeqeNqaUsy0cCfTq',1,NULL,0,0,0,'dIYbdsRlRa6_3S3VfjQgT-:APA91bHJskE2cT9lew_tsO4xmMcrGS-MXZmGPVT5AvtxGR8E2WpwRWPp3-ht7uwahUjZuE-ddvPxq26sFxbVCS728GUYo32Wc8f89zSorHu93jXApb3CQkIOecQs65lWV5R3P5sv3N61','USER',NULL,NULL,1),(10,'abu misk','riskyhadi32@gmail.com','$2b$10$f9sPE1nMQVmkCDTwNgDh5uS8fWo6rc3exsmY5TG8gqJlJzyw1/may',1,NULL,10,0,0,NULL,'USER',NULL,NULL,1),(11,'Hilman Abdurohman Abu Hanif','hilmanabdurohman@gmail.com','$2b$10$6hUu0K2SwAdVvbyjghD86ucIrmfUgR/XCTvtNTYCLhLYaQB8133cK',1,NULL,10,0,0,NULL,'USER',NULL,NULL,1),(12,'Abu Mabarr','wahyudin.langitan@gmail.com','$2b$10$DpBZ7y/S/2LfKFRp9.dIxetjAX7hWtBIIke6.vvzq4sHLi9/ObDNm',0,'263362',0,0,0,'exfRybh8TP6fwObO9An6Ad:APA91bFTjk5mBC8IPc8d2rtH-ktPGR9XBAq7Wu8sRCflSOK8Mq8LxDJUiYIxLaJr1Wt9h5vjtHyJExcL_1wAh4z8lrvzerljKWueU0LGnjVvHWtm4AaoOIpyFNZ-Bsqyjr_TDf7yDn__','USER',NULL,NULL,1),(13,'AbahnaAlulaAbqoryAsma','anggafreezzz@gmail.com','$2b$10$dgaPVyWBvlIan8AKnbHvYOXVKpt9myUGdrUV2d3xe9lBHC8wkvNia',1,NULL,0,0,0,NULL,'USER',NULL,NULL,1),(14,'nuayufajriani','yayu.yliawati@gmail.com','$2b$10$8qUKgtWpV0v5UERcj547Ye98EqA3oolYzfvwhX3UjSDVIMNVp4WwW',1,NULL,0,0,0,NULL,'USER',NULL,NULL,1),(15,'Hendra Muharom','hendramuharom@gmail.com','$2b$10$4NKpEDIobWZFQRd5mTIjtO0VGP8mcyKgLcGA4LC9NrvyEqtQ5ximS',1,NULL,0,0,0,NULL,'USER',NULL,NULL,1),(16,'kafsukabumi','kafsukabumi@gmail.com','$2b$10$nNBpSpLEXveOHkrLovSwCOMi894esghpdrfHMyz1RJT6vtjXqMHDi',1,NULL,0,0,0,'c8ujF_DpT4C_8VD2NrC6nH:APA91bHdD-SP5JcjeL7J-touivOpnvjonm3woKDc-GlbfBf_6fWuKtIJAbp8M4OjytVCBBsJkGYQ-IDUJ0XTeSc_7runas0QGvRMEJd39T6nrZigpq6kBME1PaUS3GynWLq6kR9DIQ32','USER',NULL,NULL,1),(17,'mangcoding','mangcoding@gmail.com','$2b$10$P4cCRM.sINU6n3UmGe1wN.I4Fr/5xFYz32AHl0bI7Uj6jddCjqGC2',0,'974898',0,0,0,NULL,'USER',NULL,NULL,1),(18,'mangcoding','denistwn67@gmail.com','$2b$10$7EtWZun3cyqt4UZmP7Xp4.ec3jPqBwf2P/I9zNgptbq/Hysx9Pga.',1,NULL,0,0,0,NULL,'USER',NULL,NULL,1),(19,'admin','admin','$2b$10$R7g7BzLklNcuyezg8Zyy4OsaXjao1CmCFy03P5TkzA.ZBf1D9hI0S',1,NULL,0,0,0,NULL,'ADMIN',NULL,NULL,1),(20,'anwar','vicihusnia9@gmail.com','$2b$10$t/f0sUR6/j1f3vNVUsHfXeG89XzPd9T3AmkBpN.oHIqoeE2YkLLT.',1,NULL,10,0,0,'d7sGe8tJTn6HWnw0v8PdND:APA91bGT63528cZ3V7hFp4IdIwjyxf08L-TYxhjw0ji8UZVBjWxlPDSl5agnwbJZw4hJ0oQjgZu5aaUkYapDlVFMin-1OXNhgBi6FpnPFY8T1sV0KBh-KSFhfcFL0Riot4JajKzoa2qs','USER',NULL,NULL,1),(21,'SuCu','altahffahriza@gmail.com','$2b$10$JdHdA5y7Kog1Y66KyVYy5.ZM7XP0JLEKkux3SZMuouADbnVwWrAGG',0,'495853',0,0,0,NULL,'USER',NULL,NULL,1),(22,'SuCu','kurniacucunia@gmail.com','$2b$10$H7wlgE.juFo4wcPJKXXEYeWMkdBmc3aEkl.Z.o4nVAxht6.LdvvJa',1,NULL,0,0,0,NULL,'USER',NULL,NULL,1),(23,'uda.ridwan','umi250691@gmail.com','$2b$10$RgUxgrKBjGtPn9cUF1VeG.zQyMNqXXPMaepC1kgK.iIdqsqtAQ1am',1,NULL,0,0,0,'cSwunyoBRNKRns31roaaK2:APA91bF4hvXKSszhUr-wRe-QCDFZ74Jx35gHuY-D0tJm7UwHr503wUWhPo3bgmWANpMbU5K3DdZ7wNn5ATZrfEVryvdgQYLkx4XlDwoprMFkJJmA6087OVcndM7fk4q8DI0PUsLAqBYe','USER',NULL,NULL,1),(24,'Harun','harunarrasyid90@gmail.com','$2b$10$gpGNkBwqgjiCdy7YRZgVkec/fwppNEKxz6OClPzGWL0wF8IIvNjiC',1,NULL,0,0,0,'daR8kYTdSWyZZ5b9naXCfM:APA91bHiq7saNbeIV3meZdz_zV7a624-BXYJ3i6tNLrzso6nvIegtqohA31fh-XNC0JS_zhE60EZc77-7rcxfYnV9SEuckLHOgCXlLPnKtcFkD4998-yHMpuoYkGCmOdKSjSxJKIuCP8','USER',NULL,NULL,1),(25,'imgroot','fnurdiansyah32@gmail.com','$2b$10$XlQok7QXZC6uXQwSsp2xeOJgRLJ8UzYJ4qq1RVJZPF2kXwxibebPS',1,NULL,0,0,0,'foVPtjmmQw-udbvAUirEwg:APA91bHUNJYv1-PTKmbELrlLJj8FBQZwzyYj4IXUu-hXR6Y8MZX_mZjid4nCSjK47hHeRXT2HNhZIk6MgsDkKEokBXgrgl2fSP8aHeXucBEJ7y6Dm_ted_T6gHhsmefEoiEDbgBbTylv','USER',NULL,NULL,1),(26,'Abdullah zahid','nadiniraihana03@gmail.com','$2b$10$8IUyrrAgTlTfQGhU/i4nkek6phoXN4GkV5fEnQMrvQxdc5FPz8i8q',0,'914854',0,0,0,NULL,'USER',NULL,NULL,1),(27,'Purwa Adi','purwaadi361@gmail.com','$2b$10$9vcyMH1wOSy0WbFwo8rMl.XdhuW9BLWOteoRw7958y82NexgfPV3q',1,NULL,0,0,0,'fppkNcqlQDCkwa-rIFfo4H:APA91bEiPXl8OtuJUcknmg6m8Udflz4huVK9Lw6lVOHOCAqPoeZ7G4qNVxoS7causFvTRmbZLpMeNKwXe08m816vV4VCJnc0pxZRz1HjNChfCjE_MnBq6SLs3B54qvDh0QWYr2G4qY_Z','USER',NULL,NULL,1),(28,'vvvzz','sensitifvibe@gmail.com','$2b$10$bq8rIfbveAzEYc91Yn5e2uGHAVpvfX.wbVW77.6n7TVCizl2bFpEi',1,NULL,0,0,0,'fbgYhQ-3RriRExuChyva0T:APA91bH-flrQIqqELAgazXEQtDdxgzf6lcG5Ab8cQYXHInEm3IspO0jn8GSEPA4MvF7FZatNwLVxKYCXiFZo7EEkAaXOgG22JsEvu-MelT949hBKAKiQARN_JEm0JI7qOyjzcrzeB2CN','USER',NULL,NULL,1),(30,'ilham','1@gmail.com','$2b$10$AMdTFFd7hlAuCi.gA.FYl.8JnOlUnkJh8pv4EHneRsKwt0BmJLY4u',1,NULL,0,0,0,'exfRybh8TP6fwObO9An6Ad:APA91bFTjk5mBC8IPc8d2rtH-ktPGR9XBAq7Wu8sRCflSOK8Mq8LxDJUiYIxLaJr1Wt9h5vjtHyJExcL_1wAh4z8lrvzerljKWueU0LGnjVvHWtm4AaoOIpyFNZ-Bsqyjr_TDf7yDn__','USER',NULL,NULL,1),(31,'ahmad','2@gmail.com','$2b$10$uZR.jfjaBofU76Oyp3L0QeCk1JNzoWSTOJRdBku24AezBstPJjWku',1,NULL,0,0,0,'cgIXfnRPQEK752OK4_o7t0:APA91bEqTPPFakAgRyEBZYQvUdq0bf_V7l41ekrXm1j-oUaVd-Yn5cVsxZ8X66o_A2cMGrWoOY1kDlYK9Yzj-EhGJBfXNubkRQeh-ujpda3_VedK-s-Hx5nG1BKn6GGRVzGkpTObu0Mq','USER',NULL,NULL,1),(32,'sehan','sehanaf4@gmail.com','$2b$10$eSSHxXWVLSuBwZU/HFtxKeuLUuOrxMLo6qtpZtKjTDnOC53AE3poO',1,NULL,0,0,0,'c88TknaaSIOvrp6IpPn2kA:APA91bGGWML37xt13wKif3imY92nvNxgfoNdNxHG9MgaQTmkOtxnY5qHZffC54hh7PFflbpsnk-FspbWepjoe5RiVzbxudAnKfPIF-xEWVj9schSVPpaP-GzjS7ZsXP8e_kH_wnTRpFq','USER',NULL,NULL,1),(33,'shafa','shafacarmelia23@gmail.com','$2b$10$ULJFvXzM.rIMrBcHdMajROQo6R0GSMt7gmDT/3p1BrZKGmnvC1nmG',1,NULL,0,0,0,'f6s6vPz_RK2tby6vKH2ZSW:APA91bGJJ8EQyNN2-3ona6CwOW6xI1C6eQpschQ3ilInxG-pXRf52-H16oT6TS03P1U-W2-uB4f-l_FKf_S7qgvfzsId9YYFr-_2aylZSm-8Xjzpcj90MnCW7kw0YyurR4W6D21vt434','USER',NULL,NULL,1),(34,'uhe','ujangherlaan@gmail.com','$2b$10$1qRbl3FQukzzm6p2Q4ePbOpKhRRTmUiN4QbYzejvV/SwUMxRziVVy',1,NULL,0,0,0,'dzTo-VwdQEyYp0rD8QrmwY:APA91bHFuYvGC001mxe_ByfG0tQ3eEAvKDcXJ_J1UlDFkjVwPOfmDmI-rqK41qdd3ZDrQfkOCxoLbWZ4zh0di1gtaDhe4pCyNB0VWSjT9y5C66EORo4vrpqZIQ0G6ybysSR5ZMgRssgZ','USER',NULL,NULL,1),(35,'r','4@gmail.com','$2b$10$ybujfMEGyg7fpixJkRJo1OovrDUCcUu22vedd8l4jKiOa6gragY9O',1,NULL,10,0,0,'exfRybh8TP6fwObO9An6Ad:APA91bFTjk5mBC8IPc8d2rtH-ktPGR9XBAq7Wu8sRCflSOK8Mq8LxDJUiYIxLaJr1Wt9h5vjtHyJExcL_1wAh4z8lrvzerljKWueU0LGnjVvHWtm4AaoOIpyFNZ-Bsqyjr_TDf7yDn__','USER',NULL,NULL,1);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('054d98a7-7416-4bfe-827c-020cc840cf9a','971a5cd0297c869527502b9551ad2ce97b48a5f4a5d26762183b184e3eaf5ef8',NULL,'20241028035516_add_report_model_etc','A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20241028035516_add_report_model_etc\n\nDatabase error code: 1062\n\nDatabase error:\nDuplicate entry \'rifqimuzakki4545@gmail.com\' for key \'User_username_key\'\n\nPlease check the query number 9 from the migration file.\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name=\"20241028035516_add_report_model_etc\"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name=\"20241028035516_add_report_model_etc\"\n             at schema-engine/core/src/commands/apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:201','2024-10-28 04:15:03.719','2024-10-28 03:55:16.157',0),('202031e3-0e12-44f1-baf8-630b584647fb','bac4a5d4fd91e8f2930c08ae012c25e2bc54be343432199dec13efcb422a752f','2024-06-07 10:47:03.502','20240607104703_add_all_update_feature',NULL,NULL,'2024-06-07 10:47:03.426',1),('9988e8a7-b4de-45c8-8aee-70c858f52554','2bd8bf7762e08ff6291ae8b1dfa1a7633b04727128f2f198c66c8da1f3e9f4de','2024-03-27 04:59:27.301','20240315044605_initial_migrate',NULL,NULL,'2024-03-27 04:59:27.220',1),('9ce29539-6972-489e-baad-c1cadfcd231e','af84c2e839f4600de664b3a5c84194d5568f60b71adb5b317626c2cec51d92ea','2024-03-27 04:59:27.314','20240317141708_add_nama_kuttab_field',NULL,NULL,'2024-03-27 04:59:27.303',1),('9fceff1a-06b1-443d-a44f-83b8076856c5','a6d4994497f515ac90db97f8403718701ac14df106dfaa7e3da42da5c05df3e4','2024-08-15 14:19:17.539','20240815141904_delete_account_feature',NULL,NULL,'2024-08-15 14:19:08.811',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userDeleted`
--

DROP TABLE IF EXISTS `userDeleted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userDeleted` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `deleteReason` text DEFAULT NULL,
  `deletedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userDeleted`
--

LOCK TABLES `userDeleted` WRITE;
/*!40000 ALTER TABLE `userDeleted` DISABLE KEYS */;
INSERT INTO `userDeleted` VALUES (1,'a@gmail.com','Ketidakpercayaan','2024-08-15 14:39:03.027');
/*!40000 ALTER TABLE `userDeleted` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28 11:15:45
