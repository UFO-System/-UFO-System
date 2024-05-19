import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  // 쿠키에 사용자 정보가 있는지 확인
  const [, setCookie] = useCookies(["user"]);
  //비밀번호 focus blur

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  //입력한 로그인 정보가 맞는지 서버와 통신
  const loginCheck = () => {
    {
      switch (true) {
        case id == "" && pw == "":
          alert("로그인 정보를 입력해주세요");
          return;
        case id == "":
          alert("아이디를 입력해 주세요");
          return;
        case pw == "":
          alert("비밀번호를 입력해 주세요");
          return;
        default:
          console.log("전송"); //전송
          setCookie("user", { id });
          navigate("/Main");
          return;
      }
    }
  };
  return (
    <>
      <table
        style={{
          margin: "auto",
          height: "90vh",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <thead>
          <tr>
            <th style={{ verticalAlign: "center" }}>
              <Paper
                elevation={3}
                sx={{
                  maxWidth: "500px",
                  padding: "10px",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h4">로그인</Typography>
                  <br />
                  <Typography variant="h6" style={{ color: "red" }}>
                    ※ 관리자가 아닐 시 이전 화면으로 돌아가주세요.
                  </Typography>
                </Box>
                <br />
                <Box style={{ padding: "10px" }}>
                  <TextField
                    id="id"
                    label="아이디"
                    variant="outlined"
                    onChange={(e) => setId(e.target.value)}
                    fullWidth
                    value={id}
                    style={{ marginBottom: "10px" }}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    id="pw"
                    label="비밀번호"
                    variant="outlined"
                    onChange={(e) => setPw(e.target.value)}
                    fullWidth
                    value={pw}
                    style={{ marginBottom: "20px" }}
                    type={showPassword ? "text" : "password"}
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
                </Box>
                <Box style={{ padding: "0px 10px 10px 10px" }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={loginCheck}
                  >
                    로그인
                  </Button>
                </Box>
              </Paper>
              <br />
              <Button
                variant="text"
                style={{ marginTop: "10px" }}
                onClick={() => navigate("/Register")}
              >
                <u>회원가입</u>
              </Button>
            </th>
          </tr>
        </thead>
      </table>
    </>
  );
};

export default Login;
