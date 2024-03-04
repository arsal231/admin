import React,{useState,useEffect} from 'react'
import { Link, json } from 'react-router-dom';
import {
 
  CRow,
 
  CBadge
} from '@coreui/react'
import { DocsExample } from 'src/components'
import DataTable from 'react-data-table-component'
// import { CIcon } from '@coreui/icons-react';
// import { cilList, cilShieldAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import {API_URL} from  '../../components/Constants'
const ViewZones = () => {
  const [search,setSearch] = useState('');
  const [listing,setlisting] = useState([]);
  const [searchFilterName,setSearchFilterName] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(false)


  const [disabledBtn,SetDisabledBtn]= useState(false);
  const [spinner,setSpinner]= useState(false);

  
  useEffect(()=>{
    getZones();
  //  setlisting(dataList);
    //setSearchFilterName(dataList);
  },[])

  useEffect(()=>{
      
      const res = listing.filter((list)=>{
        return list.title.toLowerCase().match(search.toLowerCase())
      })
      setSearchFilterName(res);
       // alert('hello sir i am being call'+ search)

  },[search])
 
  async function getZones()
  {
    let responseData = await fetch(API_URL+'/get_all_zones');
    responseData =  await responseData.json();
    //setData(true);
    setlisting(responseData.result);
    setSearchFilterName(responseData.result);
  }
 

  
  
 
  const  index = 1;
  const column = [
       
      {
        name: <b>Zone Title</b>,
        selector: (row) => <b>{row.title}</b> ,
        sorting:true,
       
       },
       {
        name:<b>Specified Area</b>,
        selector: (row)=>row.area,
      
       },
       
       {
        name:<b>Status</b>,
        selector: (row)=> (row.status==0 ? <CBadge color="danger">Inactive</CBadge> : <CBadge color="success">Active</CBadge>)
       }, 
       {
        name:<b>Action</b>,
        cell: (row)=><><Link to={"/zone/"+row.id} className='btn btn-success me-1'>
        <CIcon icon={icon.cilPencil} size="sm"/>
       </Link> </>
       } 

  ]
  return (
    <>
    
    
      <DataTable title="Zones Listing" columns={column} data={searchFilterName} pagination
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

export default ViewZones
