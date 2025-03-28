// LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Launch Frequency Chart : Insight of Total Launch categorized by Success and Failure Count by Year
const LaunchFrequencyChart = ({ launchData }) => {
  const yearsKeys = Object.keys(launchData);

  const totalLaunches = yearsKeys.map((year) => launchData[year].totalLaunch);
  const successfulLaunches = yearsKeys.map(
    (year) => launchData[year].successfulLaunch
  );
  const failedLaunches = yearsKeys.map((year) => launchData[year].failedLaunch);

  const data = {
    labels: yearsKeys,
    datasets: [
      {
        label: "Total Launches",
        data: totalLaunches,
        fill: false,
        borderColor: "blue",
      },
      {
        label: "Successful Launches",
        data: successfulLaunches,
        fill: false,
        borderColor: "green",
      },
      {
        label: "Failed Launches",
        data: failedLaunches,
        fill: false,
        borderColor: "red",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: 'Total Launch categorized by Success and Failure Count by Year'
      }
    },
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LaunchFrequencyChart;
