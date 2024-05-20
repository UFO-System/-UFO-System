import React from 'react'
import AppBar from '@mui/material/AppBar';
import OrderPage1 from './OrderPage1';
import Container from '@mui/material/Container';
import {useLocation, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import "./css/OrderPage.css"

const OrderPage2 = () => {
  
  const location = useLocation();
  console.log(location);
  const total= location.state.total; // 총가격
  const name = location.state.name // 로고 이름
  const value1 = location.state.value1 // 입금자 명
  const value2 = location.state.value2 // 테이블 넘버

  const number = ' 농협 12345678900000'
  const navigate =useNavigate();
  return (
    
    <div className='app'>
      <AppBar position="static">
      <h4 className='name'>{name}</h4>
      </AppBar>
      <div className='menu'>
        <p> 입금자 명: {value1}</p>
        <p> 테이블: {value2}</p>
        <p> 총 가격: {total} 원</p>
        <p> 계좌번호: {number}</p>
      </div>
      <div style={{position: "fixed", bottom: 0 ,width: "100%"}}>
      <AppBar position="static" 
      style={{height:'80px', paddingTop:'15px', display:'flex'}}>
      <center>
      <Button className='orderBt' 
      style={{color: 'white', boxShadow:'1px 1px 5px black', background : 'red', margin:'5px'}}
      onClick={()=>{
        if(window.confirm('주문을 취소 하시겠습니까?')){
          navigate(-1)
        }
        else{
          //아니요
        }
      }}>
      주문취소</Button>
      <Button className='orderBt' 
      style={{color: 'white', boxShadow:'1px 1px 5px black'}}
      onClick={()=>{navigate(-1)}}>
      주문완료</Button>
      </center>
      </AppBar>
      </div>
    </div>
    
  )
}

export default OrderPage2

