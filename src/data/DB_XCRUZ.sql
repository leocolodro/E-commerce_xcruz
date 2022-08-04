###Database creation###
SET FOREIGN_KEY_CHECKS=0;
UNLOCK TABLES;

CREATE DATABASE IF NOT EXISTS `DB_XCRUZ`;
USE `DB_XCRUZ`;

###Tables creation###

	/*User categories - Table*/
DROP TABLE IF EXISTS `USER_CATEGORIES`;
CREATE TABLE `USER_CATEGORIES`(
	`ID` SMALLINT(3) NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(80) DEFAULT NULL,
	
    PRIMARY KEY (`ID`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `USER_CATEGORIES` WRITE;
/*!40000 ALTER TABLE `USER_CATEGORIES` DISABLE KEYS */;

INSERT INTO `USER_CATEGORIES` VALUES 
	(1,'Usuario'),
	(2,'Administrador');
    
/*!40000 ALTER TABLE `USER_CATEGORIES` ENABLE KEYS */;
UNLOCK TABLES;


	/*Carts - Table*/
DROP TABLE IF EXISTS `CARTS`;
CREATE TABLE `CARTS`(
	`ID` INT NOT NULL AUTO_INCREMENT,
    `SUBTOTAL` DECIMAL(11,2) DEFAULT NULL,
    `TOTAL` DECIMAL(11,2) DEFAULT NULL,
    
    PRIMARY KEY (`ID`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


	/*Security Questions - Table*/
DROP TABLE IF EXISTS `SECURITY_QUESTIONS`;
CREATE TABLE `SECURITY_QUESTIONS`(
	`ID` SMALLINT(3) NOT NULL AUTO_INCREMENT,
    `QUESTION` VARCHAR(50) DEFAULT NULL,
    
    PRIMARY KEY (`ID`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

################## Dumping Data ##################

LOCK TABLES `SECURITY_QUESTIONS` WRITE;
/*!40000 ALTER TABLE `SECURITY_QUESTIONS` DISABLE KEYS */;

INSERT INTO `SECURITY_QUESTIONS` VALUES 
	(1, "¿Cuál era el nombre de tu primer mascota?"),
	(2, "¿Cuál era tu juego favorito de joven?"),
    (3, "¿Cuál es tu platillo de comida favorito?");
    
/*!40000 ALTER TABLE `SECURITY_QUESTIONS` ENABLE KEYS */;
UNLOCK TABLES;

	/*Users - Table*/
DROP TABLE IF EXISTS `USERS`;
CREATE TABLE `USERS`(
	`ID` INT NOT NULL AUTO_INCREMENT,
    `FIRST_NAME` VARCHAR(100) DEFAULT NULL,
    `LAST_NAME` VARCHAR(100) DEFAULT NULL,
    `ADDRESS` VARCHAR(100) DEFAULT NULL,
    `ZIP_CODE` VARCHAR(10) DEFAULT NULL,
    `CITY` VARCHAR(50) DEFAULT NULL,
    `PROVINCE` VARCHAR(50) DEFAULT NULL,
    `TELEPHONE` BIGINT(25) DEFAULT NULL,
    `GENDER` VARCHAR(15) DEFAULT NULL,
    `EMAIL` VARCHAR(320) DEFAULT NULL,
    `PASSWORD` VARCHAR(450) DEFAULT NULL,
    `SECURITY_QUESTION_ID` SMALLINT(3) NOT NULL,
    `SECURITY_ANSWER` VARCHAR(35) DEFAULT NULL,
    `IMAGE` VARCHAR(100) DEFAULT NULL,
	`CATEGORY_ID` SMALLINT(3) NOT NULL,
    `CART_ID` INT DEFAULT NULL,
    
    
	PRIMARY KEY (`ID`),
    FOREIGN KEY (`CATEGORY_ID`) REFERENCES USER_CATEGORIES(`ID`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`CART_ID`) REFERENCES CARTS(`ID`) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (`SECURITY_QUESTION_ID`) REFERENCES SECURITY_QUESTIONS(`ID`) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

################## Dumping Data ##################

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;

INSERT INTO `USERS` (`ID`, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `ZIP_CODE`, `CITY`, `PROVINCE`, `TELEPHONE`, `GENDER`, `EMAIL`, `PASSWORD`, `SECURITY_QUESTION_ID`, `SECURITY_ANSWER`, `IMAGE`, `CATEGORY_ID`, `CART_ID`) VALUES  
    (1, "Hugo", "Nail", "Roseti 96", "1427", "Capital Federal", "Buenos Aires", "1155628975", "Masculino", "hnail0@hotmail.com", "XFUQp6g", 1, "flopi", "/default_profile_pic.png", 1, 1),
    (2, "Marcelo", "Cavala", "Intendente Becco 864", "1642", "San Isidro", "Buenos Aires", "1164558921", "Masculino", "marcelocavala20120@gmail.com", "tssPlG2", 2, "fútbol", "/default_profile_pic.png", 1, NULL),
    (3, "Juan",  "Carlos", "Arnaldo 364", "2930", "San Pedro", "Buenos Aires", "3329659874", "Masculino", "juancaboca@gmail.com", "$2a$10$zQaXd2NLuMZOFg2ywUffWeRVTkHKZTqnhl.064Py/RZ7b5SVOAK.m", 3, "risoto", "/default_profile_pic.png", 1, NULL),
	(4, "Maria Estela", "Suarez", "Balcarce 312", "2900", "San Nicolas", "Buenos Aires", "336269678", "Femenino", "marysuarez@live.com", "$2a$10$ifaU9rBP0zNE.mAV.5Os1Oa2vD.edR7KcwqmBSr/lw5a9IcmPSrmK", 1, "chiara", "/profile-pic-1655877593406.jpg", 1, NULL),
	(5, "Carla", "Lopez", "Billinghurst 1148", "1174", "Capital Federal", "Buenos Aires", "1145671533", "Femenino", "carlopez@live.com", "$2a$10$5vspphVY/e6yg4GNClfvlOmVyaF4HHlHrNZRlUKuvL5v444JbUc0q", 2, "mario bros", "/profile-pic-1658090887437.jpg", 2, NULL);
    
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;


	/*Brands - Table*/
DROP TABLE IF EXISTS `BRANDS`;
CREATE TABLE `BRANDS`(
	`ID` SMALLINT(8) NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(150) DEFAULT NULL,
    
    PRIMARY KEY(`ID`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

################## Dumping Data ##################

LOCK TABLES `BRANDS` WRITE;
/*!40000 ALTER TABLE `BRANDS` DISABLE KEYS */;

INSERT INTO `BRANDS` (`ID`, `NAME`) VALUES 

	(1, "Siena"),
    (2, "2558"),
    (3, "Beatle"),
    (4, "Positano"),
    (5, "Canada 211"),
    (6, "9849");
    
    
/*!40000 ALTER TABLE `BRANDS` ENABLE KEYS */;
UNLOCK TABLES;


	/*Product Categories - Table*/
DROP TABLE IF EXISTS `PRODUCT_CATEGORIES`;
CREATE TABLE `PRODUCT_CATEGORIES`(
	`ID` SMALLINT(3) NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(60) DEFAULT NULL,
    
    PRIMARY KEY(`ID`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

################## Dumping Data ##################

LOCK TABLES `PRODUCT_CATEGORIES` WRITE;
/*!40000 ALTER TABLE `PRODUCT_CATEGORIES` DISABLE KEYS */;

INSERT INTO `PRODUCT_CATEGORIES` (`ID`, `NAME`) VALUES 

	(1, "Botas"),
	(2, "Mocacines"),
	(3, "Urbano"),
    (4, "Zapatillas"),
    (5, "De vestir");
    
/*!40000 ALTER TABLE `PRODUCT_CATEGORIES` ENABLE KEYS */;
UNLOCK TABLES;


	/*Products - Table*/
DROP TABLE IF EXISTS `PRODUCTS`;
CREATE TABLE `PRODUCTS`(
	`ID` INT NOT NULL AUTO_INCREMENT,
	`BRAND_ID` SMALLINT(8) NOT NULL,
    `GENDER` VARCHAR(30) DEFAULT NULL,
    `DISCOUNT_PERCENTAGE` SMALLINT(3) DEFAULT NULL,
    `PRICE` DECIMAL(11,2) DEFAULT NULL,
    `DESCRIPTION` VARCHAR(500) DEFAULT NULL,
    `COLOR` VARCHAR(30) DEFAULT NULL,
    `CATEGORY_ID` SMALLINT(3) NOT NULL,
    
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`CATEGORY_ID`) REFERENCES PRODUCT_CATEGORIES(`ID`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`BRAND_ID`) REFERENCES BRANDS(ID) ON UPDATE CASCADE ON DELETE CASCADE
     
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

################## Dumping Data ##################

LOCK TABLES `PRODUCTS` WRITE;
/*!40000 ALTER TABLE `PRODUCTS` DISABLE KEYS */;

INSERT INTO `PRODUCTS` (`ID`, `BRAND_ID`, `GENDER`, `DISCOUNT_PERCENTAGE`,`PRICE`, `DESCRIPTION`, `COLOR`, `CATEGORY_ID`)  VALUES 
	(1, 1, "Masculino", 11, 10500, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo laborum isteiis!", "Negro", 1),
    (2, 2, "Masculino", 20, 12990, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo laborum isteiis!", "Negro", 5),
    (3, 3, "Masculino", 15, 13290, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo laborum isteiis!", "Negro", 1),
	(4, 1, "Masculino", 11, 10500, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo laborum isteiis!", "Marrón", 1),
    (5, 4, "Masculino", 0, 12990, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo laborum isteiis!", "Negro", 3),
    (6, 5, "Masculino", 0, 14900, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo laborum isteiis!", "Marrón", 1),
    (7, 6, "Masculino", 15, 12299, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo laborum isteiis!", "Marrón", 5),
    (8, 5, "Masculino", 0, 14900, "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo laborum isteiis!", "Negro", 1);
    
/*!40000 ALTER TABLE `PRODUCTS` ENABLE KEYS */;
UNLOCK TABLES;


	/*Carts/Products - Table*/
DROP TABLE IF EXISTS `CARTS_PRODUCTS`;
CREATE TABLE `CARTS_PRODUCTS`(
	`CART_ID` INT NOT NULL,
    `PRODUCT_ID` INT NOT NULL,
    `QUANTITY` SMALLINT(3) DEFAULT NULL,
    
    PRIMARY KEY (`CART_ID`, `PRODUCT_ID`),
    FOREIGN KEY (`CART_ID`) REFERENCES CART(`ID`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`PRODUCT_ID`) REFERENCES PRODUCTS(`ID`) ON UPDATE CASCADE ON DELETE CASCADE
    
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

	/*Sizes - Table*/
DROP TABLE IF EXISTS `SIZES`;
CREATE TABLE `SIZES`(
	`ID` SMALLINT(3) NOT NULL AUTO_INCREMENT,
    `TYPE` VARCHAR(15) DEFAULT NULL,
    `VALUE` DECIMAL(3, 1) DEFAULT NULL,
     
     PRIMARY KEY (`ID`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

################## Dumping Data ##################

LOCK TABLES `SIZES` WRITE;
/*!40000 ALTER TABLE `SIZES` DISABLE KEYS */;

INSERT INTO `SIZES` (`ID`, `TYPE`, `VALUE`) VALUES 
	(1, "EUR", 33),
	(2, "CM", 20.7),
    (3, "EUR", 34),
    (4, "CM", 21.3),
    (5, "EUR", 35),
    (6, "CM", 22),
    (7, "EUR", 35.5),
    (8, "CM", 22.4),
    (9, "EUR", 36),
    (10, "CM", 22.8),
    (11, "EUR", 37),
    (12, "CM", 23.3),
	(13, "EUR", 37.5),
    (14, "CM", 23.6),
    (15, "EUR", 38),
    (16, "CM", 24),
    (17, "EUR", 39),
    (18, "CM", 24.7),
    (19, "EUR", 40),
	(20, "CM", 25.4),
    (21, "EUR", 41),
    (22, "CM", 26.0),
	(23, "EUR", 42),
    (24, "CM", 26.7),
	(25, "EUR", 43),
    (26, "CM", 27.3),
    (27, "EUR", 44),
    (28, "CM", 28),
    (29, "EUR", 45),
    (30, "CM", 28.7),
	(31, "EUR", 46),
    (32, "CM", 29.3),
    (33, "EUR", 47),
    (34, "CM", 30);
    
/*!40000 ALTER TABLE `SIZES` ENABLE KEYS */;
UNLOCK TABLES;


	/*Products/Sizes - Table*/
DROP TABLE IF EXISTS `PRODUCT_SIZES`;
CREATE TABLE `PRODUCT_SIZES`(
	`PRODUCT_ID` INT NOT NULL,
    `SIZE_ID` SMALLINT(3) NOT NULL,
    
	PRIMARY KEY(`PRODUCT_ID`, `SIZE_ID`),
	FOREIGN KEY (`PRODUCT_ID`) REFERENCES PRODUCTS(`ID`) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (`SIZE_ID`) REFERENCES SIZES(`ID`) ON UPDATE CASCADE ON DELETE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

################## Dumping Data ##################

LOCK TABLES `PRODUCT_SIZES` WRITE;
/*!40000 ALTER TABLE `PRODUCT_SIZES` DISABLE KEYS */;

INSERT INTO `PRODUCT_SIZES` (`PRODUCT_ID`, `SIZE_ID`) VALUES 
	(1, 9),
    (1, 10),
    (1, 11),
    (1, 12),
    (1, 13),
    (1, 14),
	(1, 15),
    (1, 16),
    (1, 17),
    (1, 18),
    (1, 19),
    (1, 20),
    (2, 13),
    (2, 14),
	(2, 15),
    (2, 16),
    (2, 17),
    (2, 18),
    (2, 19),
    (2, 20),
    (3, 17),
    (3, 18),
    (3, 21),
    (3, 22),
    (3, 23),
    (3, 24),
	(4, 9),
    (4, 10),
    (4, 11),
    (4, 12),
    (4, 13),
    (4, 14),
	(4, 15),
    (4, 16),
    (4, 17),
    (4, 18),
    (4, 19),
    (4, 20),
    (5, 17),
    (5, 18),
    (5, 23),
    (5, 24),
    (6, 19),
    (6, 20),
    (6, 21),
    (6, 22),
    (6, 23),
    (6, 24),
    (6, 25),
    (6, 26),
    (6, 27),
    (6, 28),
    (7, 17),
    (7, 18),
    (7, 23),
    (7, 24),
    (7, 27),
    (7, 28),
    (8, 21),
    (8, 22),
    (8, 23),
    (8, 24),
    (8, 25),
    (8, 26),
    (8, 27),
    (8, 28);
    
/*!40000 ALTER TABLE `PRODUCT_SIZES` ENABLE KEYS */;
UNLOCK TABLES;


	/*Product Images - Table*/
DROP TABLE IF EXISTS `PRODUCT_IMAGES`;
CREATE TABLE `PRODUCT_IMAGES`(
	`ID` INT NOT NULL AUTO_INCREMENT,
    `PRODUCT_ID`INT NOT NULL,
    `IMAGE_PATH` VARCHAR(350) DEFAULT NULL,
    
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`PRODUCT_ID`) REFERENCES PRODUCTS(`ID`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `PRODUCT_IMAGES` WRITE;
/*!40000 ALTER TABLE `PRODUCT_IMAGES` DISABLE KEYS */;

################## Dumping Data ##################

INSERT INTO `PRODUCT_IMAGES` (`ID`, `PRODUCT_ID`, `IMAGE_PATH`) VALUES 
	(1, 1, "/zapato_cuero_suela_1.jpg"),
    (2, 1,  "/zapato_cuero_suela_2.jpg"),
	(3, 1,  "/zapato_cuero_suela_3.jpg"),
    (4, 2,  "/zapato_cuero_punta_negro_1.jpg"),
    (5, 2,  "/zapato_cuero_punta_negro_2.jpg"),
    (6, 2,  "/zapato_cuero_punta_negro_3.jpg"),
    (7, 3,  "/bota_chelsea_cuero_negro_1.jpg"),
    (8, 3,  "/bota_chelsea_cuero_negro_2.jpg"),
    (9, 3,  "/bota_chelsea_cuero_negro_3.jpg"),
    (10, 3, "/bota_chelsea_cuero_negro_4.jpg"),
    (11, 4, "/zapato_siena_cuero_marron_1.jpg"),
    (12, 4, "/zapato_siena_cuero_marron_2.jpg"),
    (13, 4, "/zapato_siena_cuero_marron_3.jpg"),
    (14, 5, "/zapatilla_positano_cuero_negro_1.jpg"),
    (15, 5, "/zapatilla_positano_cuero_negro_2.jpg"),
    (16, 5, "/zapatilla_positano_cuero_negro_3.jpg"),
    (17, 6, "/botas_canada221_cuero_marron_1.jpg"),
    (18, 6, "/botas_canada221_cuero_marron_2.jpg"),
    (19, 6, "/botas_canada221_cuero_marron_3.jpg"),
    (20, 7, "/zapato_9849_cuero_marron_1.jpg"),
    (21, 7, "/zapato_9849_cuero_marron_2.jpg"),
    (22, 7, "/zapato_9849_cuero_marron_3.jpg"),
    (23, 7, "/zapato_9849_cuero_marron_4.jpg"),
    (24, 8, "/botas_canada221_cuero_negro_1.jpg"),
    (25, 8, "/botas_canada221_cuero_negro_2.jpg"),
    (26, 8, "/botas_canada221_cuero_negro_3.jpg"),
    (27, 8, "/botas_canada221_cuero_negro_4.jpg");
    
/*!40000 ALTER TABLE `PRODUCT_IMAGES` ENABLE KEYS */;
UNLOCK TABLES;
