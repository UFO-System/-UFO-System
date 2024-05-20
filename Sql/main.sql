DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS PayInfo;
DROP TABLE IF EXISTS OrderTable;
DROP TABLE IF EXISTS Total;
DROP TABLE IF EXISTS Menu;
DROP TABLE IF EXISTS Admin;

DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS PayInfo;
DROP TABLE IF EXISTS OrderTable;
DROP TABLE IF EXISTS Total;
DROP TABLE IF EXISTS Menu;
DROP TABLE IF EXISTS Admin;

CREATE TABLE `Admin` (
    `admin_id` VARCHAR(30) NOT NULL,
    `pwd` VARCHAR(64) NOT NULL COMMENT 'SHA-256 암호화 필요',
    `admin_name` VARCHAR(90) NOT NULL,
    `bank` VARCHAR(30) NOT NULL,
    `back_account` VARCHAR(30) NOT NULL COMMENT '여기로 받아오는 것',
    `phone` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`admin_id`)
);

CREATE TABLE `Total` (
    `total_id` BIGINT NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `price` BIGINT NOT NULL,
    PRIMARY KEY (`total_id`)
);

CREATE TABLE `PayInfo` (
    `pay_id` BIGINT NOT NULL AUTO_INCREMENT,
    `bank` VARCHAR(30) NOT NULL,
    `bank_account` BIGINT NOT NULL,
    `pay_name` VARCHAR(30) NOT NULL,
    `pay_price` BIGINT NOT NULL,
    PRIMARY KEY (`pay_id`)
);

CREATE TABLE `Menu` (
    `menu_id` BIGINT NOT NULL AUTO_INCREMENT,
    `admin_id` VARCHAR(30) NOT NULL,
    `menu_name` VARCHAR(30) NOT NULL,
    `price` BIGINT NOT NULL,
    PRIMARY KEY (`menu_id`, `admin_id`)
);

CREATE TABLE `OrderTable` (
    `order_id` BIGINT NOT NULL AUTO_INCREMENT,
    `admin_id` VARCHAR(30) NOT NULL,
    `is_accept` BIGINT NOT NULL COMMENT '2 : 대기 | 1 : 수락 | 0 : 거절 | 3 : 주방 | 4 : 나감',
    `date` DATE NOT NULL,
    `table_num` BIGINT NOT NULL,
    `bank_name` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`order_id`, `admin_id`)
);

CREATE TABLE `Item` (
    `item_id` BIGINT NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT NOT NULL,
    `menu_id` BIGINT NOT NULL,
    `count` BIGINT NOT NULL,
    PRIMARY KEY (`item_id`, `order_id`, `menu_id`)
);

ALTER TABLE `Menu` ADD CONSTRAINT `FK_Admin_TO_Menu_1` FOREIGN KEY (
    `admin_id`
) REFERENCES `Admin` (
    `admin_id`
);

ALTER TABLE `OrderTable` ADD CONSTRAINT `FK_Admin_TO_OrderTable_1` FOREIGN KEY (
    `admin_id`
) REFERENCES `Admin` (
    `admin_id`
);

ALTER TABLE `Item` ADD CONSTRAINT `FK_OrderTable_TO_Item_1` FOREIGN KEY (
    `order_id`
) REFERENCES `OrderTable` (
    `order_id`
);

ALTER TABLE `Item` ADD CONSTRAINT `FK_Menu_TO_Item_1` FOREIGN KEY (
    `menu_id`
) REFERENCES `Menu` (
    `menu_id`
);
