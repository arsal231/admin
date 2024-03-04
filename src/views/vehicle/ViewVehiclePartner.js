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
const ViewVehiclePartner = () => {
        const fileInputRef = useRef(null); 
        const [visible, setVisible] = useState(false);
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
        const [UserID,SetUserID] = useState('');

        


  useEffect(()=>{
    
   
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
    
    if(!VehicleImage) 
     {
      //alert('All (*) Fields are Required!')
        seterror(true);
        seterrormessge('All (*) Fields are Required!');
        setTimeout(() => {
        seterror(false);
      }, 2000);
       return false;
     }
     let formData = new FormData();
     formData.append('file_name', fileInputRef.current.files[0]); // Assuming fileInputRef is a reference to your file input element    
     formData.append('vehicle_id', vehicleId);
    

             beforeSend(true);
             //return false
             fetch(API_URL+"/vehicle_image_save",
             {
              method:'POST',
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
                      setVisibleImage(false);
                      setEnlargeImageURL('')
                       getVehicles();
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



async function getVehicles()
{
  const login_data = localStorage.getItem('login_data');
  if(login_data)
  {
      const loginData = JSON.parse(login_data);
      var  userid = loginData._____u_i;
  }
  if (userid === undefined) {
      userid = 0;
  }
  let responseData = await fetch(API_URL+'/get_vehicles_partners/'+userid);
  
  responseData =  await responseData.json();
 
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
        selector: (row)=> (row.vehicle_request==0 ? <CBadge color="danger">Waiting..</CBadge> : <CBadge color="success">Approved</CBadge>)
       }, 

       
       {
        name:<b>Action</b>,
        cell: (row)=><><Link to={"/vehiclep/"+row.id} className='btn btn-success me-1'>
        <CIcon icon={icon.cilPencil} size="sm"/>
       </Link> 
       
       <a className="btn btn-danger me-1" href="javascript:void(0)" title="live track" onClick={()=>deleteVehicle(row.id)}>
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
        <CModalBody style={{color:'red'}}>Are you Sure. You want to delete this?</CModalBody>
        <CModalFooter>
          <CButton color="secondary " onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleconfirm}>
          {
                        (spinner) ?  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : '' 
          }
            &nbsp; Go Ahead </CButton>
            
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
            <div className="mb-3">
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

                </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleImage(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handlesubmit} disabled={disabledBtn} >
          {
                        (spinner) ?  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" /> : ''
          }
            Save Image</CButton>
            
            
        </CModalFooter>
      </CModal>


      
                 
                       



         
      <DataTable title="Vehicles Listing" columns={column} data={searchFilterName} pagination
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

export default ViewVehiclePartner
