"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import { BsHouse } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";

import { GoPerson } from "react-icons/go";

const BottomBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login" || pathname === "/register") {
    return null; // Don't render the Sidebar component
  }

  return (
    <div className="w-full bottom-0 fixed bg-primary-900 rounded-t-lg h-[50px] lg:hidden">
      <div className="w-full flex justify-between px-5 mt-1.5">
        <BsHouse
          onClick={() => router.push("/")}
          className={`${
            pathname === "/" ? "text-white" : "text-primary-700"
          } w-6 h-6 my-auto`}
        />
        {/* <GoPerson
          onClick={() => router.push("/setting")}
          className={`${
            pathname === "/setting" ? "text-white" : "text-primary-700"
          } w-6 h-6 my-auto`}
        /> */}
        <div
          onClick={() => {
            router.push("/login");
            localStorage.clear();
          }}
          className="p-2 rounded-full"
        >
          <VscSignOut className="w-6 h-6 text-primary-700" />
        </div>
        <IoMdArrowRoundDown
          onClick={() => router.push("/expenses")}
          className={`${
            pathname === "/expenses" ? "text-white" : "text-primary-700"
          } w-6 h-6 my-auto`}
        />
        <IoMdArrowRoundUp
          onClick={() => router.push("/incomes")}
          className={`${
            pathname === "/incomes" ? "text-white" : "text-primary-700"
          } w-6 h-6 my-auto`}
        />
      </div>
    </div>
  );
};

export default BottomBar;
