"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import { useExpiredToken, useUserId } from "@/hooks/useToken";
import axios from "axios";

import Layout from "@/components/Layout";

const MyModal = dynamic(() => import("@/components/Modal"));

const Page = () => {
  const [myModal, setMyModal] = useState({
    isOpen: false,
    header: "",
    body: "",
    button: "",
    isRedirect: false,
    href: "",
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const userId = useUserId();
  const isExpired = useExpiredToken();

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/user/${userId}`
      );
      setUser({
        firstName: res.data.data.firstName,
        lastName: res.data.data.lastName,
        country: res.data.data.country,
        email: res.data.data.email,
        password: "",
        gender: res.data.data.gender,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/user/${userId}`,
        user
      );
      getUserData();
      setUser(res.data);
      setUser({ ...res.data, password: "" });
      setMyModal({
        isOpen: true,
        header: "Success!",
        body: "Succesfuly Update User Profile",
        button: "Close",
        isRedirect: false,
        href: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isExpired) {
      setMyModal({
        isOpen: true,
        header: "Session Expired",
        body: "Your Session Has Expired Please Login Again.",
        button: "Close",
        isRedirect: true,
        href: "/login",
      });
      localStorage.clear();
    }
  }, [isExpired]);

  useEffect(() => {
    getUserData();
  });

  return (
    <Layout>
      <MyModal myModal={myModal} setMyModal={setMyModal} />
      <div className="text-white lg:h-[calc(100vh-30px)] w-full md:bg-Highlight rounded-[30px] p-8 lg:ml-5">
        <h1 className="text-2xl mb-5">Edit Your Profile</h1>

        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="Hehe-emailJgnSama"
              onChange={handleChange}
              value={user.email}
              autoComplete="new-email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="Hehe-firstName"
                onChange={handleChange}
                value={user.firstName}
                autoComplete="new-firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Last Name Name
              </label>
              <input
                type="text"
                name="lastName"
                id="Hehe-lastName"
                onChange={handleChange}
                value={user.lastName}
                autoComplete="new-firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              onChange={handleChange}
              value={user.country}
              autoComplete="new-country"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Select your Gender
            </label>
            <select
              id="gender"
              name="gender"
              onChange={handleChange}
              value={user.gender}
              className=" bg-Highlight border-0 border-b-2 text-gray-900 text-sm autofill:bg-transparent focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-Highlight dark:border-b-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Enter Password To Continue{" "}
            </label>
            <input
              type="password"
              name="password"
              id="Hehe-Password"
              onChange={handleChange}
              autoComplete="new-password"
              className="bg-gray-50 border Please border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={
              user.firstName === "" ||
              user.lastName === "" ||
              user.gender === "" ||
              user.password === "" ||
              user.country === "" ||
              user.email === ""
            }
            className="text-white bg-primary active:bg-primary-click disabled:cursor-not-allowed hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-10 lg:mb-0"
          >
            Update Profile
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Page;
