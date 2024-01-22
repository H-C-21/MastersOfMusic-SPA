import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { Routes, Route } from 'react-router-dom';
// import { createBrowserRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import Query from '../pages/Query/Query';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
const AdminQuery = () =>{
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <div className='grid-container'>
         
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          <h1 className="text-2xl font-bold mb-4">Array Items</h1>

          </div>

      )
}


export default AdminQuery;