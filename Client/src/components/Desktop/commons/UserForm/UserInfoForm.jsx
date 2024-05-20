import { IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CheckIdDuplicate from "./CheckIdDuplicate";

/**
 * 회원가입 및 정보 수정 입력필드
 *
 * @param {boolean} isMyPage //아이디 수정 금지 여부
 */
function UserInfoForm({ isMyPage, editState, errors, handleChange, userData }) {
  //비밀번호 *** 표시,문자표시 변경
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  //개인정보 수정하기 버튼 클릭시

  //textInput 에러 표시

  return (
    <>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <Paper
          sx={{
            margin: "0 auto",
            width: "auto",
            padding: "15px 10px 15px 10px",
          }}
        >
          <table
            style={{
              margin: "auto",
              height: "auto",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <thead>
              <tr style={{ verticalAlign: "center" }}>
                <TextField
                  fullWidth
                  id="id"
                  label="아이디"
                  placeholder="아이디를 입력해주세요"
                  error={errors.id}
                  disabled={isMyPage}
                  variant="standard"
                  value={userData.id}
                  onChange={handleChange}
                  sx={{ marginBottom: "30px", maxWidth: "600px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    endAdornment: isMyPage ? null : (
                      <InputAdornment position="end">
                        <CheckIdDuplicate disabled={isMyPage} />
                      </InputAdornment>
                    ),
                  }}
                />
              </tr>
              <tr style={{ verticalAlign: "center" }}>
                <TextField
                  fullWidth
                  id="pw"
                  label="비밀번호"
                  value={userData.pw}
                  placeholder={(isMyPage ? "변경할 " : "") + "비밀번호"}
                  disabled={!editState}
                  error={errors.pw}
                  variant="standard"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  sx={{ marginBottom: "30px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </tr>
              <tr style={{ verticalAlign: "center" }}>
                <TextField
                  fullWidth
                  id="pwCheck"
                  label="비밀번호 재확인"
                  placeholder="비밀번호 재입력"
                  type={"password"}
                  error={userData.pw != userData.pwCheck}
                  disabled={!editState}
                  helperText={
                    userData.pw != userData.pwCheck
                      ? "비밀번호가 틀립니다."
                      : ""
                  }
                  variant="standard"
                  onChange={handleChange}
                  sx={{ marginBottom: "30px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </tr>
              <tr style={{ verticalAlign: "center" }}>
                <TextField
                  fullWidth
                  id="userName"
                  label="이름"
                  value={userData.userName}
                  variant="standard"
                  disabled={!editState}
                  error={errors.userName}
                  placeholder="이름을 입력해주세요"
                  onChange={handleChange}
                  sx={{ marginBottom: "30px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </tr>
              <tr style={{ verticalAlign: "center" }}>
                <TextField
                  fullWidth
                  id="account"
                  label="계좌"
                  value={userData.account}
                  placeholder="계좌번호를 입력해주세요"
                  disabled={!editState}
                  error={errors.account}
                  variant="standard"
                  sx={{ marginBottom: "30px" }}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBalanceWalletIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </tr>
              <tr style={{ verticalAlign: "center" }}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="전화번호"
                  value={userData.phoneNumber}
                  placeholder="휴대폰 번호 입력('-' 제외 11자리 입력)"
                  disabled={!editState}
                  error={errors.phoneNumber}
                  helperText={
                    errors.phoneNumber ? "전화번호를 다시 확인해주세요" : ""
                  }
                  variant="standard"
                  sx={{ marginBottom: "30px" }}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </tr>
            </thead>
          </table>
        </Paper>
      </div>
    </>
  );
}

export default UserInfoForm;
