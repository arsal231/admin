import React, { useState,useRef  } from 'react'
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

const AddZone = () => {

  const [spinner,setSpinner]= useState(false);
  const [error, seterror] = useState('');
  const [errormessage, seterrormessge] = useState('');
  const [success, setSuccess] = useState(false);
  const [disabledBtn,SetDisabledBtn]= useState(false);
  const [title, SetTitle] = useState('');
  const [area, SetArea] = useState('');


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
    
    if(!title || !area )
     //
     {
        seterror(true);
        seterrormessge('All (*) Fields are Required!');
        setTimeout(() => {
         seterror(false);
       }, 2000);
       return false;
     }
     
      
      
            let feildsData = {title,area};
             beforeSend(true);
            
             fetch(API_URL+"/zone_save",
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
                   console.log(response);
                   console.log(response.status);
                   if(response.status==200)
                   {
                      setSuccess(true);
                     
                     
                   
  
                     setTimeout(() => {
                       setSuccess(false);
                     }, 2000);
                   }
                   if(response.status==301)
                   {
                    
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
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Zone</strong>
          </CCardHeader>
          <CCardBody>
         
              <CForm>
              <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Zone Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="dsadsad"
                    placeholder="Zone A"
                    onChange={(e)=>SetTitle(e.target.value)}
                    required
                  />
                </div>
               
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Zone Area</CFormLabel>
                  <CFormInput
                    type="text"
                    id="ddd"
                    placeholder="South London"
                    onChange={(e)=>SetArea(e.target.value)}
                  />
                </div>
               
               
                <div className="col-auto">
                  <CButton type="button" className="mb-3" onClick={handlesubmit}  disabled={disabledBtn}>
                  {
                        (spinner) ?  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : ''
                  }
                     &nbsp;
                    Save Now
                  </CButton>
                  {(success) ? 
                <CAlert color="success" >Zone Saved successfully!</CAlert> : ''
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

export default AddZone
