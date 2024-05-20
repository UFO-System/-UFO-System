import React, { useState } from "react";
import UserInfoForm from "../commons/UserForm/UserInfoForm";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const [editState, setEditState] = useState(false);
  const [isMyPage] = useState(true);
  const [pwCheck, setPwCheck] = useState("");
  const navigate = useNavigate();

  //기본 정보 통신으로 받아와야함
  const [userData, setUserData] = useState({
    id: "홍길동",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("수정되었습니다.");
      console.log(userData);
      navigate("/OrderManage");
    } else {
      alert("정보를 확인해주세요.");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
  };

  const handleBack = () => {
    if (confirm("정보수정을 취소하시겠습니까?")) {
      navigate("/OrderManage");
    }
  };
  //수정모드에서 수정버튼 클릭시
  const Edit = () => {
    setEditState(!editState);
  };
  return (
    <div>
      <Button
        size="small"
        variant="contained"
        onClick={() => handleBack()}
        sx={{ marginBottom: "10px" }}
      >
        뒤로가기
      </Button>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        {editState ? (
          ""
        ) : (
          <Button
            variant="contained"
            sx={{ float: "right" }}
            onClick={() => Edit()}
          >
            수정하기
          </Button>
        )}
        <br />
        <br />
      </div>
      <UserInfoForm
        isMyPage={isMyPage}
        editState={editState}
        setEditState={setEditState}
        errors={errors}
        handleChange={handleChange}
        userData={userData}
        pwCheck={pwCheck}
        setPwCheck={setPwCheck}
      />

      {editState ? (
        <Box
          sx={{
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ marginBottom: "10px", marginTop: "20px" }}
            onClick={handleSubmit}
          >
            수정하기
          </Button>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ marginBottom: "10px", marginTop: "10px" }}
            color="inherit"
          >
            취소하기
          </Button>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
}
