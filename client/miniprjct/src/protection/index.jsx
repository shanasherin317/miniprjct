import React, { useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import { useState } from 'react'
import { useNavigate,Outlet } from 'react-router-dom'

const Protect = () => {

  const[auth,setAuth]=useState(Boolean(localStorage.getItem("token")));
  const navigate =useNavigate();

  useEffect(()=>{
    if(!auth){
      navigate("/admin/login")
    }
  },[navigate])

  return (
    <>
    {
        auth ? <Dashboard element={<Outlet/>}/> : navigate("/signinside")
    }
    </>
  )
}

export default Protect