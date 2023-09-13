import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
function Typeproduct() {
    const [product,setproduct] = useState({});
    let arr = [0,0,0,0,0];

    useEffect(()=>{
 //product
    Axios.get('http://localhost:3001/readproductdash').then(res=>{
        if(res.data.type ==='Success')
        {
            setproduct(res.data.items);
        }
      else if(res.data.type ==='error')
      {
          console.log(res.data.errors);
      }
      }).catch(err =>{
        console.log(err);
      });

},[])

const handleproduct = ()=>{
    for(let i=0;i<product.length;i++)
{
     if(product[i].type === 'Vegetable')
     {
        arr[0]++;
     }
     else if(product[i].type === 'Fruits'){
        arr[1]++;
     }
     else if(product[i].type === 'Junk Food'){
        arr[2]++;
     }
     else if(product[i].type === 'Beauty'){
        arr[3]++;
     }
     else{
        arr[4]++;
     }
}
return arr;
}


    const data = {
        labels: ['Vegetable', 'Fruits', 'Junk Food', 'Beauty', 'Kitchen'],
        datasets: [
          {
            label: 'Product in Each Type',
            data: handleproduct(),
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

export default Typeproduct;