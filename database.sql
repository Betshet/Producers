-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  lun. 06 jan. 2020 à 14:38
-- Version du serveur :  5.7.17
-- Version de PHP :  5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `database`
--

-- --------------------------------------------------------

--
-- Structure de la table `appointment`
--

CREATE TABLE `appointment` (
  `idAppointment` int(11) NOT NULL,
  `hour` datetime NOT NULL,
  `idPlanning` int(11) NOT NULL,
  `idConsumerAddress` int(11) NOT NULL,
  `idVehicles` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `consumer`
--

CREATE TABLE `consumer` (
  `idConsumer` int(11) NOT NULL,
  `surname` varchar(25) NOT NULL,
  `firstname` varchar(25) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `idProducer` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `consumer`
--

INSERT INTO `consumer` (`idConsumer`, `surname`, `firstname`, `email`, `phone`, `idProducer`) VALUES
(28, 'a', 'a', 'a', 'a', 42);

-- --------------------------------------------------------

--
-- Structure de la table `consumeraddress`
--

CREATE TABLE `consumeraddress` (
  `idConsumerAddress` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `comments` varchar(50) NOT NULL,
  `idConsumer` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `consumeraddress`
--

INSERT INTO `consumeraddress` (`idConsumerAddress`, `address`, `comments`, `idConsumer`) VALUES
(12, 'a', 'a', 28);

-- --------------------------------------------------------

--
-- Structure de la table `delivery`
--

CREATE TABLE `delivery` (
  `idDelivery` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `productsType` tinyint(1) NOT NULL,
  `deliveryHour` datetime NOT NULL,
  `idProducer` int(11) NOT NULL,
  `idConsumer` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `planning`
--

CREATE TABLE `planning` (
  `idPlanning` int(11) NOT NULL,
  `idProducer` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `producer`
--

CREATE TABLE `producer` (
  `idProducer` int(11) NOT NULL,
  `surname` varchar(25) NOT NULL,
  `firstname` varchar(25) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `producer`
--

INSERT INTO `producer` (`idProducer`, `surname`, `firstname`, `email`, `phone`) VALUES
(42, 'geraldine', 'ger', 'ger@gmail.com', '0978967099'),
(10, 'jacques', 'jacques', 'jacques@jacques.com', '0000001');

-- --------------------------------------------------------

--
-- Structure de la table `produceraddress`
--

CREATE TABLE `produceraddress` (
  `idProducerAddress` int(11) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `comments` varchar(50) NOT NULL,
  `idProducer` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `produceraddress`
--

INSERT INTO `produceraddress` (`idProducerAddress`, `address`, `comments`, `idProducer`) VALUES
(37, 'a', 'a', 68),
(36, 'a', 'a', 67),
(35, 'a', 'a', 66),
(34, 'a', 'a', 65),
(33, 'a', 'a', 64),
(38, 'a', 'a', 69);

-- --------------------------------------------------------

--
-- Structure de la table `vehicles`
--

CREATE TABLE `vehicles` (
  `idVehicles` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `isRefregirated` tinyint(1) NOT NULL,
  `idProducer` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vehicles`
--

INSERT INTO `vehicles` (`idVehicles`, `capacity`, `isRefregirated`, `idProducer`) VALUES
(1, 10, 1, 42);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`idAppointment`),
  ADD KEY `idPlanning` (`idPlanning`),
  ADD KEY `idConsumerAddress` (`idConsumerAddress`),
  ADD KEY `idVehicles` (`idVehicles`);

--
-- Index pour la table `consumer`
--
ALTER TABLE `consumer`
  ADD PRIMARY KEY (`idConsumer`),
  ADD KEY `idProducer` (`idProducer`);

--
-- Index pour la table `consumeraddress`
--
ALTER TABLE `consumeraddress`
  ADD PRIMARY KEY (`idConsumerAddress`),
  ADD KEY `fk_idconsumer` (`idConsumer`);

--
-- Index pour la table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`idDelivery`),
  ADD KEY `idProducer` (`idProducer`),
  ADD KEY `idConsumer` (`idConsumer`);

--
-- Index pour la table `planning`
--
ALTER TABLE `planning`
  ADD PRIMARY KEY (`idPlanning`);

--
-- Index pour la table `producer`
--
ALTER TABLE `producer`
  ADD PRIMARY KEY (`idProducer`);

--
-- Index pour la table `produceraddress`
--
ALTER TABLE `produceraddress`
  ADD PRIMARY KEY (`idProducerAddress`),
  ADD KEY `idProducer` (`idProducer`);

--
-- Index pour la table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`idVehicles`),
  ADD KEY `idProducer` (`idProducer`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `idAppointment` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `consumer`
--
ALTER TABLE `consumer`
  MODIFY `idConsumer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT pour la table `consumeraddress`
--
ALTER TABLE `consumeraddress`
  MODIFY `idConsumerAddress` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT pour la table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `idDelivery` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `planning`
--
ALTER TABLE `planning`
  MODIFY `idPlanning` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `producer`
--
ALTER TABLE `producer`
  MODIFY `idProducer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT pour la table `produceraddress`
--
ALTER TABLE `produceraddress`
  MODIFY `idProducerAddress` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT pour la table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `idVehicles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
