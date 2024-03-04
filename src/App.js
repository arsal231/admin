import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes ,useLocation   } from 'react-router-dom'
import './scss/style.scss'
import './style.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/Login'))
const Logout = React.lazy(() => import('./views/Logout'))
const Forgot = React.lazy(() => import('./views/Forgot'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


class App extends Component {
  

  
  render() {
    
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/forgot" name="Forgot Page" element={<Forgot />} />
            <Route exact path="/logout" name="Logout " element={<Logout />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes> 
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
