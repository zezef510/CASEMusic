CREATE DATABASE  IF NOT EXISTS `music` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `music`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: music
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `singer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,'Ballad','../assets/database/albums/Andree.jpg','Andree'),(2,'Pop','../assets/database/albums/Bằng Kiều.jpg','Bằng kiều'),(3,'Rock','../assets/database/albums/Da LAB.jpg','Da LAB'),(4,'Rap','../assets/database/albums/Đen.jpg','Đen'),(5,'Chilling','../assets/database/albums/Hòa Minzy.jpg','Hòa Minzy'),(6,'Workout','../assets/database/albums/Mono.jpg','Mono'),(7,'Bolero','../assets/database/albums/Soobin.jpg','Soobin'),(8,'Quẩy ','../assets/database/albums/Tăng Duy Tân.jpg','Tăng Duy Tân'),(9,'Múa','../assets/database/albums/Tlinh.jpg','Tlinh');
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_92ca9b9b5394093adb6e5f55c4b` (`userId`),
  CONSTRAINT `FK_92ca9b9b5394093adb6e5f55c4b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES (2,'Playlist của HA','../assets/images/avatar-default.jpg',3,NULL),(3,'Playlist của QA','../assets/images/avatar-default.jpg',4,NULL),(5,'Playlist của Nghĩa','../assets/images/avatar-default.jpg',3,NULL),(6,'Playlist của Quỳnh','../assets/images/avatar-default.jpg',3,NULL),(7,'Playlist của Nam','../assets/images/avatar-default.jpg',4,NULL),(9,'Playlist của NAL','../assets/images/avatar-default.jpg',4,NULL),(10,'Son Tung','https://firebasestorage.googleapis.com/v0/b/users-8f542.appspot.com/o/images%2Fchungtacuahientai.jfif?alt=media&token=0572e040-a7c2-4439-a7f4-7d55da75ca8d',2,'Bai hat cua ST');
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_song`
--

DROP TABLE IF EXISTS `playlist_song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_song` (
  `id` int NOT NULL AUTO_INCREMENT,
  `songId` int DEFAULT NULL,
  `playlistId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b3a2005c3364905c6bd7f3ac57f` (`playlistId`),
  KEY `FK_b4a58966c6c196987542ed84ad7` (`songId`),
  CONSTRAINT `FK_b3a2005c3364905c6bd7f3ac57f` FOREIGN KEY (`playlistId`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_b4a58966c6c196987542ed84ad7` FOREIGN KEY (`songId`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_song`
--

LOCK TABLES `playlist_song` WRITE;
/*!40000 ALTER TABLE `playlist_song` DISABLE KEYS */;
INSERT INTO `playlist_song` VALUES (9,1,10),(10,2,10),(11,3,10);
/*!40000 ALTER TABLE `playlist_song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `singer` varchar(255) DEFAULT NULL,
  `musician` varchar(255) DEFAULT NULL,
  `songUrl` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `albumId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c529927ae410af49faaf2e239a5` (`albumId`),
  CONSTRAINT `FK_c529927ae410af49faaf2e239a5` FOREIGN KEY (`albumId`) REFERENCES `album` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` VALUES (1,'À Lôi','Double2T','Masew','../assets/database/music/ALoi.mp3','../assets/database/images/ALoi.jpg',1),(2,'AnhsEms','QNT','QNT','../assets/database/music/anhsems.mp3','../assets/database/images/anhsems.jpg',2),(3,'Back To HomeTown','Sol7','Sol7','../assets/database/music/backtohometown.mp3','../assets/database/images/backtohometown.jpg',3),(4,'Bật tình yêu lên','Tăng Duy Tân, Hòa Minzy','Tăng Duy Tân','../assets/database/music/battinhyeulen.mp3','../assets/database/images/battinhyeulen.jpg',4),(5,'BlackJack','Soobin, Binz','Binz','../assets/database/music/blackjack.mp3','../assets/database/images/blackjack.jfif',5),(6,'Chìm sâu','MCK, Trung Trần','MCK','../assets/database/music/chimsau.mp3','../assets/database/images/chimsau.jpg',6),(7,'Chúng ta của hiện tại','Sơn Tùng MTP','Sơn Tùng MTP','../assets/database/music/chungtacuahientai.mp3','../assets/database/images/chungtacuahientai.jfif',7),(8,'Trốn tìm','Đen ','Đen','../assets/database/music/trontim.m4a','../assets/database/images/den.jpg',2),(9,'Gene','Binz','Binz','../assets/database/music/gene.mp3','../assets/database/images/GreyD.jpg',4),(10,'Hoàn Hảo','Bray','Bray','../assets/database/music/hoanhao.mp3','../assets/database/images/Bray.jpg',2),(11,'Muộn rồi mà sao còn','Sơn Tùng MTP','Sơn Tùng MTP','../assets/database/music/muonroimasaocon.m4a','../assets/database/images/sontung.jpg',6),(12,'Nếu lúc đó','Tlinh','Tlinh','../assets/database/music/neulucdo.mp3','../assets/database/images/Tlinh.jpg',2),(13,'Nhạc Anh','Andree, Wrdie','Andree','../assets/database/music/nhacanh.mp3','../assets/database/images/andree.jpg',5),(14,'Thức giấc','DALAB','DALAB','../assets/database/music/thucgiac.mp3','../assets/database/images/dalab.jpg',4);
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'hiep','1234','#','admin'),(2,'hoanganh','1234','../assets/database/users/ha.jpg','user'),(3,'quanganh','1234','#','user'),(4,'nhuanh','1234','#','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-08 17:25:58
