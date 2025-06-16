-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2025 at 05:03 PM
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
-- Database: `allthingshub`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `item_id`, `quantity`, `created_at`) VALUES
(2, 3, 6, 1, '2025-06-12 16:37:37'),
(19, 5, 17, 3, '2025-06-14 12:02:51');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `slug`, `description`, `price`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Energen', 'energen-rcg', 'Energen satu renceng isi 10 pcs', '20.000', 'img/asset/energen.png', NULL, NULL),
(2, 'Popice', 'popice-rcg', 'Popice satu renceng isi 10 pcs', '12.000', 'img/asset/popice2.png', NULL, NULL),
(3, 'Indocafe', 'indocafe-rcg', 'Indocafe satu renceng (10pcs)', '18.000', 'img/asset/indocafe-removeBG.png', NULL, NULL),
(4, 'Garudafood Chocolatos Drink 10\'s', 'garudafood-chocolatos-drink', 'Chocolatos Drink satu renceng isi 10 pcs', '20.500', 'img/asset/chocolatos-removeBG.png', NULL, NULL),
(5, 'Kopi Kapal Api Special Mix', 'kopi-kapal-api-special-mix', 'Kopi Kapal Api Special Mix 1 renceng isi 10 pcs', '17.800', 'img/asset/kapalApiSpecialMix-removeBG.png', NULL, NULL),
(6, 'So Klin Royale Pewangi Hijab Edition', 'so-klin-royale-pewangi-hijab-edition', 'So Klin Royale Pewangi Hijab Edition beli 6 sachet gratis 1', '5.000', 'img/asset/royale1.png', NULL, NULL),
(7, 'Molto Sachet 9ml 12\'s', 'molto-sachet-9ml-12s', 'Molto Sachet Renceng Renteng Kemasan 500 Isi 9ml 12pcs / 13pcs', '5.000', 'img/asset/molto2.png', NULL, NULL),
(8, 'Attack Jazz1 Sachet 50g 12\'s', 'attack-jazz1-sachet-50g-12s', 'ATTACK JAZ1 Detergen Bubuk Renceng Semerbak Cinta & Pesona Segar 50 gram x 12\'s Sachet - Sabun Cuci', '5.000', 'img/asset/jaz1.png', NULL, NULL),
(9, 'Downy Pelembut', 'downy', 'Downy Pewangi Pakaian 12pcs', '5.000', 'img/asset/downy-removeBG.png', NULL, NULL),
(10, 'Rinso Bubuk', 'rinsobubuk', 'Rinsobubuk (1 rcg)', '5.000', 'img/asset/rinsobubuk1.jpeg', NULL, NULL),
(11, 'Telur Ayam 1 Kg', 'telur-ayam-1kg', 'Telur Ayam 1 Kg', '27.500', 'img/asset/telur1.jpeg', NULL, NULL),
(12, 'Sania Beras Premium 1Kg', 'sania-beras-premium-1kg', 'Beras', '17.000', 'img/asset/Beras-removeBG.png', NULL, NULL),
(13, 'Sarimi isi 2 Ayam Kremes', 'sarimi2ayamkremes', 'Sarimi Isi 2 Ayam Kremes', '4.500', 'img/asset/sarimiayam1.jpeg', NULL, NULL),
(14, 'Sarimi Isi 2 Ayam Kecap', 'sarimi2ayamkecap', 'Sarimi Isi 2 Ayam Kecap', '4.500', 'img/asset/sarimikecap1.jpeg', NULL, NULL),
(15, 'Indomie Kari Ayam', 'indomie-kari', 'Indomie kari ayam ( 1pcs )', '3.500', 'img/asset/kariayam1.jpeg', NULL, NULL),
(16, 'Indomie Goreng', 'indomie-goreng', 'Indomie Goreng ( 1pcs )', '3.500', 'img/asset/indomie1.jpeg', NULL, NULL),
(17, 'Sarimi Bakso Isi 2', 'sarimi-2-bakso', 'Sarimi Bakso Isi 2 (1pcs)', '4.500', 'img/asset/sarimi1.jpeg', NULL, NULL),
(18, 'Indomie Soto Ayam', 'indomie-soto-ayam', 'Indomie Soto Ayam (1pcs)', '3.500', 'img/asset/indoSoto-removeBG.png', NULL, NULL),
(19, 'Tropical Minyak Goreng Botol 1 Liter', 'tropical-minyak-goreng-botol-1-liter', 'Tropical Minyak Goreng Botol 1 Liter', '25.500', 'img/asset/tropical1.jpg', NULL, NULL),
(20, 'Minyakita Minyak Goreng 1 Liter', 'minyakita-minyak-goreng-1-liter', 'Minyakita Minyak Goreng 1 Liter', '20.800', 'img/asset/minyakita1.jpg', NULL, NULL),
(21, 'Gulaku Gula Tebu Alami 1Kg', 'gulaku-gula-tebu-alami-1kg', 'Gulaku Gula Tebu Alami Kemasan 1Kg', '20.000', 'img/asset/gulaPasir2.png', NULL, NULL),
(35, 'Teh Kotak', 'teh-kotak', 'dsadkasda', '100000', 'tehkotak.png', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('PbjU1YKRQdDKIzr3EycAoQr1d3Zgptbon6EqHsH7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Herd/1.20.2 Chrome/120.0.6099.291 Electron/28.2.5 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieTltMDJmN0MzMTlHU1NCMVhUZmg5NEdKM2kzOWJXS2Q5MmRiMWtJYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9hbGx0aGluZ3NodWIudGVzdC8/aGVyZD1wcmV2aWV3Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1749869055),
('UfCsSF89pPwfPVA30DINmREje3lTQUWhy3sgSqbq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiOGhEQTF0S24wdExhSGxYekpzVmVEa1h4bnp0SlZ0VE52Z0V2Y04wNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hbGx0aGluZ3NodWIudGVzdC8/cGFnZT0xIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo0OiJjYXJ0IjthOjA6e319', 1749869059),
('wNTd62Uanu291K9GtRmONLrxM2XA15aUMwr7ywis', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Herd/1.20.2 Chrome/120.0.6099.291 Electron/28.2.5 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZWdIWVFMZVFaUXFReldoNjJVajFtYUo2SUd0RHdsVVJmd0FiSWFmViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9hbGx0aGluZ3NodWIudGVzdC8/aGVyZD1wcmV2aWV3Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1749869055),
('XMJxGQdADpWVW9d4TmSImbm9t1O6blzt3Zf4nheM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Herd/1.20.2 Chrome/120.0.6099.291 Electron/28.2.5 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieWVwTjNSR2dJeWVLajBsQnFaQ1FER1IyNjFzTFM4OW5XZU9GQ1BjTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9hbGx0aGluZ3NodWIudGVzdC8/aGVyZD1wcmV2aWV3Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1749869059),
('zWNEpUYWFyn1AVZg1YGdSbR2wlCtEehQeVtR8wx9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Herd/1.20.2 Chrome/120.0.6099.291 Electron/28.2.5 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia2phYUNwODVQUWVwTjFyczBPSVVySVF3akpycTlIajB3ZjdQcU5BaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9hbGx0aGluZ3NodWIudGVzdC8/aGVyZD1wcmV2aWV3Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1749869059);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `total_price` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `date`, `total_price`) VALUES
(1, 4, '2025-06-14 15:53:32', 0.00),
(2, 4, '2025-06-14 15:55:00', 0.00),
(3, 4, '2025-06-14 15:57:17', 205.80),
(4, 4, '2025-06-14 18:27:07', 12.00),
(5, 4, '2025-06-14 18:27:22', 12.00),
(6, 4, '2025-06-14 18:28:56', 50.00),
(7, 4, '2025-06-14 18:30:24', 12.00),
(8, 8, '2025-06-14 18:42:58', 100.00),
(9, 5, '2025-06-14 18:53:49', 20.00);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_items`
--

CREATE TABLE `transaction_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_items`
--

INSERT INTO `transaction_items` (`id`, `transaction_id`, `item_id`, `quantity`, `price`) VALUES
(1, 3, 2, 6, '12.000'),
(2, 3, 3, 2, '18.000'),
(3, 3, 1, 4, '20.000'),
(4, 3, 5, 1, '17.800'),
(5, 4, 2, 1, '12.000'),
(6, 5, 2, 1, '12.000'),
(7, 6, 1, 1, '20.000'),
(8, 6, 2, 1, '12.000'),
(9, 6, 3, 1, '18.000'),
(10, 7, 2, 1, '12.000'),
(11, 8, 1, 5, '20.000'),
(12, 9, 1, 1, '20.000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `photo` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('admin','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `google_id`, `username`, `password`, `email`, `displayname`, `photo`, `created_at`, `role`) VALUES
(3, '101494322921260519139', NULL, NULL, 'devarizaph@gmail.com', 'Devariza', 'https://lh3.googleusercontent.com/a/ACg8ocKE4nlAwMOAe3QbMesRTf9Qg-uXrum9BqxPWGEfb5V7NMpmaz25=s96-c', '2025-06-12 13:06:37', 'user'),
(4, NULL, 'Devariza', '$2b$10$/eFJBPyAt5htr/3pAH1.uuH9A85QIrtwvUJAtK2PySIz/WWMc2H7C', NULL, NULL, NULL, '2025-06-12 13:11:30', 'user'),
(5, NULL, 'admin', '$2b$10$tc5dIW3j649CzQn68beiReFOvpKkbUd4vMrhlAup.kue1AN96fmJm', NULL, NULL, NULL, '2025-06-12 16:11:40', 'admin'),
(6, NULL, 'Herawan', '$2b$10$DjLWTxKqJQnlwn0INBEqFOT1T3H2uLH7uaoMQpwCNBAduIB2Px8GO', NULL, NULL, NULL, '2025-06-14 07:53:09', 'user'),
(7, NULL, 'meds', '$2b$10$A.oqlL1yxWmspW0KwT/Ew.RqO0VJoR0l2Kuk9kTiK7uAU8lofOn62', NULL, NULL, NULL, '2025-06-14 11:32:47', 'user'),
(8, NULL, 'eiaza', '$2b$10$9GtXvVH3gcENHoUMveIIYuadzvq8bGwrncKXZ59qUDL/vUcMSAH4m', NULL, NULL, NULL, '2025-06-14 11:42:31', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `items_slug_unique` (`slug`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_id` (`transaction_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `google_id` (`google_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `transaction_items`
--
ALTER TABLE `transaction_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD CONSTRAINT `transaction_items_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transaction_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
