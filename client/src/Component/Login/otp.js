import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../../css/Login/otp.css';
import Footer from '../Home/footer';
function OTP() {
  const navigate = useNavigate();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [error,seterror] = useState('');
const email= localStorage.getItem('currentemail');

const handleotp = ()=>{
  const number = parseInt(value1)*1000 + parseInt(value2)*100 + parseInt(value3)*10 + parseInt(value4) ;
 

  Axios.post('http://localhost:3001/otpcheck',{

   email:email,
   otpcode:number,

 }).then(res =>{
   if(res.data.type === 'success')
   {
     navigate("/Reset");
   }
   else if(res.data.type === 'error')
    {
      handleerror(res.data.errors);

    }
 }).catch(error =>{
   console.log(error);
 });

 }

 const handleerror = (error) => {
  seterror(error);
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
  fontSize:'0.7rem',
  textAlign: 'center',
  fontWeight: 'bold',
};





  return (
    <>
<div className='bodyotp'>
    <div className="containerotp">
        <h1>ENTER OTP</h1>
        {error && <p style={myStyles}>{error}</p>}
        <div className="userInputotp">
            <input type="text"  maxlength={1}  onChange={(e)=>{setValue1(e.target.value)}}/>
            <input type="text"  maxlength={1}  onChange={(e)=>{setValue2(e.target.value)}}/>
            <input type="text"  maxlength={1} onChange={(e)=>{setValue3(e.target.value)}}/>
            <input type="text"  maxlength={1} onChange={(e)=>{setValue4(e.target.value)}}/>
        </div>
        <button type='submit' onClick={handleotp}>CONFIRM</button>
    </div>
    </div>





    <Footer/>
</>
  );
}

export default OTP;