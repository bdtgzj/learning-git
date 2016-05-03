CREATE DATABASE db_StudentEnrollment;

CREATE TABLE db_StudentEnrollment.student (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(8) NOT NULL,
  `userName` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);