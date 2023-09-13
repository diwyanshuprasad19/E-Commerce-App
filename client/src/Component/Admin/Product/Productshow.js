import React from 'react';
import '../../../css/Admin/Body.css';
import Navigation from '../DashBoard/navigation';
import Productmain from './Productmain';
function Productshow() {


  




  return (
    <>

<div className='containerbody'>
    <div className='containerdashboard'>
<Navigation/>
<div className='maindash'>
<Productmain/>


</div>
    </div>
</div>

      </>
  );
}

export default Productshow;