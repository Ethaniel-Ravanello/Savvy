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
          data: [6000000, 2500000],
          backgroundColor: ["rgb(76 175 80)", "rgb(153 27 27)"],
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
    <div className="flex justify-content max-w-xs p-1">
      <div className="h-min">
        <Doughnut {...config}></Doughnut>
      </div>
    </div>
  );
};

export default Charts;
