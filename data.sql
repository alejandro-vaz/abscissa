-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: data
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `problems`
--

DROP TABLE IF EXISTS `problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problems` (
  `id` char(6) COLLATE latin1_general_ci NOT NULL,
  `data` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problems`
--

LOCK TABLES `problems` WRITE;
/*!40000 ALTER TABLE `problems` DISABLE KEYS */;
INSERT INTO `problems` VALUES ('000000','{\"content\": [\"0000\"], \"latexSolutions\": {\"$$x = 80-\\\\frac{W(80^{80}\\\\ln 80)}{\\\\ln 80}$$\": \"$$80^x+x=80 \\\\\\\\ 80^x = 80-x \\\\\\\\ 80-x=80^x\\\\\\\\ (80-x)80^{-x}=1\\\\\\\\ (80-x)80^{80-x}=80^{80}\\\\\\\\ (80-x)\\\\left(e^{\\\\ln80}\\\\right)^{80-x}=80^{80}\\\\\\\\ (80-x)e^{(80-x)\\\\ln 80} = 80^{80}\\\\\\\\ \\\\ln 80 \\\\cdot (80-x)e^{(80-x)\\\\ln 80} = 80^{80}\\\\ln 80 \\\\\\\\ W(\\\\ln 80 \\\\cdot (80-x)e^{(80-x)\\\\ln 80}) = W(80^{80}\\\\ln 80) \\\\\\\\ (80-x)\\\\ln 80 = W(80^{80}\\\\ln 80) \\\\\\\\ 80-x = \\\\frac{W(80^{80}\\\\ln 80)}{\\\\ln 80} \\\\\\\\ -x = \\\\frac{W(80^{80}\\\\ln 80)}{\\\\ln 80}-80 \\\\\\\\ \\\\boxed{x = 80-\\\\frac{W(80^{80}\\\\ln 80)}{\\\\ln 80}}$$\"}, \"textDescription\": \"(#000000) Solve for x\", \"latexInstructions\": \"Solve analytically for $x$:<br>$$80^x + x = 80 $$\"}'),('000001','{\"content\": [\"0300\", \"0301\"], \"latexSolutions\": {\"$$e - 1$$\": \"$$\\\\begin{align*} &\\\\int_0^1 e^x dx \\\\\\\\ &=e^x \\\\Bigg|^1_0 \\\\\\\\ &=e^1 - e^0 \\\\\\\\ &= \\\\boxed{e - 1} \\\\end{align*}$$\"}, \"textDescription\": \"(#000001) Calculate definite integral\", \"latexInstructions\": \"Solve the following definite integral analytically:<br>$$\\\\int_0^1{e^x dx}$$\"}');
/*!40000 ALTER TABLE `problems` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-21 20:51:41
