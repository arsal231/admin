import React,{useState,useEffect} from 'react'
import {useParams,useNavigate  ,redirect } from 'react-router-dom';
import {
  CButton, 
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CBadge,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CSpinner,
  CRow,
  CAlert
  // CToast,
  // CToastHeader,
  // CToastBody,
  // CToastClose,
  // CToaster

} from '@coreui/react'
import {API_URL} from  '../../components/Constants'


const EditVehicle = () => {
  
  let vehicleObj = useParams();

  let navigate = useNavigate();
  const[vehicleId,setVehicleId] = useState();
  const [disabledBtn,SetDisabledBtn]= useState(false);
  const [spinner,setSpinner]= useState(false);
  const [error, seterror] = useState('');
  const [errormessage, seterrormessge] = useState('');

  const [vehicletypelist, setvehicletypelist] = useState([]);
  //const [haveError, setHaveError] = useState(false);

  const [success, setSuccess] = useState(false);

  const [VehicleCatgory,SetVehicleCatgory]= useState();
  const [VehicleType,SetVehicleType]= useState();
  const [VehicleTitle,SetVehicleTitle]= useState();
  const [VehicleColor,SetVehicleColor]= useState();
  const [VehiclePower,SetVehiclePower]= useState();
  const [VehicleModal,SetVehicleModal]= useState();
  const [VehicleCondition,SetVehicleCondition]= useState();
  const [VehicleShape,SetVehicleShape]= useState();
  // const [VehicleImage,SetVehicleImage]= useState();
  const [VehicleStatus,SetVehicleStatus]= useState();
  const [VehicleDescription,SetVehicleDescription]= useState();
 
  useEffect(()=>{
   
    //console.log(vehicleObj.id);
    setVehicleId(vehicleObj.id);
    getVehiclesType();
    getVehicle(vehicleObj.id);
  
  },[])

  const goBack = () => {
   
    navigate('/vehicle/listing');// This will navigate back to the previous page
  };
async function getVehiclesType()
{
  let responseData = await fetch(API_URL+'/get_vehicles_types');
  responseData =  await responseData.json();
  //setData(true);
  console.log(responseData.result);
  setvehicletypelist(responseData.result);
 
}

async function getVehicle(id)
     { 
         
      

       let responseData = await fetch(API_URL+'/get_vehicle/'+id);
         responseData = await responseData.json();
         console.log('length is '+responseData.result.length);
        if(responseData.result.length > 0)
        {
         if(responseData.status==200)
         {
            console.log(responseData.result[0].category);
           // SetVehicleCatgory(responseData.result[0].category);
            SetVehicleType(responseData.result[0].type);
            SetVehicleModal(responseData.result[0].modal);
            SetVehicleCondition(responseData.result[0].condition);
            SetVehicleShape(responseData.result[0].shape);
            SetVehicleDescription(responseData.result[0].description);
            SetVehicleTitle(responseData.result[0].title);
            SetVehicleColor(responseData.result[0].color);
            SetVehiclePower(responseData.result[0].power);
            SetVehicleStatus(responseData.result[0].status);
          // SetVehicleImage(responseData.result[0].image);
          }
        }
        else
        if(responseData.status==500)
        {
          alert(responseData.error);
        }
        else
        {
          alert(' Vehicle Not Found OR Not Exist!');
          navigate('/vehicle/listing');
        }
       
       // console.log(responseData);

 }

  
  const handlesubmit = ()=>{
    
    if(!VehicleType || !VehicleCondition || !VehicleShape || !VehicleTitle || !VehicleColor || !VehicleModal
      || !VehiclePower)
      {
        seterror(true);
         seterrormessge('All (*) Fields are Required!');
         setTimeout(() => {
          seterror(false);
        }, 2000);
        return false;
      }
        
      let feildsData = {
                
                VehicleType,
                VehicleModal,
                VehicleCondition,
                VehicleShape,
                VehicleDescription,
                VehicleTitle,
                VehicleColor,
                VehiclePower,
                VehicleStatus,
               
              };
            
              beforeSend(true);
              //return false
              fetch(API_URL+"/update_vehicle/"+vehicleId,
              {
              method:'PUT',
              headers:
              {
                'Content-type':'application/json',
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
            <strong>Edit <strong> &quot;{VehicleTitle}&quot; </strong> Vehicle <span>
               <a href="javascript:void(0)" onClick={goBack} className='mb-3'>&nbsp;&nbsp;Back</a>
              </span></strong>
          </CCardHeader>
          <CCardBody>
           
         
          
        
              <CForm>
                {/* <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicles Category<span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example"  onChange={(e)=>SetVehicleCatgory(e.target.value)}>
                      <option selected disabled >Select Vehicles Category</option>
                      <option value="1"  selected={VehicleCatgory === 1 ? true : false}>Reguler</option>
                      <option value="2"  selected={VehicleCatgory === 2 ? true : false}>Executive </option>
                      <option value="3" selected={VehicleCatgory === 3 ? true : false}>Permiuam</option>
                  </CFormSelect>
                </div> */}
               
                <div className="mb-3">
                <CFormLabel htmlFor="ssasasa">Vehicles Type <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example" onChange={(e)=>SetVehicleType(e.target.value)}>
                    <option selected="">Select Type Vehicles {VehicleType} </option>
                    {
                     (vehicletypelist.length > 0 ? 
                      
                      vehicletypelist.map((item)=>(
                            
                        <option value={item.id} key={item.id} selected={item.id === VehicleType ? true : false}>{item.title}</option>
                  ))
                      
                      
                      
                      : '')
                    }
                    
                    
                  </CFormSelect>
                </div>
               
                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicles Modal <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example" onChange={(e)=>SetVehicleModal(e.target.value)}>
                      <option selected="" disabled>Select Vehicles Modal </option>
                      <option value="2013" selected={VehicleModal =='2013' ? true : false}>2013</option>
                      <option value="2014" selected={VehicleModal =='2014' ? true : false}>2014</option>
                      <option value="2015" selected={VehicleModal == '2015' ? true : false}>2015</option>
                      <option value="2017" selected={VehicleModal == '2017' ? true : false}>2017</option>
                      <option value="2018" selected={VehicleModal == '2018' ? true : false}>2018</option>
                      <option value="2019" selected={VehicleModal == '2019' ? true : false}>2019</option>
                      <option value="2020" selected={VehicleModal == '2020' ? true : false}>2020</option>
                      <option value="2021" selected={VehicleModal == '2021' ? true : false}>2021</option>
                      <option value="2022" selected={VehicleModal == '2022' ? true : false}>2022</option>
                      <option value="2023" selected={VehicleModal == '2023' ? true : false}>2023</option>
                      <option value="2024" selected={VehicleModal == '2024' ? true : false}>2024</option>
                  </CFormSelect>
                </div>
                
                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Condition <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example" onChange={(e)=>SetVehicleCondition(e.target.value)}>
                    <option selected="" disabled>Select Condition </option>
                    <option value="1" selected={VehicleCondition =='1' ? true : false}>Brand New</option>
                    <option value="2" selected={VehicleCondition =='2' ? true : false}>Used</option>
                    <option value="3" selected={VehicleCondition =='3' ? true : false}>Good Condition</option>
                  </CFormSelect>
                </div>
            
                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicle Shape <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example"  onChange={(e)=>SetVehicleShape(e.target.value)}>
                    <option selected="" disabled>Select Shape </option>
                    <option value="1" selected={VehicleShape =='1' ? true : false}>Sedan</option>
                    <option value="0" selected={VehicleShape =='0' ? true : false}>HatchBack</option>
                  </CFormSelect>
                </div>
                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicle Color <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example"  onChange={(e)=>SetVehicleColor(e.target.value)}>
                    <option selected="" disabled>Select Color </option>
                    <option value="Blue" selected={VehicleColor =='Blue' ? true : false}>Blue</option>
                    <option value="White" selected={VehicleColor =='White' ? true : false}>White</option>
                    <option value="Black" selected={VehicleColor =='Black' ? true : false}>Black</option>
                    <option value="Yellow" selected={VehicleColor =='Yellow' ? true : false}>Yellow</option>
                    <option value="Silver" selected={VehicleColor =='Silver' ? true : false}>Silver</option>

                  </CFormSelect>
                </div>

                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Vehicle Horse Power <span className='mnd'>*</span></CFormLabel>
                  <CFormSelect aria-label="Default select example"  onChange={(e)=>SetVehiclePower(e.target.value)}>
                    <option selected="">Select Horse Power </option>
                      <option value="660" selected={VehiclePower =='660' ? true : false}>660 CC</option>
                      <option value="800" selected={VehiclePower =='800' ? true : false}>800 CC</option>
                      <option value="1000" selected={VehiclePower =='1000' ? true : false}>1000 CC</option>
                      <option value="1300" selected={VehiclePower =='1300' ? true : false}>1300 CC</option>
                      <option value="1500" selected={VehiclePower =='1500' ? true : false}>1500 CC</option>
                      <option value="1800" selected={VehiclePower =='1800' ? true : false}>1800 CC</option>

                  </CFormSelect>
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Vehicle Title <span className='mnd'>*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    id="dsadsad"
                    placeholder="Tyota Corolla"
                    onChange={(e)=>SetVehicleTitle(e.target.value)}
                    value={VehicleTitle}
                    required
                  />
                  
                </div>
               
                
                  
                <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Current Status  &nbsp;
                 {(VehicleStatus==1 ? <CBadge color="success">Active</CBadge> : <CBadge color="danger">Inactive</CBadge> )}
                </CFormLabel>
                  <CFormSelect aria-label="Default select example"  onChange={(e)=>SetVehicleStatus(e.target.value)}>
                    <option selected="" disabled>Change Status </option>
                    <option value="1" selected={VehicleStatus =='1' ? true : false}>Active</option>
                    <option value="0" selected={VehicleStatus =='0' ? true : false}>InActive</option>
                  </CFormSelect>
                </div>

                 <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Description (If Any)</CFormLabel>
                  <CFormTextarea id="exampleFormControlTextarea1" rows="3" value={(VehicleDescription ? VehicleDescription : '')} onChange={(e)=>SetVehicleDescription(e.target.value)}></CFormTextarea>
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
                <CAlert color="success" >Vehicle Update Successfully!</CAlert> : ''
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

export default EditVehicle
