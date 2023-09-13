import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/ourproduct.css';


function Ourproduct() {
 
const [list,setlist] = useState([]);  
const navigate = useNavigate();  

useEffect(()=>{
  Axios.get('http://localhost:3001/like').then(res=>{
      setlist(res.data.items);

  }).catch(err =>{
    console.log(err);
  });
},[])

const handledesc = (id)=>{

    navigate('/Description/'+id);

  
  }
  



  return (
    <>
<section class="products">
		<h2 className='eco1'>Most Popular</h2>
		<div class="all-products">

    {list.map((val,key)=>{
      let ratingscore = Math.floor(((val.rating *2)/100));
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
      return(
        <div class="product" key={key} onClick={()=> handledesc(val._id)}>
				<img src={val.image} alt='1'/>
				<div class="product-info">
					<h4 class="product-title">{val.productname}
					</h4>
					<p class="product-price">Rs {val.price}</p>
<div className='product-price'>

                   <fieldset className="rate">
                 {elements}
</fieldset>

<p className="product-price">{(val.rating/100).toFixed(1)}({val.norating})</p>



                   </div>
                     
				</div>
			</div>
      )}
      )}   


		</div>
	</section>
     </>
  );
}

export default Ourproduct;