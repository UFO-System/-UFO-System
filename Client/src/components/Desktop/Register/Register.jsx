import React, { useState } from "react";
import UserInfoForm from "../commons/UserForm/UserInfoForm";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUserValidation from "../commons/UserForm/useUserValidation";

export default function Register() {
  const [pwCheck, setPwCheck] = useState("");

  const navigate = useNavigate();
  const { handleChange, handleSubmit, userData, errors } = useUserValidation();

  const handleBack = () => {
    if (confirm("회원가입을 취소하시겠습니까?")) {
      navigate(-1);
    }
  };

  // 회원가입 버튼
  const SignUpbtn = (e) => {
    handleSubmit(e);
    // 서버 통신해야함
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        onClick={handleBack}
        sx={{ marginBottom: "10px" }}
      >
        뒤로가기
      </Button>
      <UserInfoForm
        isMyPage={false}
        editState={true}
        errors={errors}
        handleChange={handleChange}
        userData={userData}
        pwCheck={pwCheck}
        setPwCheck={setPwCheck}
      />
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "700px",
        }}
        onClick={(e) => SignUpbtn(e)}
      >
        회원가입
      </Button>
    </div>
  );
}
