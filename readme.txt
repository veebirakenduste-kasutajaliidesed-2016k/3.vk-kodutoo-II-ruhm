--Esimiseks tegin uus tabel Mysql'is.--

CREATE TABLE `directory` (
 `id` INT NOT NULL AUTO_INCREMENT ,
 `name` VARCHAR( 64 ) NOT NULL ,
 `phone` VARCHAR( 16 ) NOT NULL ,
 PRIMARY KEY ( `id` )
);

--Ja panen seal mingi andmed--

insert into `directory` (name,phone) values ('Tom Smith', '512-555-0111');
insert into `directory` (name,phone) values ('Bill Smith', '512-555-0112');
insert into `directory` (name,phone) values ('John Smith', '512-555-0113');
insert into `directory` (name,phone) values ('Jane Smith', '512-555-0114');
insert into `directory` (name,phone) values ('Sara Smith', '512-555-0115');
