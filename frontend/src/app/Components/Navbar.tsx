import React from "react";
import Link from "next/link";

import { RxCross1 } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";

const Navbar = ({ isOpen, setIsOpen }: any) => {
  return (
    <>
      <div className="bg-black/50 h-full w-full absolute"></div>
      <div className="h-full w-[300px] bg-Highlight z-20 absolute p-5 text-white">
        <RxCross1
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto w-7 h-7 mb-7 mt-8"
        />
        <h2 className="text-xl font-semibold">Welcome Back, Maleficent</h2>
        <div className="w-full h-[2px] bg-[#2f2f2f] mt-5"></div>

        <div className="mt-5">
          <h2 className="text-white font-semibold text-2xl mb-4">Home</h2>

          <ul className="text-lg">
            <li className="flex mb-3">
              <Link href="/" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <AiFillHome className="m-2.5" />
                </div>
                <p className="pt-1 ml-3">Dashboard</p>
              </Link>
            </li>

            <li className="flex mb-2">
              <Link href="/" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <BsFillPersonFill className="m-2.5" />
                </div>
                <p className="pt-1 ml-3">Settings</p>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-white font-semibold text-2xl mb-4">
            Transactions
          </h2>

          <ul className="text-lg">
            <li className="flex mb-3">
              <Link href="/" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <TbPigMoney className="m-2.5" />
                </div>
                <p className="pt-1 ml-3">History</p>
              </Link>
            </li>

            <li className="flex mb-2">
              <Link href="/" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <MdAttachMoney className="m-2.5" />
                </div>
                <p className="pt-1 ml-3">Incomes</p>
              </Link>
            </li>

            <li className="flex mb-2">
              <Link href="/" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <MdMoneyOff className="m-2.5" />
                </div>
                <p className="pt-1 ml-3">Expense</p>
              </Link>
            </li>
          </ul>
        </div>

        <div className=" bg-[#222222] mt-10 rounded-[20px] py-5">
          <p className="w-fit mx-auto text-xl font-semibold">Sign Out</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
