import React from 'react';
import '../../css/Order/order.css';
import Navbar from '../navbar';
import Footer from '../Home/footer';
import OrderSearch from './ordersearch';
const Userorder =()=>{

  return (
    <>
<Navbar/>
<OrderSearch/>

<Footer/>
    </>
  );
}

export default Userorder;