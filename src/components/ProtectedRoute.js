import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import API from '../components/API'

const ProtectedRoute = ({ children }) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUsers = async () => {
    try {
      dispatch(showLoading());
      var response = await axios.post(
        `${API}/api/v1/user/getUserData`,
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if(response.data.success){
        dispatch(setUser(response.data.data));
      }
      else{
        <Navigate to="/login" />
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if(!user){
getUsers();
    }
  }, [user,getUsers])
  
  

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
