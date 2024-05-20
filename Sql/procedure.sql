DROP PROCEDURE IF EXISTS AddMenu;
DROP PROCEDURE IF EXISTS AddOrderWithItemsAndPayment;

-- 로그인
-- : 사용자 조회 -> 비밀번호 검수(암호화)

-- Admin 정보 변경
-- : 비밀번호 -> 같은 비밀번호인지 검수
-- : 정보 수정한 것을 update

-- 회원 가입 (Admin 추가)
-- : 아이디가 있는지 조회 -> 없으면 가능
-- : 정보 입력한 것을 insert

-- 주문
-- : 사용자가 먼저 주문 시
-- 1. 서버에서 먼저 API로부터 결제 정보를 JSON으로 받아온 뒤
-- 2. 프론트에서 주문한 아이템을 JSON으로 받아온 뒤
-- 3. AddOrderWithItemsAndPayment로 세 테이블에 insert
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

-- 주문 수락/거절
-- 1. 주문 JOIN 결제
-- 2. 현재 isAccept가 2인 애들을 select
-- 3. 버튼에 따라(파라미터) isAccept 수정

-- 수락된 메뉴 표시
-- 1. isAccept가 1인 애들을 select

-- 메뉴 추가/삭제/수정
-- 1. 파라미터에 따라 insert, delete, update

-- 매출
-- 1. 1시간 단위로 주문에서 매출로 정보 복사 (남은 것들만)
-- 2. 또는, 프론트엔드에서 버튼 누르면 복사

-- 주문 테이블 clear
-- 1. 1시간에 clear

-- 주방 모니터
-- 1. FIFO 순으로 가장 빠른 순서부터 실행
-- (이때, isAccept==1, 이후 주방으로 들어가면 isAccept==3)
-- 2. 주문 JOIN 아이템
-- 3. 주방에서 나가면 isAccept==4로 함
-- 4. 되돌리기를 원하면 나간 순(4인 애들 중 가장 마지막)대로 다시 isAccept==3으로 함

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


