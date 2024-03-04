import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))



const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))


/*********Vehicle*******************/
const AddVehicle = React.lazy(() => import('./views/vehicle/AddVehicle'))
const EditVehicle = React.lazy(() => import('./views/vehicle/EditVehicle'))



const ViewVehicle = React.lazy(() => import('./views/vehicle/ViewVehicle'))
const ViewVehiclePartner = React.lazy(() => import('./views/vehicle/ViewVehiclePartner'))

const EditVehiclePartner = React.lazy(() => import('./views/vehicle/EditVehiclePartner'))

const RequestsVehicle = React.lazy(() => import('./views/vehicle/RequestsVehicle'))
const AddVehicleType = React.lazy(() => import('./views/vehicle/AddVehicleType'))
const ViewVehicleType = React.lazy(() => import('./views/vehicle/ViewVehicleType'))
const EditVehicleType = React.lazy(() => import('./views/vehicle/EditVehicleType'))

const AddPartner = React.lazy(() => import('./views/partner/AddPartner'))
const EditPartner = React.lazy(() => import('./views/partner/EditPartner'))

const ViewPartner = React.lazy(() => import('./views/partner/ViewPartner'))
const ViewRidesOrders = React.lazy(() => import('./views/rides/ViewRidesOrders'))

const AddDriver = React.lazy(() => import('./views/driver/AddDriver'))
const EditDriver = React.lazy(() => import('./views/driver/EditDriver'))
const ViewDriver = React.lazy(() => import('./views/driver/ViewDriver'))

const AddZone = React.lazy(() => import('./views/zones/AddZone'))
const EditZone = React.lazy(() => import('./views/zones/EditZone'))
const ViewZones = React.lazy(() => import('./views/zones/ViewZones'))
const ViewPayments = React.lazy(() => import('./views/payment/ViewPayments'))
const EditUserProfile = React.lazy(() => import('./views/profile/EditUserProfile'))

/*************Vehicle***************/


const routes = [
  { path: '/login', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },

  /**********Vehicle***********/
  { path: '/vehicle/addvehicle', name: 'Add Vehicle', element: AddVehicle },
  { path: '/vehicle/listing', name: 'Vehicle Listing', element: ViewVehicle },
  { path: '/vehicle/plisting', name: 'Vehicle Listing', element: ViewVehiclePartner },
  
  { path: '/vehicle/requests', name: 'Request Vehicle', element: RequestsVehicle },

  
  { path: '/vehicle/:id', name: 'Edit Vehicle', element: EditVehicle },
  { path: '/vehiclep/:id', name: 'Edit Vehicle', element: EditVehiclePartner },
  

  { path: '/vehicle/addvehicle_type', name: 'Vehicle Types', element: AddVehicleType },
  { path: '/vehicle/type_listing', name: 'Vehicle Types Listing', element: ViewVehicleType },
  { path: '/vehicle_type/:id', name: 'Edit Vehicle Type', element: EditVehicleType },
  /**********Vehicle***********/

   /**********Partners***********/
   { path: '/partner/addpartner', name: 'Add partner', element: AddPartner },
   { path: '/partner/listing', name: 'Partner Listing', element: ViewPartner },
   { path: '/partner/:id', name: 'Edit partner', element: EditPartner },
   { path: '/rides/orders', name: 'Rides Listing', element: ViewRidesOrders },

   { path: '/zones/addzone', name: 'Add Zone', element: AddZone },
   { path: '/zone/:id', name: 'Add Zone', element: EditZone },
   { path: '/zones/listing', name: 'Zone Listing', element: ViewZones },
   { path: '/payment/listing', name: 'Payment Listing', element: ViewPayments },
   { path: '/driver/adddriver', name: 'Add Driver', element: AddDriver },
   { path: '/driver/listing', name: 'Add Driver', element: ViewDriver },
   { path: '/driver/:id', name: 'Edit Driver', element: EditDriver },
   { path: '/profile/editprofile', name: 'Edit Profile', element: EditUserProfile},
   
   
  
]

export default routes
