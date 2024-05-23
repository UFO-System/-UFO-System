DROP PROCEDURE IF EXISTS Login;
DROP PROCEDURE IF EXISTS UpdateAdminInfo;
DROP PROCEDURE IF EXISTS RegisterAdmin;
DROP PROCEDURE IF EXISTS InsertMenu;
DROP PROCEDURE IF EXISTS DeleteMenu;
DROP PROCEDURE IF EXISTS createOrder;
DROP PROCEDURE IF EXISTS showPendingOrders;
DROP PROCEDURE IF EXISTS acceptOrder;
DROP PROCEDURE IF EXISTS rejectOrder;
DROP PROCEDURE IF EXISTS completeOrder;
DROP PROCEDURE IF EXISTS insertPayInfo;
DROP PROCEDURE IF EXISTS copySales;

-- 로그인
-- : 사용자 조회 -> 비밀번호 검수(암호화)

DELIMITER //

CREATE PROCEDURE Login(
    IN p_admin_id VARCHAR(30), 
    IN p_pwd VARCHAR(64), 
    OUT p_status_message VARCHAR(255)
)
BEGIN
    DECLARE db_hashed_pwd VARCHAR(128);
    DECLARE db_salt VARCHAR(16);
    DECLARE input_hashed_pwd VARCHAR(128);
    
    -- 사용자 조회 및 솔트와 해시된 비밀번호 가져오기
    SELECT pwd, salt INTO db_hashed_pwd, db_salt 
    FROM Admin 
    WHERE admin_id = p_admin_id;

    -- 사용자 존재 여부 확인
    IF db_salt IS NOT NULL THEN
        -- 입력된 비밀번호를 솔트와 함께 해시
        SET input_hashed_pwd = SHA2(CONCAT(p_pwd, db_salt), 256);

        -- 비밀번호 검수
        IF db_hashed_pwd = input_hashed_pwd THEN
            SET p_status_message = 'Login successful';
        ELSE
            SET p_status_message = 'Incorrect password';
        END IF;
    ELSE
        SET p_status_message = 'ID does not exist';
    END IF;
END //

DELIMITER ;



-- 정보 변경
-- : 비밀번호 -> 같은 비밀번호인지 검수
-- : 정보 수정한 것을 update
-- : admin_id가 파라미터에 있는 이유 : 해당 admin_id의 정보들을 수정하기에
-- : 즉, 프론트엔드가 정보 수정 시 현재 수정 중인 admin_id를 서버에게 보내야 함

DELIMITER //

CREATE PROCEDURE UpdateAdminInfo(
    IN p_admin_id VARCHAR(30), 
    IN p_old_pwd VARCHAR(64), 
    IN p_new_pwd VARCHAR(64), 
    IN p_new_name VARCHAR(90), 
    IN p_new_bank VARCHAR(30), 
    IN p_new_back_account VARCHAR(30), 
    IN p_new_phone VARCHAR(30), 
    OUT p_status_message VARCHAR(255)
)
BEGIN
    DECLARE db_hashed_pwd VARCHAR(128);
    DECLARE db_salt VARCHAR(16);
    DECLARE hashed_old_pwd VARCHAR(128);
    DECLARE hashed_new_pwd VARCHAR(128);
    
    -- 사용자 조회 및 솔트와 해시된 비밀번호 가져오기
    SELECT pwd, salt INTO db_hashed_pwd, db_salt 
    FROM Admin 
    WHERE admin_id = p_admin_id;

    -- 현재 비밀번호 해싱
    SET hashed_old_pwd = SHA2(CONCAT(p_old_pwd, db_salt), 256);
    
    -- 비밀번호 검수 및 정보 수정
    IF db_hashed_pwd = hashed_old_pwd THEN
        -- 새로운 비밀번호 해싱
        SET hashed_new_pwd = SHA2(CONCAT(p_new_pwd, db_salt), 256);
        
        UPDATE Admin
        SET pwd = hashed_new_pwd, admin_name = p_new_name, bank = p_new_bank, back_account = p_new_back_account, phone = p_new_phone
        WHERE admin_id = p_admin_id;
        
        -- 업데이트 확인
        IF ROW_COUNT() > 0 THEN
            SET p_status_message = 'Information updated successfully';
        ELSE
            SET p_status_message = 'No changes made';
        END IF;
    ELSE
        SET p_status_message = 'Incorrect current password';
    END IF;
END //

DELIMITER ;





-- 회원 가입
-- : 아이디가 있는지 조회 -> 없으면 가능
-- : 정보 입력한 것을 insert

DELIMITER //

