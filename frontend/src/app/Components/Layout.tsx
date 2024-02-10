"use client";
import React, { useState } from "react";

import Sidebar from "./sidebar";
import BottomBar from "./bottomBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" lg:flex m-0 lg:p-3">
      <div className="hidden lg:block h-[calc(100vh-30px)]">
        <Sidebar />
      </div>

      {children}
      <BottomBar />
    </div>
  );
};

export default Layout;
