import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logoimg from '../assets/images/logo-light.png'
import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import {  useNavigate  } from 'react-router-dom'
// sidebar nav config
import navigation from '../_nav'
import navigationpartner from '../_navpartner' // navigation Partner


const AppSidebar = () => {

  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const[usertypestate ,SetUserTypeState] = useState('');
  const navigate = useNavigate();
 useEffect(()=>{
     
    if(! localStorage.getItem('login_data'))
    {
       navigate('/login')
    }

    const login_data = localStorage.getItem('login_data');
    if(login_data)
    {
        const loginData = JSON.parse(login_data);
        //console.log(loginData);
        let userID = loginData._____u_i;
        let userType = loginData._____y_t;
       
        SetUserTypeState(userType);
    }
   
    //alert('hhhhhh')

 },[])
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    > 
      <CSidebarBrand className="d-none d-md-flex" to="/">
       
        <CIcon className="sidebar-brand-full"  height={35} />
        <img src={logoimg}  width={150} height={50} style={{margin:"0px 60px 0px 0px"}}/>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar> 
          <AppSidebarNav items={(usertypestate==1 ?  navigation  :  navigationpartner )}/>
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
