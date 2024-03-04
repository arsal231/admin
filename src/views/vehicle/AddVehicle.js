import React,{useState,useEffect,useRef } from 'react'
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
  CSpinner,
  CRow,
  CAlert
  

} from '@coreui/react'
import {API_URL} from  '../../components/Constants'

const AddVehicle = () => {
 
   const [disabledBtn,SetDisabledBtn]= useState(false);
   const [spinner,setSpinner]= useState(false);
   const [error, seterror] = useState('');
   const [errormessage, seterrormessge] = useState('');
   const [success, setSuccess] = useState(false);
   const [vehicletypelist, setvehicletypelist] = useState([]);
  //const [haveError, setHaveError] = useState(false);

  
  
  const [VehicleCatgory,SetVehicleCatgory]= useState();
  const [VehicleType,SetVehicleType]= useState();
  const [VehicleTitle,SetVehicleTitle]= useState();
  const [VehicleColor,SetVehicleColor]= useState();
  const [VehiclePower,SetVehiclePower]= useState();
  const [VehicleModal,SetVehicleModal]= useState();
  const [VehicleCondition,SetVehicleCondition]= useState();
  const [VehicleShape,SetVehicleShape]= useState();
  const [VehicleImage,SetVehicleImage]= useState();
  const [VehicleDescription,SetVehicleDescription]= useState();

  const [UserTypeState,SetUserTypeState]= useState('');
  const [UserLoggedInId,SetUserLoggedInId]= useState('');
  
  
  const fileInputRef = useRef(null); 

  useEffect(()=>{
    getVehiclesType();


    const login_data = localStorage.getItem('login_data');
    if(login_data)
    {
        const loginData = JSON.parse(login_data);
        //console.log(loginData);
        let userID = loginData._____u_i;
        let userType = loginData._____y_t;
      //  console.log(userType);
        SetUserLoggedInId(userID)
        SetUserTypeState(userType);
    }


  },[])
 
async function getVehiclesType()
{
  let responseData = await fetch(API_URL+'/get_vehicles_types');
  responseData =  await responseData.json();
  //setData(true);
  console.log(responseData.result);
  setvehicletypelist(responseData.result);
 
}

  var errordata = [];
  const handlesubmit = ()=>{
    
     if( !VehicleType || !VehicleCondition || !VehicleShape || !VehicleTitle || !VehicleColor || !VehicleModal
      || !VehiclePower || !VehicleImage) //
      {
         seterror(true);
         seterrormessge('All (*) Fields are Required!');
         setTimeout(() => {
          seterror(false);
        }, 2000);
        return false;
      }
      let formData = new FormData();
      formData.append('file_name', fileInputRef.current.files[0]); // Assuming fileInputRef is a reference to your file input element    
      
      let feildsData = {
               
                VehicleType,
               
                VehicleCondition,
                VehicleShape,
                VehicleDescription,
                VehicleTitle,
                VehicleColor,
                VehicleModal,
                VehiclePower,
                UserTypeState,
                UserLoggedInId,
              };
             
              Object.keys(feildsData).forEach(key => {
                formData.append(key, feildsData[key]);
              });

              // console.log(formData);
              // return false;

              beforeSend(true);
              //return false
              fetch(API_URL+"/vehicle_save",
              {
              method:'POST',
              // headers:
              // {'Content-type':'application/json',
              //     'Accept':'application/json',
              // },
               // body:JSON.stringify(feildsData)
                body:formData 
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
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Vehicle </strong>
            <span style={{fontSize:'11px',color:'blue',marginLeft:'12px'}}>Input contains ( <span className='mnd'>*</span> ) are Mendetory </span>
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
                <CFormLabel htmlFor="ssasasa">Vehicles Category <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example" onChange={(e)=>SetVehicleType(e.target.value)}>
                    <option selected="">Select Type Category <span className='mnd'>*</span></option>
                    {
                     (vehicletypelist.length > 0 ? 
                      
                      vehicletypelist.map((item)=>(
                            
                        <option value={item.id} key={item.id}>{item.title}</option>
                  ))
                      
                      
                      
                      : '')
                    }
                    
                    
                  </CFormSelect>
                </div>
               
                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicles Modal <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example" onChange={(e)=>SetVehicleModal(e.target.value)}>
                      <option selected="">Select Vehicles Modal </option>
                      <option value="2013">2013</option>
                      <option value="2014">2014</option>
                      <option value="2015">2015</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                  </CFormSelect>
                </div>
                
                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Condition <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example" onChange={(e)=>SetVehicleCondition(e.target.value)}>
                    <option selected="">Select Condition </option>
                    <option value="1">Brand New</option>
                    <option value="2">Used</option>
                    <option value="3">Good Condition</option>
                  </CFormSelect>
                </div>
            
                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicle Shape <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example"  onChange={(e)=>SetVehicleShape(e.target.value)}>
                    <option selected="">Select Shape </option>
                    <option value="1">Sedan</option>
                    <option value="0">HatchBack</option>
                  </CFormSelect>
                </div>
                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicle Color <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example"  onChange={(e)=>SetVehicleColor(e.target.value)}>
                    <option selected="">Select Color </option>
                    <option value="Blue">Blue</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Silver">Silver</option>

                  </CFormSelect>
                </div>

                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicle Horse Power <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example"  onChange={(e)=>SetVehiclePower(e.target.value)}>
                    <option selected="">Select Horse Power </option>
                      <option value="660">660 CC</option>
                      <option value="800">800 CC</option>
                      <option value="1000">1000 CC</option>
                      <option value="1300">1300 CC</option>
                      <option value="1500">1500 CC</option>
                      <option value="1800">1800 CC</option>

                  </CFormSelect>
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Vehicle Title <span className='mnd'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="dsadsad"
                    placeholder="Tyota Corolla"
                    onChange={(e)=>SetVehicleTitle(e.target.value)}
                    required
                  />
                </div>
               
               
                <div className="mb-3">
                  <CFormLabel htmlFor="formFile">Vehicle Image <span className='mnd'>*</span></CFormLabel>
                   
                   <CFormInput 
                    type="file" 
                    id="formFile" 
                    name="file_name" 
                    onChange={(e) => SetVehicleImage(e.target.files[0])} 
                    ref={fileInputRef}
                   />


                </div>
               
                 <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Description(If Any)</CFormLabel>
                  <CFormTextarea id="exampleFormControlTextarea1" rows="3" onChange={(e)=>SetVehicleDescription(e.target.value)}></CFormTextarea>
                </div>
                <div className="col-auto">
                   <CButton type="button" className="mb-3" onClick={handlesubmit}  disabled={disabledBtn}
                  >
                       {
                        (spinner) ?  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : ''
                       }
                     &nbsp;Save Now
                  </CButton>
                {(success) ? 
                <CAlert color="success" >Vehicle Saved successfully!</CAlert> : ''
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

export default AddVehicle
