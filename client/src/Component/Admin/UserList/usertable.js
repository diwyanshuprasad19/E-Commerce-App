import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import '../../../css/Admin/usertable.css';

function Usertable() {

const [list,setlist] = useState([]);
const [filter,setfilter] =useState('');



useEffect(()=>{
  Axios.get('http://localhost:3001/admin/readcustomer').then(res=>{
      setlist(res.data.items);
  }).catch(err =>{
    console.log(err);
  });
},)

//delete
const deletelist = (id)=>{
  Axios.post('http://localhost:3001/admin/deletecustomer',{
  id:id,
  }).then((res)=>{
  }).catch();
}

//ban | unban

const ban = (id)=>{
  Axios.post('http://localhost:3001/admin/bancustomer',{
  id:id,
  }).then((res)=>{
  }).catch();
}


const handledate =(date)=>{
  let newdate = new Date(date);
  let month =new Intl.DateTimeFormat('en-US', { month: 'short' }).format(newdate); // Abbreviated month name (e.g., "Aug")
  let day =newdate.getDate();
  let year = newdate.getFullYear();
  let str = `${day}-${month}-${year}`;
  return str;

}



  return (
    <>
    <div className='useroverall'>
<div className='tableuser'>
<div className='table_headeruser'>
<p>User details</p>
<div>
  <input placeholder='User'  onChange={(e)=>{setfilter(e.target.value)}}/>
</div>
</div>
<div className='table_sectionuser'>
<table>
  <thead>
    <tr>
      <th>S No</th>
      <th>UserName</th>
      <th>Email</th>
      <th>Status</th>
      <th>Created At</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>

  {list.filter((word)=>{return (word.fullname).toLowerCase().includes(filter.toLowerCase())}).map((val,key)=>{
      return(
        <tr key ={key}>
        <td>{key+1}</td>
        <td>{val.fullname}</td>
        <td>{val.email}</td>
        <td>{!val.ban? 'Active':'Banned'}</td>
        <td>{handledate(val.createdAt)}</td>
        <td>
          {!val.ban?<button onClick={()=> ban(val._id)}><i class="fa-solid fa-lock"></i></button> :<button style = {{color:'red'}} onClick={()=> ban(val._id)}><i class="fa-solid fa-lock-open"></i></button>}

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

export default Usertable;