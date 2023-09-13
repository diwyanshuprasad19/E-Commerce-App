import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
function Usercreated(props) {
    const [user,setuser] = useState({});
    const [array,setarray] = useState([]);
    let year= props.year;
    let arr = [0,0,0,0,0,0,0,0,0,0,0,0];




    useEffect(()=>{
        //user
                Axios.get('http://localhost:3001/readrecustomer').then(res=>{
                  if(res.data.type ==='Success')
                  {
                      setuser(res.data.items);
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
    for(let i=0;i<user.length;i++)
{
    let date = new Date(user[i].createdAt);
    
    if(date.getFullYear() === parseInt(year))
    {
        arr[date.getMonth()]+=1;
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
            label: 'User Signup',
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

export default Usercreated;