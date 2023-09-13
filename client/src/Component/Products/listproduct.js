import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { cartCreators,discountCreators } from '../../redux';
import '../../css/Product/popup.css';

function Listproduct(props) {
const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartstore} = bindActionCreators(cartCreators,dispatch);
  const {discountstore} = bindActionCreators(discountCreators,dispatch);
  const [coupon,setcoupon] = useState('');
const [discount,setdiscount] = useState(0);
const [error,seterror] = useState('');

const token = localStorage.getItem('Customer-token');


const handlestore = (e)=>{
  e.preventDefault();
  
  Axios.post('http://localhost:3001/addtocart',{
    token:token,
    pname:props.pname,
    image:props.img,
    type:props.type,
    quantity:props.count,
    price:props.price,
     }).then(res=>{
       if(res.data.type ==='Success')
       {
          navigate('/Cart');
       }
     else if(res.data.type ==='error')
     {
          seterror(res.data.errors);
     }
 }).catch(err =>{
   console.log(err);
 });

  const obj ={
    active:true,
    price:props.price,
    img:props.img,
    name:props.pname,
    count:props.count,
    discount:0,
    total:0,
    type:props.type,
  }
  cartstore(obj);

}




    return (
      <>
			<div class="productpop">
        <div className='parentlap'>
				<img src={props.img} alt='1'/>
        <div className='overlappro'>{props.store ? 'In Store' : 'Unavailable'}</div>
        </div>
				<div class="product-info">
					<h4 class="product-title">{props.pname}({props.count} Items )
					</h4>
          <fieldset class="rate">
          {props.elements}
    <p class="product-price">{(props.rating/100).toFixed(1)}({props.nrating})</p>
</fieldset>
					<a class="product-btn" href="/" onClick={(e)=>{handlestore(e)}}>Checkout(₹ {props.price * props.count})</a>
                     
				</div>
			</div>
  </>
    );
  }
  
  export default Listproduct;