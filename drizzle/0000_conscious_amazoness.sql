CREATE TABLE `users` (
	`id_user` serial AUTO_INCREMENT NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(100) NOT NULL,
	`role` enum('USER','ADMIN'),
	`is_active` boolean DEFAULT true,
	CONSTRAINT `users_id_user` PRIMARY KEY(`id_user`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
