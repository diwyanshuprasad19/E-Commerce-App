import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
function Profitmonth(props) {
    const [order,setorder] = useState({});
    const [array,setarray] = useState([]);
    let year= props.year;
    let arr = [0,0,0,0,0,0,0,0,0,0,0,0];




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
        
        

const handledata = ()=>{
    for(let i=0;i<order.length;i++)
{
    let date = new Date(order[i].createdAt);
    
    if(date.getFullYear() === parseInt(year))
    {
        let discount =order[i].discount;
        let price = order[i].price;
        let quantity = order[i].quantity;
        arr[date.getMonth()]+=((price*quantity)/(discount/100));
    }
}
return arr;
}






    const data = {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ],
        datasets: [
          {
            label: 'Profit each month',
            data: handledata(),
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
<Line data={data} options={options} />
      </>
  );
}

export default Profitmonth;