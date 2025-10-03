--
--  TABLE
--

-- TABLE -> USERS
Create table `USERS` (
    `Uid` Integer unsigned primary key not null auto_increment comment
        'Public. 
        Unique identifier.',
    `Uname` Varchar(32) unique not null comment
        'Public.
        Exclusive username.',
    `Uemail` Varchar(64) unique not null comment
        'Private.
        User email address.',
    `Uhashpass` Varchar(256) not null comment
        'Private.
        Hashed user password so not even us can know it.'
) auto_increment = 0;


--
--  PROCEDURES
--

-- PROCEDURES -> CREATE USERS
Delimiter //
Create procedure CreateUsers(
    username varchar(32),
    email varchar(64),
    password varchar(256)
) begin
    Insert into USERS (Uname, Uemail, Uhashpass) values (
        username, 
        email, 
        password
    );
    Select Uid, Uname from USERS where Uid = last_insert_id() order by Uid asc;
End //
Delimiter ;

-- PROCEDURES -> GET PRIVATE USERS
Delimiter //
Create procedure GetPrivateUsers(
    id int unsigned
) begin
    Select * from USERS where Uid = id order by Uid asc;
End //
Delimiter ;

-- PROCEDURES -> GET UID USERS
Delimiter //
Create procedure GetUidUsers(
    id int unsigned
) begin
    Select Uid, Uname from USERS where Uid = id order by Uid asc;
End //
Delimiter ;

-- PROCEDURES -> GET UNAME USERS
Delimiter //
Create procedure GetUnameUsers(
    username varchar(32)
) begin
    Select Uid, Uname from USERS where Uname = username order by Uid asc;
End //
Delimiter ;


--
--  DEFAULTS
--

-- DEFAULTS -> ROOT USER
Call CreateUsers(
    'root',
    'root@abscissa.eu',
    '$argon2id$v=19$m=102400,t=2,p=8$AgM2N9CS0A12r3h3y2NqsA$ZVauIH5w8yMArk/ZZMNsHg'
);