import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../../../css/Admin/usertable.css';

function Producttable() {

  const navigate = useNavigate();
const [list,setlist] = useState([]);
const [filter,setfilter] =useState('');

const handleproduct = ()=>{
  navigate('/Admin/Createproduct');
}
useEffect(()=>{
  Axios.get('http://localhost:3001/admin/readproduct').then(res=>{
      setlist(res.data.items);
  }).catch(err =>{
    console.log(err);
  });
},)

//update
const updatelist = (id)=>{
  navigate('/admin/editproduct/'+id);
}




//delete
const deletelist = (id)=>{
  Axios.post('http://localhost:3001/admin/deleteproduct',{
  id:id,
  }).then((res)=>{
  }).catch();
}




  return (
    <>
    <div className='useroverall'>
<div className='tableuser'>
<div className='table_headeruser'>
<p>Product details</p>
<div>
  <input placeholder='Product' onChange={(e)=>{setfilter(e.target.value)}}  />
  <button className='add_newuser' onClick={handleproduct}>+Add Product</button>
</div>
</div>




<div className='table_sectionuser'>
<table>
  <thead>
    <tr>
      <th>S No</th>
      <th>Product</th>
      <th>Name</th>
      <th>Price</th>
      <th>Type</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>

  {list.filter((word)=>{return (word.productname).toLowerCase().includes(filter.toLowerCase())}).map((val,key)=>{
      return(
        <tr key ={key}>
        <td>{key+1}</td>
        <td><img  src={val.image} alt='missing'/></td>
        <td>{val.productname}</td>
        <td>{val.price}({val.quantity})</td>
        <td>{val.type}</td>
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

export default Producttable;