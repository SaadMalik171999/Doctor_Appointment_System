import React from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="h-[100vh]">
        <div className="flex h-[97vh]">
          <SideBar className=" " />
          <div className="h-full w-full mx-2">
            <Navbar className="" />
            <div className=" min-h-screen bg-slate-200">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
