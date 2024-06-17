-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;

SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema jobApp
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `jobApp`;

-- -----------------------------------------------------
-- Schema jobApp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jobApp`;

USE `jobApp`;

-- -----------------------------------------------------
-- Table `jobApp`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobApp`.`users`;

CREATE TABLE IF NOT EXISTS `jobApp`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(85) NOT NULL,
    `lastname` VARCHAR(125) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `role` ENUM("candidate", "company") NOT NULL,
    `cv` TEXT NULL,
    `address` TEXT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `jobApp`.`offers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobApp`.`offers`;

CREATE TABLE IF NOT EXISTS `jobApp`.`offers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `location` TEXT NOT NULL,
    `company` VARCHAR(85) NOT NULL,
    `date_of_creation` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM("open", "closed") NOT NULL DEFAULT 'open',
    `users_id` INT NOT NULL,
    PRIMARY KEY (`id`, `users_id`),
    INDEX `fk_offers_users_idx` (`users_id` ASC) VISIBLE,
    CONSTRAINT `fk_offers_users` FOREIGN KEY (`users_id`) REFERENCES `jobApp`.`users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `jobApp`.`skills`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobApp`.`skills`;

CREATE TABLE IF NOT EXISTS `jobApp`.`skills` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `type` ENUM("softskill", "hardskill") NOT NULL,
    `level` ENUM(
        "junior",
        "confirmed",
        "senior",
        "expert"
    ) NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `jobApp`.`user_skills`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobApp`.`user_skills`;

CREATE TABLE IF NOT EXISTS `jobApp`.`user_skills` (
    `id_user` INT NOT NULL,
    `id_skill` INT NOT NULL,
    PRIMARY KEY (`id_user`, `id_skill`),
    INDEX `fk_user_skills_2_idx` (`id_skill` ASC) VISIBLE,
    CONSTRAINT `fk_user_skills_1` FOREIGN KEY (`id_user`) REFERENCES `jobApp`.`users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_user_skills_2` FOREIGN KEY (`id_skill`) REFERENCES `jobApp`.`skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `jobApp`.`offer_skills`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobApp`.`offer_skills`;

CREATE TABLE IF NOT EXISTS `jobApp`.`offer_skills` (
    `id_offer` INT NOT NULL,
    `id_skill` INT NOT NULL,
    PRIMARY KEY (`id_offer`, `id_skill`),
    INDEX `fk_offer_skills_2_idx` (`id_skill` ASC) VISIBLE,
    CONSTRAINT `fk_offer_skills_1` FOREIGN KEY (`id_offer`) REFERENCES `jobApp`.`offers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_offer_skills_2` FOREIGN KEY (`id_skill`) REFERENCES `jobApp`.`skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `jobApp`.`candidates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobApp`.`candidates`;

CREATE TABLE IF NOT EXISTS `jobApp`.`candidates` (
    `id_offer` INT NOT NULL,
    `id_candidate` INT NOT NULL,
    PRIMARY KEY (`id_offer`, `id_candidate`),
    INDEX `fk_candidates_2_idx` (`id_candidate` ASC) VISIBLE,
    CONSTRAINT `fk_candidates_1` FOREIGN KEY (`id_offer`) REFERENCES `jobApp`.`offers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_candidates_2` FOREIGN KEY (`id_candidate`) REFERENCES `jobApp`.`users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE = @OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;