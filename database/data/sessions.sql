--
--  TABLE
--

-- TABLE -> SESSIONS
Create table `SESSIONS` (
    `Sid` Binary(32) primary key not null comment
        'Private.
        Session ID.',
    `Uid` Integer unsigned unique not null comment
        'Public.
        User linked to that session.',
    `Sip` Varchar(64) not null comment
        'Private.
        IP.',
    `Sexpires` Datetime not null comment
        'Private.
        When the session expires.',
    Foreign key (`Uid`) references `USERS` (`Uid`)
        On delete cascade on update cascade
);


--
--  PROCEDURES
--

-- PROCEDURES -> CREATE SESSIONS
Delimiter //
Create procedure CreateSessions(
    id integer,
    ip varchar(64)
) begin
    Declare sessionBytes binary(32);
    Set sessionBytes = random_bytes(32);
    Insert into SESSIONS (Sid, Uid, Sip, Sexpires) values (
        sessionBytes, 
        id, 
        ip, 
        date_add(now(), interval 7 day)
    ) on duplicate key update
        Sid = values(Sid),
        Sip = values(Sip),
        Sexpires = values(Sexpires);
    Select Uid from SESSIONS where Sid = sessionBytes;
End //
Delimiter ;

-- PROCEDURES -> GET PRIVATE SESSIONS
Delimiter //
Create procedure GetPrivateSessions(
    id integer
) begin
    Select * from SESSIONS where Uid = id;
End //
Delimiter ;

-- PROCEDURES -> VALIDATE SESSIONS
Delimiter //
Create procedure ValidateSessions(
    sessionBytes binary(32),
    ip varchar(64)
) begin
    Select case when exists (
        Select 1 from SESSIONS where Sid = sessionBytes and Sip = ip and now() < Sexpires
    ) then 1 else 0 end as is_valid;
End //
Delimiter ;