import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import API from "../components/API";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      var response = await axios.post(`${API}/api/v1/user/login`, values);

      setInterval( async () => {
        await dispatch(hideLoading());
      }, 3000);
      
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        message.error(response.data.message);
      }
      form.resetFields();
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(hideLoading());
      form.resetFields();
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#001529",
        }}
      >
        <div className="flex flex-wrap items-center justify-center h-screen">
          <div className="flex items-center justify-evenly rounded-md	drop-shadow-2xl sm:py-10 sm:px-10	 bg-white py-0 px-0">
            <div
              style={{
                color: "#1677ff",
              }}
              className="  text-5xl font-serif mb-12  "
            >
              <h1>Login Form</h1>
            </div>

            <div className="w-[40rem]">
              <Form
                className=""
                name="basic"
                form={form}
                labelCol={{
                  span: 10,
                }}
                wrapperCol={{
                  span: 20,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinishHandler}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  className="font-bold	 "
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input type="email" required />
                </Form.Item>

                <Form.Item
                  className="font-bold	 "
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 12,
                  }}
                >
                  <Link to="/register" className="mr-2">
                    Don't have an account? Register Now
                  </Link>
                  <Button type="primary" danger htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
