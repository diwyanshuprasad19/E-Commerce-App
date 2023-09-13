import React,{useState,useEffect} from 'react';
import Axios  from 'axios';
import '../../../css/Order/Revieworder.css';

const Otherrating =(props)=>{
    
const [list321,setlist321] = useState([]);
const [error321,seterror321] = useState('');
const token = localStorage.getItem('Customer-token');
const email ='diwyanshu.prasad@gmail.com';
const pname = props.pname;


useEffect(() => {

  Axios.post('http://localhost:3001/readreview',{
    token:token,
    pname:pname,
   }).then(res=>{
     if(res.data.type ==='Success')
     {
         setlist321(res.data.items);
     }
   else if(res.data.type ==='error')
   {
        seterror321(res.data.errors);
   }
}).catch(err =>{
 console.log(err);
});

}, []);



  return (
    <>
  {list321.map((val,key)=>{
    return(
      
<form className="review-form" key={key}>
  <div className="rating">
  {val.rating>=1 && <i class="fa-solid fa-star" ></i>} 
  {val.rating>=2 && <i class="fa-solid fa-star" ></i>} 
  {val.rating>=3 && <i class="fa-solid fa-star" ></i>} 
  {val.rating>=4 && <i class="fa-solid fa-star" ></i>} 
  {val.rating>=5 && <i class="fa-solid fa-star" ></i>} 



  {val.rating<1 && <i class="fa-regular fa-star" ></i>} 
  {val.rating<2 && <i class="fa-regular fa-star" ></i>} 
  {val.rating<3 && <i class="fa-regular fa-star" ></i>} 
  {val.rating<4 && <i class="fa-regular fa-star" ></i>} 
  {val.rating<5 && <i class="fa-regular fa-star" ></i>} 

  </div>

  <div class="desccont">
        <div class="description">
            {val.review}
        </div>
        <div class="name">
            {val.email}
        </div>
    </div>
</form>

    )
  })}


    </>
  );
}

export default Otherrating;