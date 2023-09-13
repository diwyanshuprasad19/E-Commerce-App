import React,{useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../../css/Login/Login.css';
import Footer from '../Home/footer';



const uploadPreset ="grocery";
const cloudName = "dzmyfembe";

function Signup() {

  const fileInputRef = useRef(null);
const navigate = useNavigate();
const [check,setcheck] = useState(false);
const [username,setusername] = useState('');
const [email,setemail] = useState('');
const [password,setpassword] = useState('');
const [error,seterror] = useState('');
const [imgupl,setimgupl] = useState('https://res.cloudinary.com/dzmyfembe/image/upload/v1692546952/wbb2wf8dnqqhrnj5mbwf.png');

const handlecheck = ()=>{
  setcheck(!check);
  console.log(check);
}


const handlesignup = (e)=>{
  e.preventDefault();
  if(!check){
    Axios.post('http://localhost:3001/signupuser',{
      fullname:username,
      email:email,
      password:password,
      image:imgupl,
    }).then(res =>{
      if(res.data.type === 'success')
      {   
       
        navigate('/');
      }
      else if(res.data.type === 'email'){
        seterror(res.data.errors);
        setTimeout(() => {
          seterror('');
        }, 2000);
      }
      else if(res.data.type ==='validation'){
        seterror(res.data.errors[0].msg);
        setTimeout(() => {
          seterror('');
        }, 2000);
      }
      else
      {
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

    Axios.post('http://localhost:3001/signupadmin',{
      fullname:username,
      email:email,
      password:password,
      image:imgupl,
    }).then(res =>{
      if(res.data.type === 'success')
      {   
       
        navigate('/');
      }
      else if(res.data.type === 'email'){
        seterror(res.data.errors);
        setTimeout(() => {
          seterror('');
        }, 2000);
      }
      else if(res.data.type ==='validation'){
        seterror(res.data.errors[0].msg);
        setTimeout(() => {
          seterror('');
        }, 2000);
      }
      else
      {
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
  
  


const handleIconClick = () => {
  fileInputRef.current.click(); // Trigger the click event on the hidden input
};


const handleFileChange = async (event) => {
  const file = event.target.files[0];

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await Axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    const url = response.data.secure_url;
    setimgupl(url);
    console.log('Image uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
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
   <div className='centerlogin' style={{'marginTop':'6rem'}}>
<h1>Signup</h1>

 <form onSubmit={handlesignup}>
 {error && <p style={myStyles}>{error}</p>}
 <div className='defimg'>
 <img src={imgupl} alt='1'  />
 <i class="fa-solid fa-plus" onClick={handleIconClick}></i>
 <input
  ref={fileInputRef}
        type="file"
        accept="image/*" // Set the accepted file types here
        style={{ display: 'none' }} // Hide the input visually
        onChange={handleFileChange}
      />
 </div>
<div className='txt-field'>
<input type ='text'    required onChange={(e)=>{setusername(e.target.value)}}/>
<label>Username</label>
</div>

<div className='txt-field'>
<input type ='email'    required onChange={(e)=>{setemail(e.target.value)}}/>
<label>Email</label>
</div>

<div className='txt-field'>
<input type ='password'   required onChange={(e)=>{setpassword(e.target.value)}}/>
<label>Password</label>
</div>

<div style={{'fontSize':'small'}}> 
<input type="checkbox" onClick={handlecheck}></input>
ADMIN</div>

<input type='submit' value='Signup'/>
<div className='Signup-link-login'>Already a Member?<a href='/'>Login</a></div>
 </form>
   </div>
   </div>
   <Footer/>
</>
  );


}

export default Signup;