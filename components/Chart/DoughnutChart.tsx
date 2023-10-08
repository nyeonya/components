"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: 25,
  datasets: {
    doughnut: {
      //   hoverBackgroundColor: "rgba(0, 0, 0, 0)",
      //   weight: 2,
      borderWidth: 0,
      //   borderAlign: "inner",
      //   hoverBackgroundColor: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

const textCenter = {
  id: "textCenter",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    ctx.font = "bolder 16px Inter";
    ctx.fillStyle = "#3A82FF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      `${data.datasets[0].data[0]}%`,
      chart.getDatasetMeta(0).data[0].x,
      chart.getDatasetMeta(0).data[0].y
    );
  },
};

const DoughnutChart = ({ percent = 70 }: any) => {
  const data = {
    labels: ["result", "none"],
    datasets: [
      {
        label: "test",
        data: [percent, 100 - percent],
        backgroundColor: ["#3A82FF", "#F1F4FF"],
        // borderWidth: 0,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} options={options} plugins={[textCenter]} />
    </div>
  );
};

export default DoughnutChart;
