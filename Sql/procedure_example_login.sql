-- Login Procedure Example
SET @p_admin_id = 'admin123';
SET @p_pwd = 'hashed_password';  -- 이미 해시된 비밀번호
SET @p_status_message = '';

CALL Login(@p_admin_id, @p_pwd, @p_status_message);
SELECT @p_status_message;

-- UpdateAdminInfo Procedure Example
SET @p_admin_id = 'admin123';
SET @p_old_pwd = 'hashed_password';  -- 이미 해시된 현재 비밀번호
SET @p_new_pwd = 'hashed_password';  -- 이미 해시된 새로운 비밀번호
SET @p_new_name = 'New Admin Name';
SET @p_new_bank = 'New Bank';
SET @p_new_back_account = 'New Back Account';
SET @p_new_phone = 'New Phone Number';
SET @p_new_member = 'New Member Info';
SET @p_status_message = '';

CALL UpdateAdminInfo(
    @p_admin_id, 
    @p_old_pwd, 
    @p_new_pwd, 
    @p_new_name, 
    @p_new_bank, 
    @p_new_back_account, 
    @p_new_phone, 
    @p_new_member, 
    @p_status_message
);
SELECT @p_status_message;

-- RegisterAdmin Procedure Example
SET @p_admin_id = 'admin123';
SET @p_pwd = 'hashed_password';  -- 이미 해시된 비밀번호
SET @p_admin_name = 'New Admin Name';
SET @p_bank = 'Bank Name';
SET @p_back_account = 'Back Account';
SET @p_phone = 'Phone Number';
SET @p_member = 'Member Info';
SET @p_status_message = '';

CALL RegisterAdmin(
    @p_admin_id, 
    @p_pwd, 
    @p_admin_name, 
    @p_bank, 
    @p_back_account, 
    @p_phone, 
    @p_member, 
    @p_status_message
);
SELECT @p_status_message;

select * from admin;
