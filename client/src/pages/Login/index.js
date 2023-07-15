import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, message } from "antd";
import { Link , useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';


import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/loaderSlice';




const getInputValidations = ()=>{
  return [
      {
          required:true,
          message:"This field is required",
      }
  ]
}


const Login = () => {

  const dispatch = useDispatch();



  const navigate = useNavigate();

  const onFinish= async(values)=>{
    try{
      dispatch(setLoading(true))
      const response = await LoginUser({
        ...values,
        type:type,
      })

      dispatch(setLoading(false))


      // console.log("myresponse",response);

      
      if(response?.success){
        message.success(response.message);

        localStorage.setItem('token', response.data);
        window.location.reload();
      }
      else{
        throw new Error(response.message);
      }
    }
    catch(error){
      dispatch(setLoading(false))
      message.error(error.message);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);


  const [type, setType] = useState("admin");



  return (
<div className='flex h-screen items-center justify-center bg-primary'>
  <Form
    layout='vertical'
    className='bg-white rounded shadow grid grid-cols-1 p-5 gap-5 w-full sm:w-[50%]'
    onFinish={onFinish}
  >
    <h1 className="uppercase text-2xl">
      <span className="text-primary">{type.toUpperCase()} - Login</span>
      <hr />
    </h1>

    {/* radio group for changing between different routes */}
    <Radio.Group
      onChange={(e) => setType(e.target.value)}
      value={type}
      className="col-span-1"
    >
      <Radio value="admin">Admin</Radio>
    </Radio.Group>

    {/* Form Item */}
    <Form.Item label="Email" name="email" rules={getInputValidations()}>
      <Input />
    </Form.Item>

    <Form.Item label="Password" name="password" rules={getInputValidations()}>
      <Input type="password" />
    </Form.Item>

    <Button
      type="primary"
      className="col-span-1 bg-primary"
      block
      htmlType="submit"
    >
      Login
    </Button>

    <Link to={"/register"} className="text-center">
      Don't have an account? Register
    </Link>
  </Form>
</div>

  )
}

export default Login;
