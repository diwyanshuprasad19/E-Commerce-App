import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Navbar from '../navbar';
import Listproduct from './listproduct';
import '../../css/Product/Description.css';
import Search from '../search';
import Footer from '../Home/footer';


function Description() {
    const params = useParams();
    const {id} = params;

    const [count,setcount] = useState(1);
    const [list,setlist] = useState([]);  
    const [error,seterror] = useState('');  
const [addcart,setaddcart] = useState(false);
const token = localStorage.getItem('Customer-token');
  const [click,setclick] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault(); 
  };

    useEffect(()=>{
        Axios.post('http://localhost:3001/productdescription',{
            id:id,
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
    },[id])




    const incre = ()=>{
        setcount(count+1);
    }

    const decre = ()=>{
        if(count>1)
        {
            setcount(count-1);
        }
    }

 
      const handleadd = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:3001/addtocart',{
         token:token,
         pname:list.productname,
         image:list.image,
         type:list.type,
         quantity:count,
         price:list.price,
          }).then(res=>{
            if(res.data.type ==='Success')
            {
                setaddcart(true);
                setTimeout(() => {
                  setaddcart(false);
                }, 2000); 
            }
          else if(res.data.type ==='error')
          {
               seterror(res.data.errors);
          }
      }).catch(err =>{
        console.log(err);
      });

      };


const handlebuy = (e)=>{
e.preventDefault();
setclick(!click);
}


let ratingscore = Math.floor(((list.rating *2)/100));
console.log(ratingscore)
let fullstarfilled = parseInt(ratingscore/2);
console.log(fullstarfilled);
let halfstarfilled = parseInt(ratingscore%2);
console.log(halfstarfilled);
let emptystarfilled = parseInt((10-ratingscore)/2);
console.log(emptystarfilled);
let elements =[];
for (let i = 0; i <fullstarfilled; i++) {
  elements.push(<i class="fa-solid fa-star"></i>);
}
for (let j = 0; j < halfstarfilled; j++) {
  elements.push(<i class="fa-solid fa-star-half-stroke"></i>);
}
for (let k = 0; k < emptystarfilled; k++) {
  elements.push(<i class="fa-regular fa-star"></i>);
}
console.log(elements);















  return (
    <>
    <Navbar/>
<Search/>
{error && <p>{error}</p>}
<div class="containerdesc">
        <div class="boxdesc">
            <div class="imagesdesc">
                <div class="img-holder active">
                    <img src={list.image} alt='1'/>
                    {list.quantity >=1 ?<p className='overlappro'>In Stock</p> : <p className='overlappro'>Unavailable</p>}
                </div>
                <div class="img-holder">
                    <img src={list.image} alt='2' />
                </div>
                <div class="img-holder">
                    <img src={list.image} alt='3'/>
                </div>
                <div class="img-holder">
                    <img src={list.image} alt='4'/>
                </div>
            </div>
            <div class="basic-info">
                <h1>{list.productname}</h1>
                <h4>{list.type}</h4>               
                
<div class="rate123">
              
                <fieldset class="rate">
{elements}
    <p class="product-price">{(list.rating/100).toFixed(1)}({list.norating})</p>
</fieldset>
</div>
                <span className='pricedesc'>₹ {list.price}</span>


                <div class="quantity-control">
                 <button class="decrease-btn" onClick={decre}>-</button>
              <span class="quantity">{count}</span>
               <button class="increase-btn" onClick={incre}>+</button>
                </div>


                <div class="options">
                    <a href="/" onClick={handlebuy}>Buy It Now</a>
                    <a href="/" style={{backgroundColor: addcart ? 'green' : '#00b4d5',}}   onClick={handleadd}>{addcart ? 'Added':'Add to Cart'}</a>
                </div>
                {addcart &&<p className='cartadded'> ✔ Success! Added to cart</p>}
{click && <div className='containerpop'><div className={`custom-model-main ${click ? 'model-open' : ''}`}>
    <div className="custom-model-inner">        
    <div className="close-btn" onClick={(e)=>{setclick(!click)}}>×</div>
        <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">
               <Listproduct store={list.quantity >=1} rating={list.rating} nrating={list.norating} img={list.image} pname={list.productname} count={count} ele={elements} price = {list.price} total={list.price*count} type ={list.type}/>
            </div>
        </div>  
    </div>  
    <div className="bg-overlay"></div>
</div>
</div>}
                














            </div>
            <div class="description">
                <p>{list.Description}</p>
                <ul class="features">
                    {list.service1 ? <li><i class="fa-solid fa-circle-check"></i>Fast Delivery</li> : <li><i class="fa-solid fa-circle-xmark"></i>Fast Delivery</li>}
                    {list.service2 ? <li><i class="fa-solid fa-circle-check"></i>Return Policy</li> : <li><i class="fa-solid fa-circle-xmark"></i>Return Policy</li>}
                    {list.service3 ? <li><i class="fa-solid fa-circle-check"></i>Customer Care</li> : <li><i class="fa-solid fa-circle-xmark"></i>Customer Care</li>}
                    {list.service4 ? <li><i class="fa-solid fa-circle-check"></i>Cash Back</li> : <li><i class="fa-solid fa-circle-xmark"></i>Cash Back</li>}
                </ul>
                <ul class="social">
                    <li><a href="#" onClick={handleClick}><i class="fa-brands fa-facebook-f"></i></a></li>
                    <li><a href="#" onClick={handleClick}><i class="fa-brands fa-instagram"></i></a></li>
                    <li><a href="#" onClick={handleClick}><i class="fa-brands fa-twitter"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
<Footer/>
</>
  );
}

export default Description;