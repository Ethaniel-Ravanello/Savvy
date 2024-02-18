"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";

const MyModal = dynamic(() => import("@/components/Modal"));

import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [myModal, setMyModal] = useState({
    isOpen: false,
    header: "",
    body: "",
    button: "",
    isRedirect: false,
    href: "",
  });

  const newUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/signup`,
        {
          firstName: firstName,
          lastName: lastName,
          country: country,
          email: email,
          password: password,
          gender: gender,
        }
      );
      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("Id", response.data.userId);
      setMyModal({
        isOpen: true,
        header: "Succes",
        body: response.data.message,
        button: "Close",
        isRedirect: true,
        href: "",
      });
    } catch (error: any) {
      console.log(error);
      setMyModal({
        isOpen: true,
        header: "Error",
        body: error.data.message,
        button: "Close",
        isRedirect: false,
        href: "",
      });
    }
  };

  const handleSubmit = () => {
    newUser();
  };
  return (
    <>
      <div className="py-5 mx-auto w-[30%]">
        <MyModal myModal={myModal} setMyModal={setMyModal} />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-Highlight rounded-lg shadow text-white  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
                Create An Account
              </h1>
              <form
                className="space-y-4 md:space-y-4"
                action="#"
                autoComplete="off"
              >
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    First Name
                  </label>
                  <input
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Country"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Country
                  </label>
                  <input
                    name="Country"
                    id="Country"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    name="Email"
                    id="Email"
                    autoComplete="off"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white "
                  >
                    Password
                  </label>
                  <div className=" relative flex">
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {showPass ? (
                      <BsFillEyeFill
                        onClick={() => setShowPass(!showPass)}
                        className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer text-black"
                      />
                    ) : (
                      <BsFillEyeSlashFill
                        onClick={() => setShowPass(!showPass)}
                        className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer text-black"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="Gender"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Gender
                  </label>
                  <select
                    id="Gender"
                    onChange={(e) => setGender(e.target.value)}
                    className=" bg-Highlight border-0 border-b-2 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-Highlight dark:border-b-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full text-white  bg-primary active:bg-primary-click hover:bg-primary-hover focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-white">
                  Already Have An Account?
                  <Link
                    className="font-medium text-primary-600 hover:underline ml-2"
                    href="/login"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
