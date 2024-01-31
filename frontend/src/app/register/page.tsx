"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

interface ApiResponse {
  status: number;
  message: string;
}

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState<ApiResponse>({
    status: 0,
    message: "",
  });

  const navigate = useRouter();

  const newUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        firstName: firstName,
        lastName: lastName,
        country: country,
        email: email,
        password: password,
        gender: gender,
      });
      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("Id", response.data.userId);
      setMessage(response.data.message);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      navigate.push("/");
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data);
      setShowModal(true);
      setIsError(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  };
  console.log(message);
  const handleSubmit = () => {
    newUser();
  };
  return (
    <>
      {showModal &&
        isError &&
        (message.status === 400 || message.status === 500) && (
          <div
            id="alert-2"
            className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 sticky ml-auto w-[30%] mr-5 mt-5 right-0 top-5 transition ease-in-out duration-300"
            role="alert"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium">{message.message}</div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
              data-dismiss-target="#alert-2"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        )}

      {showModal && !isError && (
        <div
          id="alert-3"
          className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 sticky ml-auto w-[30%] mr-5 mt-5 right-0 top-5 transition ease-in-out duration-300"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>

          <div className="ml-3 text-sm font-medium">{message.message}</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-3"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="py-5 -mt-[5rem]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-Highlight rounded-lg shadow text-white  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
                Create An Account
              </h1>
              <form className="space-y-4 md:space-y-4" action="#">
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
