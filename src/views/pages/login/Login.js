import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlertd
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  
  const [disabledBtn,SetDisabledBtn]= useState(false);
  const [spinner,setSpinner]= useState(false);
  const [error, seterror] = useState('');
  const [errormessage, seterrormessge] = useState('');
  const [SuccessMessage, SetSuccessMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [UserName,SetUserName] = useState('');
  const [Password,SetPassword] = useState('');
  const handlesubmit = ()=>{
    
    if(!UserName || !Password 
    ) //
     {
        seterror(true);
        seterrormessge('Please Enter the UserName/Password!');
        setTimeout(() => {
        seterror(false);
        }, 2000);
        return false;
     }
    
        let feildsData = 
        {
            
            UserName,
            Password,
          
        };
  
             beforeSend(true);
            
             fetch("http://localhost:4500/login",
             {
             method:'POST',
             headers:
             {'Content-type':'application/json',
              'Accept':'application/json',
             },
               body:JSON.stringify(feildsData)
               
             })
             .then((result)=>{
                beforeSend(false);
                 result.json().then((response)=>
                 {
                   //console.log(response);
                   //console.log(response.status);
                   if(response.status==200)
                   {
                    
                    SetSuccessMessage(response.message);
                      setSuccess(true);
                     
                     setTimeout(() => {
                       setSuccess(false);
                     }, 2000);
                   }
                   if(response.status==301)
                   {
                     seterrormessge(response.message);
                     seterror(true);
                     seterrormessge(response.error);
                     setTimeout(() => {
                       seterror(false);
                       seterrormessge('');
                     }, 3000);
                   }
                 })
             
             })
   }
  const beforeSend = (check)=>{
    if(check){
      SetDisabledBtn(true);
      setSpinner(true);
    }else{
      SetDisabledBtn(false);
      setSpinner(false);
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login dsdsa</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                      <CButton type="button" className="mb-3" onClick={handlesubmit}  disabled={disabledBtn}>
                            {
                              (spinner) ?  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : ''
                            }
                          Login
                        </CButton>
                          {(success) ? 
                          <CAlert color="success" >{SuccessMessage}</CAlert> : ''
                          }
                          {(error) ? 
                          <CAlert color="danger">{errormessage}</CAlert> : ''
                          }
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
