-- RegisterAdmin 호출 예제
CALL RegisterAdmin(
    "admin123", 
    "adminpass", -- 비밀번호는 프로시저 내부에서 SHA-256으로 해싱됨
    "Admin Name", 
    "001", -- 은행 코드
    REPLACE("352-164018-4543", "-", ""), -- 하이픈 제거
    REPLACE("010-8968-3795", "-", ""), -- 하이픈 제거
    @status_message
);
SELECT @status_message;

-- 확인을 위한 관리자 정보 조회
SELECT * FROM Admin;

-- Login 호출 예제
CALL Login(
    "admin123", 
    "adminpass", -- 비밀번호는 프로시저 내부에서 SHA-256으로 해싱됨
    @status_message
);
SELECT @status_message;

-- 로그인 시 ID가 없는 경우
CALL Login(
    "nonexistent_id", 
    "adminpass", -- 비밀번호는 프로시저 내부에서 SHA-256으로 해싱됨
    @status_message
);
SELECT @status_message;

-- 로그인 시 비밀 번호가 맞지 않는 경우
CALL Login(
    "admin123", 
    "wrongpassword", -- 비밀번호는 프로시저 내부에서 SHA-256으로 해싱됨
    @status_message
);
SELECT @status_message;