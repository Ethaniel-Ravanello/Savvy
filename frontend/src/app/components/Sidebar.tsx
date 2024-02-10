"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const [userName, setUserName] = useState("");

  const navigate = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    localStorage.clear();
    navigate.push("/login");
  };
  return (
    <div className="bg-Highlight w-[250px] h-[calc(100vh-30px)] text-white rounded-[40px] px-4 py-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-400">
      <div className="mt-5">
        <div>
          <h2 className="text-white font-semibold text-2xl mb-2">Home</h2>

          <ul className="text-lg">
            <Link
              href="/"
              className="flex w-full  rounded-lg hover:bg-[#222222]"
            >
              <li className="flex p-3">
                <div
                  className={`rounded-full ${
                    pathname === "/" ? "bg-Secondary" : "bg-[#222222]"
                  }`}
                >
                  <AiFillHome className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Dashboard</p>
              </li>
            </Link>

            <Link
              href="/setting"
              className="flex w-full  rounded-lg hover:bg-[#222222]"
            >
              <li className="flex p-3 ">
                <div
                  className={`rounded-full ${
                    pathname === "/setting" ? "bg-Secondary" : "bg-[#222222]"
                  }`}
                >
                  <BsFillPersonFill className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Settings</p>
              </li>
            </Link>
          </ul>
        </div>

        <div className="mt-5">
          <h2 className="text-white font-semibold text-2xl mb-2">
            Transactions
          </h2>

          <ul className="text-lg">
            <Link
              href="/history"
              className="flex w-full  rounded-lg hover:bg-[#222222]"
            >
              <li className="flex p-3">
                <div
                  className={`rounded-full ${
                    pathname === "/history" ? "bg-Secondary" : "bg-[#222222]"
                  }`}
                >
                  <TbPigMoney className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">History</p>
              </li>
            </Link>

            <Link
              href="/incomes"
              className="flex w-full  rounded-lg hover:bg-[#222222]"
            >
              <li className="flex p-3">
                <div
                  className={`rounded-full ${
                    pathname === "/income" ? "bg-Secondary" : "bg-[#222222]"
                  }`}
                >
                  <MdAttachMoney className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Incomes</p>
              </li>
            </Link>

            <Link
              href="/expenses"
              className="flex w-full  rounded-lg hover:bg-[#222222]"
            >
              <li className="flex p-3">
                <div
                  className={`rounded-full ${
                    pathname === "/expense" ? "bg-Secondary" : "bg-[#222222]"
                  }`}
                >
                  <MdMoneyOff className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Expense</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div
        onClick={handleSignOut}
        className="mt-5 ml-2 flex hover:underline hover:text-gray-500 hover:cursor-pointer w-fit absolute bottom-10"
      >
        <FaSignOutAlt className="w-5 h-5 mt-0.5 mr-3" />
        <span className="">Sign Out</span>
      </div>
    </div>
  );
};

export default Sidebar;