CREATE PROCEDURE RegisterAdmin(
    IN p_admin_id VARCHAR(30), 
    IN p_pwd VARCHAR(64), 
    IN p_admin_name VARCHAR(90), 
    IN p_bank VARCHAR(30), 
    IN p_back_account VARCHAR(30), 
    IN p_phone VARCHAR(30), 
    OUT p_status_message VARCHAR(255)
)
BEGIN
    -- SHA-256 해싱 및 솔트 생성
    DECLARE hashed_pwd VARCHAR(128);
    DECLARE salt VARCHAR(16);
    
    -- 솔트 생성
    SET salt = LEFT(MD5(RAND()), 16);
    
    -- SHA-256 해싱
    SET hashed_pwd = SHA2(CONCAT(p_pwd, salt), 256);
    
    -- 아이디 중복 확인
    IF NOT EXISTS (SELECT 1 FROM Admin WHERE admin_id = p_admin_id) THEN
        -- 새로운 관리자 추가
        INSERT INTO Admin (admin_id, pwd, salt, admin_name, bank, back_account, phone)
        VALUES (p_admin_id, hashed_pwd, salt, p_admin_name, p_bank, p_back_account, p_phone);
        SET p_status_message = 'Registration successful';
    ELSE
        SET p_status_message = 'ID already exists';
    END IF;
END //

DELIMITER ;




-- 메뉴 추가

DELIMITER //

CREATE PROCEDURE InsertMenu(
    IN p_admin_id VARCHAR(30), 
    IN p_menu_name VARCHAR(30), 
    IN p_price BIGINT, 
    OUT p_status_message VARCHAR(255)
)
BEGIN
    -- 메뉴 추가
    INSERT INTO Menu (admin_id, menu_name, price)
    VALUES (p_admin_id, p_menu_name, p_price);
    SET p_status_message = 'Menu item inserted successfully';
END //

DELIMITER ;


-- 메뉴 삭제

DELIMITER //

CREATE PROCEDURE DeleteMenu(
    IN p_admin_id VARCHAR(30), 
    IN p_menu_id BIGINT, 
    OUT p_status_message VARCHAR(255)
)
BEGIN
    -- 메뉴 삭제
    IF EXISTS (SELECT 1 FROM Menu WHERE admin_id = p_admin_id AND menu_id = p_menu_id) THEN
        DELETE FROM Menu WHERE admin_id = p_admin_id AND menu_id = p_menu_id;
        SET p_status_message = 'Menu item deleted successfully';
    ELSE
        SET p_status_message = 'Menu item not found';
    END IF;
END //

DELIMITER ;

-- 사용자가 주문
-- 사용자가 menu를 골라 주문을 생성할 경우
-- 사용자가 선택했던 menu들은 이 프로시저에서 JSON으로 받아온 뒤 item에 insert
-- 그 후 order_id를 제외한(애초에 파라미터가 아니다.) 모든 파라미터로 주문에 insert

DELIMITER $$

CREATE PROCEDURE createOrder(
    IN p_admin_id VARCHAR(30),
    IN p_is_accept BIGINT,
    IN p_date DATE,
    IN p_table_num BIGINT,
    IN p_bank_name VARCHAR(30),
    IN p_items JSON
)
BEGIN
    DECLARE v_order_id1 BIGINT;
    DECLARE v_order_id2 BIGINT;
    DECLARE total_items INT;

    -- Calculate total number of items
    SET total_items = (SELECT COUNT(*) FROM JSON_TABLE(p_items, '$[*]' COLUMNS (dummy INT PATH '$.menu_id')) AS count_table);

    -- Insert into OrderTable (first order)
    INSERT INTO OrderTable (admin_id, is_accept, date, table_num, bank_name)
    VALUES (p_admin_id, p_is_accept, p_date, p_table_num, p_bank_name);
    SET v_order_id1 = LAST_INSERT_ID();

    -- Insert items into Item table for the first order
    INSERT INTO Item (order_id, menu_id, count)
    SELECT 
        v_order_id1,
        menu_id,
        count
    FROM 
        JSON_TABLE(p_items, '$[*]' COLUMNS (
            rownum FOR ORDINALITY,
            menu_id BIGINT PATH '$.menu_id',
            count BIGINT PATH '$.count'
        )) AS item
    WHERE item.rownum <= 11;

    -- Check if there are more than 11 items
    IF total_items > 11 THEN
        -- Insert into OrderTable (second order)
        INSERT INTO OrderTable (admin_id, is_accept, date, table_num, bank_name)
        VALUES (p_admin_id, p_is_accept, p_date, p_table_num, p_bank_name);
        SET v_order_id2 = LAST_INSERT_ID();

        -- Insert remaining items into Item table for the second order
        INSERT INTO Item (order_id, menu_id, count)
        SELECT 
            v_order_id2,
            menu_id,
            count
        FROM 
            JSON_TABLE(p_items, '$[*]' COLUMNS (
                rownum FOR ORDINALITY,
                menu_id BIGINT PATH '$.menu_id',
                count BIGINT PATH '$.count'
            )) AS item
        WHERE item.rownum > 11;
    END IF;
END$$

DELIMITER ;



-- 주문 표시
-- isAccept가 2인 주문을 표시하는데, 그 주문에 연결된 item은 '대표음식 외 n건'으로 표시

DELIMITER $$

CREATE PROCEDURE showPendingOrders()
BEGIN
    SELECT 
        o.order_id,
        o.admin_id,
        o.date,
        o.table_num,
        o.bank_name,
        CASE 
            WHEN COUNT(i.menu_id) > 1 THEN CONCAT(MAX(m.menu_name), ' 외 ', COUNT(i.menu_id) - 1, '건')
            ELSE MAX(m.menu_name)
        END AS items
    FROM 
        OrderTable o
        JOIN Item i ON o.order_id = i.order_id
        JOIN Menu m ON i.menu_id = m.menu_id
    WHERE 
        o.is_accept = 2
    GROUP BY 
        o.order_id,
        o.admin_id,
        o.date,
        o.table_num,
        o.bank_name;
