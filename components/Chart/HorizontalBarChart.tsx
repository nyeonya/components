"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import gradient from "chartjs-plugin-gradient";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maxBarThickness: 25,
  layout: {
    padding: 0,
  },
  scales: {
    x: {
      border: {
        display: false,
        width: 4,
        z: 10,
      },
      min: -100,
      max: 100,
      ticks: {
        backdropPadding: 10,
        callback: (value, index, ticks) => {
          let v = Math.abs(ticks[index].value);
          let l = ticks[index].label;
          const trans = (v: number) => {
            return (l = `${v}%`);
          };
          return trans(v);
        },
        beginAtZero: true,
        // font: {
        //   weight: 800,
        // },
        major: {
          enabled: true,
        },
        padding: 5,
      },
    },
    y: {
      grid: {
        display: false,
      },
      labels: [
        "외부방향",
        "먼 인식",
        "느낌적 판단",
        "우호적 판단",
        "통제지향적 태도",
      ],
    },
    y2: {
      grid: {
        display: false,
      },
      position: "right",
      labels: [
        "내부방향",
        "가까운 인식",
        "구체적 판단",
        "경쟁적 판단",
        "적응지향적 태도",
      ],
    },
  },
  indexAxis: "y",
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      //   align: "top",
      padding: {
        left: 50,
      },
      anchor: "center",
      //   anchor: (context) => {
      //     const index = context.dataIndex;
      //     const value = context.dataset.data[index];
      //     return value > 0 ? "end" : "start";
      //   },
      align: "middle", //top bottom middle 데이터 라벨 표시 위치
      font: {
        size: "12px",
      },
      color: "white",
      formatter: function (value, context) {
        return `${Math.abs(value)}%`;
      },
    },
  },
};

const data = {
  datasets: [
    {
      gradient: {
        backgroundColor: {
          axis: "x",
          colors: {
            "-100": "#3A82FF",
            0: "#71A6FF",
            100: "#3A82FF",
          },
        },
      },
      label: "1111",
      hoverBackgroundColor: "#979797",
      data: [-90, 20, 70, -10, 95],
      yAxisId: "y2",
    },
  ],
};

const HorizontalBarChart = () => {
  return (
    <div className="m-10 w-[870px] border-t border-blue-900 relative">
      <Bar
        className="absolute top-[-10px]"
        options={options}
        data={data}
        plugins={[gradient, ChartDataLabels]}
      />
      <div className="absolute w-full border-b border-blue-900 top-[400px]" />
    </div>
  );
};

export default HorizontalBarChart;
