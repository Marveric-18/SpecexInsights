import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PayloadRocketEfficiencyChart = ({rocketData}) => {
  const labels = rocketData.map((r) => r.rocket_name);
  const avgPayload = rocketData.map((r) => r.avg_payload_weight);
  const payloadPerMillion = rocketData.map(r => {
    const weight = parseFloat(r.avg_payload_weight);
    const cost = parseFloat(r.avg_cost_per_launch);
    return +(weight / (cost / 1_000_000)).toFixed(2);
  });

  const barData = {
    labels,
    datasets: [
      {
        label: 'Avg Payload Weight (kg)',
        data: avgPayload,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      
      {
        label: 'Payload per $1M (kg)',
        data: payloadPerMillion,
        backgroundColor: 'rgba(177, 245, 180, 0.7)',
        yAxisID: 'y2'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Launch Cost Efficiency by Payload Weight and Rockets'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Payload (kg)'
        }
      }
    }
  }



  

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
};

export default PayloadRocketEfficiencyChart;
