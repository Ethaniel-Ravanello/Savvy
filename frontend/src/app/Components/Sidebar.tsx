import React from "react";
import Link from "next/link";
import Image from "next/image";

import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className="bg-Highlight w-[250px] h-[calc(100vh-30px)] text-white rounded-[40px] px-4 py-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-400">
      <div className="mx-auto w-fit py-5">
        {/* <CgProfile className="mx-auto w-20 h-20 mb-8 mt-3" /> */}
        <h2 className="text-2xl font-semibold">Hello, Ethan</h2>
      </div>

      <div className="px-10">
        <div className="w-full h-[2px] bg-[#2f2f2f]"></div>
      </div>

      <div className="mt-5">
        <div>
          <h2 className="text-white font-semibold text-2xl mb-2">Home</h2>

          <ul className="text-lg">
            <li className="flex hover:bg-white p-3 rounded-lg">
              <Link href="/" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <AiFillHome className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Dashboard</p>
              </Link>
            </li>
            <li className="flex mb-2 hover:bg-white p-3 rounded-lg">
              <Link href="/setting" className="flex hover:bg-white">
                <div className="bg-[#222222] rounded-full">
                  <BsFillPersonFill className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Settings</p>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-5">
          <h2 className="text-white font-semibold text-2xl mb-2">
            Transactions
          </h2>

          <ul className="text-lg">
            <li className="flex hover:bg-white p-3 rounded-lg">
              <Link href="/history" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <TbPigMoney className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">History</p>
              </Link>
            </li>

            <li className="flex hover:bg-white p-3 rounded-lg">
              <Link href="/" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <MdAttachMoney className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Incomes</p>
              </Link>
            </li>

            <li className="flex hover:bg-white p-3 rounded-lg">
              <Link href="/" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <MdMoneyOff className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Expense</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-fit mx-auto bg-[#222222] rounded-[20px] mb-auto py-3 px-5 relative mt-3">
        <p className="mx-auto text-xl font-semibold">Sign Out</p>
      </div>
    </div>
  );
};

export default Sidebar;
