--
--  TABLE
--

-- TABLE -> FEATURES
Create table `FEATURES` (
    `Fid` Smallint unsigned primary key not null auto_increment comment
        'Public.
        Feature request ID.',
    `Fname` Varchar(128) unique not null comment
        'Public.
        Feature name overview.',
    `Ftext` Text not null comment
        'Public.
        Feature description and details.',
    `Fvotes` Smallint not null default 0 comment
        'Public.
        Upvotes - downvotes for the feature.'
) auto_increment = 0;


--
--  PROCEDURES
--

-- PROCEDURES -> CREATE FEATURES
Delimiter //
Create procedure CreateFeatures(
    title varchar(128),
    content text
) begin
    Insert into FEATURES (Fname, Ftext) values (
        title, 
        content
    );
    Select * from FEATURES where Fname = title;
End //
Delimiter ;

-- PROCEDURES -> GET ALL FEATURES
Delimiter //
Create procedure GetAllFeatures() begin
    Select * from FEATURES;
End //
Delimiter ;

-- PROCEDURES -> UPVOTE FEATURES
Delimiter //
Create procedure UpvoteFeatures(
    id smallint unsigned
) begin
    Update FEATURES set Fvotes = Fvotes + 1 where Fid = id;
    Select * from FEATURES where Fid = id;
End //
Delimiter ;

-- PROCEDURES -> DOWNVOTE FEATURES
Delimiter //
Create procedure DownvoteFeatures(
    id smallint unsigned
) begin 
    Update FEATURES set Fvotes = Fvotes - 1 where Fid = id;
    Select * from FEATURES where Fid = id;
End //
Delimiter ;