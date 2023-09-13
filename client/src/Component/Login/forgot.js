import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../../css/Login/Login.css';
import Footer from '../Home/footer';
function Forgot() {
  const navigate = useNavigate();
const [email,setemail] = useState('');
const [error,seterror] = useState('');


const handleforgot = (e)=>{
  e.preventDefault();

  Axios.post('http://localhost:3001/forgotpassword',{
    email:email,
  }).then(res =>{
    if(res.data.type === 'success')
    {
      localStorage.setItem('currentemail',email);
      seterror(res.data.message);
      navigate("/OTP");
    }
    else if(res.data.type === 'validation')
     {
      seterror(res.data.errors[0].msg);
      setTimeout(() => {
        seterror('');
      }, 2000);
     }
     else if(res.data.type === 'email'){
      seterror(res.data.errors);
      setTimeout(() => {
        seterror('');
      }, 2000);
     }
     else if(res.data.type === 'error'){
      seterror(res.data.errors);
      setTimeout(() => {
        seterror('');
      }, 2000);
     }
  }).catch(error =>{
    console.log(error);
  });
}

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
<h1>Forgot Password</h1>
 <form onSubmit={handleforgot}>
 {error && <p style={myStyles} >{error}</p>}
<div className='txt-field'>
<input type ='email'  required onChange={(e)=>{setemail(e.target.value)}}/>
<label>Email</label>
</div>

<input type='submit' value='Next'/>
<div className='Signup-link-login'>Not a Member?<a href='/Signup'>Signup</a></div>
 </form>
   </div>
   </div>
   <Footer/>
</>
  );
}

export default Forgot;