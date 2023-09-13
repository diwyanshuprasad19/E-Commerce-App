import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../../../css/Admin/usertable.css';
function Coupontable() {
  const navigate = useNavigate();
const [list,setlist] = useState([]);
const [filter,setfilter] =useState('');

const handlecoupon = ()=>{
  navigate('/Admin/CreateCoupon');
}


useEffect(()=>{
  Axios.get('http://localhost:3001/admin/readcoupon').then(res=>{
      setlist(res.data.items);
  }).catch(err =>{
    console.log(err);
  });
},)



//update
const updatelist = (id)=>{
  navigate('/admin/editcoupon/'+id);
}


//delete
const deletelist = (id)=>{
  Axios.post('http://localhost:3001/admin/deletecoupon',{
  id:id,
  }).then((res)=>{
  }).catch();
}

const buttonStyle1 = {
  padding: '8px 12px',
  fontSize: '14px',
  fontWeight: 'bold',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};


const buttonStyle2 = {
  padding: '8px 12px',
  fontSize: '14px',
  fontWeight: 'bold',
  backgroundColor: '#ff0000',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};


const active =(id)=>{
  Axios.post('http://localhost:3001/admin/activecoupon',{
  id:id,
  }).then((res)=>{
  }).catch();
}


  return (
    <>
 <div className='useroverall'>
<div className='tableuser'>
<div className='table_headeruser'>
<p>Coupons </p>
<div>
<input placeholder='Coupon'  onChange={(e)=>{setfilter(e.target.value)}} />
  <button className='add_newuser' onClick={handlecoupon}>+Add Coupon</button>
</div>
</div>
<div className='table_sectionuser'>
<table>
  <thead>
    <tr>
      <th>S No</th>
      <th>Code</th>
      <th>Discount(%)</th>
      <th>Expireon</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>

  {list.filter((word)=>{return (word.code).toLowerCase().includes(filter.toLowerCase())}).map((val,key)=>{
      return(
        <tr key ={key}>
        <td>{key+1}</td>
        <td>{val.code}</td>
        <td>{val.discount}</td>
        <td>{formatDate(val.expireon)}</td>
        <td>{val.status ?<button style={buttonStyle1} onClick={()=> active(val._id)}>Active</button> :<button style={buttonStyle2} onClick={()=> active(val._id)}>Unactive</button>}</td>
        <td>
          <button onClick={()=> updatelist(val._id)}><i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
          <button onClick={()=> deletelist(val._id)}><i class="fa-sharp fa-solid fa-trash"></i></button>
        </td>
      </tr>
      )}
      )} 
  
  </tbody>
</table>
</div>


</div>
</div>


      </>
  );
}

export default Coupontable;