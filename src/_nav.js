import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilCarAlt,
  cilMap,
  cilPencil,
  cilPuzzle,
  cilUserPlus,
  cilBullhorn,
  cilSpeedometer,
  cilMoney,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  

  {
    component: CNavItem,
    name: 'Rides Orders',
    to: '/rides/orders',
    icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Manage Vehicle',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Vehicle Requests',
        to: '/vehicle/requests', 
      },
      {
        component: CNavItem,
        name: 'Add New Vehicle',
        to: '/vehicle/addvehicle',
      },
      {
        component: CNavItem,
        name: 'Vehicle Listing',
        to: '/vehicle/listing', 
      },
      
      {
        component: CNavItem,
        name: 'Add Vehicle Types',
        to: '/vehicle/addvehicle_type', 
      },
      {
        component: CNavItem,
        name: 'Vehicle Types ',
        to: '/vehicle/type_listing', 
      },
      
      
    ],
  },
  {
    component: CNavGroup,
    name: 'Manage Partners',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Partners',
        to: '/partner/addpartner',
      },
      {
        component: CNavItem,
        name: 'Partners Listing',
        to: '/partner/listing', 
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Manage Drivers',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Drivers',
        to: '/driver/adddriver',
      },
      {
        component: CNavItem,
        name: 'Drivers Listing',
        to: '/driver/listing', 
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Manage Zones',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Zone',
        to: '/zones/addzone',
      },
      {
        component: CNavItem,
        name: 'Zones Listing',
        to: '/zones/listing', 
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/payment/listing',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  
  
]

export default _nav
