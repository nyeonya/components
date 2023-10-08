"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  Filler,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

const switchFontColor = (v: number) => {
  if (v < 21) return "#DFDEE3";
  if (20 < v && v < 41) return "#B2B2B7";
  if (40 < v && v < 61) return "#7A7B7E";
  if (60 < v && v < 81) return "#4E4E51";
  if (80 < v) return "#191919";
};

const data = {
  labels: [
    "평화형",
    "올바름",
    "협조형",
    "이미지",
    "개성형",
    "탐구형",
    "소속형",
    "자극형",
    "효능감",
  ],
  datasets: [
    {
      data: [30, 70, 20, 10, 90, 80, 35, 43, 57],
      borderColor: "#3A82FF",
      backgroundColor: "rgba(58, 130, 255, 0.10)",
    },
  ],
};

const options = {
  elements: {
    point: {
      radius: 8,
      pointBackgroundColor: "#273B6A",
      hoverRadius: 12,
      borderWidth: 0,
      // pointStyle: false,
    },
    line: {
      fill: true,
      borderColor: "#3A82FF;",
      // tension: 0.4,
    },
  },
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
        display: false,
      },
      //도형 가장자리에 있는 타이틀
      pointLabels: {
        color: (context: any) => {
          const value = data.datasets[0].data[context.index];
          return switchFontColor(value);
        },
        font: {
          size: 16,
        },
      },
      angleLines: {
        display: false,
      },
      grid: {
        color: "#273B6A",
      },
    },
  },
  //   responsive: false,
  plugins: {
    tooltip: {
      backgroundColor: "rgba(128, 128, 128, 0.9)",
    },
    legend: {
      display: false,
      position: "bottom" as const,
    },
  },
};

const RadarChart = () => {
  return (
    <div>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
