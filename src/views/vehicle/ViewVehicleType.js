import React,{useState,useEffect} from 'react'
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

} from '@coreui/react'
import { DocsExample } from 'src/components'
import DataTable from 'react-data-table-component'
import {API_URL} from  '../../components/Constants'
// import { CIcon } from '@coreui/icons-react';
// import { cilList, cilShieldAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
const ViewVehicleType = () => {
  const [search,setSearch] = useState('');
  const [listing,setlisting] = useState([]);
  const [searchFilterName,setSearchFilterName] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(false)


  const [disabledBtn,SetDisabledBtn]= useState(false);
  const [spinner,setSpinner]= useState(false);

  // const dataList = [
   
  //   {category:'Reguler',title:'4 Seater',price_per_km:'10$',special_charges:'30$ ',is_special_charges:'yes',status:1},
  //   {category:'Permiuam',title:'4 Seater',price_per_km:'20$',special_charges:0,is_special_charges:'No',status:1},
  //   {category:'Exective',title:'3 Seater',price_per_km:'30$',special_charges:'50$ ',is_special_charges:'yes',status:1},
   
  // ]
  useEffect(()=>{
    // setlisting(dataList);
    // setSearchFilterName(dataList);
    getVehiclesTypes();
  },[])

  useEffect(()=>{
      
      const res = listing.filter((list)=>{
        return list.title.toLowerCase().match(search.toLowerCase())
      })
      setSearchFilterName(res);
       // alert('hello sir i am being call'+ search)

  },[search])
 
    async function getVehiclesTypes()
    {
      let responseData = await fetch(API_URL+'/get_all_vehicles_types');
      responseData =  await responseData.json();
      //setData(true);
      setlisting(responseData.result);
      setSearchFilterName(responseData.result);
    }
   
/*********Delete Section*********/
  async function handleconfirm()
  {
  
      setSpinner(true);
      let responseResult = await fetch(API_URL+'/vehicle_type/'+deleteId,{
        method:'DELETE',
      });

      responseResult = await responseResult.json();
      console.log(responseResult);
      setSpinner(false);
      if(responseResult.status==200)
      {
        setVisible(false)
        getVehiclesTypes();
      }
  
  // getStudents();
  }
  const deleteVehicle =(id)=>
  {
      
      setDeleteId(id);
      setVisible(!visible)
  }
/*********Delete Section*********/
  
  
 // console.log(dataList);
  const  index = 1;
  const column = [
        // {
        //   name:<b>ID</b>,
        //   cell: (row, index) => <div style={{ width: '20px' }}>{index + 1}</div>,
        
        // },
      // {
      //   name: <b>Category</b>,
      //   selector: (row) => <b>{(row.vehicle_category==1 ? 'Reguler' : (row.vehicle_category==2 ? 'Executive' : 'Permiuam'))}</b> ,
       
      //  },
       
       {
        name:<b>Title</b>,
        selector: (row)=>row.title,
        sortable:true,
        
       },
       {
        name:<b>Price/KM</b>,
        selector: (row)=>row.price_per_km +' $'
       },
       {
        name:<b>Special Charges</b>,
        selector: (row)=>(row.special_day_price==0 ? '-' : row.special_day_price +' $'),
        sortable:true,
       },
       {
        name:<b>Is Special Charges</b>,
        selector: (row)=>(row.is_special_price==1 ? 'Yes' : '-'),
       },
       
       {
        name:<b>Status</b>,
        selector: (row)=> (row.status==0 ? <CBadge color="danger">Inactive</CBadge> : <CBadge color="success">Active</CBadge>)
       }, 
       {
        name:<b>Action</b>,   
        cell: (row)=><><Link to={"/vehicle_type/"+row.id} className='btn btn-success me-1'>
        <CIcon icon={icon.cilPencil} size="sm"/>
       </Link> <a className="btn btn-danger me-1" href="javascript:void(0);" title="Delete This" onClick={()=>deleteVehicle(row.id)}>
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


      <DataTable title="Vehicles Types Listing" columns={column} data={searchFilterName} pagination
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

export default ViewVehicleType
