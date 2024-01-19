
import './App.css'
import Protect from './protection/index'
import SignInSide from './components/SignInSide'
import SignUp from './components/SignUp'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Button, Grid, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Orders from './components/Orders';
import axios from 'axios';

function App() {

  const [data,setData] = useState([]);

  const productName = React.useRef(null);

  const handleRemove=async()=>{
    try {
      const response= await axios.delete(`http://localhost:3000/api/product}`,data)
      setData(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  // const handleUpdate=async(id)=>{
  //  try {
  //   const response=await axios.put(`http://localhost:3000/api/product/${id}`)
  //   setData(response.row.id)
  //  } catch (error) {
  //   console.log(error.message);
  //  }
  // }

  const handleSubmit = async()=>{
    // alert(productName.current.value)
    
const data={
  name:productName.current.value,
}

try {
  await axios.post('http://localhost:3000/api/product',data)
  // navigate('/signinside')
} catch (error) {
  console.log(error.message);
}
  }


  const fetchdata =async ()=>{
    try {
      
      const response= await axios.get("http://localhost:3000/api/product")
      setData(response.data.products)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchdata();
  },[])

 
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <Protect/> ,
      children:[
        {
          path:"product",
          element:<>
          <div className="">
          <TextField inputRef={productName} id="outlined-basic" label="Product  Name" variant="outlined" />
          <Button onClick={handleSubmit} variant="contained">submit</Button>
          <Button onClick={()=>handleRemove(...row._id)} variant="contained" style={{marginLeft:"10px"}}>Remove</Button>
          {/* <Button onClick={()=>handleUpdate(...row._id)} variant="contained" style={{marginLeft:"10px"}}>Update</Button> */}
          </div>


          <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders data={data} />
                </Paper>
              </Grid>
          </>
        }
      ]
    },
    {
      path: "/signinside",
      element:  <SignInSide/> ,
    },
    {
      path: "/signup",
      element:  <SignUp/> ,
    },
  ]);

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
