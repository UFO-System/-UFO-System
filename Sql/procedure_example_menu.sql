-- InsertMenu 호출 예제
CALL InsertMenu(
    "admin123", 
    "스파게티", 
    12000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "피자", 
    15000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "족발", 
    19000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "치킨", 
    23000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "치킨1", 
    23000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "치킨2", 
    23000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "치킨3", 
    23000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "치킨4", 
    23000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "치킨5", 
    23000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "치킨6", 
    23000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "치킨7", 
    23000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "admin123", 
    "치킨8", 
    23000, 
    @status_message
);
SELECT @status_message;

-- 확인을 위한 메뉴 정보 조회
SELECT * FROM Menu;

-- DeleteMenu 호출 예제
CALL DeleteMenu(
    "admin123", 
    1, -- 삭제할 menu_id (예시로 1번 메뉴 삭제)
    @status_message
);
SELECT @status_message;

CALL DeleteMenu(
    "admin123", 
    2, -- 삭제할 menu_id (예시로 2번 메뉴 삭제)
    @status_message
);
SELECT @status_message;

-- 확인을 위한 메뉴 정보 조회
SELECT * FROM Menu;


