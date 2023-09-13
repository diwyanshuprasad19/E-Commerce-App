import React from 'react';
import '../../../css/Admin/Body.css';
import Navigation from '../DashBoard/navigation';
import Couponmain from './Couponmain';
function Couponshow() {


  return (
    <>

<div className='containerbody'>
    <div className='containerdashboard'>
<Navigation/>

<div className='maindash'>
<Couponmain/>


</div>
    </div>
</div>

      </>
  );
}

export default Couponshow;