END$$

DELIMITER ;



-- 주문 관리 (수락/거절)
-- 주문의 데이터 중 isAccept가 2인 주문을 파라미터(수락, 거절)에 따라서 isAccept가 1 또는 0이 됨
-- 수락 시 isAccept를 1로 변경하고 주문과 item을 JOIN하여 (이때 메뉴와 개수가 나와야 함) 이를 출력 값으로 (JSON 형식이며 메뉴:개수 형식으로)
-- 수락 시 출력 값은 서버를 거쳐 주방으로 이동 (프로시저에서 수행X)

DELIMITER $$

CREATE PROCEDURE acceptOrder(
    IN p_order_id BIGINT,
    OUT p_result JSON
)
BEGIN
    UPDATE OrderTable
    SET is_accept = 1
    WHERE order_id = p_order_id;

    SELECT 
        JSON_OBJECTAGG(
            m.menu_name, i.count
        ) INTO p_result
    FROM 
        Item i
        JOIN Menu m ON i.menu_id = m.menu_id
    WHERE 
        i.order_id = p_order_id;
END$$

DELIMITER ;


-- 거절 시 isAccept를 0으로 변경하고 출력 값을 JSON 형식으로 order_id:거절사유로 출력
-- 거절 사유 : 입금 금액 부족, 입금 금액 초과, 카운터 방문 요망 

DELIMITER $$

CREATE PROCEDURE rejectOrder(
    IN p_order_id BIGINT
)
BEGIN
    UPDATE OrderTable
    SET is_accept = 0
    WHERE order_id = p_order_id;
END$$

DELIMITER ;


-- 입금
-- 서버에서 payInfo 테이블에 맞게 JSON이 내려올 것
-- 그 JSON을 파라미터로 하여 payInfo 테이블에 매핑

DELIMITER $$

CREATE PROCEDURE insertPayInfo(
    IN p_pay_info JSON
)
BEGIN
    INSERT INTO PayInfo (bank, bank_account, pay_name, pay_price)
    SELECT 
        JSON_UNQUOTE(JSON_EXTRACT(p_pay_info, '$.bank')),
        JSON_UNQUOTE(JSON_EXTRACT(p_pay_info, '$.bank_account')),
        JSON_UNQUOTE(JSON_EXTRACT(p_pay_info, '$.pay_name')),
        JSON_UNQUOTE(JSON_EXTRACT(p_pay_info, '$.pay_price'));
END$$

DELIMITER ;


-- 완료 및 전달
-- isAccept가 1인 order_id로 지정된 주문을 isAccept==3으로 

DELIMITER $$

CREATE PROCEDURE completeOrder(
    IN p_order_id BIGINT
)
BEGIN
    UPDATE OrderTable
    SET is_accept = 3
    WHERE order_id = p_order_id AND is_accept = 1;
END$$

DELIMITER ;


-- 매출 복사
-- 주문의 데이터 중 isAccept가 3인 데이터를 주문과 연결된 ITEM과 결합한 후 매출로 복사
-- 주문에 속한 item을 total의 items에 '대표음식 외 n건'으로 표시
-- Date는 yyyy-mm-dd hh-mm까지
-- 가격은 주문에 속한 item의 종류와 개수에 따라 결정
-- 매출 복사 후 isAccept가 3인 모든 주문과 그 주문과 연결된 item의 데이터 삭제

DELIMITER $$

CREATE PROCEDURE copySales()
BEGIN
    DECLARE v_items VARCHAR(200);

    -- Copy sales to Total
    INSERT INTO Total (items, date, price)
    SELECT 
        CASE 
            WHEN COUNT(i.menu_id) > 1 THEN CONCAT(MAX(m.menu_name), ' 외 ', COUNT(i.menu_id) - 1, '건')
            ELSE MAX(m.menu_name)
        END AS items,
        DATE_FORMAT(o.date, '%Y-%m-%d %H:%i') AS date,
        SUM(m.price * i.count) AS price
    FROM 
        OrderTable o
        JOIN Item i ON o.order_id = i.order_id
        JOIN Menu m ON i.menu_id = m.menu_id
    WHERE 
        o.is_accept = 3
    GROUP BY 
        o.order_id, o.date;

    -- Create a temporary table to store order_ids with is_accept = 3
    CREATE TEMPORARY TABLE temp_orders AS
    SELECT order_id FROM OrderTable WHERE is_accept = 3;

    -- Delete items using the temporary table
    DELETE FROM Item WHERE order_id IN (SELECT order_id FROM temp_orders);

    -- Delete orders using the temporary table
    DELETE FROM OrderTable WHERE order_id IN (SELECT order_id FROM temp_orders);

    -- Drop the temporary table
    DROP TEMPORARY TABLE temp_orders;
END$$

DELIMITER ;



