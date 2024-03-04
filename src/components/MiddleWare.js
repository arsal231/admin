//import {useNavigate  } from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types';
const MiddleWare = (props)=>{
  
    //const navigate = useNavigate(); 
    // var userId ='';
    // if(localStorage.getItem('user-info'))
    // {
    //   let LoggedInUser = JSON.parse(localStorage.getItem('user-info'));
    //    userId = LoggedInUser.id;
    // }
    let userID = '';
    const login_data = localStorage.getItem('login_data');
    if(login_data)
    {
          const loginData = JSON.parse(login_data);
          console.log(loginData);
          userID = loginData._____u_i;
          let userType = loginData._____y_t;
          console.log(userType);
        //SetUserTypeState(userType);
        console.log(userID);
    }
  
    
  
    return (
     <>
    
        {
         (!userID) ? 'Not Authourized to Access!' : props.cmp
         
        }
            
        
        
     </>
    )

}
MiddleWare.propTypes = {
  cmp: PropTypes.element.isRequired
};
export default MiddleWare;