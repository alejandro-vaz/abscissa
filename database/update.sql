--
--  UPDATE
--

-- UPDATE -> ENTER DATABASE
USE abscissa;

-- UPDATE -> ROOT USER
UPDATE USERS SET Uname = 'root', Uemail = 'root@gmail.com', Uhashpass = '$argon2id$v=19$m=102400,t=2,p=8$AgM2N9CS0A12r3h3y2NqsA$ZVauIH5w8yMArk/ZZMNsHg', Uid = 0 WHERE Uname = 'myuseris';

-- UPDATE -> PASSWORD LENGTH
ALTER TABLE USERS MODIFY COLUMN Uhashpass varchar(256) NOT NULL;