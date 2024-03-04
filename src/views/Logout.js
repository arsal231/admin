import React,{useState,useEffect} from 'react'
import { Link , useNavigate  } from 'react-router-dom'


const Logout = () => {
  const navigate = useNavigate();
 

  useEffect(()=>{
     
       const loginData =  localStorage.getItem('login_data');
        if(loginData)
        {
          localStorage.removeItem('login_data');
          navigate('/login');
        }
   },[])
  // const handleButtonClick = (path) => {
  //   navigate(path);
  // }; //forgot
  

  // const handleLogin = ()=>{
  //   alert('ye i am clicked');
  //   alert('email '+email);
  //   alert('password '+ password);
  // }

 
  return (
     <>
      <p style={{padding:'50px 0px 0px 40%'}}>Page Expire!!!!!<a href="javascript:void(0);" onClick={()=>navigate('/login')}>Logout</a></p>
     </>  
  ) 
}

export default Logout
