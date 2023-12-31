
import {Routes, Route, useNavigate} from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import ProtectedRoute from "./protectedRoutes/protectedRoute"

import Navbar from './global/Navbar';
import Sidebar from './global/Sidebar'
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { useLocation } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import { SessionAPIContext } from "./contexts/SessionAPIContext";
import axios from "axios";
import AuthenticatedProtectedRoute from "./protectedRoutes/authenticationProtectedRoute";
import CategoryPage from "./pages/CategoryPage";
import TransactionPage from "./pages/TransactionPage";
import CompanyPage from "./pages/CompanyPage";
import SpendingChartPage from "./pages/SpendingChartPage";
import RevenueChartPage from "./pages/RevenueChartPage";
import GroupChartPage from "./pages/GroupChartPage";
import Homepage from "./pages/Homepage";
import PlanPage from "./pages/PlanPage";
import { loadStripe } from "@stripe/stripe-js";
import UpgradePlanPage from "./pages/UpgradePlanPage";
import StripeContainer from "./pages/StripeContainer";
import SuccessPayment from "./pages/SuccesPayment"


const response = await axios.get('/api/config');
const stripePromise = loadStripe(response.data)

function App() {
  
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const [sessionInfo, setSessionInfo] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const excludedURLForSidebar = ['/plans', '/', '/upgrade', '/checkout', '/success'];
  const excludedURLForNoSession = ['/', '/signup', '/plans']

  useEffect(()=>{
    
      const fetchSession = async () =>{

        await axios.get('/api/auth/session', {withCredentials:true}).then(response =>{

          if(response.data.status===200){

            setSessionInfo(response.data.user);
            

            return;
          }
          if(response.data.status ===401){

            if(excludedURLForNoSession.indexOf(pathname)<0){
              navigate('/login')
            }
            return;
          }
        }).catch(err => console.log(err));

      }
      fetchSession();

  }, [pathname])

  
  return (

    <SessionAPIContext.Provider value={sessionInfo}>

    
      <div className="flex flex-row h-full">

      {sessionInfo && excludedURLForSidebar.indexOf(pathname)<0 &&  <Sidebar isOpen={isSidebarOpen}/>}
        
      <div className="flex flex-col w-full h-max">

     
     {sessionInfo && excludedURLForSidebar.indexOf(pathname)<0 &&  <Navbar  onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}/>}
        
        <Routes>
          
          <Route path="/login" element={<AuthenticatedProtectedRoute><LoginPage/></AuthenticatedProtectedRoute>}></Route>
          <Route path="/signup" element={<AuthenticatedProtectedRoute><SignupPage/></AuthenticatedProtectedRoute>}></Route>
          <Route path="/" element={<Homepage/>}></Route>

          <Route path="/plans" element={<PlanPage/>}></Route>
          <Route path="/upgrade" element={<ProtectedRoute><UpgradePlanPage/></ProtectedRoute>}></Route>
          <Route path="/checkout" element={<ProtectedRoute><StripeContainer stripePromise={stripePromise}/></ProtectedRoute>}></Route>
          <Route path="/success" element={<SuccessPayment/>}></Route>
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard isSidebarOpen={isSidebarOpen}/></ProtectedRoute>}></Route>
          {/* <Route path="/calendar" element={<ProtectedRoute><CalendarPage/></ProtectedRoute>}></Route> */}
          <Route path="/category" element={<ProtectedRoute ><CategoryPage/></ProtectedRoute>}></Route>
          <Route path="/company" element={<ProtectedRoute><CompanyPage/></ProtectedRoute>}></Route>
          <Route path="/transaction" element={<ProtectedRoute><TransactionPage/></ProtectedRoute>}></Route>
          <Route path="/charts/spending" element={<ProtectedRoute><SpendingChartPage/></ProtectedRoute>}></Route>
          <Route path="/charts/revenue" element={<ProtectedRoute><RevenueChartPage/></ProtectedRoute>}></Route>
          <Route path="/charts/group" element={<ProtectedRoute><GroupChartPage/></ProtectedRoute>}></Route>
          <Route path={"*"} element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
          
        </Routes>  
        
        
    </div>
        
        
  </div>

    </SessionAPIContext.Provider>
      
  );
}

export default App;
