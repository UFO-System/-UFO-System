import React, { useState } from "react";
import UserInfoForm from "../commons/UserForm/UserInfoForm";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUserValidation from "../commons/UserForm/useUserValidation";

export default function MyPage() {
  const [editState, setEditState] = useState(false);
  const [isMyPage] = useState(true);
  const [pwCheck, setPwCheck] = useState("");
  const navigate = useNavigate();
  const handleBack = () => {
    if (confirm("정보수정을 취소하시겠습니까?")) {
      navigate(-1);
    }
  };
  //수정모드에서 수정버튼 클릭시
  const Edit = () => {
    setEditState(!editState);
  };
  const { handleChange, handleSubmit, userData, errors } = useUserValidation();
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
