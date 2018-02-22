-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2018 at 10:21 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reporting`
--

-- --------------------------------------------------------

--
-- Table structure for table `owasp`
--

CREATE TABLE `owasp` (
  `ID` int(11) NOT NULL,
  `apptype` text NOT NULL,
  `vname` text NOT NULL,
  `vowasp` text NOT NULL,
  `vdetail` text NOT NULL,
  `vrecommend` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `pid` int(11) NOT NULL,
  `pname` text NOT NULL,
  `company_name` text NOT NULL,
  `apptype` text NOT NULL,
  `startdate` text NOT NULL,
  `enddate` text NOT NULL,
  `analystname` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `proofs`
--

CREATE TABLE `proofs` (
  `proofid` int(11) NOT NULL,
  `vid` int(11) NOT NULL,
  `path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `company_name` text NOT NULL,
  `company_logo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vulnerabilities`
--

CREATE TABLE `vulnerabilities` (
  `vid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `vname` text NOT NULL,
  `vowasp` text NOT NULL,
  `vdetail` text NOT NULL,
  `vrecommend` text NOT NULL,
  `risk` text NOT NULL,
  `severity` text NOT NULL,
  `cvscore` text NOT NULL,
  `cvtext` text NOT NULL,
  `probability` text NOT NULL,
  `remeffort` text NOT NULL,
  `vector` text NOT NULL,
  `occurrences` text NOT NULL,
  `affcomp` text NOT NULL,
  `retest` text NOT NULL,
  `other` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `owasp`
--
ALTER TABLE `owasp`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `proofs`
--
ALTER TABLE `proofs`
  ADD PRIMARY KEY (`proofid`);

--
-- Indexes for table `vulnerabilities`
--
ALTER TABLE `vulnerabilities`
  ADD PRIMARY KEY (`vid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `owasp`
--
ALTER TABLE `owasp`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `proofs`
--
ALTER TABLE `proofs`
  MODIFY `proofid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `vulnerabilities`
--
ALTER TABLE `vulnerabilities`
  MODIFY `vid` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
