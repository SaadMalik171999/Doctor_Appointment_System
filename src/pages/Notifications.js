import React from "react";
import Layout from "../components/Layout";
import { message, Tabs } from "antd";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import API from "../components/API";
import { useNavigate } from "react-router-dom";

const onChange = (key) => {
  // console.log(key);
  if (key === "1") {
    // alert(`Hello ${key}`);
  } else {
    // alert(`Hello ${key}`);
  }
};

const Notifications = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      var response = await axios.post(
        `${API}/api/v1/doctor/get-all-notification`,
        { userId: user._id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setInterval(async () => {
        await dispatch(hideLoading());
      }, 3000);
      if (response.data.success) {
        message.success(response.data.message);
        navigate('/');
      } else {
        message.error(response.data.message);
      }
      // window.location.reload();

    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const handleMarkAllDelete = async () => {
    try {
      dispatch(showLoading());
      var response = await axios.post(
        `${API}/api/v1/doctor/delete-all-seen-notification`,
        { userId: user._id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setInterval(async () => {
        await dispatch(hideLoading());
      }, 3000);
      if (response.data.success) {
        message.success(response.data.message);
        navigate('/');
      } else {
        message.error(response.data.message);
      }
      // window.location.reload();

    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  return (
    <Layout>
      <h1 className="flex items-center justify-center font-bold text-4xl pt-8 text-sky-600">
        All Notifications 
      </h1>
      <Tabs
        className="p-5"
        onChange={onChange}
        type="card"
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1);
          const titleName = ["UnRead", "Read"];
          return {
            label: titleName[i],
            key: id,
            children: (
              <>
                {id === "1" ? (
                  <>
                    <div className= {`flex items-end justify-end text-lg font-bold cursor-pointer`}
                     >
                      <button className= {`${user?.notification.length > 0 ? "text-gray-900" : "text-gray-400 cursor-no-drop" }`} onClick={handleMarkAllRead} disabled = {!user?.notification.length > 0 ? true : false}
                      >Mark All Read</button>
                    </div>
                    <div className=" pt-5 h-[50vh] flex flex-wrap lg:ml-16">
                      {user?.notification.map((notificationmsgs, idnew) => (
                        <div
                          key={idnew}
                          className=" bg-gray-100 sm:w-full md:w-full lg:w-5/12 
                            flex items-center p-5 mx-5 my-2 h-4 rounded-xl font-semibold drop-shadow-xl	"
                        >
                          <IoNotificationsCircleOutline className="search text-xl mr-2" />
                          <div className="flex-1 text-zinc-400">
                            {notificationmsgs.data.name}
                          </div>
                          <div>{notificationmsgs.message}</div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className= {`flex items-end justify-end text-lg font-bold cursor-pointer`}
                     >
                      <button className= {`${user?.seennotification.length > 0 ? "text-gray-900" : "text-gray-400 cursor-no-drop" }`} onClick={handleMarkAllDelete} disabled = {!user?.seennotification.length > 0 ? true : false}
                      >Delete All Read</button>
                    </div>
                    <div className=" pt-5 h-[50vh] flex flex-wrap lg:ml-16">
                      {user?.seennotification.map((notificationmsgs, idnew) => (
                        <div
                          key={idnew}
                          className=" bg-gray-100 sm:w-full md:w-full lg:w-5/12 
                            flex items-center p-5 mx-5 my-2 h-4 rounded-xl font-semibold drop-shadow-xl	"
                        >
                          <IoNotificationsCircleOutline className="search text-xl mr-2" />
                          <div className="flex-1 text-zinc-400">
                            {notificationmsgs.data.name}
                          </div>
                          <div>{notificationmsgs.message}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ),
          };
        })}
      />
    </Layout>
  );
};

export default Notifications;
