import React,{useState,useEffect} from 'react';
import Axios  from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../navbar';
import Footer from '../../Home/footer';
import '../../../css/Order/vieworder.css';
import '../../../css/Order/ordersearch.css';






const Vieworder =()=>{
    const navigate = useNavigate();
const [val,setlist] = useState({});
const [error,seterror] = useState(''); 
const { id } = useParams();

const [cancel,setcancel] = useState(false);
const [cancelid,setcancelid] = useState('');
const [returned,setreturned] = useState(false);
const [returnid,setreturnid] = useState('');
const [refund,setrefund] = useState(false);

const token = localStorage.getItem('Customer-token');

const [address,setaddress] = useState('');
const [city,setcity] = useState('');
const [state,setstate] = useState('');
const [zip,setzip] = useState('');
const [country,setcountry] = useState('');
const [subtotal,setsubtotal] = useState(0);
const [total,settotal] = useState(0);
const [discount,setdiscount] = useState(0);
const [orderdate,setorderdate] = useState('');
const [estimateddate,setestimateddate] = useState('');
const  [returndate,setreturndate] = useState(new Date());

useEffect(() => {
    Axios.post('http://localhost:3001/vieworderwithid',{
      token:token,
      id:id,
     }).then(res=>{
       if(res.data.type ==='Success')
       {
         let arr = res.data.items.address.split(",");
         setaddress(arr[0]);
         setcity(arr[1]);
         setstate(arr[2]);
         setzip(arr[3]);
         setcountry(arr[4]);   
         let  st = (res.data.items.price*res.data.items.quantity);
         setsubtotal(st);
         let tot = Math.round((res.data.items.price*res.data.items.quantity)*((100-res.data.items.discount)/100));  
          settotal(tot);
          let dis = (res.data.items.price*res.data.items.quantity)*((res.data.items.discount)/100); 
           setdiscount(dis);

           let dateObject = new Date(res.data.items.date);
           const year = dateObject.getFullYear();
  const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObject); // Abbreviated month name (e.g., "Aug")
  const day = dateObject.getDate();
  let k='';
  if (day >= 11 && day <= 13) {
    k= 'th';
  }
  switch (day % 10) {
    case 1:
      k= 'st';
      break;
    case 2:
      k= 'nd';
      break;
    case 3:
      k= 'rd';
      break;
    default:
      k= 'th';
      break;
  }
  let fulldate =`${monthAbbreviation} ${day}${k}, ${year}` ;
 setorderdate(fulldate);
//estimated date
dateObject.setDate(dateObject.getDate() + 7);
const year1 = dateObject.getFullYear();
const monthAbbreviation1 = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObject); // Abbreviated month name (e.g., "Aug")
const day1 = dateObject.getDate();
let k1='';
if (day1 >= 11 && day1 <= 13) {
  k1= 'th';
}
switch (day1 % 10) {
  case 1:
    k1= 'st';
    break;
  case 2:
    k1= 'nd';
    break;
  case 3:
    k1= 'rd';
    break;
  default:
    k1= 'th';
    break;
}
let fulldateestimated =`${monthAbbreviation1} ${day1}${k1}, ${year1}` ;
setestimateddate(fulldateestimated);
//return date
let dateObject123 = new Date(res.data.items.dateofstatus);
const year123 = dateObject123.getFullYear();
const monthAbbreviation123 = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObject123); // Abbreviated month name (e.g., "Aug")
const day123 = dateObject123.getDate();
let k123='';
if (day123 >= 11 && day123 <= 13) {
k= 'th';
}
switch (day123 % 10) {
case 1:
k123= 'st';
break;
case 2:
k123= 'nd';
break;
case 3:
k123= 'rd';
break;
default:
k123= 'th';
break;
}
let fulldate123 =`${monthAbbreviation123} ${day123}${k123}, ${year123}` ;
setreturndate(fulldate123);







           setlist(res.data.items);
       }
     else if(res.data.type ==='error')
     {
          seterror(res.data.errors);
     }
 }).catch(err =>{
   console.log(err);
 });
   

  }, );




  
  const totalprice =(price,quantity,discount)=>{
    const amount = (price*quantity)*(discount/100);
    return amount;
  }
  const handletrack = (id)=>{
   
  navigate('/Order/'+id);
  
  }


    
    
    const handlecancel = (id)=>{
    setcancel(true);
    setcancelid(id);
    }
    
    
    const handlecancelid = (e)=>{
      Axios.post('http://localhost:3001/cancelorderid',{
        token:token,
        id:cancelid,
       }).then(res=>{
         if(res.data.type ==='Success')
         {
          setcancel(!cancel)
         }
       else if(res.data.type ==='error')
       {
            seterror(res.data.errors);
       }
    }).catch(err =>{
     console.log(err);
    });
    }
    
    
    
    const handlereturn = (id)=>{
      setreturned(true);
      setreturnid(id);
      }
      
      
      const handlereturnid = (e)=>{
        Axios.post('http://localhost:3001/returnorderid',{
          token:token,
          id:returnid,
         }).then(res=>{
           if(res.data.type ==='Success')
           {
            setreturned(!returned)
           }
         else if(res.data.type ==='error')
         {
              seterror(res.data.errors);
         }
      }).catch(err =>{
       console.log(err);
      });
      }
    
    
    
    
      const handlereview = (name)=>{
        navigate('/Order/Revieworder/'+name);
        }
        
    const handleinvoice = (id)=>{
      navigate('/Order/Invoice/'+id);
    }
    
    
    
    





  return (
    <>
<Navbar/>



<div class="order-details">
  <div class="order-header">
    <div class="order-id">Order ID: #{val.orderid}</div>
  </div>
  <div class="invoice">
    <div class="section shipping-address">
      <div class="section-header">Shipping Address</div>
      <div class="address-details">
        <div class="address-field">Name: {val.shipname}</div>
        <div class="address-field">Address: {address}</div>
        <div class="address-field">City: {city}</div>
        <div class="address-field">State: {state}</div>
        <div class="address-field">Zip Code: {zip}</div>
        <div class="address-field">Country: {country}</div>
        <div class="address-field">Ordered On:{orderdate}</div>
      </div>
    </div>
    <div class="section payment-method">
      <div class="section-header">Payment Method</div>
      <div class="payment-details">{val.paymenttype}</div>
    </div>
    <div class="section order-summary">
      <div class="section-header">Order Summary</div>
      <div class="subtotal">Subtotal: ₹ {subtotal}</div>
      <div class="subtotal ">Shipping: ₹ {discount}</div>
      <div class="subtotal">Total: ₹ {total}</div>
    </div>
  </div>
</div>



<div className="containerorder">
        <div className="statusorder">
            <p>Status: {val.deliverystatus}</p>
            { val.deliverystatus === 'Shipping' &&    <button className="return-buttonorder buttonorder" onClick={()=> handletrack(val._id)}>Track Shipment</button>}
            
        </div>
        <div className="deliveryorder">
        { val.deliverystatus === 'Shipping' && <p>Estimated Delivery: {estimateddate}</p>}
        { val.deliverystatus === 'Delivered' && <p>Delivered On: {returndate}</p>}
        { val.deliverystatus === 'Cancel' && <p>Cancelled on: {returndate}</p>}
        { val.deliverystatus === 'Returned' && <p>Returned on: {returndate}</p>}
        </div>
        <div className="productorder">
            <div class="product-detailsorder">
                <img src="https://res.cloudinary.com/dzmyfembe/image/upload/v1691282729/i9tea2exwz1squpjc2xi.jpg" alt="1"/>
            </div>
            <div className="product-infoorder">
                <p>Product Name:{val.name}</p>
                <p>Price: ₹{val.price}</p>
                <p>Unit : {val.quantity}</p>
                <p>Total: ₹{total}</p>
            </div>
            <div className="buttonsorder">
    <div className="button-grouporder">
    {val.deliverystatus === 'Shipping' && <button className="slim-buttonorder buttonorder" onClick={()=> handlecancel(val._id)}>Cancel</button> }
        {val.deliverystatus === 'Shipping' && <button className="slim-buttonorder buttonorder" onClick={()=> handleinvoice(val._id)}>Invoice</button> }
        {val.deliverystatus === 'Delivered' && <button className="slim-buttonorder buttonorder" onClick={()=> handlereturn(val._id)}>Return</button> }
        {val.deliverystatus === 'Delivered' && <button className="slim-buttonorder buttonorder" onClick={()=> handlereview(val.name)}>Review</button> }
        {val.deliverystatus === 'Delivered' && <button className="slim-buttonorder buttonorder" onClick={()=> handleinvoice(val._id)}>Invoice</button> }
        {val.deliverystatus === 'Returned' && <button className="slim-buttonorder buttonorder" onClick={(e)=>{setrefund(!refund)}}>Refund status</button> }
    </div>
</div>
        </div>
    </div>


    {cancel && <div className='containerpop'><div className={`custom-model-main ${cancel ? 'model-open' : ''}`}>
    <div className="custom-model-inner">        
    <div className="close-btn" onClick={(e)=>{setcancel(!cancel)}}>×</div>
        <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">
            <div class="cancel-order">
                <p>Are you sure you want to cancel the order?</p>
               <button className="cancel-button" onClick={(e)=> handlecancelid(e)}>Cancel Order</button>
                  </div>
            </div>
        </div>  
    </div>  
    <div className="bg-overlay"></div>
</div>
</div>}


{returned && <div className='containerpop'><div className={`custom-model-main ${returned ? 'model-open' : ''}`}>
    <div className="custom-model-inner">        
    <div className="close-btn" onClick={(e)=>{setreturned(!returned)}}>×</div>
        <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">
            <div class="cancel-order">
                <p>Are you sure you want to Return the order?</p>
               <button className="cancel-button" onClick={(e)=> handlereturnid(e)}>Return Order</button>
                  </div>
            </div>
        </div>  
    </div>  
    <div className="bg-overlay"></div>
</div>
</div>}



{refund && <div className='containerpop'><div className={`custom-model-main ${refund ? 'model-open' : ''}`}>
    <div className="custom-model-inner">        
    <div className="close-btn" onClick={(e)=>{setrefund(!refund)}}>×</div>
        <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">
            <div class="cancel-order">
            <p>Your refund request is being processed.</p>
            <p> Please allow some time.</p>
   
                  </div>
            </div>
        </div>  
    </div>  
    <div className="bg-overlay"></div>
</div>
</div>}



<Footer/>
    </>
  );
}

export default Vieworder;