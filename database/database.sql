CREATE TABLE `USERS` (
  `Uid` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier.',
  `Uname` varchar(255) UNIQUE NOT NULL COMMENT 'Exclusive username.',
  `Uemail` varchar(255) UNIQUE NOT NULL COMMENT 'User email address.',
  `Uhashpass` varchar(255) NOT NULL COMMENT 'Hashed user password so not even us can know it.',
  `Ujoined` datetime NOT NULL COMMENT 'Date and time when user joined.',
  `Uplayground` json NOT NULL COMMENT 'User playground data.',
  `Usettings` json NOT NULL COMMENT 'User preferences.',
  `Oid` mediumint NOT NULL COMMENT 'If the user is inside an organisation, be it not 0 but the ID of the organisation.',
  `Urole` tinyint NOT NULL COMMENT 'Permissions of the user.'
);

CREATE TABLE `COMPLETED` (
  `Uid` integer NOT NULL COMMENT 'Unique identifier of the user who completed the problem.',
  `Pid` binary NOT NULL COMMENT 'Identifier of the completed problem.',
  `Cprocess` json NOT NULL COMMENT 'LaTeX process that user wrote.',
  `Ctime` datetime NOT NULL COMMENT 'When was the problem completed.',
  `Cgrade` binary COMMENT 'Grade in binary when graded.'
);

CREATE TABLE `PROBLEMS` (
  `Pid` binary UNIQUE PRIMARY KEY NOT NULL COMMENT 'Unique ID of the problem.',
  `Uid` integer NOT NULL COMMENT 'Uid of the creator of the problem.',
  `Kid` smallint NOT NULL COMMENT 'Concept identifier which the problem talks about.',
  `Pedited` datetime NOT NULL COMMENT 'When was the problem created or last edited.',
  `Pmeta` json NOT NULL COMMENT 'Problem metadata independant of language.',
  `Psolution` json NOT NULL COMMENT 'Problem solution information which is not given to the app.',
  `Pdataen` json NOT NULL COMMENT 'Mandatory problem in English.',
  `Pdataes` json COMMENT 'Optional problem in Spanish.',
  `Pdatade` json COMMENT 'Optional problem in Deutsch.'
);

CREATE TABLE `CONCEPTS` (
  `Kid` smallint UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT 'Concept ID.',
  `Ken` varchar(255) UNIQUE NOT NULL COMMENT 'Name of the concept in English.',
  `Kes` varchar(255) UNIQUE NOT NULL COMMENT 'Name of the concept in Spanish.',
  `Kde` varchar(255) UNIQUE NOT NULL COMMENT 'Name of the concept in German.'
);

CREATE TABLE `RESOURCES` (
  `Rid` mediumint UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT 'ID of the resource.',
  `Kid` smallint NOT NULL COMMENT 'Concept the resource talks about.',
  `Rlang` varchar(255) NOT NULL COMMENT 'Language the resource is in.',
  `Rvideo` bit NOT NULL COMMENT 'Whether or not resource link is a YouTube video.',
  `Rlink` varchar(255) NOT NULL COMMENT 'Hyperlink to the resource.'
);

CREATE TABLE `SESSIONS` (
  `Sid` binary UNIQUE PRIMARY KEY NOT NULL COMMENT 'Session ID.',
  `Uid` integer UNIQUE NOT NULL COMMENT 'User linked to that session.',
  `Sip` varchar(255) NOT NULL COMMENT 'IP.',
  `Sexpires` datetime NOT NULL COMMENT 'When the session expires.'
);

CREATE TABLE `ORGANISATIONS` (
  `Oid` mediumint UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT 'Organisation ID.',
  `Oname` varchar(255) UNIQUE NOT NULL COMMENT 'Name of the organisation.'
);

CREATE INDEX `USERS_index_0` ON `USERS` (`Uname`, `Uemail`, `Oid`);

CREATE INDEX `COMPLETED_index_0` ON `COMPLETED` (`Uid`, `Pid`);

CREATE INDEX `index_0` ON `PROBLEMS` (`Uid`, `Kid`);

CREATE INDEX `CONCEPTS_index_0` ON `CONCEPTS` (`Ken`, `Kes`, `Kde`);

CREATE INDEX `RESOURCES_index_0` ON `RESOURCES` (`Rvideo`, `Rlang`, `Kid`);

CREATE INDEX `SESSIONS_index_0` ON `SESSIONS` (`Uid`);

ALTER TABLE `COMPLETED` ADD CONSTRAINT `fk_COMPLETED_Uid_USERS` FOREIGN KEY (`Uid`) REFERENCES `USERS` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `COMPLETED` ADD CONSTRAINT `fk_COMPLETED_Pid_PROBLEMS` FOREIGN KEY (`Pid`) REFERENCES `PROBLEMS` (`Pid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PROBLEMS` ADD CONSTRAINT `fk_PROBLEMS_Uid_USERS` FOREIGN KEY (`Uid`) REFERENCES `USERS` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PROBLEMS` ADD CONSTRAINT `fk_PROBLEMS_Kid_CONCEPTS` FOREIGN KEY (`Kid`) REFERENCES `CONCEPTS` (`Kid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `RESOURCES` ADD CONSTRAINT `fk_RESOURCES_Kid_CONCEPTS` FOREIGN KEY (`Kid`) REFERENCES `CONCEPTS` (`Kid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `SESSIONS` ADD CONSTRAINT `fk_USERS_Uid_SESSIONS` FOREIGN KEY (`Uid`) REFERENCES `USERS` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `USERS` ADD CONSTRAINT `fk_USERS_Oid_ORGANISATIONS` FOREIGN KEY (`Oid`) REFERENCES `ORGANISATIONS` (`Oid`) ON DELETE CASCADE ON UPDATE CASCADE;

