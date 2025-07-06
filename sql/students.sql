-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2025 at 11:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `serial_no` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `roll_no` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`serial_no`, `name`, `year`, `roll_no`) VALUES
(1, 'Aarav Sharma', '1', 'CS101'),
(2, 'Isha Verma', '2', 'EC203'),
(3, 'Rohit Singh', '3', 'ME312'),
(4, 'Tanya Mehta', '1', 'CS102'),
(5, 'Neeraj Jain', '2', 'EE221'),
(6, 'Kriti Sinha', '3', 'CE315'),
(7, 'Aditya Roy', '4', 'ME401'),
(8, 'Simran Kaur', '1', 'CS103'),
(9, 'Varun Malhotra', '2', 'IT212'),
(10, 'Riya Kapoor', '3', 'EC321'),
(11, 'Harsh Patel', '1', 'CS104'),
(12, 'Megha Desai', '4', 'EE422'),
(13, 'Yash Thakur', '3', 'CE318'),
(14, 'Sneha Reddy', '2', 'CS202'),
(15, 'Aman Bansal', '1', 'IT105'),
(16, 'Divya Nair', '3', 'EC319'),
(17, 'Kunal Joshi', '4', 'ME405'),
(18, 'Neha Chawla', '2', 'EE225'),
(19, 'Rahul Bose', '1', 'CS106'),
(20, 'Pooja Rao', '3', 'CE320'),
(21, 'Nikhil Dubey', '4', 'IT409'),
(22, 'Sanya Malik', '2', 'CS204'),
(23, 'Anuj Sehgal', '3', 'EC322'),
(24, 'Priya Yadav', '1', 'CS107'),
(25, 'Manish Rawat', '2', 'ME210'),
(26, 'Aisha Ali', '1', 'IT106'),
(27, 'Rajat Saxena', '2', 'EC213'),
(28, 'Surbhi Khanna', '3', 'EE326'),
(29, 'Vikram Solanki', '4', 'ME410'),
(30, 'Juhi Sharma', '2', 'CS206'),
(31, 'Abhinav Tripathi', '3', 'CE319'),
(32, 'Tanvi Rao', '1', 'CS108'),
(33, 'Deepak Kumar', '2', 'ME211'),
(34, 'Naina Kapoor', '4', 'IT408'),
(35, 'Sahil Luthra', '3', 'EC324'),
(36, 'Ankita Das', '2', 'EE229'),
(37, 'Mohit Chauhan', '1', 'CS109'),
(38, 'Rhea Menon', '3', 'CE321'),
(39, 'Lakshay Verma', '2', 'CS208'),
(40, 'Nikita Ghosh', '4', 'EE423'),
(41, 'Saurabh Singh', '1', 'IT107'),
(42, 'Palak Arora', '3', 'ME413'),
(43, 'Jatin Kaur', '2', 'EC215'),
(44, 'Riddhi Jain', '1', 'CS110'),
(45, 'Tarun Yadav', '2', 'CE317'),
(46, 'Sana Sheikh', '3', 'IT306'),
(47, 'Vedant Bhatia', '4', 'CS410'),
(48, 'Anjali Chauhan', '1', 'CS111'),
(49, 'Ishaan Pandey', '3', 'EC325'),
(50, 'Diya Sethi', '2', 'ME212');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`serial_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `serial_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
