
import Home from "../pages/Home"
import Services from "../pages/Services"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Organisers from "../pages/Organisers/Organisers"
import OrganisersDetails from "../pages/Organisers/OrganisersDetails"
import MyAccount from "../Dashboard/user-account/MyAccount"
import Dashboard from "../Dashboard/organiser-account/Dashboard"

import {Routes,Route} from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoute";

const Routers = () =>{
    return <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/organisers" element={<Organisers/>}/>
        <Route path="/organisers/:id" element={<OrganisersDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/users/profile/me" element={<MyAccount/>}/>
        <Route path="/organisers/profile/me" element={<Dashboard/>}/>
    
    </Routes>
};

export default Routers;