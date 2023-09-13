import React from 'react';
import '../../../css/Admin/Body.css';
import Navigation from '../DashBoard/navigation';
import Ordermain from './Ordermain';
function Ordershow() {


  




  return (
    <>

<div className='containerbody'>
    <div className='containerdashboard'>
<Navigation/>

<div className='maindash'>
<Ordermain/>


</div>
    </div>
</div>

      </>
  );
}

export default Ordershow;