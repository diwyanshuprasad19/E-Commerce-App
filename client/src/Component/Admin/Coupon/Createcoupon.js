import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import '../../../css/Admin/Body.css';
import '../../../css/Admin/main.css';
import Navigation from '../DashBoard/navigation';
import '../../../css/Admin/Createproduct.css';


function Createcoupon() {

  const [code,setcode] = useState('');
  const [discount, setdiscount] = useState(0);
  const [expire,setexpire] = useState(null);
  const [status,setstatus] = useState(true);
  const [error,seterror] = useState('');
  const [success,setsuccess] = useState(false);
  const token = localStorage.getItem('Admin-token');
  const [list,setlist] = useState([]);


  useEffect(()=>{
    Axios.post('http://localhost:3001/readadminspecific',{
       token:token,
      }).then(res=>{
        if(res.data.type ==='Success')
        {
            setlist(res.data.items);
        }
      else if(res.data.type ==='error')
      {
           console.log(res.data.errors);
      }
  }).catch(err =>{
    console.log(err);
  });
  },[])



  function handledate(e) {
    const dateValue = e.target.value;
    setexpire(dateValue);  // state variable updated here
  }



    function toggleMenu() {
        const navigation = document.querySelector('.navigationdash');
        const main = document.querySelector('.maindash');
    
        navigation.classList.toggle('active');
        main.classList.toggle('active');
      }

      const handleSelectChange = (event) => {
        const { value } = event.target;
        setstatus(value);
      };



      const handlecreate =(e)=>{
        e.preventDefault();
      
          Axios.post('http://localhost:3001/admin/createcoupon',{
            code:code,
            discount:discount,
            expire:expire,
            status:status,
          }).then(res =>{
            if(res.data.type === 'success')
            {
              handlesuccess();
            }
            else if(res.data.type === 'validation')
             {
              seterror(res.data.errors[0].msg);
              setTimeout(() => {
                seterror('');
              }, 2000); 
             }
             else if(res.data.type === 'similar'){
              seterror(res.data.errors);
              setTimeout(() => {
                seterror('');
              }, 2000);
             }
             else if(res.data.type === 'Coupon not saved'){
              seterror(res.data.errors);
              setTimeout(() => {
                seterror('');
              }, 2000);
             }
          }).catch(error =>{
            console.log(error);
            setTimeout(() => {
              seterror('');
            }, 2000);
          });
      }



      const handlesuccess = () => {
        setsuccess(true);
        setTimeout(() => {
          setsuccess(false);
        }, 2000); 
      };
      



  return (
    <>

<div className='containerbody'>
    <div className='containerdashboard'>
<Navigation/>
<div className='maindash'>

        <div className="topbar">
                <div className="toggle"   onClick={toggleMenu}>
                <i class="fa-sharp fa-solid fa-bars"></i>
                </div>


                <div className="user">
                    <a href="/"><img src={list.image} alt=""/></a>
                </div>
        </div>


    <div className="wrapper">
    <div className="title">
      Create Coupon
    </div>
    <div className="form">
    {error && <p>{error}</p>}
    {success &&   <div className="success-messageproduct">
          Success! The Product saved successfully.
        </div>}
       <div className="inputfield">
          <label>Coupon Code</label>
          <input type="text" className="input" onChange={(e)=>{setcode(e.target.value)}}/>
       </div>  
        <div className="inputfield">
          <label>Discount (%)</label>
          <input type="number" className="input" onChange={(e)=>{setdiscount(e.target.value)}}/>
       </div>  
       <div className="inputfield">
          <label>Expire on</label>
          <input type="Date" className="input" onChange={handledate}/>
       </div>  
        <div className="inputfield">
          <label>Status</label>
          <div className="custom_select">
            <select onChange={handleSelectChange}>
              <option value="">Select</option>
              <option value="True">True</option>
              <option value="False">Fasle</option>
            </select>
          </div>
       </div> 
      <div className="inputfield">
        <input type="submit" value="Create" className="btn" onClick={handlecreate}/>
      </div>
    </div>
</div>





</div>
    </div>
</div>

      </>
  );
}

export default Createcoupon;