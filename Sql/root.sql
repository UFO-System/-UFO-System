-- 사용자가 정의된 호스트 확인
SELECT user, host FROM mysql.user WHERE user='OrderSystem';

-- 사용자 삭제
DROP USER IF EXISTS 'OrderSystem'@'localhost';
DROP USER IF EXISTS 'OrderSystem'@'127.0.0.1';
DROP USER IF EXISTS 'OrderSystem'@'%';

-- 모든 호스트에서 접근 가능하도록 사용자 재생성
CREATE USER 'OrderSystem'@'%' IDENTIFIED WITH mysql_native_password BY 'order123';
GRANT ALL PRIVILEGES ON *.* TO 'OrderSystem'@'%';
FLUSH PRIVILEGES;

-- 특정 호스트에서 접근 필요 시 사용자 생성 예시 (필요한 경우 사용)
-- CREATE USER 'OrderSystem'@'localhost' IDENTIFIED WITH mysql_native_password BY 'order123';
-- GRANT ALL PRIVILEGES ON *.* TO 'OrderSystem'@'localhost';
-- FLUSH PRIVILEGES;

SELECT Host,User,plugin,authentication_string FROM mysql.user;