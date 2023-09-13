import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import '../../../css/Admin/usertable.css';
import '../../../css/Admin/newbutton.css'
function Ordertable() {


const [list,setlist] = useState([]);
const[status,setstatus] = useState('');


useEffect(()=>{
  Axios.get('http://localhost:3001/readorderadmin').then(res=>{
    if(res.data.type ==='Success')
    {
      setstatus(res.data.items.deliverystatus);
        setlist(res.data.items);
    }
  else if(res.data.type ==='error')
  {
      console.log(res.data.errors);
  }
  }).catch(err =>{
    console.log(err);
  });
},)



const handledate =(date)=>{

  let dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObject); // Abbreviated month name (e.g., "Aug")
  const day = dateObject.getDate();
  let k='';
  if (day >= 11 && day <= 13) {
    k= 'th';
  }
  switch (day % 10) {
    case 1:
      k= 'st';
      break;
    case 2:
      k= 'nd';
      break;
    case 3:
      k= 'rd';
      break;
    default:
      k= 'th';
      break;
  }
  let fulldate =`${monthAbbreviation} ${day}${k}, ${year}` ;
  return fulldate;
}



const handletotal =(price,quantity,discount)=>{
  const amount = (price*quantity)*((100-discount)/100);
  return amount;
}




const newbutton = {
  backgroundColor: 'red', // Change this to your desired background color
  color: 'white',          // Change this to your desired text color
  padding: '10px 20px',    // Change this to your desired padding
  border: 'none',          // Remove the border if needed
  borderRadius: '5px',     // Add border radius for rounded corners
  cursor: 'pointer',       // Change cursor on hover
};

const newbutton2 = {
  backgroundColor: 'green', // Change this to your desired background color
  color: 'white',          // Change this to your desired text color
  padding: '10px 20px',    // Change this to your desired padding
  border: 'none',          // Remove the border if needed
  borderRadius: '5px',     // Add border radius for rounded corners
  cursor: 'pointer',       // Change cursor on hover
};


const handledeliver =(email,orderid,name,id)=>{
  Axios.post('http://localhost:3001/deliverorder',{
    id:id,
    email:email,
    orderid:orderid,
    name:name,
   }).then(res=>{
     if(res.data.type ==='Success')
     {
      console.log('success');
     }
   else if(res.data.type ==='error')
   {
        console.log('error');
   }
}).catch(err =>{
 console.log(err);
});
}




  return (
    <>
    <div className='useroverall'>
<div className='tableuser'>
<div className='table_headeruser'>
<p>Order details</p>
<div>
  
</div>
</div>
<div className='table_sectionuser'>
<table>
  <thead>
    <tr>
      <th>S No</th>
      <th>Order Id(Type)</th>
      <th>Order By</th>
      <th>Order On</th>
      <th>Total (Discount)</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>

{list.map((val,key)=>{

const getStatusStyle = () => {
  if (val.deliverystatus === 'Shipping') {
    return {
      backgroundColor: 'green', // Change this to your desired background color
  color: 'white',          // Change this to your desired text color
  padding: '10px 20px',    // Change this to your desired padding
  border: 'none',          // Remove the border if needed
  borderRadius: '5px',     // Add border radius for rounded corners
  cursor: 'pointer', 
    };
  }
  return {
    backgroundColor: 'red', // Change this to your desired background color
  color: 'white',          // Change this to your desired text color
  padding: '10px 20px',    // Change this to your desired padding
  border: 'none',          // Remove the border if needed
  borderRadius: '5px',     // Add border radius for rounded corners
  cursor: 'pointer', 
  };
};


  return(
    <tr key={key}>
      <td>{key+1}</td>
      <td>#{val.orderid}<br/>({val.name})</td>
      <td>{val.email}</td>
      <td>{handledate(val.date)}</td>
      <td>
      ₹{handletotal(val.price,val.quantity,val.discount)} ({val.discount}%)
      </td>
      <td><button style={getStatusStyle()} onClick={()=>{handledeliver(val.email,val.orderid,val.name,val._id)}} disabled={val.deliverystatus !== 'Shipping'}>{val.deliverystatus}</button></td>
    </tr>
  )
})}


  </tbody>
</table>
</div>


</div>
</div>
      </>
  );
}

export default Ordertable;