import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useRouter();

  const handleSignOut = () => {
    localStorage.clear();
    navigate.push("/login");
  };
  return (
    <div className="bg-Highlight w-[250px] h-[calc(100vh-30px)] text-white rounded-[40px] px-4 py-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-400">
      <div className="mx-auto w-fit pb-5 pt-2">
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
            <Link
              href="/"
              className="flex w-full hover:bg-[#222222] rounded-lg"
            >
              <li className="flex p-3">
                <div className="bg-[#222222] rounded-full">
                  <AiFillHome className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Dashboard</p>
              </li>
            </Link>

            <Link
              href="/setting"
              className="flex hover:bg-[#222222] rounded-lg"
            >
              <li className="flex hover:bg-[#222222] p-3 ">
                <div className="bg-[#222222] rounded-full">
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
              className="flex hover:bg-[#222222] rounded-lg"
            >
              <li className="flex p-3">
                <div className="bg-[#222222] rounded-full">
                  <TbPigMoney className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">History</p>
              </li>
            </Link>

            <Link
              href="/incomes"
              className="flex rounded-lg hover:bg-[#222222]"
            >
              <li className="flex p-3">
                <div className="bg-[#222222] rounded-full">
                  <MdAttachMoney className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Incomes</p>
              </li>
            </Link>

            <Link
              href="/expenses"
              className="flex rounded-lg hover:bg-[#222222]"
            >
              <li className="flex p-3">
                <div className="bg-[#222222] rounded-full">
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
