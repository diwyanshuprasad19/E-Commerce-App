import React from 'react';
import '../../../css/Admin/Body.css';
import Navigation from '../DashBoard/navigation';
import Profilemain from './Profilemain';
function Profileshow() {


  




  return (
    <>

<div className='containerbody'>
    <div className='containerdashboard'>
<Navigation/>
<div className='maindash'>
<Profilemain/>


</div>
    </div>
</div>

      </>
  );
}

export default Profileshow;