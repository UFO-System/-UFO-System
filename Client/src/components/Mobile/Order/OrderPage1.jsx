import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import {useNavigate} from 'react-router-dom'
import { Input as BaseInput } from '@mui/base/Input';
import { styled } from '@mui/system';
import Input from '@mui/material/Input';
import "./css/OrderPage.css"

const OrderPage1 = () => {
  
  
  // 매장 이름
  const name = 'UFO'

  // 메뉴 이름
  const menu1 = '사과'
  const menu2 = '포도'
  const menu3 = '망고'

  // 메뉴 가격
  const price1 = 1000
  const price2 = 2000
  const price3 = 3000

  // 메뉴 수량 더하기
  const [count1, setCount1] = useState(0)
  function plus1(){
    setCount1(count1 + 1)
  }
  const [count2, setCount2] = useState(0)
  function plus2(){
    setCount2(count2 + 1)
  }
  const [count3, setCount3] = useState(0)
  function plus3(){
    setCount3(count3 + 1)
  }

  // 메뉴 수량 빼기
  function minus1(){
    if(count1 == 0){
      count1 == 0
    }else{
      setCount1(count1 - 1)
    }
  }
  function minus2(){
    if(count2 == 0){
      count2 == 0
    }else{
      setCount2(count2 - 1)
    }
  }
  function minus3(){
    if(count3 == 0){
      count3 == 0
    }else{
      setCount3(count3 - 1)
    }
  }
  // 페이지 전환
  const navigate = useNavigate();

  // 입금자 이름 경고창
  const [value1, setValue1] = useState('');
  const [showWarning1, setShowWarning1] = useState(false);
  
  const handleChange1 = (e) => {
  const inputValue1 = e.target.value;
    setValue1(inputValue1);
    // 입력값이 없는 경우에는 경고창을 표시합니다.
    setShowWarning1(inputValue1 === '');
  };

    // 테이블 넘버 경고창
    const [value2, setValue2] = useState('');
    const [showWarning2, setShowWarning2] = useState(false);
    
    const handleChange2 = (e) => {
    const inputValue2 = e.target.value;
      setValue2(inputValue2);
      // 입력값이 없는 경우에는 경고창을 표시합니다.
      setShowWarning2(inputValue2 === '');
    };




  return (
    // 로고 앱바
    <div className='app'>
    <AppBar position="static">
      <h4 className='name'>{name}&nbsp;&nbsp;&nbsp;</h4>
    </AppBar>
    {/* 입금자 명 */}
      <Input 
        className='input'
        placeholder="입금자 이름을 입력하세요."
        type="text"
        value={value1}
        onChange={handleChange1}/>
      {showWarning1 && <p style={{ color: 'red' }}>입금자 이름을 입력해주세요.</p>}
      {/* 테이블 넘버 */}
      <Input 
        className='input'
        placeholder="테이블 넘버를 입력하세요."
        type="text"
        value={value2}
        onChange={handleChange2}/>
      {showWarning2 && <p style={{ color: 'red' }}>테이블 넘버를 입력해주세요.</p>}
      <hr></hr>
      {/* 음식 메뉴 */}
      <div className='menu'>
        <h5>{menu1} {count1} 개 
        <Button className = 'btn' variant="contained" onClick={minus1} style={{background:'red'}}> - </Button>
        <Button className = 'btn' variant="contained" onClick={plus1}> + </Button></h5>
        <p>{price1} 원</p>
      </div>
      <div className='menu'>
        <h5>{menu2} {count2} 개 
        <Button className = 'btn' variant="contained" onClick={minus2} style={{background:'red'}}> - </Button>
        <Button className = 'btn' variant="contained" onClick={plus2}> + </Button></h5>
        <p>{price2} 원</p>
      </div>
      <div className='menu'>
        <h5>{menu3} {count3} 개 
        <Button className = 'btn' variant="contained" onClick={minus3} style={{background:'red'}}> - </Button>
        <Button className = 'btn' variant="contained" onClick={plus3}> + </Button></h5>
        <p>{price3} 원</p>
      </div>
      {/* 음식 수량, 금액 계산 */}
      <div style={{position: "fixed", bottom: 0 ,width: "100%"}}>
      <div className='bottom'>
        <h4>총 수량: {count1 + count2 + count3}개 | 총 금액: {price1 * count1 + price2 * count2 + price3 * count3}원</h4>
      </div>
      {/* 버튼 이벤트, 화면 전환 */}
      <AppBar position="static" 
      style={{height:'80px', paddingTop:'15px', display:'flex'}}>
      <center>
      <Button className='orderBt' onClick={()=>{
      if (value1 === '') { // 입금자 명을 입력 안 했을 경우
        alert('입금자 이름을 입력해주세요');  
      } else {
          if (value2 === ''){ // 테이블 넘버를 입력 안 했을 경우
            alert('테이블 넘버를 입력해주세요.')
          }else{
            if (window.confirm('주문하시겠습니까?')) {
              // 사용자가 '예'를 선택한 경우 실행할 코드
              console.log('입력값:', value1);
              {navigate('/OrderPage2', 
              {state:{total : price1 * count1 + price2 * count2 + price3 * count3, name : name, value1 : value1 , value2 : value2}}
              )}
            } else {
              // 사용자가 '아니요'를 선택한 경우 실행할 코드
            }}
          }}}
      style={{color: 'white', boxShadow:'1px 1px 5px black'}}> 
      주문하기</Button>
      </center>
      </AppBar>
      </div>
      </div> 
  )
}
export default OrderPage1;