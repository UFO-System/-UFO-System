-- createOrder 호출 예제
CALL createOrder(
    "admin123",
    2, -- 주문 초기 상태는 대기
    CURDATE(), -- 현재 날짜
    1, -- 테이블 번호
    "001", -- 은행 이름
    '[{"menu_id": 1, "count": 2}, {"menu_id": 4, "count": 1}, {"menu_id": 5, "count": 1}, {"menu_id": 6, "count": 1}, {"menu_id": 7, "count": 1}, {"menu_id": 8, "count": 1}, {"menu_id": 9, "count": 1}, {"menu_id": 10, "count": 1}, {"menu_id": 11, "count": 1}, {"menu_id": 12, "count": 1}, {"menu_id": 3, "count": 1}, {"menu_id": 2, "count": 1}]' -- 주문 항목을 JSON 형식으로 전달
);

CALL createOrder(
    "admin123",
    2, -- 주문 초기 상태는 대기
    CURDATE(), -- 현재 날짜
    4, -- 테이블 번호
    "001", -- 은행 이름
    '[{"menu_id": 3, "count": 6}, {"menu_id": 4, "count": 2}, {"menu_id": 5, "count": 2}]' -- 주문 항목을 JSON 형식으로 전달
);

-- 확인을 위한 주문 및 아이템 정보 조회
SELECT * FROM OrderTable;
SELECT * FROM Item;

-- showPendingOrders 호출 예제 (대기 주문 표시)
CALL showPendingOrders();
