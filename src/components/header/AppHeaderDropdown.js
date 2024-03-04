import React, { useState,useEffect } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {Link } from 'react-router-dom'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const[FullName,SetFullName] = useState('');
 
  useEffect(()=>{
    
    const login_data = localStorage.getItem('login_data');
    if(login_data)
    {
        const loginData = JSON.parse(login_data);
        console.log(loginData);
        let userID = loginData._____u_i;
        let userType = loginData._____y_t;
        let full_name = loginData.full_name;

        SetFullName(full_name);
        // console.log(userType);
        // SetUserTypeState(userType);
    }
   
    //alert('hhhhhh')

 },[])
 const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
  return (
    <CDropdown variant="nav-item">
    
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {(FullName) ? 
        <CDropdownHeader className="bg-light fw-semibold py-2">Welcome:{capitalizeFirstLetter(FullName)}</CDropdownHeader>
        :''}
        
        
          <Link to="profile/editprofile">
            <CDropdownItem href="javascript:void(0);">
            
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
          </Link>
        {/* <CDropdownItem href="javascript:void(0);">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <Link to="/logout">
        <CDropdownItem href="#">
          
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
        </Link>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
