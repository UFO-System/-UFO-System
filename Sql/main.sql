drop table `Total`;
drop table `PayInfo`;
drop table `Item`;
drop table `Menu`;
drop table `OrderTable`;
drop table `Admin`;

CREATE TABLE `Menu` (
	`menu_id`	BIGINT NOT NULL AUTO_INCREMENT,
	`admin_id`	VARCHAR(30)	NOT NULL,
	`menu_name`	VARCHAR(30)	NOT NULL,
	`price`	BIGINT	NOT NULL,
	`image_url`	varchar(255) DEFAULT NULL,
    PRIMARY KEY (`menu_id`, `admin_id`)
);

CREATE TABLE `OrderTable` (
	`order_id`	BIGINT	NOT NULL auto_increment,
	`admin_id`	VARCHAR(30)	NOT NULL,
	`is_accept`	BIGINT	NOT NULL	COMMENT '2 : 대기 | 1 : 수락 | 0 : 거절',
	`date`	Date	NOT NULL,
	`table_num`	BIGINT	NOT NULL,
	`bank_name`	VARCHAR(30)	NOT NULL,
    PRIMARY KEY (`order_id`, `admin_id`)
);

CREATE TABLE `Total` (
	`total_id`	BIGINT	NOT NULL auto_increment,
	`admin_id`	VARCHAR(30)	NOT NULL,
	`date`	Date	NOT NULL,
	`price`	BIGINT	NOT NULL,
	`items`	VARCHAR(200)	NOT NULL,
    PRIMARY KEY (`total_id`, `admin_id`)
);

CREATE TABLE `Admin` (
	`admin_id`	VARCHAR(30)	NOT NULL,
	`pwd`	VARCHAR(30)	NOT NULL	COMMENT '암호화 필요',
	`admin_name`	VARCHAR(90)	NOT NULL,
	`bank`	VARCHAR(30)	NOT NULL,
	`back_account`	VARCHAR(30)	NOT NULL	COMMENT '여기로 받아오는 것',
	`phone`	VARCHAR(30)	NOT NULL,
	`member`	VARCHAR(30)	NOT NULL,
    PRIMARY KEY (`admin_id`)
);

CREATE TABLE `Item` (
	`item_id`	BIGINT	NOT NULL auto_increment,
	`order_id`	BIGINT	NOT NULL,
	`menu_id`	BIGINT	NOT NULL,
	`count`	BIGINT	NOT NULL,
    PRIMARY KEY (`item_id`, `order_id`, `menu_id`)
);

CREATE TABLE `PayInfo` (
	`pay_id`	BIGINT	NOT NULL auto_increment,
	`admin_id`	VARCHAR(30)	NOT NULL,
	`bank`	VARCHAR(30)	NOT NULL,
	`bank_account`	BIGINT	NOT NULL,
	`pay_name`	VARCHAR(30)	NOT NULL,
	`pay_price`	BIGINT	NOT NULL,
    PRIMARY KEY (`pay_id`, `admin_id`)
);

ALTER TABLE `Menu` ADD CONSTRAINT `FK_Admin_TO_Menu_1` FOREIGN KEY (
	`admin_id`
)
REFERENCES `Admin` (
	`admin_id`
);

ALTER TABLE `OrderTable` ADD CONSTRAINT `FK_Admin_TO_OrderTable_1` FOREIGN KEY (
	`admin_id`
)
REFERENCES `Admin` (
	`admin_id`
);

ALTER TABLE `Total` ADD CONSTRAINT `FK_Admin_TO_Total_1` FOREIGN KEY (
	`admin_id`
)
REFERENCES `Admin` (
	`admin_id`
);

ALTER TABLE `Item` ADD CONSTRAINT `FK_OrderTable_TO_Item_1` FOREIGN KEY (
	`order_id`
)
REFERENCES `OrderTable` (
	`order_id`
);

ALTER TABLE `Item` ADD CONSTRAINT `FK_Menu_TO_Item_1` FOREIGN KEY (
	`menu_id`
)
REFERENCES `Menu` (
	`menu_id`
);

ALTER TABLE `PayInfo` ADD CONSTRAINT `FK_Admin_TO_PayInfo_1` FOREIGN KEY (
	`admin_id`
)
REFERENCES `Admin` (
	`admin_id`
);

