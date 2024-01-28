import { Fragment, useEffect} from "react";
import {Outlet} from "react-router-dom"
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Headertest from './Header/Headertest';
import { ToastContainer } from "react-toastify";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import HeaderBar from "../components/Header";
// import SideBar from "../components/Sidebar";
// import HeaderBarUnsigned from "../components/Header2";

// import classes from './RootLayout.module.css'

function RootLayout(){
    

    return(
    
    <Fragment>  


            <ToastContainer />
            {/* <Header/> */}
            <Headertest />
            <Outlet/>
            <Footer/>
      
    </Fragment> 
    
    )
}

export default RootLayout;
