"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import Spinner from "@/components/spinner";

import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useRouter();

  const postLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/login`,
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("Id", response.data.userId);
      navigate.push("/");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    postLogin();
  };
  return (
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-3xl font-semibold text-white"
          >
            Savvy
          </a>
          <div className="w-full bg-Highlight rounded-lg shadow text-white  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
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
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className={`w-full text-white flex justify-center ${
                    isLoading ? "bg-slate-700" : "bg-primary"
                  }  active:bg-primary-click hover:bg-primary-hover focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  <p
                    className={` ${
                      isLoading ? "text-gray-400 ml-10" : "text-white"
                    }`}
                  >
                    Sign in
                  </p>
                  {isLoading ? (
                    <Spinner className="text-neutral-100 w-5 h-5 ml-5" />
                  ) : (
                    ""
                  )}
                </button>
                <p className="text-sm font-light text-white">
                  Dont Have An Account Yet?
                  <Link
                    className="font-medium text-primary-600 hover:underline ml-2"
                    href="/register"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
