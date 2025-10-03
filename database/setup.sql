--
--  RESET
--

-- RESET -> DROP
Drop database if exists `abscissa`;

-- RESET -> CREATE
Create database `abscissa`
    Default character set utf8mb4
    Collate utf8mb4_unicode_ci;

-- RESET -> USE
Use `abscissa`;


--
--  SETUP
--

-- SETUP -> MANUAL ZERO
Set sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

-- SETUP -> TABLES
Source ./data/users.sql;
Source ./data/sessions.sql;