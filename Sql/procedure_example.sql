-- RegisterAdmin 호출 예제
CALL RegisterAdmin(
    "rtunu12", 
    SHA2("asd123", 256), -- 비밀번호를 SHA-256으로 해싱하여 전달
    "소웨주점", 
    "001", -- 예: 농협 은행 코드로 변환
    REPLACE("352-164018-4543", "-", ""), -- 하이픈 제거
    REPLACE("010-8968-3795", "-", ""), -- 하이픈 제거
    @status_message
);
SELECT @status_message;

select * from admin;

-- Login 호출 예제
CALL Login(
    "rtunu12", 
    SHA2("fbxodnd123", 256), -- 비밀번호를 SHA-256으로 해싱하여 전달
    @status_message
);
SELECT @status_message;

-- 로그인 시 ID가 없는 경우
CALL Login(
    "ㅁㄴㅇ", 
    SHA2("asd123", 256), -- 비밀번호를 SHA-256으로 해싱하여 전달
    @status_message
);
SELECT @status_message;

-- 로그인 시 비밀 번호가 맞지 않는 경우
CALL Login(
    "rtunu12", 
    SHA2("111112ㄴ", 256), -- 비밀번호를 SHA-256으로 해싱하여 전달
    @status_message
);
SELECT @status_message;

-- UpdateAdminInfo 호출 예제
CALL UpdateAdminInfo(
    "rtunu12", 
    SHA2("asd123", 256), -- 현재 비밀번호를 SHA-256으로 해싱하여 전달
    SHA2("fbxodnd123", 256), -- 새로운 비밀번호를 SHA-256으로 해싱하여 전달
    "소웨주점", 
    "001", -- 예: 농협 은행 코드로 변환
    REPLACE("352-164018-4543", "-", ""), -- 하이픈 제거
    REPLACE("010-8968-3795", "-", ""), -- 하이픈 제거
    @status_message
);
SELECT @status_message;

SELECT * FROM ADMIN;

-- InsertMenu 호출 예제
CALL InsertMenu(
    "rtunu12", 
    "Spaghetti", 
    12000, 
    @status_message
);
SELECT @status_message;

CALL InsertMenu(
    "rtunu12", 
    "Pizza", 
    15000, 
    @status_message
);
SELECT @status_message;

SELECT * FROM MENU;

-- DeleteMenu 호출 예제
CALL DeleteMenu(
    "rtunu12", 
    3, -- 삭제할 menu_id
    @status_message
);
SELECT @status_message;

CALL DeleteMenu(
    "rtunu12", 
    4, -- 삭제할 menu_id
    @status_message
);
SELECT @status_message;
