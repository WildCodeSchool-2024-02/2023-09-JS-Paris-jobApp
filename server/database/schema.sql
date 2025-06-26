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

INSERT INTO users (firstname, lastname, email, password, role, cv, address)
VALUES
('Alice', 'Durand', 'alice@example.com', 'hashed_pw_1', 'candidate', 'CV_Alice.pdf', 'Paris'),
('Bob', 'Martin', 'bob@example.com', 'hashed_pw_2', 'candidate', 'CV_Bob.pdf', 'Lyon'),
('Tech', 'Corp', 'hr@techcorp.com', 'hashed_pw_3', 'company', NULL, 'Paris'),
('Innovate', 'Ltd', 'jobs@innovateltd.com', 'hashed_pw_4', 'company', NULL, 'Lille');


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

INSERT INTO offers (title, description, location, company, users_id)
VALUES
('Frontend Developer', 'Looking for a React dev.', 'Paris', 'TechCorp', 3),
('Data Analyst', 'Analyze sales data.', 'Lille', 'InnovateLtd', 4),
('Full Stack Engineer', 'Backend + Frontend', 'Remote', 'TechCorp', 3),
('Frontend Developer', 'Looking for a React dev.', 'Paris', 'TechCorp', 3),
('Data Analyst', 'Analyze sales data.', 'Lille', 'InnovateLtd', 4),
('Full Stack Engineer', 'Backend + Frontend', 'Remote', 'TechCorp', 3),
('Frontend Developer', 'Looking for a React dev.', 'Paris', 'TechCorp', 3),
('Data Analyst', 'Analyze sales data.', 'Lille', 'InnovateLtd', 4),
('Full Stack Engineer', 'Backend + Frontend', 'Remote', 'TechCorp', 3),
('Frontend Developer', 'Looking for a React dev.', 'Paris', 'TechCorp', 3),
('Data Analyst', 'Analyze sales data.', 'Lille', 'InnovateLtd', 4),
('Full Stack Engineer', 'Backend + Frontend', 'Remote', 'TechCorp', 3),
('Frontend Developer', 'Looking for a React dev.', 'Paris', 'TechCorp', 3),
('Data Analyst', 'Analyze sales data.', 'Lille', 'InnovateLtd', 4),
('Full Stack Engineer', 'Backend + Frontend', 'Remote', 'TechCorp', 3),
('Frontend Developer', 'Looking for a React dev.', 'Paris', 'TechCorp', 3),
('Data Analyst', 'Analyze sales data.', 'Lille', 'InnovateLtd', 4),
('Full Stack Engineer', 'Backend + Frontend', 'Remote', 'TechCorp', 3);


-- Table de favoris / suivis d’offres
CREATE TABLE IF NOT EXISTS `jobApp`.`user_offer_favorites` (
  `user_id` INT NOT NULL,
  `offer_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `offer_id`),
  CONSTRAINT `fk_fav_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `jobApp`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_fav_offer`
    FOREIGN KEY (`offer_id`)
    REFERENCES `jobApp`.`offers` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Favoris / suivi
INSERT INTO `jobApp`.`user_offer_favorites` (`user_id`, `offer_id`) VALUES
(1, 1), -- user 1 suit offer 1
(1, 2), -- user 1 suit offer 2
(2, 1), -- user 2 suit offer 1
(2, 3), -- user 2 suit offer 3
(3, 2); -- user 3 suit offer 2



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

INSERT INTO skills (name, type, level)
VALUES
('JavaScript', 'hardskill', 'confirmed'),
('Python', 'hardskill', 'senior'),
('Teamwork', 'softskill', NULL),
('Leadership', 'softskill', 'expert'),
('SQL', 'hardskill', 'confirmed');


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

INSERT INTO user_skills (id_user, id_skill)
VALUES
(1, 1), -- Alice: JavaScript
(1, 3), -- Alice: Teamwork
(2, 2), -- Bob: Python
(2, 4), -- Bob: Leadership
(2, 5); -- Bob: SQL


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

INSERT INTO offer_skills (id_offer, id_skill)
VALUES
(1, 1), -- Frontend Developer requires JavaScript
(1, 3), -- ... and Teamwork
(2, 2), -- Data Analyst requires Python
(2, 5), -- ... and SQL
(3, 1), -- Full Stack requires JavaScript
(3, 2), -- ... and Python
(3, 5); -- ... and SQL


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

INSERT INTO candidates (id_offer, id_candidate)
VALUES
(1, 1), -- Alice postule à Frontend Developer
(2, 2), -- Bob postule à Data Analyst
(3, 1), -- Alice postule à Full Stack
(3, 2); -- Bob postule aussi à Full Stack


SET SQL_MODE = @OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;