import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios  from 'axios';
import {useDispatch} from 'react-redux';
import { bindActionCreators, createStore } from 'redux';
import { addressCreators,discountCreators } from '../../redux';
import '../../css/Cart/PaymentPage.css';
import '../../css/Cart/debit.css';
import Footer from '../Home/footer';
import Navbar from '../navbar';
import Stepper from './Stepper';



function PaymentPage() {

  const address = useSelector((state) => state.address.shipping);
  const token = localStorage.getItem('Customer-token');
  const [list,setlist] = useState([]);  
  const [error,seterror] = useState('');  
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(true);
  const discount = useSelector(state => state.discount);
  const dispatch = useDispatch();
  const {addressstore} = bindActionCreators(addressCreators,dispatch);
  const {discountstore} = bindActionCreators(discountCreators,dispatch);
  const navigate = useNavigate();


  const handleChange1 = (event) => {
    // Update the isChecked state when the radio input value changes
    setIsChecked1(event.target.checked);
    setIsChecked2(false);
    setIsChecked3(false);
  };
  
  const handleChange2 = (event) => {
    // Update the isChecked state when the radio input value changes
    setIsChecked2(event.target.checked);
    setIsChecked1(false);
    setIsChecked3(false);
  };
  const handleChange3 = (event) => {
    // Update the isChecked state when the radio input value changes
    setIsChecked3(event.target.checked);
    setIsChecked2(false);
    setIsChecked1(false);
  };

  useEffect(()=>{

Axios.post('http://localhost:3001/readcart',{
       token:token,
      }).then(res=>{
        if(res.data.type ==='Success')
        {
          
            setlist(res.data.items);
        }
      else if(res.data.type ==='error')
      {
           seterror(res.data.errors);
      }
  }).catch(err =>{
    console.log(err);
  });


  },[])
  



  const monthArray = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const datearray = [];
  for (let i = 2000; i <= 2023; i++) {
    datearray.push(i);
  }
  
  

  

const calculateTotal = (item) => {
  return item.price * item.quantity;
};

const calculateGrandTotal = () => {
  return list.reduce((total, item) => total + calculateTotal(item), 0);
};


//normal cary buy
const discounttotal = ()=>{
  let total =calculateGrandTotal();
   let discountprice = (total * discount)/100;
   return Math.floor(discountprice);
}



const all = ()=>{
let total =calculateGrandTotal();
let discount = discounttotal();
if(isNaN(discount)){
discount =0;
}
else
{
;
}
return total + 100 - discount;
}






const handleorder = (e)=>{
  e.preventDefault();
  const buyername = address.fname +" " + address.lname;
  const buyeraddress = address.address1+ ", " + address.city+ ", " + address.state+ ", " + address.zip+ ", " + address.country;
  const paymenttype = isChecked1? "Card payment":isChecked2?"UPI Payment":"Cash on Delivery";
  const subamounttotal = calculateGrandTotal();
  const discountamount = isNaN(discounttotal())?0:discounttotal();
  const totalamount = all();
  
  
  
  
  Axios.post('http://localhost:3001/orderadd',{
    token:token,
    discount:discount,
    shipname:buyername,
    address:buyeraddress,
  paymenttype:paymenttype,
  deliverystatus:"Shipping",
  totalamount:totalamount,
  subamounttotal:subamounttotal,
  discountamount:discountamount,
   }).then(res=>{
     if(res.data.type ==='Success many')
     {
      const obj ={};
      addressstore(obj,obj,obj);
      discountstore(0);
         navigate('/Successfull');
     }
   else if(res.data.type ==='error')
   {
        seterror(res.data.errors);
   }
  }).catch(err =>{
  console.log(err);
  });
  
  
  }


  
  





  return (
    <>
    <Navbar/>
    <Stepper value={3}/>
    
    <div className='bodypayment'>
    <div className="iphone">
      <header className="header">
        <h1>Checkout</h1>
      </header>
    
      <form >
        <div>
          <h2>Address</h2>
    
          <div className="card">
            <address>
              {address.fname} {address.lname}<br />
             {address.address1} {address.city} {address.state} {address.zip}<br />
             {address.country}
            </address>
          </div>
        </div>
    
        <fieldset>
          <legend>Payment Method</legend>
    
          <div className="form__radios">
            <div className="form__radio">
              <label htmlFor="visa">
               Credit/Debit Payment</label>
              <input id="visa" name="payment-method" type="radio" checked={isChecked1} onChange={handleChange1}/>
            </div>
    
    
    
    {isChecked1 && <div className="form__radio">
              <div className='debitform'>
            <form >
            <div>
              <label>Card Number:</label>
              <input
                type="text"
              placeholder='1234-1234-1234'
              />
            </div>
            <div>
              <label>CVV:</label>
              <input
                type="text"
               placeholder='123'
              />
            </div>
            <div>
              <label>Expiry Date:</label>
              <select className="option">
              {monthArray.map((val,key)=>{
                return(
                  <option value={key+1}>{val}</option>
                )
              })}
              </select>
          <select className="option">
          {datearray.map((val,key)=>{
                return(
                  <option value={val}>{val}</option>
                )
              })}
          </select>
            </div>
            <div>
              <label>Card Name:</label>
              <input
                type="text"
                placeholder='jon doe'
              />
            </div>
          </form>
          </div>
            </div>
    
    
    
    }
            
    
    
    
    
            <div className="form__radio">
              <label htmlFor="paypal">UPI Payment</label>
              <input id="paypal" name="payment-method" type="radio" checked={isChecked2} onChange={handleChange2}/>
            </div>
    
    
         {isChecked2 &&  <div className='debitform'>
            <form >
            <div>
              <label>UPI id</label>
              <input
                type="text"
              placeholder='jondoe@okaxis'
              />
            </div>
           
              
            
          </form>
          </div>}  
            </div>
    
    
    
    
            <div className="form__radio">
              <label htmlFor="mastercard">Cash on Delivery</label>
              <input id="mastercard" name="payment-method" type="radio"checked={isChecked3} onChange={handleChange3} />
            </div>
        </fieldset>
    
        <div className='paymenttop'>
          <h2>Shopping Bill</h2>
    
          <table>
            <tbody>
              <tr>
                <td>Shipping fee</td>
                <td align="right">Rs 100</td>
              </tr>
              <tr>
                <td>Discount {discount}%</td>
                <td align="right">-Rs ({isNaN(discounttotal())?0:discounttotal()})</td>
              </tr>
              <tr>
                <td>Price Total</td>
                <td align="right">RS {calculateGrandTotal()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td align="right">RS {all()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
    
        <div>
          <button className="button button--full" type="submit" onClick={handleorder}>Buy Now</button>
        </div>
      </form>
    </div>
    
    </div>
    
    
    
    
    <Footer/>
    
    </>
      );
}

export default PaymentPage;
