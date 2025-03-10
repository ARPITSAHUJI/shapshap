"use client"
import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Oval
        height="50"
        width="50"
        color="blue"
        ariaLabel="loading"
        wrapperClass="w-full h-full flex justify-center items-center "
      />
    </div>
  );
};

export default Loader;
