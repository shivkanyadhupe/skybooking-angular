-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: flight_db
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flights` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `airline` varchar(255) NOT NULL,
  `arrival_time` datetime(6) NOT NULL,
  `available_seats` int NOT NULL,
  `departure_time` datetime(6) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `flight_number` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  `total_seats` int NOT NULL,
  `fare` decimal(38,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES (10,'Indigo','2025-08-20 09:00:00.000000',90,'2025-08-20 06:00:00.000000','goa','A11','Delhi',150,5000.00),(11,'Indigo','2025-07-30 23:59:00.000000',120,'2025-07-30 20:29:00.000000','goa','A11','Hyderabad',180,4000.00),(12,'Air India','2025-08-07 12:25:00.000000',75,'2025-08-07 07:00:00.000000','Banglore','AB12','Pune',120,4000.00),(14,'Air India','2025-07-29 22:15:00.000000',120,'2025-07-30 18:13:00.000000','Delhi','AR12','Mumbai',180,4500.00),(15,'Indigo','2025-07-30 22:50:00.000000',50,'2025-07-30 19:50:00.000000','Mysoor','A17','Mumbai',120,4500.00),(17,'SpiceJet','2025-08-29 23:55:00.000000',120,'2025-08-29 19:55:00.000000','Chennai','APK','Kolkatta',180,5000.00),(18,'Akasa Air','2025-08-16 22:57:00.000000',55,'2025-08-16 19:57:00.000000','Pune','AF12','Kochi',150,4200.00),(21,'Indigo','2025-08-25 11:47:00.000000',60,'2025-08-25 08:47:00.000000','Banglore','F7','Pune',120,4000.00);
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-19 11:26:27
