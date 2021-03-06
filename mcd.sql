-- MySQL Script generated by MySQL Workbench
-- Thu Dec 21 09:08:39 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`groupe`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`groupe` ;

CREATE TABLE IF NOT EXISTS `mydb`.`groupe` (
  `idgroupe` INT NOT NULL,
  `description` VARCHAR(500) NULL,
  PRIMARY KEY (`idgroupe`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `iduser` INT NOT NULL,
  `prenom` VARCHAR(45) NULL,
  `date_naissance` DATE NULL,
  `login` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`groupeUser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`groupeUser` ;

CREATE TABLE IF NOT EXISTS `mydb`.`groupeUser` (
  `idgroupeUser` INT NOT NULL,
  `user` INT NULL,
  `groupe` INT NULL,
  PRIMARY KEY (`idgroupeUser`),
  INDEX `user_idx` (`user` ASC),
  INDEX `groupe_idx` (`groupe` ASC),
  CONSTRAINT `user`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `groupe`
    FOREIGN KEY (`groupe`)
    REFERENCES `mydb`.`groupe` (`idgroupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`categorieAdresse`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`categorieAdresse` ;

CREATE TABLE IF NOT EXISTS `mydb`.`categorieAdresse` (
  `idcategorieAdresse` INT NOT NULL,
  `libelle` VARCHAR(45) NULL,
  PRIMARY KEY (`idcategorieAdresse`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`adresse`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`adresse` ;

CREATE TABLE IF NOT EXISTS `mydb`.`adresse` (
  `idadresse` INT NOT NULL,
  `libelle` VARCHAR(45) NULL,
  `user` INT NULL,
  `categorie` INT NULL,
  PRIMARY KEY (`idadresse`),
  INDEX `user_idx` (`user` ASC),
  INDEX `categorie_idx` (`categorie` ASC),
  CONSTRAINT `user`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `categorie`
    FOREIGN KEY (`categorie`)
    REFERENCES `mydb`.`categorieAdresse` (`idcategorieAdresse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mydb`.`groupe`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`groupe` (`idgroupe`, `description`) VALUES (1, 'client');
INSERT INTO `mydb`.`groupe` (`idgroupe`, `description`) VALUES (2, 'vendeur');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`user` (`iduser`, `prenom`, `date_naissance`, `login`, `password`) VALUES (1, 'arnold', '12/12/2000', 'arnold@gmail.com', 'csrfdg485rtgd');
INSERT INTO `mydb`.`user` (`iduser`, `prenom`, `date_naissance`, `login`, `password`) VALUES (2, 'béatrice', '6/9/1985', 'bea@gmail.com', 'sr18tg1fhf');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`groupeUser`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`groupeUser` (`idgroupeUser`, `user`, `groupe`) VALUES (1, 1, 1);
INSERT INTO `mydb`.`groupeUser` (`idgroupeUser`, `user`, `groupe`) VALUES (2, 2, 1);
INSERT INTO `mydb`.`groupeUser` (`idgroupeUser`, `user`, `groupe`) VALUES (3, 2, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`categorieAdresse`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`categorieAdresse` (`idcategorieAdresse`, `libelle`) VALUES (1, 'livraison');
INSERT INTO `mydb`.`categorieAdresse` (`idcategorieAdresse`, `libelle`) VALUES (2, 'facturation');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`adresse`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`adresse` (`idadresse`, `libelle`, `user`, `categorie`) VALUES (1, '53 rue de la chapelle penchée', 1, 1);
INSERT INTO `mydb`.`adresse` (`idadresse`, `libelle`, `user`, `categorie`) VALUES (2, '12 allée des saules plereurs', 1, 2);
INSERT INTO `mydb`.`adresse` (`idadresse`, `libelle`, `user`, `categorie`) VALUES (3, '9 boulevard lafaillette', 2, 1);

COMMIT;

