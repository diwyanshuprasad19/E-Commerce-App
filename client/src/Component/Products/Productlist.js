import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../css/Product/newdesign.css';
import Axios from 'axios';



function Productlist() {

const navigate = useNavigate();  
const [list,setlist] = useState([]);  
const [currentpage,setcurrentpage] = useState(1);
const filteroption = useSelector((state) => state.filter);


let itemperpage =6;
let startIndex = (currentpage - 1) * itemperpage;
let endIndex = startIndex + itemperpage;
let currentItems = list.slice(startIndex, endIndex);
let totalPages = Math.ceil(list.length / itemperpage);


const repeatedElements = Array.from({ length: totalPages }, (_, index) => (
  <button key={index} className={`page-button ${currentpage === index+1 ? 'active' :' '}`} onClick={() => handlePageChange(index+1)}
          disabled={currentpage === 1}>{index+1}</button>
));







  useEffect(()=>{
    Axios.get('http://localhost:3001/admin/readproduct').then(res=>{
        setlist(res.data.items);
    }).catch(err =>{
      console.log(err);
    });

  },[])

const handledesc = (id)=>{
navigate('/Description/'+id);

}






const handlePageChange = (newPage) => {
  setcurrentpage(newPage);
};

  return (
    <>
<section class="products">
		<div class="all-products">

    {currentItems.map((val,key)=>{

let ratingscore = Math.floor(((val.rating *2)/100));
let fullstarfilled = parseInt(ratingscore/2);
let halfstarfilled = parseInt(ratingscore%2);
let emptystarfilled = parseInt((10-ratingscore)/2);
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


      return(
        <div className="product" key={key} onClick={()=> handledesc(val._id)}>
				<img src={val.image} alt='1'/>
        {val.quantity >=1 ?<p className='overlappro'>In Stock</p> : <p className='overlappro'>Unavailable</p>}
				<div class="product-info">
					<h4 class="product-title">{val.productname}
					</h4>
					<p class="product-price">₹ {val.price}</p>
                   <div className='product-price'>

                   <fieldset class="rate">
                   {elements}
                   </fieldset>

<p class="product-price">{(val.rating/100).toFixed(1)}({val.norating})</p>



                   </div>
                     
				</div>
			</div>
      )}
      )}   


		</div>
	</section>


  <div class="pagination">
    <button className='page-button' onClick={() => handlePageChange(currentpage - 1)}
          disabled={currentpage === 1}>Previous</button>

{repeatedElements}

    <button 
className='page-button' onClick={() => handlePageChange(currentpage + 1)}
          disabled={currentpage === totalPages}>Next</button>
  </div>

     </>
  );
}

export default Productlist;