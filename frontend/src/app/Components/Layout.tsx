"use client";
import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { GiHamburgerMenu } from "react-icons/gi";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <GiHamburgerMenu
        onClick={() => setIsOpen(!isOpen)}
        className="text-white w-8 h-8 absolute z-10 md:mt-5 ml-5 lg:hidden"
      />
      <div
        className={
          isOpen
            ? "fixed top-0 -mt-[2rem] inset-0 duration-300 z-20"
            : "fixed top-0 -mt-[2rem] left-[-300px] duration-300 z-20"
        }
      >
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="md:p-3 lg:flex  mx-auto">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
