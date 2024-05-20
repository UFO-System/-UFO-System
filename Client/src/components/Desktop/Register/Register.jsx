import React, { useCallback, useState } from "react";
import UserInfoForm from "../commons/UserForm/UserInfoForm";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    userName: "",
    account: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    id: false,
    pw: false,
    pwCheck: false,
    userName: false,
    account: false,
    phoneNumber: false,
  });
  const validate = () => {
    let newErrors = {
      id: userData.id === "",
      pw: userData.pw === "",
      pwCheck: userData.pwCheck !== userData.pw,
      userName: userData.userName === "",
      account: userData.account === "",
      phoneNumber: userData.phoneNumber.length !== 11,
    };

    setErrors(newErrors);
    // 에러가 하나라도 있는지 검사
    return !Object.values(newErrors).some((error) => error);
  };

  const [pwCheck, setPwCheck] = useState("");

  const navigate = useNavigate();

  const handleBack = () => {
    if (confirm("회원가입을 취소하시겠습니까?")) {
      navigate(-1);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
  };

  // 회원가입 버튼
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirm("회원가입 하시겠습니까?")) {
      if (validate()) {
        console.log(userData);
        //서버 통신

        alert("회원가입 되었습니다.");
        navigate(-1);
      } else {
        alert("정보를 확인해주세요.");
      }
    }
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
        onClick={(e) => handleSubmit(e)}
      >
        회원가입
      </Button>
    </div>
  );
}
