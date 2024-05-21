-- acceptOrder 호출 예제
CALL acceptOrder(
    1, -- 수락할 주문 ID (예시로 1번 주문)
    @result -- 결과를 OUT 파라미터로 받음
);
SELECT @result;

-- rejectOrder 호출 예제
CALL rejectOrder(
    1 -- 거절할 주문 ID (예시로 1번 주문)
);

-- 확인을 위한 주문 상태 조회
SELECT * FROM OrderTable;
