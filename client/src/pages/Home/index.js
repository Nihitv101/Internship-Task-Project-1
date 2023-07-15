import { useEffect } from "react"

import {useNavigate} from 'react-router-dom'

import { Button } from "antd";



const Home = () => {


    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    },[])
    
    
  return (
    <div className= "border border-solid m-4 p-6 flex justify-between items-center bg-gray-300"> 
        <h1 className="text-2xl ">Home Page</h1>

        <div>

        <Button onClick={()=>{
            localStorage.removeItem('token');
            window.location.reload();
        }} type="primary" className="bg-red-500">Logout
        </Button>

        </div>
    </div>
  )
}

export default Home;
