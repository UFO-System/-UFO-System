DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS PayInfo;
DROP TABLE IF EXISTS OrderTable;
DROP TABLE IF EXISTS Total;
DROP TABLE IF EXISTS Menu;
DROP TABLE IF EXISTS Admin;

CREATE TABLE `Admin` (
    `admin_id` VARCHAR(30) NOT NULL,
    `pwd` VARCHAR(30) NOT NULL COMMENT '암호화 필요',
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
    `order_id` BIGINT NOT NULL,
    `bank` VARCHAR(30) NOT NULL,
    `bank_account` BIGINT NOT NULL,
    `pay_name` VARCHAR(30) NOT NULL,
    `pay_price` BIGINT NOT NULL,
    PRIMARY KEY (`pay_id`, `order_id`)
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
    `is_accept` BIGINT NOT NULL COMMENT '2 : 대기 | 1 : 수락 | 0 : 거절',
    `date` DATE NOT NULL,
    `table_num` BIGINT NOT NULL,
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

ALTER TABLE `PayInfo` ADD CONSTRAINT `FK_OrderTable_TO_PayInfo_1` FOREIGN KEY (
	`order_id`
)
REFERENCES `OrderTable` (
	`order_id`
);

INSERT INTO ADMIN VALUES("rtunu12", "asd123", "류태웅", "농협", "3521640184543", "01089683795");

DROP PROCEDURE IF EXISTS AddMenu;

DELIMITER //

CREATE PROCEDURE AddMenu (
    IN p_admin_id VARCHAR(30),
    IN p_menu_name VARCHAR(30),
    IN p_price BIGINT
)
BEGIN
    INSERT INTO MENU (admin_id, menu_name, price)
    VALUES (p_admin_id, p_menu_name, p_price);
END //

DELIMITER ;

CALL AddMenu("rtunu12", "떡볶이", 12000);
CALL AddMenu("rtunu12", "치킨", 19000);
CALL AddMenu("rtunu12", "피자", 25000);
CALL AddMenu("rtunu12", "족발", 30000);
CALL AddMenu("rtunu12", "콜라", 2000);
CALL AddMenu("rtunu12", "사이다", 2000);
CALL AddMenu("rtunu12", "소주", 5000);
CALL AddMenu("rtunu12", "맥주", 6000);

-- 주문과 아이템 및 결제 정보를 삽입하는 프로시저
DROP PROCEDURE IF EXISTS AddOrderWithItemsAndPayment;

DELIMITER //

CREATE PROCEDURE AddOrderWithItemsAndPayment (
    IN p_admin_id VARCHAR(30),
    IN p_date DATE,
    IN p_table_num BIGINT,
    IN p_items JSON, -- JSON 배열 형태로 아이템 정보 전달
    IN p_payment JSON -- JSON 객체 형태로 결제 정보 전달
)
BEGIN
    DECLARE new_order_id BIGINT;
    DECLARE new_pay_id BIGINT;
    DECLARE item_length INT;
    DECLARE i INT DEFAULT 0;
    
    START TRANSACTION;
    
    -- OrderTable에 새로운 주문 삽입 (is_accept는 무조건 2로 설정)
    INSERT INTO OrderTable (admin_id, is_accept, date, table_num)
    VALUES (p_admin_id, 2, p_date, p_table_num);
    
    -- 마지막으로 삽입된 order_id를 가져옴
    SET new_order_id = LAST_INSERT_ID();
    
    -- JSON 배열의 길이 계산
    SET item_length = JSON_LENGTH(p_items);
    
    -- JSON 배열을 순회하며 Item 테이블에 아이템 삽입
    WHILE i < item_length DO
        INSERT INTO Item (order_id, menu_id, count)
        VALUES (new_order_id, 
                JSON_UNQUOTE(JSON_EXTRACT(p_items, CONCAT('$[', i, '].menu_id'))), 
                JSON_UNQUOTE(JSON_EXTRACT(p_items, CONCAT('$[', i, '].count'))));
        SET i = i + 1;
    END WHILE;

    -- PayInfo 테이블에 결제 정보 삽입
    INSERT INTO PayInfo (order_id, bank, bank_account, pay_name, pay_price)
    VALUES (new_order_id, 
            JSON_UNQUOTE(JSON_EXTRACT(p_payment, '$.bank')),
            JSON_UNQUOTE(JSON_EXTRACT(p_payment, '$.bank_account')),
            JSON_UNQUOTE(JSON_EXTRACT(p_payment, '$.pay_name')),
            JSON_UNQUOTE(JSON_EXTRACT(p_payment, '$.pay_price')));
    
    COMMIT;
END //

DELIMITER ;

-- 주문, 아이템, 결제 정보를 추가하는 예시 호출
CALL AddOrderWithItemsAndPayment(
    "rtunu12", 
    '2024-05-19', 
    1, 
    '[{"menu_id": 1, "count": 3}, {"menu_id": 2, "count": 2}]',
    '{"bank": "농협", "bank_account": "3521640184543", "pay_name": "rtunu12", "pay_price": 45000}'
);

CALL AddOrderWithItemsAndPayment(
    "rtunu12", 
    '2024-05-19', 
    2, 
    '[{"menu_id": 3, "count": 1}, {"menu_id": 2, "count": 2}]',
    '{"bank": "농협", "bank_account": "3521640184543", "pay_name": "rtunu12", "pay_price": 45000}'
);

SELECT * FROM OrderTable;
SELECT * FROM Item;
SELECT * FROM PayInfo;

select * from admin;
SELECT * FROM MENU;
