-- completeOrder 호출 예제
CALL completeOrder(1); -- 예시로 order_id가 1인 주문을 완료 상태로 변경

-- 변경된 주문 확인
SELECT * FROM OrderTable;

-- copySales 호출 예제
CALL copySales();

-- 확인을 위한 매출 정보 조회
SELECT * FROM Total;
