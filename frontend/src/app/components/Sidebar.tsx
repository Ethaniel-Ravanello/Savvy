"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import {
  MdOutlineAttachMoney,
  MdOutlineMoneyOffCsred,
  MdDashboard,
} from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    localStorage.clear();
    navigate.push("/login");
  };

  if (pathname === "/login" || pathname === "/register") {
    return null; // Don't render the Sidebar component
  }
  return (
    <div className="bg-Highlight w-[350px] h-[calc(100vh-30px)] text-white rounded-[40px] px-4 py-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-400">
      <div>
        <div>
          <h2 className="text-white text-4xl mb-5 ml-3">Savvy</h2>

          <ul className="text-lg">
            <Link
              href="/"
              className={`flex w-full  rounded-lg hover:bg-[#222222] ${
                pathname === "/" ? "bg-[#222222]" : ""
              } my-3 p-3`}
            >
              <li className="flex">
                <MdDashboard
                  className={`text-3xl ${
                    pathname === "/" ? "text-white" : "text-primary-400"
                  }`}
                />
                <p
                  className={`ml-3 mt-0.5 ${
                    pathname === "/" ? "text-white" : "text-primary-400"
                  }`}
                >
                  Dashboard
                </p>
              </li>
            </Link>

            <Link
              href="/incomes"
              className={`flex w-full  rounded-lg hover:bg-[#222222] ${
                pathname === "/incomes" ? "bg-[#222222]" : ""
              } my-3 p-3`}
            >
              <li className="flex">
                <MdOutlineAttachMoney
                  className={`text-3xl ${
                    pathname === "/incomes" ? "text-white" : "text-primary-400"
                  }`}
                />
                <p
                  className={`ml-3 mt-0.5 ${
                    pathname === "/incomes" ? "text-white" : "text-primary-400"
                  }`}
                >
                  Income
                </p>
              </li>
            </Link>

            <Link
              href="/expenses"
              className={`flex w-full  rounded-lg hover:bg-[#222222] ${
                pathname === "/expenses" ? "bg-[#222222]" : ""
              } my-3 p-3`}
            >
              <li className="flex">
                <MdOutlineMoneyOffCsred
                  className={`text-3xl ${
                    pathname === "/expenses" ? "text-white" : "text-primary-400"
                  }`}
                />
                <p
                  className={`ml-3 mt-0.5 ${
                    pathname === "/expenses" ? "text-white" : "text-primary-400"
                  }`}
                >
                  Expense
                </p>
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div
        onClick={handleSignOut}
        className="mt-5 ml-10 flex hover:underline hover:text-gray-500 hover:cursor-pointer w-fit absolute bottom-5"
      >
        <FaSignOutAlt className="w-5 h-5 mt-0.5 mr-3" />
        <span className="">Sign Out</span>
      </div>
    </div>
  );
};

export default Sidebar;
