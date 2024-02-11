import dynamic from "next/dynamic";
import React from "react";

const Sidebar = dynamic(() => import("./Sidebar"));
const BottomBar = dynamic(() => import("./BottomBar"));

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" lg:flex m-0 lg:p-3">
      <div className="hidden lg:block h-[calc(100vh-30px)] Please Bisa">
        <Sidebar />
      </div>

      {children}
      <BottomBar />
    </div>
  );
};

export default Layout;
