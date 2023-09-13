import React,{useState,useEffect} from 'react';
import Axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { discountCreators } from '../../redux';
import '../../css/Cart/coupons.css';
import '../../css/Cart/Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
function Listcart() {

  const dispatch = useDispatch();
  const {discountstore} = bindActionCreators(discountCreators,dispatch);
const token = localStorage.getItem('Customer-token');

const navigate = useNavigate();
  const [list,setlist] = useState([]);  
  const [error,seterror] = useState('');  
  const [couponerror,setcouponerror] = useState('');  
const [coupon,setcoupon] = useState('');
const [discount,setdiscount] = useState(0);


  
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
},)


const handledelcart = (name)=>{


Axios.post('http://localhost:3001/delcart',{
      token:token,
       name:name,
      }).then(res=>{

        if(res.data.type ==='error')
      {
           seterror(res.data.errors);
      }
  }).catch(err =>{
    console.log(err);
  });

}

const calculateTotal = (item) => {
  return item.price * item.quantity;
};

const calculateGrandTotal = () => {
  return list.reduce((total, item) => total + calculateTotal(item), 0);
};



const handleminus = (name,quantity)=>{

if(quantity>1){
  Axios.post('http://localhost:3001/cartminus',{
        token:token,
         name:name,
        }).then(res=>{
  
          if(res.data.type ==='error')
        {
             seterror(res.data.errors);
        }
    }).catch(err =>{
      console.log(err);
    });
}else
{

}

  
  }




  const handleplus = (name)=>{


    Axios.post('http://localhost:3001/cartplus',{
           token:token,
           name:name,
          }).then(res=>{
    
            if(res.data.type ==='error')
          {
               seterror(res.data.errors);
          }
      }).catch(err =>{
        console.log(err);
      });
    
    }
  
    const handlecoupon = ()=>{
      Axios.post('http://localhost:3001/couponcode',{
             code:coupon,
            }).then(res=>{
              if(res.data.type ==='Success'){
                setdiscount(res.data.discount);
                discountstore(res.data.discount);
              }
              else if(res.data.type ==='Expire')
              {
                    setcouponerror(res.data.message);
              }
              else
              {
                discountstore(0);
              }
        }).catch(err =>{
          console.log(err);
        });
      
      }
    
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


const countlist = ()=>{
  return list.length;
}

const handleaddress =()=>{
  navigate('/Address');
}


  return (
<>
<div className='smalldesc'>
<table>
  {list.length >0 && 
    <tr>
    <th>
      Product Name
    </th>
    <th>
      Quantity
    </th>
    <th>
      Subtotal
    </th>
    <th>
      Remove
    </th>
  </tr>
  }
  {list.map((val,key)=>{
      return(
        <tr className='cartbottom' key={key}>
        <td>
          <div className='cartinfo'>
          <img src ={val.image} alt='1'/>
          <div>
            <p>{val.name}({val.type})</p>
            <small>₹{val.price}</small>
          </div>
          
          
          </div>
        </td>
        <td>
        <div class="number-input">
          <button class="btn-minus" onClick={()=> handleminus(val.name,val.quantity)}>-</button>
          <input type="number" min="1" step="1" value={val.quantity}/>
          <button class="btn-plus" onClick={()=> handleplus(val.name)}>+</button>
        </div>
        
        </td>
        <td>
          {val.price * val.quantity}
        </td>
        <td className='trashonhover'  onClick={()=> handledelcart(val.name)}>
        <FontAwesomeIcon icon={faTrash} />
        </td>
          </tr>
        
      )}
      )} 
</table>
</div>

{list.length ===0 && 
      <div className='bodyemptycart'>
      <div className="cart-container">
      <div className="bigger-text">
        Your Shopping Cart is empty.
      </div>
      <div className="smaller-text">
        Your shopping cart is waiting. Give it purpose – fill it with Vegetable,Fruits,Beauty,Kitchen Ware and more.
      </div>
      <div className="smaller-text">
        Continue shopping on the Publix.in homepage, learn about today's deals, and enjoy shopping.
      </div>
    </div>
    </div>
      }  

{list.length>0 &&
  <div className='bodycoupons'>
  <div class="coupon-section">
    <div class="coupon-content">
      <h2>Apply Coupons</h2>
     {couponerror && <p>{couponerror}</p>}
      <label for="coupon-input">Enter coupon code:</label>
      <input type="text" id="coupon-input" placeholder="Enter code" onChange={(e)=>{setcoupon(e.target.value)}}/>
      <button class="coupon-button" onClick={handlecoupon}>Apply</button>
    </div>
  </div>
  </div>
}




{list.length>0 && 
<div>
  <div className='blockcart'>
  <div className='concart2'>
  <p className='headcart'>Cart Total</p>
  <div className='costcart'>
  <p className='leftcart'>Subtotal</p>
  <p className='rightcart'>₹ {calculateGrandTotal()}</p>
  </div>
  
  <div className='costcart'>
  <p className='leftcart'>Shipping</p>
  {list.length === 0 ?<p className='rightcart'>₹ 0</p> :<p className='rightcart'>₹ 100</p>}
  </div>
  
  
  <div className='costcart'>
  <p className='leftcart'>Discount</p>
  <p className='rightcart'>{discount}%({isNaN(discounttotal())?0:discounttotal()})</p>
  </div>
  
  <div className='totalbottom'></div>
  
  
  <div className='costcart'>
  <div className='leftcart'>Total Cost</div>
  <div className='rightcart'>₹ {all()}</div>
  </div>
  
  </div>
  </div>
  <div className='costbtncontent'>
  <button className='costbtn' onClick={handleaddress}>Proceed to Checkout({countlist()} items)</button>
  </div>
  </div>


}

 



</>
  );
}

export default Listcart;
