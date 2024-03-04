import React,{useState,useEffect} from 'react'
import { Link , json } from 'react-router-dom';
import { 
  CRow,
  CBadge,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CSpinner,
  CButton
} from '@coreui/react'
import { DocsExample } from 'src/components'
import DataTable from 'react-data-table-component'
import {API_URL} from  '../../components/Constants'

// import { CIcon } from '@coreui/icons-react';
// import { cilList, cilShieldAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
const ViewPartner = () => {
  const [search,setSearch] = useState('');
  const [listing,setlisting] = useState([]);
  const [searchFilterName,setSearchFilterName] = useState([]);

  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(false)


  const [disabledBtn,SetDisabledBtn]= useState(false);
  const [spinner,setSpinner]= useState(false);


  
  useEffect(()=>{
    //setlisting(dataList);
    //setSearchFilterName(dataList);
    getPartners();
  },[])

  useEffect(()=>{
      
      const res = listing.filter((list)=>{
        return list.full_name.toLowerCase().match(search.toLowerCase())
      })
      setSearchFilterName(res);
       // alert('hello sir i am being call'+ search)

  },[search])
 

  async function getPartners()
    {
      let responseData = await fetch(API_URL+'/get_partners');
      responseData =  await responseData.json();
      //setData(true);
      setlisting(responseData.result);
      setSearchFilterName(responseData.result);
    }
  /*********Delete Section*********/
  async function handleconfirm()
  {
  
      setSpinner(true);
      let responseResult = await fetch(API_URL+'/partner/'+deleteId,{
        method:'DELETE',
      });

      responseResult = await responseResult.json();
      console.log(responseResult);
      setSpinner(false);
      if(responseResult.status==200)
      {
        setVisible(false)
        getPartners();
      }
  
  // getStudents();
  }
  const deletePartner =(id)=>
  {
      
      setDeleteId(id);
      setVisible(!visible)
  }
  const checktt = (id)=>{
   alert(id);
  }
/*********Delete Section*********/

// "first_name": "dsad",
// "last_name": "dasd",
// "full_name": "dsadNaN",
// "email": "dsa@yahoo.com",
// "phone": "312321",
// "address": "dsad",
  //console.log(dataList);
  const  index = 1;
  const column = [
       
      {
        name: <b>UserName</b>,
        selector: (row) => <b>{row.username}</b> ,
       
       },
       {
        name: <b>Partner Name</b>,
        selector: (row) => <b>{row.full_name}</b> ,
       
       },
       {
        name:<b>Email</b>,
        selector: (row)=>row.email ,
      
       },
       {
        name:<b>Phone No</b>,
        selector: (row)=>row.phone,
        sortable:true,
        
       },
       {
        name:<b>Address</b>,
        selector: (row)=>row.address
       },
       {
        name:<b>Status</b>,
        selector: (row)=> (row.status==0 ? 
                 <CBadge color="danger" onClick={()=>checktt(row.id)} id="tr__`${row.id}`">Inactive</CBadge> : <CBadge color="success" onClick={()=>checktt(row.id)} id="tr__`${row.id}`">Active</CBadge>)
       }, 
       {
        name:<b>Action</b>,
        cell: (row)=><><Link to={"/partner/"+row.id} className='btn btn-success me-1'>
        <CIcon icon={icon.cilPencil} size="sm"/>
       </Link>  <a className="btn btn-danger me-1" href="javascript:void(0);" title="live track" onClick={()=>deletePartner(row.id)}>
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
      <DataTable title="Partners Listing" columns={column} data={searchFilterName} pagination
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

export default ViewPartner
