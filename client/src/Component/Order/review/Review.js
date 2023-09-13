import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Axios  from 'axios';
import Navbar from '../../navbar';
import Footer from '../../Home/footer';
import '../../../css/Order/Revieworder.css';
import Otherrating from './otherrating';



const Revieworder =()=>{
    
    const [error123,seterror123] = useState('');
    const { pname } = useParams();
    const email ='diwyanshu.prasad@gmail.com';
    const [rate,setrate] = useState(1);
   const [desc,setdesc] = useState('');
   const [already,setalready] = useState('');
   const token = localStorage.getItem('Customer-token');

 





const handlesubmit = (e)=>{
e.preventDefault();
Axios.post('http://localhost:3001/reviewsave',{
      token:token,
      name:pname,
      desc:desc,
      rate:rate,
     }).then(res=>{
       if(res.data.type ==='Success')
       {
        console.log('Success');
       }
       else if(res.data.type ==='Already reviewed')
       {
            setalready('You have already reviewed this product');
       }
     else if(res.data.type ==='error')
     {
          seterror123(res.data.errors);
     }
  }).catch(err =>{
   console.log(err);
  });

}

  return (
    <>
<Navbar/>


<div class="containerreview">
<form className="review-form" >
  <h2>Write Your Review</h2>
  <div className="rating">
  {rate>=1 && <i class="fa-solid fa-star" onClick={(e)=>{setrate(1)}}></i>} 
  {rate>=2 && <i class="fa-solid fa-star" onClick={(e)=>{setrate(2)}}></i>} 
  {rate>=3 && <i class="fa-solid fa-star" onClick={(e)=>{setrate(3)}}></i>} 
  {rate>=4 && <i class="fa-solid fa-star" onClick={(e)=>{setrate(4)}}></i>} 
  {rate>=5 && <i class="fa-solid fa-star" onClick={(e)=>{setrate(5)}}></i>} 



  {rate<1 && <i class="fa-regular fa-star" onClick={(e)=>{setrate(1)}}></i>} 
  {rate<2 && <i class="fa-regular fa-star" onClick={(e)=>{setrate(2)}}></i>} 
  {rate<3 && <i class="fa-regular fa-star" onClick={(e)=>{setrate(3)}}></i>} 
  {rate<4 && <i class="fa-regular fa-star" onClick={(e)=>{setrate(4)}}></i>} 
  {rate<5 && <i class="fa-regular fa-star" onClick={(e)=>{setrate(5)}}></i>} 

  </div>
  <span  className="help-block">
    Click on a star to change your rating 1 - 5, where 5 = great! and 1 = really bad
  </span>
  <div className="form-group">
    <label className="control-label" for="review">Your Review:</label>
    <textarea className="form-control" rows="10" placeholder="Your Reivew" name="review" onChange={(e)=>{setdesc(e.target.value)}}></textarea>
    <span  className="help-block pull-right">
      {already &&<span style={{'color':'green','fontSize':'200'}}>{already}</span>}
    </span>
  </div>
  <a href="/"  className="btn btn-primary" onClick={handlesubmit}>Submit</a>
  <span  className="help-block">
    By clicking <strong>Submit</strong>, I authorize the sharing of my name and review on the web. (email will not be shared)
  </span>
</form>
<h2>Read what others have said about us:</h2>
<div className="review-container">
<Otherrating pname={pname}/>
</div>
</div>

<Footer/>
    </>
  );
}

export default Revieworder;