-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 07 mai 2021 à 15:18
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `api_matui`
--
CREATE DATABASE IF NOT EXISTS `api_matui` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `api_matui`;

-- --------------------------------------------------------

--
-- Structure de la table `a_accueil`
--

DROP TABLE IF EXISTS `a_accueil`;
CREATE TABLE IF NOT EXISTS `a_accueil`
(
    `ID_Accueil`  int(11) NOT NULL AUTO_INCREMENT,
    `Description` text    NOT NULL,
    PRIMARY KEY (`ID_Accueil`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_accueil`
--

INSERT INTO `a_accueil` (`ID_Accueil`, `Description`)
VALUES (1, 'Message d\'accueil');

-- --------------------------------------------------------

--
-- Structure de la table `a_critere`
--

DROP TABLE IF EXISTS `a_critere`;
CREATE TABLE IF NOT EXISTS `a_critere`
(
    `ID_Critere`   int(11)      NOT NULL AUTO_INCREMENT,
    `Libelle`      varchar(128) NOT NULL,
    `Informations` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`ID_Critere`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 16
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_critere`
--

INSERT INTO `a_critere` (`ID_Critere`, `Libelle`, `Informations`)
VALUES (1, 'Does the activatable component exist ?', NULL),
       (2, 'Is the activatable component dynamic or static ?',
        'Dynamic components product data whereas static component doesn\'t.'),
       (3, 'Do you want to exchange with a single user ?', NULL),
       (4, 'Would you like users to compare their opinions about the component ?', NULL),
       (5, 'Would you like to poll users after testing ? ', NULL),
       (6, 'Can you have a simulation of the testable application ?', NULL),
       (7, 'Can you do it face-to-face or via the web ?', NULL),
       (8, 'Do you want to interact with only one user at a time? or many ?', NULL),
       (9, 'Would you like to collect written responses at the end of the interview tests or focus groups ?', NULL),
       (10, 'Would you like to know your user\'s practices in context ?', NULL),
       (11, 'Do you want to know the user\'s activities over the long term (a day, a week) ?', NULL),
       (12, 'Would you like to know the user\'s activities during a one-off activity ?', NULL),
       (13, 'Do you have a good level of knowledge about the user ?', NULL),
       (14, 'Can you interview more than 100 people ?', NULL),
       (15, 'Do you want to test other components or involve users differently ?', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `a_decision`
--

DROP TABLE IF EXISTS `a_decision`;
CREATE TABLE IF NOT EXISTS `a_decision`
(
    `ID_Decision`        int(11)     NOT NULL AUTO_INCREMENT,
    `Libelle`            varchar(32) NOT NULL,
    `ID_Critere_entrant` int(11)     NOT NULL,
    `ID_Critere_sortant` int(11) DEFAULT NULL,
    PRIMARY KEY (`ID_Decision`),
    KEY `ID_Critere_entrant` (`ID_Critere_entrant`),
    KEY `ID_Critere_sortant` (`ID_Critere_sortant`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 31
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_decision`
--

INSERT INTO `a_decision` (`ID_Decision`, `Libelle`, `ID_Critere_entrant`, `ID_Critere_sortant`)
VALUES (1, 'Yes', 1, 2),
       (2, 'No', 1, 10),
       (3, 'Yes', 10, 11),
       (4, 'No', 10, 13),
       (5, 'No', 11, 12),
       (6, 'No', 12, 13),
       (7, 'Yes', 12, 13),
       (8, 'Yes', 13, 14),
       (9, 'No', 13, 15),
       (10, 'No', 14, 15),
       (11, 'Yes', 14, 15),
       (12, 'Yes', 11, 12),
       (13, 'Static', 2, 3),
       (14, 'Dynamic', 2, 5),
       (15, 'Yes', 5, 7),
       (16, 'No', 5, 9),
       (17, 'Yes', 3, 4),
       (18, 'No', 3, 4),
       (19, 'Yes', 4, 6),
       (20, 'No', 4, 6),
       (21, 'Yes', 6, 15),
       (22, 'No', 6, 15),
       (23, 'Face-to-face', 7, 8),
       (24, 'Web', 7, 15),
       (25, 'Many', 8, 9),
       (26, 'One', 8, 9),
       (27, 'No', 9, 15),
       (28, 'Yes', 9, 15),
       (29, 'Yes', 15, 1),
       (30, 'No', 15, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `a_entree`
--

DROP TABLE IF EXISTS `a_entree`;
CREATE TABLE IF NOT EXISTS `a_entree`
(
    `ID_Entree`  int(11) NOT NULL AUTO_INCREMENT,
    `Date`       date    NOT NULL,
    `ID_Critere` int(11) NOT NULL,
    PRIMARY KEY (`ID_Entree`),
    KEY `ID_Critere` (`ID_Critere`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_entree`
--

INSERT INTO `a_entree` (`ID_Entree`, `Date`, `ID_Critere`)
VALUES (1, '2021-05-07', 1);

-- --------------------------------------------------------

--
-- Structure de la table `a_methode`
--

DROP TABLE IF EXISTS `a_methode`;
CREATE TABLE IF NOT EXISTS `a_methode`
(
    `ID_Methode`         int(11)      NOT NULL AUTO_INCREMENT,
    `Libelle`            varchar(255) NOT NULL,
    `Description`        text         NOT NULL,
    `Effectif_preconise` varchar(255) NOT NULL,
    `Donnees_produites`  varchar(255) NOT NULL,
    `Type_analyse`       varchar(255) NOT NULL,
    `Type_methode`       varchar(255) NOT NULL,
    `Exemple`            text         NOT NULL,
    `ID_Decision`        int(11)      NOT NULL,
    PRIMARY KEY (`ID_Methode`),
    KEY `ID_Decision` (`ID_Decision`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 12
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_methode`
--

INSERT INTO `a_methode` (`ID_Methode`, `Libelle`, `Description`, `Effectif_preconise`, `Donnees_produites`,
                         `Type_analyse`, `Type_methode`, `Exemple`, `ID_Decision`)
VALUES (1, 'M1: Social Probes, technical probes', 'Description here', 'Between 6 and 20 people of different profiles',
        'Audio, video, field documents, logbook', 'Annotations, thematic analysis',
        'Mixed : quantitative and qualitative',
        'Quantify whether the professional practices of gardeners are frequent or not', 12),
       (2, 'M2: Observations in situ', 'Description here', 'Between 6 and 20 people of different profiles',
        'Audio, video, field documents', 'Annotations, thematic analysis', 'Mixed : quantitative and qualitative',
        'Observe gardeners checking trees in a botanical garden', 7),
       (3, 'M3: Individual interview', 'Description here', 'Between 6 and 20 people of different profiles',
        'Audio, video, field documents, diagrams, closed questions', 'Annotations,thematic analysis', 'Qualitative',
        'Ask gardeners how to do their job', 9),
       (4, 'M4: Online Questionnaire', 'Description here',
        'Minimum 100 people, use sampling methods to ensure \"representativeness\"', 'Answering question', 'Statistics',
        'Quantitative', 'Quantify whether the professional practices of gardeners are frequent or not', 11),
       (5, 'M5: Individual interview with the static activatable component', 'Description here',
        'Between 6 and 20 people with different profiles', 'Audio, video, field document, diagram',
        'Annotations, thematic analysis', 'Qualitative', 'Interviewing gardeners on a paper model', 17),
       (6, 'M6: Focus group with the static activatable component', 'Description here',
        'Between 8 and 10 people per focus-group, to be repeated at least twice', 'Audio, video, field document',
        'Annotations, thematic analysis', 'Qualitative', 'Interview a group of gardeners on a paper mockup', 19),
       (7, 'M7: Test with an OZ magician', 'Description here', 'Minimum 6 people per profile',
        'Audio, video, simulator activity traces', 'Annotations, thematic analysis, statistics',
        'Mixed: quantitative and qualitative',
        'A gardener tests a simulation of the mobile application in the laboratory', 21),
       (8, 'M8: User tests, trace captures', 'Description here',
        'Minimum 6 people per profile, use sampling and experimental design methods',
        'Activity traces, performance measurements, error measurements', 'Statistical tests, modeling, clustering',
        'Quantitative', 'Make use of the mobile application individually to take pictures of trees', 14),
       (9, 'M9: Focus group with the interactive activatable component', 'Description here',
        'Between 8 and 10 people per focus group, to be repeated at least twice', 'Audio, video, field documents',
        'Annotations, thematic analysis', 'Qualitative',
        'Interviewing a group of gardeners about the mobile application they used', 25),
       (10, 'M10: Individual interview with the interactive activatable component', 'Description here',
        'Between 6 and 20 people', 'Audio, video, field documents, diagrams, closed questions',
        'Annotations, thematic analysis', 'Qualitative',
        'Interviewing a group of gardeners about the mobile application they used', 26),
       (11, 'M11: Face-to-face questionnaire following user tests', 'Description here', 'Minimum 6 people per profile',
        'Responses to a questionnaire to measure usability (SUS Brooke 1993)',
        'Enumeration (no statistics as numbers are too small)', 'Quantitative',
        'To measure the usability of the application by gardeners after they have walked around the garden to take pictures of the trees',
        28);

-- --------------------------------------------------------

--
-- Structure de la table `a_methoderessource`
--

DROP TABLE IF EXISTS `a_methoderessource`;
CREATE TABLE IF NOT EXISTS `a_methoderessource`
(
    `ID_MethodeRessource` int(11) NOT NULL AUTO_INCREMENT,
    `ID_Methode`          int(11) NOT NULL,
    `ID_Ressource`        int(11) NOT NULL,
    PRIMARY KEY (`ID_MethodeRessource`),
    KEY `ID_Methode` (`ID_Methode`),
    KEY `ID_Ressource` (`ID_Ressource`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = latin1;

-- --------------------------------------------------------

--
-- Structure de la table `a_ressource`
--

DROP TABLE IF EXISTS `a_ressource`;
CREATE TABLE IF NOT EXISTS `a_ressource`
(
    `ID_Ressource` int(11)      NOT NULL AUTO_INCREMENT,
    `Nom`          varchar(255) NOT NULL,
    `Fichier`      varchar(255) NOT NULL,
    PRIMARY KEY (`ID_Ressource`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_ressource`
--

INSERT INTO `a_ressource` (`ID_Ressource`, `Nom`, `Fichier`)
VALUES (1, 'UserTest', 'UserTest.pdf');

-- --------------------------------------------------------

--
-- Structure de la table `a_sortie`
--

DROP TABLE IF EXISTS `a_sortie`;
CREATE TABLE IF NOT EXISTS `a_sortie`
(
    `ID_Sortie`   int(11) NOT NULL AUTO_INCREMENT,
    `Message`     text    NOT NULL,
    `ID_Decision` int(11) NOT NULL,
    PRIMARY KEY (`ID_Sortie`),
    KEY `ID_Decision` (`ID_Decision`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_sortie`
--

INSERT INTO `a_sortie` (`ID_Sortie`, `Message`, `ID_Decision`)
VALUES (1, 'Message de fin !', 30);

-- --------------------------------------------------------

--
-- Structure de la table `u_utilisateur`
--

DROP TABLE IF EXISTS `u_utilisateur`;
CREATE TABLE IF NOT EXISTS `u_utilisateur`
(
    `ID_Utilisateur` int(11)      NOT NULL AUTO_INCREMENT,
    `Mail`           varchar(64)  NOT NULL,
    `Pseudo`         varchar(16)  NOT NULL,
    `Mot_de_passe`   varchar(128) NOT NULL,
    `Role`           varchar(16)  NOT NULL,
    PRIMARY KEY (`ID_Utilisateur`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `u_utilisateur`
--

INSERT INTO `u_utilisateur` (`ID_Utilisateur`, `Mail`, `Pseudo`, `Mot_de_passe`, `Role`)
VALUES (1, 'email@email.fr', 'Pseudo', '1a2zeae1', 'administrator');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `a_decision`
--
ALTER TABLE `a_decision`
    ADD CONSTRAINT `a_decision_ibfk_1` FOREIGN KEY (`ID_Critere_entrant`) REFERENCES `a_critere` (`ID_Critere`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `a_decision_ibfk_2` FOREIGN KEY (`ID_Critere_sortant`) REFERENCES `a_critere` (`ID_Critere`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `a_entree`
--
ALTER TABLE `a_entree`
    ADD CONSTRAINT `a_entree_ibfk_1` FOREIGN KEY (`ID_Critere`) REFERENCES `a_critere` (`ID_Critere`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `a_methode`
--
ALTER TABLE `a_methode`
    ADD CONSTRAINT `a_methode_ibfk_1` FOREIGN KEY (`ID_Decision`) REFERENCES `a_decision` (`ID_Decision`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `a_methoderessource`
--
ALTER TABLE `a_methoderessource`
    ADD CONSTRAINT `a_methoderessource_ibfk_1` FOREIGN KEY (`ID_Methode`) REFERENCES `a_methode` (`ID_Methode`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `a_methoderessource_ibfk_2` FOREIGN KEY (`ID_Ressource`) REFERENCES `a_ressource` (`ID_Ressource`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `a_sortie`
--
ALTER TABLE `a_sortie`
    ADD CONSTRAINT `a_sortie_ibfk_1` FOREIGN KEY (`ID_Decision`) REFERENCES `a_decision` (`ID_Decision`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
