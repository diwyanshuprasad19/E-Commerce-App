import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Reviewrating() {
    const [review,setreview] = useState({});
    let arr = [0,0,0,0,0];

    useEffect(()=>{
      //review
      Axios.get('http://localhost:3001/readreviewdash').then(res=>{
        if(res.data.type ==='Success')
        {
            setreview(res.data.items);
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
    for(let i=0;i<review.length;i++)
{
     if(review[i].rating === 1)
     {
        arr[0]+=1;
     }
     else if(review[i].rating === 2){
        arr[1]+=1;
     }
     else if(review[i].rating === 3){
        arr[2]+=1;
     }
     else if(review[i].rating === 4){
        arr[3]+=1;
     }
     else{
        arr[4]+=1;
     }
}
return arr;
}


    const data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
          {
            label: 'Number of review Rating',
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

export default Reviewrating;