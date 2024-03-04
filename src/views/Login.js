import React,{useState,useEffect} from 'react'
import { Link , useNavigate  } from 'react-router-dom'
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
  CAlert,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import {API_URL} from  '../components/Constants'
const Login = () => {
  const navigate = useNavigate();
  const [disabledBtn,SetDisabledBtn]= useState(false);
  const [spinner,setSpinner]= useState(false);
  const [error, seterror] = useState('');
  const [errormessage, seterrormessge] = useState('');
  const [SuccessMessage, SetSuccessMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [UserName,SetUserName] = useState('');
  const [Password,SetPassword] = useState('');


  useEffect(()=>{
    
    if(localStorage.getItem('login_data'))
    {
       navigate('/dashboard')
    }
  },[])
  const Redirect=()=>{
    
    navigate('/forgot')

  }
  

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
        {   UserName,
            Password,
        };
  
             beforeSend(true);
           
             fetch(API_URL+"/login",
             {
             method:'POST',
             headers:
             {'Content-type':'application/json',
              'Accept':'application/json',
             },
               body:JSON.stringify(feildsData)
               
             })
             .then((result)=>{
                
                 result.json().then((response)=>
                 {
                //  console.log(response);
                 
                   if(response.status==200)
                   {
                      localStorage.setItem('login_data', JSON.stringify(response.data));
                      const login_data = localStorage.getItem('login_data');
                      if (login_data) 
                      {
                        const loginData = JSON.parse(login_data);
                        //console.log(loginData); 
                        //console.log(loginData._____u_i);
                      }



                      SetSuccessMessage(response.message);
                      setSuccess(true);

                      setTimeout(() => {
                        setSuccess(false);
                      }, 2000);

                      setTimeout(() => {
                        navigate('/dashboard');
                      }, 2000);

                          //beforeSend(false);
                   }
                   else
                   if(response.status==301)
                   {
                    beforeSend(false);
                     //seterrormessge(response.message);
                     seterror(true);
                     seterrormessge(response.message);
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
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    {(success) ? 
                          <CAlert color="success" >{SuccessMessage}</CAlert> : ''
                          }
                          {(error) ? 
                          <CAlert color="danger">{errormessage}</CAlert> : ''
                          }
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username"  value={UserName} onChange={(e)=>SetUserName(e.target.value)}/>
                     
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={Password}
                        
                        onChange={(e)=>SetPassword(e.target.value)}
                      />
                      
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                      <CButton type="button" className="mb-3" onClick={handlesubmit}  disabled={disabledBtn}>
                            {
                              (spinner) ?  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : ''
                            }
                          &nbsp;Login
                        </CButton>
                          
                      </CCol>
                      <CCol xs={6} className="text-right">
                      {/* onClick={()=>handleButtonClick('/forgot')} */}
                        <CButton color="link" className="px-0"   onClick={Redirect} >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white  py-5" style={{ width: '44%', background: '#FFB300' }}>
                
                <CCardBody className="text-center">
                  <div>
                    <h2>Book a Ride with Us</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                     <Link to="/#">
                      <CButton color="" className="mt-3" active tabIndex={-1} style={{ border:'1px solid #fff',color:'#fff'}}>
                        Book a Ride Now
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
