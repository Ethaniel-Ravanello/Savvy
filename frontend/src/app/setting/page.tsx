"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useExpiredToken, useUserId } from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

import Layout from "@/app/components/layout";

const page = () => {
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
  const navigate = useRouter();
  const isExpired = useExpiredToken();

  const getUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${userId}`);
      setUser({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        country: res.data.country,
        email: res.data.email,
        password: "",
        gender: res.data.gender,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/user/${userId}`, user);
      getUserData();
      setUser(res.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User data updated successfully!",
      });
      setUser({ ...res.data, password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isExpired) {
      navigate.push("/login");
      localStorage.clear();
    }
  });

  useEffect(() => {
    getUserData();
  }, []);

  console.log(user);

  return (
    <Layout>
      <div className="text-white lg:h-[calc(100vh-30px)] w-full md:bg-Highlight rounded-[30px] p-10 lg:ml-5">
        <h1 className="text-2xl mb-5">Edit Your Profile</h1>

        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="emailJgnSama"
              value={user.email}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="false"
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="firstName"
                id="floating_first_name"
                onChange={handleChange}
                value={user.firstName}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="firstName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="lastName"
                id="floating_last_name"
                onChange={handleChange}
                value={user.lastName}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="lastName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>

          <div className="grid">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="country"
                id="country"
                onChange={handleChange}
                value={user.country}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="off"
                required
              />
              <label
                htmlFor="country"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Country
              </label>
            </div>
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

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              autoComplete="new-password"
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter Password To Continue
            </label>
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
            className="text-white bg-primary active:bg-primary-click disabled:cursor-not-allowed hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Update Profile
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default page;
