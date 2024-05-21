-- UpdateAdminInfo 호출 예제
CALL UpdateAdminInfo(
    "admin123", 
    "adminpass", -- 현재 비밀번호는 프로시저 내부에서 SHA-256으로 해싱됨
    "newpass123", -- 새로운 비밀번호는 프로시저 내부에서 SHA-256으로 해싱됨
    "New Admin Name", 
    "002", -- 새로운 은행 코드
    REPLACE("352-164018-9999", "-", ""), -- 새로운 계좌 번호 (하이픈 제거)
    REPLACE("010-9999-9999", "-", ""), -- 새로운 전화번호 (하이픈 제거)
    @status_message
);
SELECT @status_message;

-- 확인을 위한 관리자 정보 조회
SELECT * FROM Admin;
