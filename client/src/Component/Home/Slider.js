import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Slider.css'

function Slider() {
const navigate = useNavigate();
const handleshop =()=>{
navigate('/Product');
}

  return (
    <>

 <div className="hero">
  <div className="overlay">
    <h1>New Arrivals for Men and Women</h1>
    <p>Get the Best Sales from here</p>
    <p>Click below</p>
    <button className='eco' onClick={handleshop}>Shop Now</button>
  </div>
</div>
</>
  );
}

export default Slider;
