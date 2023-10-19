"use client";
import React from "react";

import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const Charts = () => {
  Chart.register(ArcElement);

  const config = {
    data: {
      datasets: [
        {
          data: [6000000, 2500000, 1250000],
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
          <p className="text-white text-2xl">Total Balance</p>
          <span className="text-[#35B3EC] text-xl">Rp. 500.000</span>
        </div>
      </div>
    </div>
  );
};

export default Charts;
