-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: flight_user_db
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shivkanyadhupe@gmail.com','shivkanya','$2a$10$DMCeQXkpN/sfjSv9cqQ1QOciC/nle7m1S/A9YNcG3WszOTJTue13a','ROLE_ADMIN'),(2,'shivdhupe@gmail.com','shiv','$2a$10$KtKJJlrZ7Zjs1SO9hcDig.b/YMyhmgV/DFdZRh8j.Pp9d3IObx..K','ROLE_USER'),(3,'shivkanyadhupe712@gmail.com','shivkanya Dhupe','$2a$10$5QsoT.Jd5y0wV8HV01mW9ucHombFPgDU1N3A1oIA8jrpwWxmI9nDe','ROLE_ADMIN'),(4,'sanchita@gmail.com','sanchita Dhupe','$2a$10$0ZnPnd8sIIIB3RpxYteZMudas0gRFn90EowQ8yVK9EepJIOOKMYru','ROLE_USER'),(5,'testuser@example.com','testuser','$2a$10$rheLeZqaUdArnARQWYMvTuDWRIi8P0oLgkgmueM4bc3KgABkfh2m6','ROLE_USER'),(6,'lalita@gmail.com','lalita Dhupe','$2a$10$iaT2f0TvQoe5NBDKcx1oj.0VmvwWe4N2/h4Mu33PY1DyH29NODLZa','ROLE_ADMIN'),(7,'pqr@gmail.com','pqr','$2a$10$Q29nqva6guxX1F31600gW.2fDSocrJaNEXBy1fg6Vu90.COaSr2Oe','ROLE_USER'),(9,'admin@gmail.com','Admin','$2a$10$iGF.B0oqIA3UkU.o1bKq8uA5FtnTHu49AyRz9igGnRUQlGZGTL/jm','ROLE_ADMIN'),(10,'shubham@gmail.com','Shubham D','$2a$10$r8WyFiYoXH/8NXRouzvi/eKL0g5eesdelPl2mJZEYfNarhOXwtDjq','ROLE_USER'),(13,'tester@gmail.com','tester','$2a$10$R8fS05WU1slbMRnuwXUf6uPS7HvxV8CmkO0mTXl6KeObkDmUP62b.','ROLE_USER'),(14,'shriram@gmail.com','ShriRam','$2a$10$vW6Juuh1RHgfG48HcPFjH.nfN9OOGSmLxQ.aX.ph6hyntdmsAN1au','ROLE_ADMIN'),(15,'jayhanuman@gmail.com','Jay Hanuman','$2a$10$PC.YjOA6E5A8L1Tj21GbUOvSB5QCMK8jNHkIw2LGnq0dwKp9uY8fu','ROLE_USER'),(16,'mahadev@gmail.com','Mahadev','$2a$10$00MS5U2pdG5T6qLN2gwSA.JvqmVQvAkfORLoksFbi1bNuOo8VvQZu','ROLE_ADMIN'),(17,'parvati@gmail.com','Parvati','$2a$10$uhRz52WKV4zspCt0t/Jis.lZgNPDlu62Hqriq9/4liO1ZcsL.ds86','ROLE_ADMIN'),(18,'lakshman@gmail.com','Lakshman','$2a$10$OHMMnawU1kC6PXhj4d19/uLlkt6m2abMB9.dNO5AtzWuyi84WPQ7m','ROLE_ADMIN'),(19,'user@gmail.com','user','$2a$10$JEkJ1EkmvdKP0KlfNS/g0.SiNsKbaT0w.RT8Y0RJXmqnECd4Zn.Fi','ROLE_USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
