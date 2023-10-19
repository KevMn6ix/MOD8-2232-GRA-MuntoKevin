CREATE DATABASE  IF NOT EXISTS `library_exam` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `library_exam`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: library_exam
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `year` int NOT NULL,
  `page_count` int NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Jane Eyre','Charlotte Brontë',1847,624,'Brontë’s infamous Gothic novel tells the story of orphan Jane, a child of unfortunate circumstances. Raised and treated badly by her aunt and cousins and eventually sent away to a cruel boarding school, it is not until Jane becomes a governess at Thornfield that she finds happiness. Meek, measured, but determined, Jane soon falls in love with her brooding and stormy master, Mr Rochester, but it is not long before strange and unnerving events occur in the house and Jane is forced to leave Thornfield to pursue her future.'),(2,'A Tale of Two Cities','Charles Dickens',1859,424,'Taking place in London and Paris in the eighteenth century, in the years leading up to and during the French Revolution, Charles Dickens’ A Tale of Two Cities is one of injustice, revenge, rebirth, love, and sacrifice. Originally published in thirty-one weekly installments in 1859, this novel is uncharacteristic for Dickens as it lacks comic relief, as well as a protagonist, though London and Paris are considered to be the true protagonists of the story. The turbulence found in this epic tale is also believed to reflect the turmoil in Dickens’ personal life at the time.'),(3,'Middlemarch','George Eliot',1871,646,'Set during the early part of the 19th century, George Eliot’s Middlemarch is a work of epic scope that centers on the intersecting lives of the inhabitants of the fictitious titular town of Middlemarch. The themes of the novel are as numerous as its characters. Through the narrative of the story the author addresses the status of women, the nature of marriage, politics, religion, and education in the 19th century. The story is principally concerned with the lives of Dorothea Brooke, an energetic, intelligent, wealthy young woman and of Tertius Lydgate, an idealistic, talented, yet naïve young doctor. Strong parallels can be drawn between the two characters; they both have great aspirations in their work and find themselves in marriages in which they are not happy with. In addition, numerous sub-plots draw together the lives of the inhabitants of the town. Considered one of the great achievements of English literature, George Eliot’s Middlemarch was immensely popular upon its original publication and remains to this day one of the finest examples of the author’s prolific and accomplished literary career.'),(4,'The Brothers Karamazov','Fyodor Dostoevsky',1880,824,'The Brothers Karamazov is a murder mystery, a courtroom drama, and an exploration of erotic rivalry in a series of triangular love affairs involving the “wicked and sentimental” Fyodor Pavlovich Karamazov and his three sons―the impulsive and sensual Dmitri; the coldly rational Ivan; and the healthy, red-cheeked young novice Alyosha. Through the gripping events of their story, Dostoevsky portrays the whole of Russian life, is social and spiritual striving, in what was both the golden age and a tragic turning point in Russian culture.'),(5,'Mrs Dalloway','Virginia Woolf',1925,288,'Virginia Woolf’s singular technique in Mrs Dalloway heralds a break with the traditional novel form and reflects a genuine humanity and a concern with the experiences that both enrich and stultify existence. Society hostess, Clarissa Dalloway is giving a party. Her thoughts and sensations on that one day, and the interior monologues of others whose lives are interwoven with hers gradually reveal the characters of the central protagonists. Clarissa’s life is touched by tragedy as the events in her day run parallel to those of Septimus Warren Smith, whose madness escalates as his life draws toward inevitable suicide.'),(6,'The Hobbit','J. R. R. Tolkien',1937,384,'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely travelling further than the pantry of his hobbit-hole in Bag End. But his contentment is disturbed when the wizard, Gandalf, and a company of thirteen dwarves arrive on his doorstep one day to whisk him away on an unexpected journey ‘there and back again’. They have a plot to raid the treasure hoard of Smaug the Magnificent, a large and very dangerous dragon…'),(7,'Invisible Man','Ralph Ellison',1952,608,'In this deeply compelling novel and epic milestone of American literature, a nameless narrator tells his story from the basement lair of the Invisible Man he imagines himself to be. He describes growing up in a Black community in the South, attending a Black college from which he is expelled, moving to New York and becoming the chief spokesman of the Harlem branch of “the Brotherhood,” before retreating amid violence and confusion.'),(8,'To Kill a Mockingbird','Harper Lee',1960,384,'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic. Compassionate, dramatic, and deeply moving, To Kill A Mockingbird takes readers to the roots of human behavior – to innocence and experience, kindness and cruelty, love and hatred, humor and pathos.'),(9,'One Hundred Years of Solitude','Gabriel García Márquez',1967,448,'One Hundred Years of Solitude tells the story of the rise and fall, birth and death of the mythical town of Macondo through the history of the Buendía family. Inventive, amusing, magnetic, sad, and alive with unforgettable men and women – brimming with truth, compassion, and a lyrical magic that strikes the soul – this novel is a masterpiece in the art of fiction.'),(10,'The Goldfinch','Donna Tartt',2015,784,'Theo Decker, a 13-year-old New Yorker, miraculously survives an accident that kills his mother. Abandoned by his father, Theo is taken in by the family of a wealthy friend. Bewildered by his strange new home on Park Avenue, disturbed by schoolmates who don’t know how to talk to him, and tormented above all by his longing for his mother, he clings to the one thing that reminds him of her: a small, mysteriously captivating painting that ultimately draws Theo into the underworld of art. As an adult, Theo moves silkily between the drawing rooms of the rich and the dusty labyrinth of an antiques store where he works. He is alienated and in love--and at the center of a narrowing, ever more dangerous circle. The Goldfinch is a mesmerizing, stay-up-all-night and tell-all-your-friends triumph, an old-fashioned story of loss and obsession, survival and self-invention, and the ruthless machinations of fate.');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `extended_time` datetime(6) DEFAULT NULL,
  `expiry_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sessions_username_idx` (`username`),
  CONSTRAINT `fk_sessions_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` binary(60) NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('anna',0x243262243130244439463376685466424652374A745056344358756165334D4D6B4651752F504C4B6D4B776A586E73445431594F4D49543768722E65,'librarian','Anna Brown'),('catherine',0x243262243130247334696D3047426E67734A4E4F6A326739334D4F57654B614670456A444E4F4E487A2F4E6A6A6D79545853537439664753482F7232,'customer','Catherine Dubois'),('emma',0x24326224313024617953464133543851575A6967656437396F3248386531785A4543534254696E74616E6C52796B6844667A422F2E47433472764965,'customer','Emma Page');
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
