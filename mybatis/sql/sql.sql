CREATE DATABASE db_mybatis;

CREATE TABLE db_mybatis.student(
   ID int(10) NOT NULL AUTO_INCREMENT,
   NAME varchar(100) NOT NULL,
   BRANCH varchar(255) NOT NULL,
   PERCENTAGE int(3) NOT NULL,
   PHONE int(11) NOT NULL,
   EMAIL varchar(255) NOT NULL,
   PRIMARY KEY (`ID`)
);

DELIMITER //
   DROP PROCEDURE IF EXISTS db_mybatis.spSelectByID //

   CREATE PROCEDURE db_mybatis.spSelectByID (IN id INT)

   BEGIN
      SELECT * FROM STUDENT WHERE ID = id;
   END//

DELIMITER ;