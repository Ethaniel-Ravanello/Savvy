"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useExpiredToken, useUserId } from "@/hooks/useToken";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import axios from "axios";

import { formatDate, converMongoDbDate } from "@/hooks/useDate";
import { useGetExpense, useGetTopExpense } from "@/libs/api";
import { NumericFormat } from "react-number-format";
import { formatCurrency } from "@/hooks/useCurrency";
import Card from "@/components/Card";

import { HiChevronDown } from "react-icons/hi";
import { BsGraphDownArrow } from "react-icons/bs";
import Spinner from "@/components/Spinner";
import ComboBox from "@/components/ComboBox";
import Skeleton from "@/components/Skeleton";

interface ExpenseType {
  transactionType: string;
  transactionCategory: {
    category: string;
  };
  transactionDescription: string;
  transactionDate: string;
  transactionAmount: any;
}

const ExpensePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExpenseType>();

  const userId = useUserId();
  const isExpired = useExpiredToken();
  const todayDateStr = new Date().toISOString().split("T")[0];
  const router = useRouter();

  const { expense, isLoadingExpense, errorExpense, mutateData } = useGetExpense(
    userId,
    isExpired
  );

  const { topExpense, errorTopExpense, isLoadingTopExpense, mutateDataTop } =
    useGetTopExpense(userId, isExpired);

  // const handleDelete = async (transactionId: any) => {
  //   try {
  //     await axios.delete(`${process.env.NEXT_PUBLIC_API}/expense`, {
  //       data: {
  //         ids: transactionId,
  //       },
  //     });
  //     mutateData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit: SubmitHandler<ExpenseType> = async (data, e: any) => {
    setIsLoadingCreate(true);
    console.log(data);
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/expense`, {
        userId: userId,
        transactionType: "Expense",
        transactionCategory: data.transactionCategory.category,
        transactionDescription: data.transactionDescription,
        transactionDate: converMongoDbDate(data.transactionDate),
        transactionAmount: parseInt(
          data?.transactionAmount?.replace("IDR", "").replace(/,/g, "")
        ),
      });
      setTimeout(() => {
        mutateData();
        mutateDataTop();
      }, 500);
      setIsLoadingCreate(false);
    } catch (error) {
      setIsLoadingCreate(false);
      console.log(error);
    }
  };

  if (isExpired) {
    router.push("/login");
    localStorage.clear();
  } else {
    return (
      <div className="w-full rounded-xl flex lg:ml-5">
        <div className="w-full xl:w-[70%] px-4 pt-4 lg:p-6">
          <h1 className="text-3xl font-bold text-white">Expenses</h1>

          <div className="bg-primary-900 w-full rounded-lg flex p-2 mt-5 xl:hidden">
            <div className="my-auto align-middle">
              <BsGraphDownArrow className="text-danger-400 w-8 h-8 2xl:w-10 2xl:h-10 my-auto align-middle mr-5" />
            </div>
            <div>
              <p className="text-lg 2xl:text-xl text-primary-400 font-semibold">
                Total Expense
              </p>
              <p className="text-xl 2xl:text-3xl text-primary-200 font-semibold">
                {formatCurrency(topExpense?.expenseAmount)}
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[95%] bg-primary-900 rounded-lg mt-10 p-2 lg:p-5 text-center items-center">
            <div className="flex justify-between">
              <h2
                className={`text-xl text-primary-200 font-semibold ${
                  isOpen ? "mb-5" : "mb-0"
                }`}
              >
                Add New Expense
              </h2>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#222222] w-8 h-8 rounded-full flex items-center justify-center hover:cursor-pointer"
              >
                <HiChevronDown className="text-white w-5 h-5" />
              </div>
            </div>

            {isOpen ? (
              <form onSubmit={handleSubmit(onSubmit)} className="block">
                <label className="text-white w-full flex justify-start">
                  Expense Amount
                </label>
                <Controller
                  control={control}
                  name="transactionAmount"
                  rules={{
                    required: "Please Input an Amount",
                  }}
                  render={({ field: { onChange, name, value } }) => {
                    console.log(value);
                    return (
                      <>
                        <NumericFormat
                          value={value}
                          name={name}
                          onChange={onChange}
                          placeholder="Enter The Expense Amount"
                          prefix="IDR "
                          thousandSeparator=","
                          className="shadow-sm border-2 border-transparent mt-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                        />
                        {value === "IDR 0" ? (
                          <p className="text-red-600 font-normal text-sm mb-5">
                            Amount Cant be 0
                          </p>
                        ) : null}
                      </>
                    );
                  }}
                />
                {errors.transactionAmount && (
                  <p className="text-red-600 font-normal text-sm mb-5">
                    Amount Cant Be Empty
                  </p>
                )}

                <label className="text-white w-full flex justify-start mt-5">
                  Expense Category
                </label>
                <Controller
                  name="transactionCategory"
                  control={control}
                  rules={{
                    required: "Please select a Category",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <ComboBox
                      value={value}
                      onChange={onChange}
                      options={[
                        { id: 1, category: "Traveling" },
                        { id: 2, category: "Gasoline" },
                        { id: 3, category: "Transportation" },
                        { id: 4, category: "Food and Drink" },
                        { id: 5, category: "Shopping" },
                        { id: 6, category: "Movies" },
                        { id: 7, category: "Vehicle" },
                        { id: 8, category: "Home" },
                        { id: 9, category: "Hangout" },
                        { id: 10, category: "Fixes" },
                        { id: 11, category: "Hobbies" },
                        { id: 12, category: "Education" },
                        { id: 13, category: "Utilities" },
                        { id: 14, category: "Rent" },
                        { id: 15, category: "Insurance" },
                        { id: 16, category: "Subscriptions" },
                        { id: 17, category: "Gift" },
                        { id: 18, category: "Loan" },
                      ]}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="transactionCategory"
                  render={({ message }) => (
                    <p className="text-red-600 font-normal text-sm mb-5">
                      {message}
                    </p>
                  )}
                />

                <label className="text-white mt-5 w-full flex justify-start">
                  Expense Description
                </label>
                <textarea
                  {...register("transactionDescription", {
                    required: "Please Input A Description",
                  })}
                  className="block w-full h-fit  text-black font-semibold p-2 pl-4 rounded-lg bg-transparent border-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                ></textarea>
                <ErrorMessage
                  errors={errors}
                  name="transactionDescription"
                  render={({ message }) => (
                    <p className="text-red-600 font-normal text-sm mb-5">
                      {message}
                    </p>
                  )}
                />

                <label className="text-white mt-5 w-full flex justify-start">
                  Expense Date
                </label>
                <input
                  type="date"
                  {...register("transactionDate", {
                    required: "Please Input A Date",
                  })}
                  className="block rounded-lg p-2 bg-transparent border-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                />
                <ErrorMessage
                  errors={errors}
                  name="transactionDate"
                  render={({ message }) => (
                    <p className="text-red-600 font-normal text-sm">
                      {message}
                    </p>
                  )}
                />
                <button
                  disabled={isLoadingCreate}
                  className={`${
                    isLoadingCreate ? "bg-primary-800" : "bg-white"
                  } text-black rounded-lg py-1.5 px-2 my-5 font-medium flex`}
                >
                  <p className="mt-0.5">Submit</p>
                  {isLoadingCreate ? (
                    <div className=" ml-3 mt-1">
                      <Spinner className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              </form>
            ) : null}
          </div>

          <section className="mt-5 h-[calc(100vh-12rem)] lg:h-[calc(100vh-20rem)] overflow-y-scroll lg:pr-5 lg:scrollbar-thin lg:scrollbar-thumb-primary-400">
            {!isLoadingExpense && expense ? (
              Object?.keys(expense?.data || {})?.map((date) => (
                <div key={date}>
                  <h2 className="text-xl font-bold mt-4 text-white">
                    {date === todayDateStr ? "Today" : formatDate(date)}
                  </h2>
                  {(expense?.data[date]).map((item: any) => {
                    return <Card key={item._id} data={item} />;
                  })}
                </div>
              ))
            ) : (
              <>
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
              </>
            )}
          </section>
        </div>

        <div className="w-[30%] p-6 font-semibold hidden xl:block">
          {!isLoadingTopExpense && topExpense ? (
            <div className="bg-primary-900 w-full rounded-lg flex p-2 mt-[4.8rem]">
              <div className="my-auto align-middle">
                <BsGraphDownArrow className="text-danger-400 w-5 h-5 xl:w-8 lg:h-8 my-auto align-middle mr-5" />
              </div>
              <div>
                <p className="text-xl text-primary-400 font-semibold">
                  Total Expense
                </p>
                <p className="text-xl xl:text-2xl text-primary-200 font-semibold">
                  {formatCurrency(topExpense?.expenseAmount)}
                </p>
              </div>
            </div>
          ) : (
            <Skeleton isLogo={true} />
          )}

          <div className="w-full bg-primary-900 mt-5 text-primary-200 p-5 rounded-lg">
            <h2 className=" text-2xl">Where did your money go?</h2>

            <section className="mt-8 w-full text-lg">
              {!isLoadingExpense && topExpense ? (
                topExpense?.data.map((data: any, index: any) => {
                  return (
                    <div key={index} className="pr-5 mb-12">
                      <div className="flex justify-between">
                        <p>{data.transactionCategory}</p>
                        <p>{formatCurrency(data.transactionAmount)}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className={`h-2.5 rounded-full`}
                          style={{
                            width: `${data.percentageOfTotalExpense}%`,
                            backgroundColor: data.categoryColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  <Skeleton isLogo={false} />
                  <Skeleton isLogo={false} />
                  <Skeleton isLogo={false} />
                  <Skeleton isLogo={false} />
                  <Skeleton isLogo={false} />
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }
};

export default ExpensePage;
