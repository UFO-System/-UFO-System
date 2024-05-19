import React, { useEffect, useState } from "react";

import { isDesktop, isIOS, isMobile, isTablet } from "react-device-detect";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 페이지 로딩 상태를 관리합니다.
  useEffect(() => {
    // 쿠키에 유저 정보가 없으면 로그인 페이지로 이동
    if (!cookie.user) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [cookie.user]);

  useEffect(() => {
    if (isDesktop) {
      navigate("/OrderManage");
    } else if (isIOS || isMobile || isTablet) {
      navigate("/Phone");
    }
  }, []);

  if (loading) {
    return null;
  }

  return <div></div>;
};

export default MainPage;
