import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
function Barchart(props) {





    const data = {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [
          {
            label: 'Practice',
            data: [0,0,0,0,0,0,0,1,0,0,0,0],
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
          },
        ],
      };
    
      // Configuration options for the bar chart
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };




  return (
    <>
<Bar data={data} options={options} />
      </>
  );
}

export default Barchart;