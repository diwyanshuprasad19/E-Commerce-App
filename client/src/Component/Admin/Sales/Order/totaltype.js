import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
function Totaltype() {
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
        let discount =order[i].discount;
        let price = order[i].price;
        let quantity = order[i].quantity;
        arr[0]= arr[0]+((price*quantity)/(discount/100));
     }
     else if(order[i].type === 'Fruits'){
        let discount =order[i].discount;
        let price = order[i].price;
        let quantity = order[i].quantity;
        arr[1]= arr[1]+((price*quantity)/(discount/100));
     }
     else if(order[i].type === 'Junk Food'){
        let discount =order[i].discount;
        let price = order[i].price;
        let quantity = order[i].quantity;
        arr[2]= arr[2]+((price*quantity)/(discount/100));
     }
     else if(order[i].type === 'Beauty'){
        let discount =order[i].discount;
        let price = order[i].price;
        let quantity = order[i].quantity;
        arr[3]= arr[3]+((price*quantity)/(discount/100));
     }
     else{
        let discount =order[i].discount;
        let price = order[i].price;
        let quantity = order[i].quantity;
        arr[4]= arr[4]+((price*quantity)/(discount/100));
     }
}
return arr;
}


    const data = {
        labels: ['Vegetable', 'Fruits', 'Junk Food', 'Beauty', 'Kitchen'],
        datasets: [
          {
            label: 'Profit in each type',
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

export default Totaltype;