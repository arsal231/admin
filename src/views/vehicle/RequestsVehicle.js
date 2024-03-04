import React,{useState,useEffect,useRef} from 'react'


import { Link, json } from 'react-router-dom';
import {
 
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CModalTitle,
  CBadge,
  CSpinner,
  CTooltip,
  CFormInput,
  CFormLabel,
  CAlert
} from '@coreui/react'
import { DocsExample } from 'src/components'
import DataTable from 'react-data-table-component'
import {API_URL} from  '../../components/Constants'
// import { CIcon } from '@coreui/icons-react';
// import { cilList, cilShieldAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
const RequestsVehicle = () => {
        const fileInputRef = useRef(null); 
        const [visible, setVisible] = useState(false);
        const [VisibleApprove, SetVisibleApprove] = useState(false);
        
        const [VisibleImage, setVisibleImage] = useState(false)
        const [enlargeImageURL, setEnlargeImageURL] = useState('')
        const [VehicleImage,SetVehicleImage]= useState('');




        const [deleteId, setDeleteId] = useState(false)


        const [disabledBtn,SetDisabledBtn]= useState(false);
        const [spinner,setSpinner]= useState(false);
        const [error, seterror] = useState('');
        const [errormessage, seterrormessge] = useState('');

        const [vehicleId, setVehicleId] = useState('');
        const [vehicletypelist, setvehicletypelist] = useState([]);
        

        const [success, setSuccess] = useState(false);
        const [search,setSearch] = useState('');
        const [listing,setlisting] = useState([]);
        const [searchFilterName,setSearchFilterName] = useState([]);
        const [UserTypeState, SetUserTypeState] = useState('');
        const [ClickedRowId, SetClickedRowId] = useState('');


  useEffect(()=>{

    const login_data = localStorage.getItem('login_data');
    if(login_data)
    {
        const loginData = JSON.parse(login_data);
        //console.log(loginData);
        let userID = loginData._____u_i;
        let userType = loginData._____y_t;
       
        SetUserTypeState(userType);
    }
   



    getVehicles();
  },[])

  useEffect(()=>{
      
      const res = listing.filter((list)=>{
        return list.title.toLowerCase().match(search.toLowerCase())
      })
      setSearchFilterName(res);
       // alert('hello sir i am being call'+ search)

  },[search])
 

  /*********Delete Section*********/
    async function handleconfirm()
    {
     
      setSpinner(true);
      let responseResult = await fetch(API_URL+'/vehicle/'+deleteId,{
        method:'DELETE',
      });

      responseResult = await responseResult.json();
      console.log(responseResult);
      setSpinner(false);
      if(responseResult.status==200)
      {
        setVisible(false)
        getVehicles();
      }
     
    // getStudents();
    }
    const deleteVehicle =(id)=>{
        
        setDeleteId(id);
        setVisible(!visible)
    }
/*********Delete Section*********/
    const enlargeImage=(imgUrl,vehicleId)=>
    {
      //alert('hheheh')   
      setVehicleId(vehicleId);
      setVisibleImage(true);
        setEnlargeImageURL(imgUrl)
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
    
   
  const handlesubmit = ()=>{
    
        
        let feildsData = {UserTypeState }; 
             beforeSend(true);
              //return false
              fetch(API_URL+"/approved_vehicle/"+ClickedRowId,
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
                 
                  result.json().then((response)=>
                  {
                  //alert(response.status);
                    if(response.status==200)
                    {

                      setSuccess(true);
                      setTimeout(() => 
                      {
                        SetVisibleApprove(false);
                      }, 1000);

                      setTimeout(() => 
                      {
                        getVehicles();
                      }, 2000);

                     
                      beforeSend(false);

                     
                      
                    }
                    if(response.status==301)
                    {
                      beforeSend(false);
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

 const markApprovedNow=(id)=>
 {
  SetVisibleApprove(true);
  SetClickedRowId(id)
 }


async function getVehicles()
{
  let responseData = await fetch(API_URL+'/get_vehicles_requests');
  responseData =  await responseData.json();
  //setData(true);
  setlisting(responseData.result);
  setSearchFilterName(responseData.result);
}
  const  index = 1;
  const column = [
        // {
        //   name:<b>ID</b>,
        //   cell: (row, index) => <div style={{ width: '20px' }}>{index + 1}</div>,
        
        // },
      {
        name: <b>Category</b>,
        selector: (row) => <b>{row.category}</b> ,
       
       },
       {
        name:<b>Type</b>,
        selector: (row)=><b>{row.type}</b> ,
      
       },
       {
        name:<b>Title</b>,
        selector: (row)=>row.title,
        sortable:true,
        
       },
       {
        name:<b>Shape</b>,
        selector: (row)=>row.shape
       },
       {
        name:<b>Modal</b>,
        selector: (row)=>row.modal,
        sortable:true,
       },
       {
        name:<b>Color</b>,
        selector: (row)=>row.color,
       },
       {
        name:<b>Image</b>,
        selector: (row)=>
        <> 
         <CTooltip
                content="Click to Enlarge / Edit"
                placement="top"
         >
        <a href="javascript:void(0)" className='zoomanchor' onClick={()=>enlargeImage(row.image,row.id)}> 
        
           <img src={row.image} width={70} height={40} /> </a>
        </CTooltip>
        </> ,
       },
       {
        name:<b>Status</b>,
        selector: (row)=> (row.status=='0' ? <CBadge color="danger">Inactive</CBadge> : <CBadge color="success">Active</CBadge>)
       }, 

 
       {
        name:<b>Request</b>,
        selector: (row)=> (row.vehicle_request==0 ? 
        <a href="javascript:void(0)" onClick={()=>markApprovedNow(row.id)}><CBadge color="info">New Request</CBadge> </a>: <CBadge color="success">Approved</CBadge>)
       },
       {
        name:<b>Action</b>,
        cell: (row)=><>

        {/* <Link to={"/vehicle/"+row.id} className='btn btn-success me-1'>
        <CIcon icon={icon.cilPencil} size="sm"/>
       </Link>  */}
       
       <a className="btn btn-danger me-1" href="javascript:void(0)" title="Delete This" onClick={()=>deleteVehicle(row.id)}>
       <CIcon icon={icon.cilTrash} size="sm"/>
       </a></>
       } 

       

  ]
  return (
   
   <>

       <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmation!</CModalTitle>
        </CModalHeader>
        <CModalBody style={{color:'red'}}>Are you Sure. You want to <strong>Delete</strong>  this?</CModalBody>
        <CModalFooter>
          <CButton color="secondary " onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleconfirm}  disabled={disabledBtn}>
          {
                        (spinner) ?  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : '' 
          }
            &nbsp; Go Ahead </CButton>
            
        </CModalFooter>
      </CModal> 

      <CModal visible={VisibleApprove} onClose={() => SetVisibleApprove(false)}>
        <CModalHeader>
          <CModalTitle>Confirmation!</CModalTitle>
        </CModalHeader>
        <CModalBody style={{color:'red'}}>Are you Sure. You want to <strong>Approved</strong> this?</CModalBody>
        <CModalFooter>
          <CButton color="secondary " onClick={() => SetVisibleApprove(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handlesubmit}>
          {
                        (spinner) ?  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : '' 
          }
            &nbsp; Approved the Request.  </CButton>
            
        </CModalFooter>
      </CModal> 
      
               
      {/* <CButton onClick={() => setVisibleImage(!VisibleImage)}>Launch static backdrop modal</CButton> */}
      <CModal backdrop="static" size="xl" visible={VisibleImage} onClose={() => setVisibleImage(false)} className='enlargeModal'>
        <CModalHeader>
          <CModalTitle></CModalTitle>
        </CModalHeader>
        <CModalBody>
            <img src={enlargeImageURL} />
            <br/>
            {/* <div className="mb-3">
                  <br/>
                 
                   <CFormInput 
                    type="file" 
                    id="formFile" 
                    name="file_name" 
                    onChange={(e) => SetVehicleImage(e.target.files[0])} 
                    ref={fileInputRef}
                   />
                   <br/>
                  {(success) ? 
                  <CAlert color="success" >Image Updated successfully!</CAlert> : ''
                  }
                  {(error) ? 
                  <CAlert color="danger">{errormessage}</CAlert> : ''
                  }

                </div> */}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleImage(false)}>
            Exit
          </CButton>
          {/* <CButton color="primary" onClick={handlesubmit} disabled={disabledBtn} >
          {
                        (spinner) ?  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : ''
          }
            Save Image</CButton> */}
            
            
        </CModalFooter>
      </CModal>


         
      <DataTable title="Vehicles Requests " columns={column} data={searchFilterName} pagination
      fixedHeader
      fixedHeaderScrollHeight='500px' striped 
     highlightOnHover
     
     subHeader
     subHeaderComponent={<><label>Search:&nbsp;</label> <input type="text"  placeholder="type keyword for search" className='w-25 form-control'
     value={search} onChange={(e)=>setSearch(e.target.value)}/></> } 
    
      ></DataTable>
      </> 
    
  )
}

export default RequestsVehicle
