import { Col, Form, Row, Input, TimePicker, Button, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import API from "../components/API";
import axios from "axios";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    // console.log(...values," without spread");
    console.log(values," with spread");
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${API}/api/v1/doctor/apply-doctor`,
        { ...values, userId: user._id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setInterval(async () => {
        await dispatch(hideLoading());
      }, 3000);

      if (res?.data?.success) {
        message.success(res?.data?.message);
        navigate("/");
      } else {
        message.error(res?.data?.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
      <h1 className="flex items-center justify-center font-bold text-4xl pt-8 text-sky-600">
        Apply Doctor
      </h1>

      <Form className="p-5" layout="vertical" onFinish={handleFinish}>
        <section>
          <h4 className="font-bold text-2xl pl-1">Personal Details</h4>
          <Row>
            <Col className="p-1" xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>

            <Col className="p-1" xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>

            <Col className="p-1" xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone Number"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your phone number" />
              </Form.Item>
            </Col>

            <Col className="p-1" xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your email" />
              </Form.Item>
            </Col>

            <Col className="p-1" xs={24} md={24} lg={8}>
              <Form.Item
                label="Website"
                name="website"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your website" />
              </Form.Item>
            </Col>

            <Col className="p-1" xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your address" />
              </Form.Item>
            </Col>
          </Row>
        </section>

        <section>
          <h4 className="font-bold text-2xl pl-1">Professional Details</h4>
          <Row>
            <Col className="p-1" xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>

            <Col className="p-1" xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your experience" />
              </Form.Item>
            </Col>

            <Col className="p-1" xs={24} md={10} lg={8}>
              <Form.Item
                label="Fees"
                name="feesPerConsultation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your fees" />
              </Form.Item>
            </Col>

            <Col className="p-1" xs={24} md={24} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                required
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker className=" w-full" />
              </Form.Item>
            </Col>
          </Row>
          <Button
            className=" float-right "
            type="primary"
            danger
            htmlType="submit"
          >
            Submit
          </Button>
        </section>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
