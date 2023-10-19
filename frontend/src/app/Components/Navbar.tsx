"use client";
import Reac, { useState } from "react";
import Link from "next/link";

import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";

const Navbar = () => {
  return (
    <>
      <GiHamburgerMenu className="text-white w-8 h-8 absolute z-10 mt-3 ml-5" />
      <div className="bg-black/50 h-screen w-full absolute"></div>
      <div className="h-screen w-[300px] bg-Highlight z-20 absolute p-5 text-white">
        <RxCross1 className="ml-auto w-7 h-7 mb-10" />
        <h2 className="text-xl font-semibold">Welcome Back, Ethan</h2>
        <div className="w-full h-[2px] bg-[#2f2f2f] mt-5"></div>

        <div className="mt-5">
          <h2 className="text-white font-semibold text-2xl mb-4">Home</h2>

          <ul className="text-lg">
            <li className="flex mb-3">
              <Link href="/" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <AiFillHome className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Dashboard</p>
              </Link>
            </li>
            <li className="flex mb-2">
              <Link href="/" className="flex">
                <div className="bg-[#222222] rounded-full">
                  <BsFillPersonFill className="m-2.5" />
                </div>
                <p className="pt-1.5 ml-3">Settings</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
