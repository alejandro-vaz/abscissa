--
--  UPDATE
--

-- UPDATE -> DATABASE
USE abscissa;

-- UPDATE -> ROOT USER EMAIL
UPDATE USERS SET Uemail = "root@abscissa.eu" WHERE Uemail = "root@gmail.com";

-- UPDATE -> DROP ANALYTICS
DROP TABLE IF EXISTS `ANALYTICS`;

