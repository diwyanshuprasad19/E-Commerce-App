import React from 'react';
import '../../../css/Admin/Body.css';
import Navigation from '../DashBoard/navigation';
import Usermain from './usermain';
function Usershow() {


  




  return (
    <>

<div className='containerbody'>
    <div className='containerdashboard'>
<Navigation/>
<div className='maindash'>
<Usermain/>


</div>
    </div>
</div>

      </>
  );
}

export default Usershow;