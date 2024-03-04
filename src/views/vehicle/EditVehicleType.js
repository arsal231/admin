import React, { useState,useRef ,useEffect } from 'react'
import {useParams,useNavigate   } from 'react-router-dom';
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
  CSpinner,
  CBadge
} from '@coreui/react'
import {API_URL} from  '../../components/Constants'

const EditVehicleType = () => {
  let navigate  = useNavigate();
  let vehicleObj = useParams();
  const checkboxRef = useRef(null);
  const [disabledBtn,SetDisabledBtn]= useState(false);
  const [spinner,setSpinner]= useState(false);
  const [error, seterror] = useState('');
  const [errormessage, seterrormessge] = useState('');
  const [success, setSuccess] = useState(false);
  const [defaultValue, SetDefaultValue] = useState(false);
  const[vehicleTypeId,setVehicleTypeId] = useState();
const [VehicleCatgory,SetVehicleCatgory] = useState('');
const [VehicleTitle,SetVehicleTitle] = useState('');
const [VehiclePricePerKm,SetVehiclePricePerKm] = useState('');
const [VehicleSpecialDayPrice,SetVehicleSpecialDayPrice] = useState(0);
const [VehicleTypeStatus,SetVehicleTypeStatus] = useState(0);
const [VehicleSpecialPriceActive, SetVehicleSpecialPriceActive] = useState(0);

useEffect(()=>{
   
  //console.log(vehicleObj.id);
  setVehicleTypeId(vehicleObj.id);
 // getVehiclesType();
  getVehicleType(vehicleObj.id);

},[])
const beforeSend = (check)=>{
  if(check){
    SetDisabledBtn(true);
    setSpinner(true);
  }else{
    SetDisabledBtn(false);
    setSpinner(false);
  }
}
 
 
async function getVehicleType(id)
     { 
         
       let responseData = await fetch(API_URL+'/get_vehicle_type/'+id);
         responseData = await responseData.json();
        console.log(responseData);
       // return false;
         if(responseData.status==200)
         {
          
             SetVehicleCatgory(responseData.result[0].vehicle_category);
            SetVehicleTitle(responseData.result[0].title);
            SetVehiclePricePerKm(responseData.result[0].price_per_km);
            SetVehicleSpecialDayPrice(responseData.result[0].special_day_price);
            SetVehicleSpecialPriceActive(responseData.result[0].is_special_price);
            SetVehicleTypeStatus(responseData.result[0].status);

           if(responseData.result[0].is_special_price==1)
           {
             SetDefaultValue(true);
           }else{
             SetDefaultValue(false);
           }
            
         }
         else
         if(responseData.status==500)
         {
          alert(responseData.error);
         }
       
       // console.log(responseData);

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
             VehicleTypeStatus
           };
          
          
          

           beforeSend(true);
          
           fetch(API_URL+"/update_vehicle_type/"+vehicleTypeId,
           {
           method:'PUT',
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
  const goBack = () => {
   
    navigate('/vehicle/type_listing');// This will navigate back to the previous page
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit <strong> &quot;{VehicleTitle}&quot; </strong> Vehicle Type <span>
               <a href="javascript:void(0)" onClick={goBack} className='mb-3'>&nbsp;&nbsp;Back</a>
            </span></strong>


          </CCardHeader>
          <CCardBody>
         
              <CForm>
                {/* <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicles Category <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example" onChange={(e)=>SetVehicleCatgory(e.target.value)} defaultValue="">
                      <option selected="">Select Vehicles Category</option>
                      <option value="1" selected={VehicleCatgory === 1 ? true : false}>Reguler</option>
                      <option value="2" selected={VehicleCatgory === 2 ? true : false}>Executive </option>
                      <option value="3" selected={VehicleCatgory === 3 ? true : false}>Permiuam</option>
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
                    value={(VehicleSpecialDayPrice==0 ? '' :VehicleSpecialDayPrice)}
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
                
                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Current Status  &nbsp;
                 {(VehicleTypeStatus==1 ? <CBadge color="success">Active</CBadge> : <CBadge color="danger">Inactive</CBadge> )}
                </CFormLabel>
                  <CFormSelect aria-label="Default select example"  onChange={(e)=>SetVehicleTypeStatus(e.target.value)}>
                    <option selected="" disabled>Change Status </option>
                    <option value="1" selected={VehicleTypeStatus =='1' ? true : false}>Active</option>
                    <option value="0" selected={VehicleTypeStatus =='0' ? true : false}>InActive</option>
                  </CFormSelect>
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
                <CAlert color="success" >Vehicle Type Update successfully!</CAlert> : ''
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

export default EditVehicleType
