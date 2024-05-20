DROP PROCEDURE IF EXISTS Login;
DROP PROCEDURE IF EXISTS UpdateAdminInfo;
DROP PROCEDURE IF EXISTS RegisterAdmin;
DROP PROCEDURE IF EXISTS InsertMenu;
DROP PROCEDURE IF EXISTS DeleteMenu;

-- 로그인
-- : 사용자 조회 -> 비밀번호 검수(암호화)

DELIMITER //

CREATE PROCEDURE Login(
    IN p_admin_id VARCHAR(30), 
    IN p_pwd VARCHAR(64), 
    OUT p_status_message VARCHAR(255)
)
BEGIN
    DECLARE hashed_pwd VARCHAR(64);
    
    -- SHA-256 해싱
    SET hashed_pwd = SHA2(p_pwd, 256);
    
    -- 사용자 조회
    IF EXISTS (SELECT 1 FROM Admin WHERE admin_id = p_admin_id) THEN
        -- 비밀번호 검수
        IF EXISTS (SELECT 1 FROM Admin WHERE admin_id = p_admin_id AND pwd = hashed_pwd) THEN
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
    IN p_new_bank_account VARCHAR(30), 
    IN p_new_phone VARCHAR(30), 
    OUT p_status_message VARCHAR(255)
)
BEGIN
    DECLARE hashed_old_pwd VARCHAR(64);
    DECLARE hashed_new_pwd VARCHAR(64);

    -- SHA-256 해싱
    SET hashed_old_pwd = SHA2(p_old_pwd, 256);
    SET hashed_new_pwd = SHA2(p_new_pwd, 256);
    
    -- 비밀번호 검수 및 정보 수정
    IF EXISTS (SELECT 1 FROM Admin WHERE admin_id = p_admin_id AND pwd = hashed_old_pwd) THEN
        UPDATE Admin
        SET pwd = hashed_new_pwd, admin_name = p_new_name, bank = p_new_bank, back_account = p_new_bank_account, phone = p_new_phone
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
    IN p_bank_account VARCHAR(30), 
    IN p_phone VARCHAR(30), 
    OUT p_status_message VARCHAR(255)
)
BEGIN
    -- SHA-256 해싱
    DECLARE hashed_pwd VARCHAR(64);
    SET hashed_pwd = SHA2(p_pwd, 256);
    
    -- 아이디 중복 확인
    IF NOT EXISTS (SELECT 1 FROM Admin WHERE admin_id = p_admin_id) THEN
        -- 새로운 관리자 추가
        INSERT INTO Admin (admin_id, pwd, admin_name, bank, back_account, phone)
        VALUES (p_admin_id, hashed_pwd, p_admin_name, p_bank, p_bank_account, p_phone);
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

-- 주문
-- : 사용자가 먼저 주문 시
-- 1. 주문과 아이템을 받아옴 (아이템은 JSON)
-- 2. isAccept는 2로 처리

-- 주문 수락/거절
-- 1. 서버로부터 결제해야할 입금 금액과 임금자명이 DB로 옴 (파라미터, 입금 금액은 음식들의 총합으로)
-- 2. 현재 isAccept가 2인 애들을 select
-- 3. 버튼에 따라(파라미터) isAccept 수정

-- 입금 내역 검색
-- 1. 입금자명과 입금 금액에 따라 PayInfo select

-- 수락된 메뉴 표시
-- 1. isAccept가 1인 애들을 select

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