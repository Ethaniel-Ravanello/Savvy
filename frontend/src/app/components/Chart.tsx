"use client";
import React from "react";

import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface FormatCurrencyFunction {
  (amount: number): string;
}

interface Props {
  income: number;
  expense: number;
  formatCurrency: FormatCurrencyFunction;
}

const Charts = ({ income, expense, formatCurrency }: Props) => {
  const balance = income - expense;
  Chart.register(ArcElement);
  const config = {
    data: {
      datasets: [
        {
          data: [income, expense, balance],
          backgroundColor: [
            "rgb(76 175 80)",
            "rgb(153 27 27)",
            "rgb(53,179,236)",
          ],
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return (
    <div className="flex justify-content relative">
      <div>
        <Doughnut {...config}></Doughnut>
        <div className="w-full mx-auto text-center absolute top-1/3">
          <p className="text-white text-2xl font-bold">Balance</p>
          <span className="text-[#35B3EC] text-xl font-semibold">
            {formatCurrency(balance)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Charts;
