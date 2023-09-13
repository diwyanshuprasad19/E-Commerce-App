import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
function Quantitytype() {
    const [order,setorder] = useState({});
    let arr = [0,0,0,0,0];

    useEffect(()=>{
  //order  
  Axios.get('http://localhost:3001/readorderdash').then(res=>{
    if(res.data.type ==='Success')
    {
        setorder(res.data.items);
    }
  else if(res.data.type ==='error')
  {
      console.log(res.data.errors);
  }
  }).catch(err =>{
    console.log(err);
  });



},[])

const handleorder = ()=>{
    for(let i=0;i<order.length;i++)
{
     if(order[i].type === 'Vegetable')
     {
        arr[0]+=1;
     }
     else if(order[i].type === 'Fruits'){
        arr[1]+=1;
     }
     else if(order[i].type === 'Junk Food'){
        arr[2]+=1;
     }
     else if(order[i].type === 'Beauty'){
        arr[3]+=1;
     }
     else{
        arr[4]+=1;
     }
}
return arr;
}


    const data = {
        labels: ['Vegetable', 'Fruits', 'Junk Food', 'Beauty', 'Kitchen'],
        datasets: [
          {
            label: 'Number of order sold each type',
            data: handleorder(),
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

export default Quantitytype;