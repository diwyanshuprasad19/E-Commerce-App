import React from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
function Piechart() {

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Sales Data',
            data: [100, 80, 120, 150, 200],
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
<Pie data={data} options={options} />
      </>
  );
}

export default Piechart;