import { useState, useCallback } from "react";

function useUserValidation() {
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

  const validate = useCallback(() => {
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
  }, [userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("수정되었습니다.");
    } else {
      alert("정보를 확인해주세요.");
    }
  };

  return {
    handleChange,
    handleSubmit,
    userData,
    errors,
  };
}

export default useUserValidation;
