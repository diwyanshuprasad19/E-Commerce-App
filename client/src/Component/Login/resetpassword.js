import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../../css/Login/Login.css';
import Footer from '../Home/footer';
function Resetpassword() {

  const navigate = useNavigate();
  const [newone,setnewone] = useState('');
  const [newtwo,setnewtwo] = useState('');
  const [error,seterror] = useState('');
const email = localStorage.getItem('currentemail');

const handlereset = (e)=>{
  e.preventDefault();
  if(newone === newtwo)
  {
     
    Axios.post('http://localhost:3001/resetpassword',{

    email:email,
    password:newone,

  }).then(res =>{
    if(res.data.type === 'success')
    {
      localStorage.removeItem('currentemail');
      navigate("/");
    }
    else if(res.data.type === 'email')
     {
      seterror(res.message);
      setTimeout(() => {
        seterror('');
      }, 2000);
     }
     else if(res.data.type === 'error')
     {
      seterror(res.message);
      setTimeout(() => {
        seterror('');
      }, 2000);
     }
  }).catch(error =>{
    console.log(error);
  });

  }
  else
  {
    handleerror();

  }
}
const handleerror = () => {
  seterror('Password does not match');
  setTimeout(() => {
    seterror('');
  }, 2000); 
};


const myStyles = {
  width:'80%',
  margin: '10px auto',
  backgroundColor: 'red',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize:'0.7rem',
};

  return (
    <>
    <div className='bodylogin'>
   <div className='centerlogin'>
<h1>Reset Password</h1>
 <form onSubmit={handlereset}>
 {error && <p style={myStyles}>{error}</p>}
<div className='txt-field'>
<input type ='text'    required onChange={(e)=>{setnewone(e.target.value)}}/>
<label>New Password</label>
</div>

<div className='txt-field'>
<input type ='text'    required onChange={(e)=>{setnewtwo(e.target.value)}}/>
<label>New Password</label>
</div>

<input type='submit' value='Reset'/>
<div className='Signup-link-login'>Already a Member?<a href='/Signup'>Login</a></div>
 </form>
   </div>
   </div>
   <Footer/>
</>
  );
}

export default Resetpassword;