import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { userCreators } from '../../redux';
import Axios from 'axios';
import '../../css/Login/Login.css';
import Footer from '../Home/footer';
function Login() {

  const dispatch = useDispatch();
  const {userstore} = bindActionCreators(userCreators,dispatch);

const navigate = useNavigate();
const [check,setcheck] = useState(false);
const [email,setemail] = useState('');
const [password,setpassword] = useState('');
const [error,seterror] = useState('');


const handlecheck = ()=>{
  setcheck(!check);
  console.log(check);
}


const handlelogin = (e)=>{
  e.preventDefault();
  if(!check){

    Axios.post('http://localhost:3001/logincustomer',{
      email:email,
      password:password,
    }).then(res =>{
      if(res.data.type === 'success')
      {
        userstore({
          jwttoken:res.data.token,
          email:res.data.email,
        });
        localStorage.setItem("Customer-token", res.data.token);
        navigate("/Home");
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
       else if(res.data.type === 'password'){
        seterror(res.data.errors);
        setTimeout(() => {
          seterror('');
        }, 2000);
       }
    }).catch(error =>{
      console.log(error);
    });


  }
  else{

    Axios.post('http://localhost:3001/loginadmin',{
      email:email,
      password:password,
    }).then(res =>{
      if(res.data.type === 'success')
      {
        userstore({
          jwttoken:res.data.token,
          email:res.data.email,
        });
        localStorage.setItem("Admin-token", res.data.token);
        navigate("/Admin/Dashboard");
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
       else if(res.data.type === 'password'){
        seterror(res.data.errors);
        setTimeout(() => {
          seterror('');
        }, 2000);
       }
    }).catch(error =>{
      console.log(error);
    });
  }
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
<h1>Login</h1>
 <form onSubmit={handlelogin}>
 {error && <p style={myStyles} >{error}</p>}
<div className='txt-field' style={{'color':'black !important',}}>
<input type ='text'    required onChange={(e)=>{setemail(e.target.value)}}/>
<label>Email</label>
</div>

<div className='txt-field'>
<input type ='password'   required onChange={(e)=>{setpassword(e.target.value)}}/>
<label>Password</label>
</div>


<div className='passlogin'><a href="/Forgot">Forgot Password?</a>
<div className='leftcheck'> 
<input type="checkbox" onClick={handlecheck}></input>
ADMIN</div></div>

<input type='submit' value='Login'/>
<div className='Signup-link-login'>Not a Member?<a href='/Signup'>Signup</a></div>
 </form>
   </div>
   </div>
<Footer/>
</>
  );
}

export default Login;