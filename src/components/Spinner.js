import React from "react";
import BarLoader from "react-spinners/BarLoader";

const Spinner = () => {
  return (
    <>
      <div className="flex items-center justify-center h-[100vh] absolute w-[100vw] bg-slate-200 z-10">
        <BarLoader color="#1677ff" />
      </div>
    </>
  );
};

export default Spinner;
