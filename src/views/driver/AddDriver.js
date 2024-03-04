import React,{useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CFormFeedback,
  CFormSelect,
  CRow,
  CAlert,
  CSpinner
} from '@coreui/react'
import {API_URL} from  '../../components/Constants'

const AddDriver = () => {

  const [disabledBtn,SetDisabledBtn]= useState(false);
  const [spinner,setSpinner]= useState(false);
  const [error, seterror] = useState('');
  const [errormessage, seterrormessge] = useState('');
  const [SuccessMessage, SetSuccessMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [FirstName,SetFirstName] = useState('');
  const [LastName,SetLastName] = useState('');
  const [UserName,SetUserName] = useState('');
  const [Email,SetEmail] = useState('');
  const [PhoneNo,SetPhoneNo] = useState('');
  const [Password,SetPassword] = useState('');
  const [ConfirmPassword,SetConfirmPassword] = useState('');
  const [Address,SetAddress] = useState('');
  


  const beforeSend = (check)=>{
    if(check){
      SetDisabledBtn(true);
      setSpinner(true);
    }else{
      SetDisabledBtn(false);
      setSpinner(false);
    }
  }
  
  const handlesubmit = ()=>{
    
    if(!FirstName || !LastName  || !UserName || !Email || !PhoneNo || !Password || !ConfirmPassword || !Address
    ) //
     {
        seterror(true);
        seterrormessge('All (*) Fields are Required!');
        setTimeout(() => {
        seterror(false);
        }, 2000);
        return false;
     }
     else
     if(Password!=ConfirmPassword)
     {
        seterror(true);
        seterrormessge('Password & Confirm Password Should Be Same!');
        setTimeout(() => {
        seterror(false);
        }, 2000);
        return false;
     }
      let feildsData = 
      {
          FirstName,
          LastName,
          UserName,
          Email,
          PhoneNo,
          Password,
          Address
      };
  
             beforeSend(true);
            
             fetch(API_URL+"/driver_register",
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
                      SetUserName('');
                      SetEmail('');
                      SetPhoneNo('');
                      SetPassword('');
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
  const handleUserName = (event) => {
    // Remove spaces from the input value
    const value = event.target.value.replace(/\s/g, '');
    SetUserName(value);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Driver</strong>
          </CCardHeader>
          <CCardBody>
         
              <CForm>
              <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">First name <span className='mnd'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="dsadsad"
                    placeholder="Jhon"
                    onChange={(e)=>SetFirstName(e.target.value)}
                    required
                  />
                </div>
               
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Last Name <span className='mnd'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="dadsad"
                    placeholder="Doe"
                    onChange={(e)=>SetLastName(e.target.value)}
                  />
                </div>
               
                <div className="mb-3">
                  {/* <CFormLabel htmlFor="exampleFormControlInput1">UserName</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormsst1"
                    placeholder="@jhondoe"
                  /> */}
                    <CCol md={12}>
                      <CFormLabel htmlFor="validationCustomUsername">Username <span className='mnd'>*</span></CFormLabel>
                      <CInputGroup className="has-validation">
                      <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
                        <CFormInput
                          type="text"
                          id="validationCustomUsername"
                          defaultValue=""
                          aria-describedby="inputGroupPrepend"
                          required
                          onChange={handleUserName}
                          maxLength={15}
                          value={UserName}
                        />
                      <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                      </CInputGroup>
                    </CCol>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Email <span className='mnd'>*</span></CFormLabel>
                  <CFormInput
                    type="email"
                    id="dadsad"
                    value={Email}
                    placeholder="jhondoe@yahoo.com"
                    onChange={(e)=>SetEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Phone No <span className='mnd'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="dsadas"
                    placeholder="03032221122"
                    value={PhoneNo}
                    onChange={(e)=>SetPhoneNo(e.target.value)}
                  />
                </div>
            
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Password <span className='mnd'>*</span></CFormLabel>
                  <CFormInput
                    type="password"
                    id="exampleFormsst1"
                    placeholder="********"
                    autoComplete={false}
                    onChange={(e)=>SetPassword(e.target.value)}
                  />
                </div>
               
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Confirm Password <span className='mnd'>*</span></CFormLabel>
                  <CFormInput
                    type="password"
                    id="dsadsad"
                    placeholder="********"
                    autoComplete={false}
                    onChange={(e)=>SetConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Address <span className='mnd'>*</span></CFormLabel>
                  <CFormTextarea id="exampleFormControlTextarea1" rows="3"
                   onChange={(e)=>SetAddress(e.target.value)}></CFormTextarea>
                </div>
                <div className="col-auto">
                  <CButton type="button" className="mb-3" onClick={handlesubmit}  disabled={disabledBtn}>
                  {
                        (spinner) ?  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : ''
                  }
                    Save Now
                  </CButton>
                  {(success) ? 
                       <CAlert color="success" >{SuccessMessage}</CAlert> : ''
                    }
                    {(error) ? 
                      <CAlert color="danger">{errormessage}</CAlert> : ''
                    }
                </div>
              </CForm>

          
          </CCardBody>
        </CCard>
      </CCol>
      
    </CRow>
  )
}

export default AddDriver
