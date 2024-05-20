DROP PROCEDURE IF EXISTS AddMenu;
DROP PROCEDURE IF EXISTS Login;
DROP PROCEDURE IF EXISTS AddOrderWithItemsAndPayment;

-- 로그인
-- : 사용자 조회 -> 비밀번호 검수(암호화)

-- 정보 변경
-- : 비밀번호 -> 같은 비밀번호인지 검수
-- : 정보 수정한 것을 update

-- 회원 가입
-- : 아이디가 있는지 조회 -> 없으면 가능
-- : 정보 입력한 것을 insert

-- 주문
-- : 사용자가 먼저 주문 시
-- 1. 주문과 아이템을 받아옴 (아이템은 JSON)
-- 2. isAccept는 2로 처리

-- 주문 수락/거절
-- 1. 서버로부터 결제해야할 입금 금액과 임금자명이 DB로 옴 (파라미터)
-- 2. 현재 isAccept가 2인 애들을 select
-- 3. 버튼에 따라(파라미터) isAccept 수정

-- 입금 내역 검색
-- 1. 입금자명과 입금 금액에 따라 PayInfo select

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