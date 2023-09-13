import React,{useEffect,useState} from 'react';
import Axios  from 'axios';

import { useNavigate } from 'react-router-dom'; 

import '../../css/Order/ordersearch.css';
import '../../css/Order/detailorder.css';
import '../../css/Order/detailmenu.css';
import '../../css/Product/Description.css';
import '../../css/Order/Revieworder.css';


function OrderSearch() {


  const navigate = useNavigate();
  const token = localStorage.getItem('Customer-token');
const [list,setlist] = useState([]);
const [error,seterror] = useState(''); 
const [cancel,setcancel] = useState(false);
const [cancelid,setcancelid] = useState('');
const [returned,setreturned] = useState(false);
const [returnid,setreturnid] = useState('');
const [refund,setrefund] = useState(false);



  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {





    Axios.post('http://localhost:3001/readorder',{
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
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, );



const newdate =(date,bool)=>{

  let dateObject = new Date(date);
  if(bool === '2'){
    const sevenDaysLater = new Date(dateObject);
sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
dateObject =sevenDaysLater;
  }
  else if(bool ==='3'){
    const sevenDaysLater = new Date(dateObject);
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 14);
    dateObject =sevenDaysLater;
  }
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
  return fulldate;
}


const totalprice =(price,quantity,discount)=>{
  const amount = (price*quantity)*(discount/100);
  return amount;
}


const handletrack = (id)=>{
 
navigate('/Order/'+id);

}



const handlevieworder = (id)=>{
 
  navigate('/Order/Vieworder/'+id);
  
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


<div className='middleyourorder'>
<h1 >Your Order</h1>
</div>


{list.length === 0 &&
  <div className='bodyemptycart'>
      <div className="cart-container">
      <div className="bigger-text">
      Looks like your cart is on a diet – it's empty!
      </div>
      <div className="smaller-text">
      Your cart is as empty as a magician's hat after a rabbit show.
       No groceries here, but don't worry, we've got shelves full of goodies waiting for you to pick and pack.
      </div>
      <div className="smaller-text">
      Let's fill this cart with culinary adventures! 🛒🍏🥖.
      </div>
    </div>
    </div>
}

<div className="contianerdetails">
<div className="tableupper">

  {list.map((val,key)=>{

let total123 = Math.round(val.price*val.quantity*((100-val.discount)/100));
let total = parseFloat(total123.toFixed(1));
    return(
    
<div key={key}>
{windowSize.width >=765 &&
  <table>
    <tr>
      <th>Order Number</th>
      <th>Date</th>
      <th>Total</th>
      <th>Shipped to</th>
      <th></th>
    </tr>
    <tr>
      <td>#{val.orderid}</td>
      <td>{newdate(val.date,'1')}</td>
      <td>₹{total}</td>
      <td>{val.shipname}</td>
      <td><button class="viewbutton" onClick={()=> handlevieworder(val._id)}>View order</button></td>
    </tr>
  </table>
  }


{windowSize.width <=764 && 
<table>
  <tr>
    <th></th>
    <th>Order Number</th>
    <th></th>
    <th>Date</th>
    <th></th>
  </tr>
  <tr>
    <td></td>
    <td>#{val.orderid}</td>
    <td></td>
    <td>{newdate(val.date,'1')}</td>
    <td></td>
  </tr>
  <tr>
    <th></th>
    <th>Total</th>
    <th></th>
    <th>Shipped to</th>
    <th></th>
  </tr>
  <tr>
    <td></td>
    <td>₹{total}</td>
    <td></td>
    <td>{val.shipname}</td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2"  ><button className="viewbutton" onClick={()=> handlevieworder(val._id)}>View order</button></td>
    <td></td>
  </tr>
</table>

}


<div className="containerorder">
        <div className="statusorder">
            <p>Status: {val.deliverystatus}</p>
            { val.deliverystatus === 'Shipping' &&    <button className="return-buttonorder buttonorder" onClick={()=> handletrack(val._id)}>Track Shipment</button>}
        
        </div>
        <div className="deliveryorder">
        { val.deliverystatus === 'Shipping' && <p>Estimated Delivery: {newdate(val.date,'2')}</p>}
        { val.deliverystatus === 'Delivered' && <p>Delivered On: {newdate(val.dateofstatus,'1')}</p>}
        { val.deliverystatus === 'Cancel' && <p>Cancelled on: {newdate(val.dateofstatus,'1')}</p>}
        { val.deliverystatus === 'Returned' && <p>Returned on: {newdate(val.dateofstatus,'1')}</p>}
        </div>
        <div className="productorder">
            <div class="product-detailsorder">
                <img src={val.image} alt="1"/>
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


  
</div>




    )
  })}


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






</div>
</div>









</>
  );
}

export default OrderSearch;
