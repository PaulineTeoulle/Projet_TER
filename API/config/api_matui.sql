-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 04 mai 2021 à 09:34
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
  DEFAULT CHARSET = latin1;

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
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_critere`
--

INSERT INTO `a_critere` (`ID_Critere`, `Libelle`, `Informations`)
VALUES (1, 'Does the activatable component exist ?', NULL),
       (2, 'Is the activatable component dynamic or static?',
        'Dynamic components product data whereas static component does not.'),
       (3, 'Do you want to exchange with a single user ?', NULL),
       (4, 'Would you like users to compare their opinions about the component?', NULL),
       (5, 'Would you like to poll users after testing? ', NULL);

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
  AUTO_INCREMENT = 9
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_decision`
--

INSERT INTO `a_decision` (`ID_Decision`, `Libelle`, `ID_Critere_entrant`, `ID_Critere_sortant`)
VALUES (1, 'Yes', 1, 2),
       (2, 'No', 1, NULL),
       (3, 'Static', 2, 3),
       (4, 'Dynamic', 2, 5),
       (5, 'Yes', 3, 4),
       (6, 'No', 3, 4),
       (7, 'Yes', 5, NULL),
       (8, 'No', 5, NULL);

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
VALUES (1, '2021-05-04', 1);

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
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_methode`
--

INSERT INTO `a_methode` (`ID_Methode`, `Libelle`, `Description`, `Effectif_preconise`, `Donnees_produites`,
                         `Type_analyse`, `Type_methode`, `Exemple`, `ID_Decision`)
VALUES (1, 'M8 : Users tests with traces', 'This is a great description.', 'Minimum 6 persons for one profil.',
        'Traces of activity,performance measurement, error measurement', 'Statistics, modelisation, clustering',
        'Quantitative', 'Make people use the mobile application individually to take pictures of trees', 4),
       (2, 'M5 : Individual interview with the static activable component', 'This is a good description.',
        'Between 6 and 20 person of different profile.', 'Audio, video, field document, log book',
        'Annotations,thematic analysis', 'Qualitative', 'Interview gardeners on a paper model', 5);

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

--
-- Déchargement des données de la table `a_methoderessource`
--

INSERT INTO `a_methoderessource` (`ID_MethodeRessource`, `ID_Methode`, `ID_Ressource`)
VALUES (1, 2, 1),
       (2, 2, 2),
       (3, 1, 1);

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
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_ressource`
--

INSERT INTO `a_ressource` (`ID_Ressource`, `Nom`, `Fichier`)
VALUES (1, 'UserTest.pdf', 'Ceci est un fichier'),
       (2, 'Method.pdf', 'Ceci est un fichier');

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
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = latin1;

--
-- Déchargement des données de la table `a_sortie`
--

INSERT INTO `a_sortie` (`ID_Sortie`, `Message`, `ID_Decision`)
VALUES (1, 'Message de sortie !', 2),
       (2, 'Message de sortie !', 7),
       (3, 'Message de sortie !', 8);

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
  DEFAULT CHARSET = latin1;

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
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
