import React,{useState,useEffect} from 'react'
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
const ViewPayments = () => {
  const [search,setSearch] = useState('');
  const [listing,setlisting] = useState([]);
  const [searchFilterName,setSearchFilterName] = useState([]);


  const dataList = [
    {drivername:'Ervince ',amount:'100$',discount:'10$',commission:'30$',date:'01/09/2024',status:1},
    {drivername:'Steve ',amount:'100$',discount:'10$',commission:'10$',date:'01/09/2024',status:1},
    {drivername:'Livies toe ',amount:'100$',discount:'10$',commission:'20$',date:'01/09/2024',status:0},
    {drivername:'Jhon doe ',amount:'100$',discount:'10$',commission:'50$',date:'01/09/2024',status:0},
  ]
  useEffect(()=>{
    setlisting(dataList);
    setSearchFilterName(dataList);
  },[])

  useEffect(()=>{
      
      const res = dataList.filter((list)=>{
        return list.drivername.toLowerCase().match(search.toLowerCase())
      })
      setSearchFilterName(res);
       // alert('hello sir i am being call'+ search)

  },[search])
 

  
  
  console.log(dataList);
  const  index = 1;
  const column = [
       
      {
        name: <b>Driver Name</b>,
        selector: (row) => <b>{row.drivername}</b> ,
       
       },
       {
        name:<b>Amount</b>,
        selector: (row)=><b>{row.amount}</b> ,
      
       },
       {
        name:<b>Discount</b>,
        selector: (row)=>row.discount,
        sortable:true,
       },
       {
        name:<b>Commission</b>,
        selector: (row)=>row.commission
       },
       {
        name:<b>Date</b>,
        selector: (row)=>row.date
       },
       {
        name:<b>Status</b>,
        selector: (row)=> (row.status==0 ? <CBadge color="danger">Pending</CBadge> : <CBadge color="success">Received</CBadge>)
       }, 
       {
        name:<b>Action</b>,
        cell: (row)=><><a className="btn btn-danger me-1" href="#" title="Delete" onClick={()=>alert('I am delete')}>
       <CIcon icon={icon.cilTrash} size="sm"/>
       </a></>
       } 

  ]
  return (
   
    
      <DataTable title="Partners Listing" columns={column} data={searchFilterName} pagination
      fixedHeader
      fixedHeaderScrollHeight='500px' striped 
     highlightOnHover
     
     subHeader
     subHeaderComponent={<><label>Search:&nbsp;</label> <input type="text"  placeholder="type keyword for search" className='w-25 form-control'
     value={search} onChange={(e)=>setSearch(e.target.value)}/></> } 
    
      ></DataTable>
      
    
  )
}

export default ViewPayments
