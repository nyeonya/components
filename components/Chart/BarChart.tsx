"use client";

import React from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels";

//기본 Bar 차트
//https://react-chartjs-2.js.org/components/bar

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  //   aspectRatio: 5 / 3,
  //   maintainAspectRatio: false,
  //제일 바깥쪽 레이아웃
  layout: {
    padding: {
      //   top: 100,
    },
  },
  //elements 무엇인지??..
  //   elements: {
  //     line: {
  //       fill: false,
  //       tension: 0.4,
  //     },
  //   },
  //x,y축 설정
  scales: {
    x: {
      //제일 아래 X 큰축 border 설정
      border: {
        display: false,
      },
      display: true,
      offset: true,
      grid: {
        display: false,
      },
    },
    y: {
      //제일 왼쪽 Y 큰축 border 설정
      border: {
        display: false,
      },
      min: 0,
      max: 100,
      offset: false,
      ticks: {
        stepSize: 10,
        display: false,
      },
      beginAtZero: true,
    },
  },
  maxBarThickness: 35, // bar 타입 막대의 최대 굵기
  //   responsive: false,
  plugins: {
    tooltip: {
      // 툴팁 스타일링
      backgroundColor: "rgba(128, 128, 128, 0.9)",
    },
    //위쪽에 표시되는 요약정보
    legend: {
      display: false,
      position: "bottom" as const,
    },
    //제일위에 나오는 타이틀
    // title: {
    //   display: true,
    //   text: "Chart.js Bar Chart",
    // },
    //datalabels 플러그인 추가한거 설정
    datalabels: {
      anchor: "end", //start , end
      align: "bottom", //top bottom middle 데이터 라벨 표시 위치
      //   align: (context) => {
      //     const index = context.dataIndex;
      //     const value = context.dataset.data[index];
      //     return value > 10 ? "bottom" : "top";
      //   },
      font: {
        size: "12px",
      },
      color: "white",
      formatter: function (value, context) {
        return `${value}%`;
      },
    },
  },
};

const labels = [
  "",
  "",
  ["올바름", "성격"],
  "협조형",
  "이미지",
  "개성형",
  "탐구형",
  "소속형",
  "자극형",
  "효능감",
  "평화형",
  "",
  "",
];

const data = {
  plugins: [ChartDataLabels],
  labels,
  datasets: [
    {
      data: ["", "", 20, 20, 40, 23, 89, 21, 90, 30, 50, "", ""],
      backgroundColor: "#3A82FF",
    },
  ],
};

export default function BarChart() {
  return (
    <div>
      <Bar options={options} data={data} plugins={data.plugins} />
    </div>
  );
}
