import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Axios  from 'axios';
import Navbar from '../../navbar';
import Footer from '../../Home/footer';
import '../../../css/Order/track.css';

const Trackorder =()=>{
  const email = 'diwyanshu.prasad@gmail.com';
  const token = localStorage.getItem('Customer-token');
const [val,setlist] = useState({});
const [error,seterror] = useState('');
const { id } = useParams();
const [h1,seth1] = useState('');
const [h2,seth2] = useState('');
const [h3,seth3] = useState('');
const [h4,seth4] = useState('');

const [d1,setd1] = useState(false);
const [d2,setd2] = useState(false);
const [d3,setd3] = useState(false);
const [d4,setd4] = useState(false);
const [totalPrice, setTotalPrice] = useState(0);



useEffect(() => {

    Axios.post('http://localhost:3001/readorderwithid',{
      token:token,
      id:id,
     }).then(res=>{
       if(res.data.type ==='Success')
       {

        const calculatedTotalPrice = res.data.items.price * res.data.items.quantity * ( (100-res.data.items.discount)/100);
        setTotalPrice(calculatedTotalPrice);   
        setlist(res.data.items);
           handledate1(res.data.items);
           handledate2(res.data.items);
           handledate3(res.data.items);
           handledate4(res.data.items);
       }
     else if(res.data.type ==='error')
     {
          seterror(res.data.errors);
     }
 }).catch(err =>{
   console.log(err);
 });

  }, []);


const handleprice = (val)=>{
const total = val.price * val.quantity;
const price = total *(val.discount/100);
console.log(price);
}

//h1
const handledate1 =(val)=>{
  let date = val.date;
  let dateObject = new Date(date);
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
  let newdate = new Date();
  setd1(newdate>=dateObject);
  let fulldate =`${monthAbbreviation} ${day}${k}, ${year}` ;
  seth1(fulldate);
}

//h2
const handledate2 =(val)=>{
  let date = val.date;
  let dateObject = new Date(date);
  const sevenDaysLater = new Date(dateObject);
sevenDaysLater.setDate(sevenDaysLater.getDate() + 2);
dateObject =sevenDaysLater;
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
  let newdate = new Date();
  setd2(newdate>=dateObject);
  let fulldate =`${monthAbbreviation} ${day}${k}, ${year}` ;
  seth2(fulldate);
}



//h3
const handledate3 =(val)=>{
  let date = val.date;
  let dateObject = new Date(date);
  const sevenDaysLater = new Date(dateObject);
  sevenDaysLater.setDate(sevenDaysLater.getDate() + 5);
  dateObject =sevenDaysLater;
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
  let newdate = new Date();
  setd3(newdate>=dateObject);
  let fulldate =`${monthAbbreviation} ${day}${k}, ${year}` ;
  seth3(fulldate);
}




//h4
const handledate4 =(val)=>{
  let date = val.date;
  let dateObject = new Date(date);
  const sevenDaysLater = new Date(dateObject);
  sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
  dateObject =sevenDaysLater;
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
  let newdate = new Date();
  setd4(newdate>=dateObject);
  let fulldate =`${monthAbbreviation} ${day}${k}, ${year}` ;
  seth4(fulldate);
}









  return (
    <>
<Navbar/>

<div className='bodytrack' >
<section className="root">
  <figure>
    <img src={val.image} alt="1" />
    <figcaption>
      <h4>{val.name}</h4>
      <h6>{val.type}</h6>
      <h4>₹{totalPrice}</h4>
    </figcaption>
  </figure>
  <div className="order-track">
    <div className="order-track-step">
      <div className="order-track-status">
        <span className={`order-track-status-dot ${d1 ? '' : 'grey'}`}></span>
        <span className={`order-track-status-line ${d1 ? '' : 'grey'}`}></span>
      </div>
      <div className="order-track-text">
        <p className="order-track-text-stat">Order Received</p>
        <span className="order-track-text-sub">{h1}</span>
      </div>
    </div>
    <div className="order-track-step">
      <div className="order-track-status">
        <span className={`order-track-status-dot ${d2 ? '' : 'grey'}`}></span>
        <span className={`order-track-status-line ${d2 ? '' : 'grey'}`}></span>
      </div>
      <div class="order-track-text">
        <p class="order-track-text-stat">Order Processed</p>
        <span class="order-track-text-sub">{h2}</span>
      </div>
    </div>
    <div className="order-track-step">
      <div className="order-track-status">
        <span className={`order-track-status-dot ${d3 ? '' : 'grey'}`}></span>
        <span className={`order-track-status-line ${d3 ? '' : 'grey'}`}></span>
      </div>
      <div className="order-track-text">
        <p className="order-track-text-stat">Order Dispatched</p>
        <span className="order-track-text-sub">{h3}</span>
      </div>
    </div>
    <div className="order-track-step">
      <div className="order-track-status">
        <span className={`order-track-status-dot ${d4 ? '' : 'grey'}`}></span>
        <span className={`order-track-status-line ${d4 ? '' : 'grey'}`}></span>
      </div>
      <div className="order-track-text">
        <p className="order-track-text-stat">Order Delivered</p>
        <span className="order-track-text-sub">{h4}</span>
      </div>
    </div>
  </div>
</section>
</div>



<Footer/>
    </>
  );
}

export default Trackorder;