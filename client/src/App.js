import React, { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';



const App = () => {


  const {loading} = useSelector(state=>state.loaders);




  return (
    <div>
    {
      loading && <Spinner />
    }
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
          </Routes>  
      </BrowserRouter>
    </div>


  )
}

export default App;


