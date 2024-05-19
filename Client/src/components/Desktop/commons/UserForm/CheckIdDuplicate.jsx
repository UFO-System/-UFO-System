import { Button } from "@mui/material";
import React from "react";

export default function CheckIdDuplicate({ disabled }) {
  // 중복확인 서버랑
  return (
    <Button variant="contained" size="small" disabled={disabled}>
      중복 확인
    </Button>
  );
}
