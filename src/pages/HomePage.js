import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from '../components/API'
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";

const HomePage = () => {

  const navigate = useNavigate();
const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserData = async () => {
    try {
     const response = await axios.post(`${API}/api/v1/user/getUserData`,{},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token"),},
        }
      );
      if(response.data.success){
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      localStorage.clear();
      navigate('/login');
    }
  };

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
    <Layout>
      <h1>HomePage</h1>
    </Layout>
    </>
  );
};

export default HomePage;
