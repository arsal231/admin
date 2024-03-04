import React,{useState,useEffect} from 'react'
import {
 
  CRow,
 
  CBadge
} from '@coreui/react'
import { DocsExample } from 'src/components'
import DataTable from 'react-data-table-component'
import {API_URL} from  '../../components/Constants'
// import { CIcon } from '@coreui/icons-react';
// import { cilList, cilShieldAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
const ViewRidesOrders = () => {
  const [search,setSearch] = useState('');
  const [listing,setlisting] = useState([]);
  const [searchFilterName,setSearchFilterName] = useState([]);


  // const dataList = [
  //   {username:'Anton Phil ',email:'Anton@tripzip.com',phoneno:'030009324323',pickup:'illford United Kingdom',dropoff:'Manchester City',date:'01-04-2024',time:'4pm'},
  //   {username:'Anton Phil ',email:'Anton@tripzip.com',phoneno:'030009343223',pickup:'illford United Kingdom',dropoff:'Manchester City',date:'01-012-2024',time:'4pm'},
  //   {username:'Anton Phil ',email:'Anton@tripzip.com',phoneno:'0300093433',pickup:'Bermigham United Kingdom',dropoff:'Manchester City',date:'01-04-2024',time:'4pm'},
  //   {username:'Anton Phil ',email:'Anton@tripzip.com',phoneno:'0300032323',pickup:'Bermigham United Kingdom',dropoff:'Manchester City',date:'01-04-2024',time:'4pm'},
  //   {username:'Jhon Phil ',email:'Jhon@tripzip.com',phoneno:'03000932323',pickup:'illford United Kingdom',dropoff:'Manchester City',date:'01-04-2024',time:'4pm'},
  //   {username:'Anton Phil ',email:'Anton@tripzip.com',phoneno:'03000932323',pickup:'Bermigham United Kingdom',dropoff:'Manchester City',date:'01-04-2024',time:'4pm'},
  //   {username:'Anton Phil ',email:'Anton@tripzip.com',phoneno:'0300093243223',pickup:'illford United Kingdom',dropoff:'Manchester City',date:'01-04-2024',time:'4pm'},
   
  // ]
  useEffect(()=>{
   // setlisting(dataList);
    //setSearchFilterName(dataList);
    getBookings();
  },[])

  useEffect(()=>{
      
      const res = listing.filter((list)=>{
        return list.full_name.toLowerCase().match(search.toLowerCase())
      })
      setSearchFilterName(res);
       // alert('hello sir i am being call'+ search)

  },[search])
 
  async function getBookings()
  {
    let responseData = await fetch(API_URL+'/get_bookings');
    responseData =  await responseData.json();
    //setData(true);
    setlisting(responseData.result);
    setSearchFilterName(responseData.result);
  }
  
  
  //console.log(dataList);
  const  index = 1;
  const column = [
       
    {
      name: <b>Full Name</b>,
      selector: (row) => {
        const capitalizeFirstLetter = (string) => {
          return string.charAt(0).toUpperCase() + string.slice(1);
        };
    
        const capitalizedFullName = capitalizeFirstLetter(row.full_name);
    
        return (
          <>
            <b>{capitalizedFullName}</b>
            <br/>
            P: {row.passenger}
            <br/>
            C: {row.childeren}
            <br/>
            {(row.infant) ? 'I: ' + row.infant : ''}
          </>
        );
      }
    },
       {
        name:<b>Email</b>,
        selector: (row)=><b>{row.email}</b> ,
      
       },
       {
        name:<b>Phone No</b>,
        selector: (row)=>row.phone,
        sortable:true,
        
       },
       {
        name:<b>PickUp</b>,
        selector: (row)=>row.pickup
       },
       {
        name:<b>Dropoff</b>,
        selector: (row)=>row.drop_off
       },
       {
        name:<b>Date</b>,
        selector: (row)=>row.pickup_date
       },
       {
        name:<b>Time</b>,
        selector: (row)=>row.pickup_time
       },

       {
        name:<b>Payment</b>,
        selector: (row)=> (row.paid==0 ? 
                 <CBadge color="danger" >unPaid</CBadge> : <CBadge color="success" >Paid</CBadge>)
       }, 

       {
        name:<b>Status</b>,
        selector: (row)=> (row.status==0 ? 
                 <CBadge color="danger" >Pending</CBadge> : <CBadge color="success" >Confirmed</CBadge>)
       }, 
      
       {
        name:<b>Action</b>,
        cell: (row)=><>
         <a className="btn btn-danger me-1" href="#" title="Delete" onClick={()=>alert('I am delete')}>
       <CIcon icon={icon.cilTrash} size="sm"/>
       </a></>
       } 

  ]
  return (
   
    
      <DataTable title="Rides Listing" columns={column} data={searchFilterName} pagination
      fixedHeader
      fixedHeaderScrollHeight='500px' striped 
     highlightOnHover
     
     subHeader
     subHeaderComponent={<><label>Search:&nbsp;</label> <input type="text"  placeholder="type keyword for search" className='w-25 form-control'
     value={search} onChange={(e)=>setSearch(e.target.value)}/></> } 
    
      ></DataTable>
      
    
  )
}

export default ViewRidesOrders
