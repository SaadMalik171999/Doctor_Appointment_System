import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector } from "react-redux";

import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

import { Button, Menu } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const userItems = [
  getItem("Home", "", <PieChartOutlined />),
  getItem("Appointments", "appointments", <DesktopOutlined />),
  getItem("Apply Doctor", "apply-doctor", <ContainerOutlined />),
  getItem("Profile", "profile", <ContainerOutlined />),
];

const adminItems = [
  getItem("Home", "", <PieChartOutlined />),
  getItem("Doctors", "doctors", <DesktopOutlined />),
  getItem("Users", "users", <ContainerOutlined />),
  getItem("Profile", "profile", <ContainerOutlined />),
];
const SideBar = () => {

  const { user } = useSelector((state) => state.users);
  const sideBarItems = user?.isAdmin ? adminItems : userItems;

  const navigatePageFunction = (e) => {
    navigate(`/${e.key}`);
  };

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <div style={{ backgroundColor: "#001529"}}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            margin: 10,
            backgroundColor: "#1677ff",
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      {/* h-screen  */}
      <Menu
        style={{ transition: "0.5s linear" }}
        className={` h-screen ${!collapsed ? "w-[200px]" : "w-[70px]"}`}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={sideBarItems}
        onClick={navigatePageFunction}
      />
    </div>
  );
};
export default SideBar;
