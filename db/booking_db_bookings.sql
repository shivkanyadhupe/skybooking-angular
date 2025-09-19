-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: booking_db
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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `flight_number` varchar(255) DEFAULT NULL,
  `num_of_adults` int NOT NULL,
  `num_of_children` int NOT NULL,
  `passenger_name` varchar(255) DEFAULT NULL,
  `seat_number` varchar(255) DEFAULT NULL,
  `ticket_type` varchar(255) DEFAULT NULL,
  `total_fare` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (4,'FL321',1,1,'Shubham Dhupe','10D','First',1500),(6,'QZ901',2,1,'Ram sham','12A','ECONOMY',2500),(7,'QZ901',2,1,'Ram sham','12A','ECONOMY',2500),(8,'QZ901',2,1,'rohini roy','13A','ECONOMY',2500),(9,'QZ901',2,1,'rohini roy','13A','ECONOMY',2500),(10,'QZ901',2,1,'rohini roy','13A','ECONOMY',2500),(11,'QZ901',2,1,'rohini roy','13A','ECONOMY',2500),(12,'QZ901',2,1,'rohini roy','13A','ECONOMY',2500),(13,'QZ901',2,0,'Lalita Dhupe','13A','Business',2000),(14,'QZ901',2,1,'Ram sham','12A','ECONOMY',2500),(15,'QZ901',2,1,'Shivkanya Dhupe dhjj','12A','ECONOMY',2500),(18,'QZ901',1,0,'Shivkanya','F12','Business',1000),(19,'A11',1,0,'Jay','A1','ECONOMY',1000),(20,'A11',1,1,'Ram','A1','ECONOMY',1500),(21,'A11',1,0,'Shivkanya','F12','ECONOMY',1000),(22,'A11',1,0,'Shital ','F13','ECONOMY',1000);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
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
