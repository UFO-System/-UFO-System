-- insertPayInfo 호출 예제
CALL insertPayInfo(
    '{"bank": "001", "bank_account": "3521640184543", "pay_name": "홍길동", "pay_price": 30000}'
);

-- 확인을 위한 결제 정보 조회
SELECT * FROM PayInfo;
