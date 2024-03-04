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
  CFormSelect,
  CFormCheck,
  CRow,
  CAlert,
  CSpinner
} from '@coreui/react'
import {API_URL} from  '../../components/Constants'

const AddVehicleType = () => {
  const checkboxRef = useRef(null);
  const [disabledBtn,SetDisabledBtn]= useState(false);
  const [spinner,setSpinner]= useState(false);
  const [error, seterror] = useState('');
  const [errormessage, seterrormessge] = useState('');
  const [success, setSuccess] = useState(false);
  const [defaultValue, SetDefaultValue] = useState(false);
  
const [VehicleCatgory,SetVehicleCatgory] = useState('');
const [VehicleTitle,SetVehicleTitle] = useState('');
const [VehiclePricePerKm,SetVehiclePricePerKm] = useState('');
const [VehicleSpecialDayPrice,SetVehicleSpecialDayPrice] = useState(0);

const [VehicleSpecialPriceActive, SetVehicleSpecialPriceActive] = useState(0);


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
    
  if( !VehiclePricePerKm  || !VehicleTitle
  ) //
   {
      seterror(true);
      seterrormessge('All (*) Fields are Required!');
      setTimeout(() => {
       seterror(false);
     }, 2000);
     return false;
   }
   
    
    
   let feildsData = {
             //VehicleCatgory,
             VehiclePricePerKm,
             VehicleSpecialDayPrice,
             VehicleSpecialPriceActive,
             VehicleTitle,
           };

           beforeSend(true);
          
           fetch(API_URL+"/vehicle_type_save",
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
                   
                    SetVehicleTitle('');
                    SetVehiclePricePerKm('');
                    SetVehicleSpecialDayPrice('');
                 

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

const checkIfSpecialPrice = (e) => {
  
  const newValue = checkboxRef.current.checked ? 1 : 0;
  
    if(newValue==1)
    {
      SetVehicleSpecialPriceActive(1);
      SetDefaultValue(true);
    }
    else
    if(newValue==0)
    {
      SetVehicleSpecialPriceActive(0);
      SetDefaultValue(false);
    }

 
  
  
 
};

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Vehicle Categories</strong>
          </CCardHeader>
          <CCardBody>
         
              <CForm>
                {/* <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicles Category <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example" onChange={(e)=>SetVehicleCatgory(e.target.value)} defaultValue="">
                      <option selected="">Select Vehicles Category</option>
                      <option value="1">Reguler</option>
                      <option value="2">Executive </option>
                      <option value="3">Permiuam</option>
                  </CFormSelect>
                </div> */}
               
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Vehicle Title <span className='mnd'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFosaInput1"
                    placeholder="4 Seater"
                    value={VehicleTitle}
                    onChange={(e)=>SetVehicleTitle(e.target.value)} 
                  />
                </div>
               
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Price per KM <span className='mnd'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormsst1"
                    placeholder="10$"
                    value={VehiclePricePerKm}
                    onChange={(e)=>SetVehiclePricePerKm(e.target.value)} 
                  />
                </div>
               
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Special Day Charges (Price per KM)</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleForsadsanput1"
                    placeholder="20$"
                    onChange={(e)=>SetVehicleSpecialDayPrice(e.target.value)} 
                  />
                </div>
               
                
                
                <div className="mb-3">
                {/* defaultChecked */}
                 <CFormCheck id="flexCheckChecked" label="Checked (If Special Day Charge active)"
                 
                   onChange={checkIfSpecialPrice} 
                   ref={checkboxRef}
                   defaultChecked={defaultValue}
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
                       <CAlert color="success" >Vehicle Type Saved successfully!</CAlert> : ''
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

export default AddVehicleType
