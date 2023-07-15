import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";

import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/loaderSlice";

const getInputValidations = () => {
  return [
    {
      required: true,
      message: "This field is required",
    },
  ];
};

const Register = () => {

    const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {

        dispatch(setLoading(true));
        const response = await RegisterUser({
            ...values,
            type: type,
        });
        
        dispatch(setLoading(false));

      if (response?.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
     dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [type, setType] = useState("customer");

  return (
<div className="flex h-screen items-center justify-center bg-primary">
  <Form
    layout="vertical"
    className="bg-white rounded shadow grid grid-cols-1 p-5 gap-5 w-full sm:w-1/2 md:w-2/3 lg:w-1/2 xl:w-1/3"
    onFinish={onFinish}
  >
    <h1 className="uppercase text-2xl">
      <span className="text-primary">
        {type.toUpperCase()}-Registration
      </span>
      <hr />
    </h1>

    {/* radio group for changing between different routes */}
    <Radio.Group
      onChange={(e) => setType(e.target.value)}
      value={type}
      className="col-span-1"
    >
      <Radio value="customer">Customer</Radio>
      <Radio value="admin">Admin</Radio>
    </Radio.Group>

    {/* Form Item */}
    <Form.Item
      label="First Name"
      name="firstName"
      rules={getInputValidations()}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Last Name"
      name="lastName"
      rules={getInputValidations()}
    >
      <Input />
    </Form.Item>

    <Form.Item label="Email" name="email" rules={getInputValidations()}>
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={getInputValidations()}
    >
      <Input type="password" />
    </Form.Item>

    <Button
      type="primary"
      className="col-span-1 bg-primary"
      block
      htmlType="submit"
    >
      Register
    </Button>

    <Link to={"/login"} className="col-span-1 text-center">
      Already have an account? Login
    </Link>
  </Form>
</div>

  );
};

export default Register;
