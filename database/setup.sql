--
--  RESET
--

-- RESET -> DROP
DROP DATABASE IF EXISTS `abscissa`;

-- RESET -> CREATE
CREATE DATABASE `abscissa`
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- RESET -> USE
USE `abscissa`;


--
--  TABLES
--

-- TABLES -> ORGANISATIONS
CREATE TABLE `ORGANISATIONS` (
  `Oid` mediumint UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT 
  COMMENT 'Organisation ID.',
  `Oname` varchar(128) UNIQUE NOT NULL 
  COMMENT 'Name of the organisation.'
);

-- TABLES -> USERS
CREATE TABLE `USERS` (
  `Uid` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT 
  COMMENT 'Unique identifier.',
  `Uname` varchar(32) UNIQUE NOT NULL 
  COMMENT 'Exclusive username.',
  `Uemail` varchar(64) UNIQUE NOT NULL 
  COMMENT 'User email address.',
  `Uhashpass` varchar(64) NOT NULL 
  COMMENT 'Hashed user password so not even us can know it.',
  `Ujoined` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP 
  COMMENT 'Date and time when user joined.',
  `Usettings` json NOT NULL DEFAULT "{}"
  COMMENT 'User preferences.',
  `Oid` mediumint NOT NULL DEFAULT 0 
  COMMENT 'If the user is inside an organisation, be it not 0 but the ID of the organisation.',
  `Urole` tinyint NOT NULL DEFAULT 0 
  COMMENT 'Permissions of the user.',
  FOREIGN KEY (`Oid`) REFERENCES `ORGANISATIONS` (`Oid`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- TABLES -> SESSIONS
CREATE TABLE `SESSIONS` (
  `Sid` binary(32) UNIQUE PRIMARY KEY NOT NULL 
  COMMENT 'Session ID.',
  `Uid` integer UNIQUE NOT NULL 
  COMMENT 'User linked to that session.',
  `Sip` varchar(64) NOT NULL 
  COMMENT 'IP.',
  `Sexpires` datetime NOT NULL 
  COMMENT 'When the session expires.',
  FOREIGN KEY (`Uid`) REFERENCES `USERS` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- TABLES -> CONCEPTS
CREATE TABLE `CONCEPTS` (
  `Kid` smallint UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT 
  COMMENT 'Concept ID.',
  `Ken` varchar(64) UNIQUE NOT NULL 
  COMMENT 'Name of the concept in English.',
  `Kes` varchar(64) UNIQUE NOT NULL 
  COMMENT 'Name of the concept in Spanish.',
  `Kde` varchar(64) UNIQUE NOT NULL 
  COMMENT 'Name of the concept in German.'
);

-- TABLES -> RESOURCES
CREATE TABLE `RESOURCES` (
  `Rid` mediumint UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT 
  COMMENT 'ID of the resource.',
  `Kid` smallint NOT NULL 
  COMMENT 'Concept the resource talks about.',
  `Rlang` char(2) NOT NULL COMMENT 'Language the resource is in.',
  `Rvideo` bit NOT NULL 
  COMMENT 'Whether or not resource link is a YouTube video.',
  `Rlink` varchar(256) NOT NULL 
  COMMENT 'Hyperlink to the resource.',
  FOREIGN KEY (`Kid`) REFERENCES `CONCEPTS` (`Kid`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- TABLES -> PROBLEMS
CREATE TABLE `PROBLEMS` (
  `Pid` binary(4) UNIQUE PRIMARY KEY NOT NULL 
  COMMENT 'Unique ID of the problem.',
  `Uid` integer NOT NULL 
  COMMENT 'Uid of the creator of the problem.',
  `Kid` smallint NOT NULL 
  COMMENT 'Concept identifier which the problem talks about.',
  `Pedited` datetime NOT NULL 
  COMMENT 'When was the problem created or last edited.',
  `Pmeta` json NOT NULL 
  COMMENT 'Problem metadata independant of language.',
  `Psolution` json NOT NULL 
  COMMENT 'Problem solution information which is not given to the app.',
  `Pdataen` json NOT NULL 
  COMMENT 'Mandatory problem in English.',
  `Pdataes` json 
  COMMENT 'Optional problem in Spanish.',
  `Pdatade` json 
  COMMENT 'Optional problem in Deutsch.',
  FOREIGN KEY (`Uid`) REFERENCES `USERS` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Kid`) REFERENCES `CONCEPTS` (`Kid`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- TABLES -> COMPLETED
CREATE TABLE `COMPLETED` (
  `Uid` integer NOT NULL 
  COMMENT 'Unique identifier of the user who completed the problem.',
  `Pid` binary(4) NOT NULL 
  COMMENT 'Identifier of the completed problem.',
  `Cprocess` json NOT NULL 
  COMMENT 'LaTeX process that user wrote.',
  `Ctime` datetime NOT NULL 
  COMMENT 'When was the problem completed.',
  `Cgrade` binary(1) 
  COMMENT 'Grade in binary when graded.',
  FOREIGN KEY (`Uid`) REFERENCES `USERS` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Pid`) REFERENCES `PROBLEMS` (`Pid`) ON DELETE CASCADE ON UPDATE CASCADE
);


--
--  DEFAULTS
--

-- DEFAULTS -> PUBLIC ORGANISATION
INSERT INTO ORGANISATIONS (Oid, Oname) VALUES (0, "public");
UPDATE ORGANISATIONS SET Oid = 0 WHERE Oname = "public";

-- DEFAULTS -> TEST CONCEPT
INSERT INTO CONCEPTS (Kes, Ken, Kde) VALUES ("Álgebra", "Algebra", "Algebra");

-- DEFAULTS -> MY USER
INSERT INTO USERS (Uname, Uemail, Uhashpass) VALUES (
  "myuseris",
  "myuseris@gmail.com",
  "myhashpass"
);

-- DEFAULTS -> INITIAL PROBLEMS
INSERT INTO PROBLEMS (Pid, Uid, Kid, Pedited, Pmeta, Psolution, Pdataen, Pdataes, Pdatade) VALUES (
  X'00000000', 
  1, 
  1, 
  "2025-07-25 06:47:00", 
  "{\"calculator\": false}", 
  "{}", 
  "{ \"title\": \"Solve first degree equation\", \"editor\": \"x + 3 = 1\", \"instructions\": \"# SOLVE FOR X IN\\nx + 3 = 1\", \"svg\": null}", 
  "{}", 
  "{}"
);

INSERT INTO PROBLEMS (Pid, Uid, Kid, Pedited, Pmeta, Psolution, Pdataen, Pdataes, Pdatade) VALUES (
  X'00000001',
  1,
  1,
  "2025-07-25 06:47:00", 
  "{\"calculator\": false}", 
  "{}", 
  "{ \"title\": \"Solve second degree equation\", \"editor\": \"x^2^ -3*x = 4\", \"instructions\": \"# SOLVE FOR X IN\\nx^2^ -3*x = 4\", \"svg\": null}", 
  "{}", 
  "{}"
);