import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import '../../../css/Admin/Body.css';
import '../../../css/Admin/main.css';
import Navigation from '../DashBoard/navigation';
import '../../../css/Admin/Createproduct.css';

const uploadPreset ="grocery";
const cloudName = "dzmyfembe";


function Createproduct() {



const [pname,setpname] = useState('');
const [imageUrl, setImageUrl] = useState('');
const [pquantity,setpquantity] = useState('');
const [price,setprice] = useState('');
const [ptype,setptype] = useState('');
const [pdesc,setpdesc] = useState('');
const [pservice1,setpservice1] = useState(false);
const [pservice2,setpservice2] = useState(false);
const [pservice3,setpservice3] = useState(false);
const [pservice4,setpservice4] = useState(false);
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















  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
  
    try {
      const response = await Axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      const url = response.data.secure_url;
      setImageUrl(url);
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setptype(value);
  };
  
    function toggleMenu() {
        const navigation = document.querySelector('.navigationdash');
        const main = document.querySelector('.maindash');
    
        navigation.classList.toggle('active');
        main.classList.toggle('active');
      }

const handlecreate =(e)=>{
  e.preventDefault();

    Axios.post('http://localhost:3001/admin/createproduct',{
      productname:pname,
      image:imageUrl,
      quantity:parseInt(pquantity),
      price:parseInt(price),
      description:pdesc,
      type:ptype,
      service1:pservice1,
      service2:pservice2,
      service3:pservice3,
      service4:pservice4,
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
       else if(res.data.type === 'product not saved'){
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
      Create Product
    </div>
    <div className="form">
    {error && <p>{error}</p>}
    {success &&   <div className="success-messageproduct">
          Success! The Product saved successfully.
        </div>}
       <div className="inputfield">
          <label>Product Name</label>
          <input type="text" className="input" onChange={(e)=>{setpname(e.target.value)}} required/>
       </div>  
        <div className="inputfield">
          <label>Image</label>
          <input type="file" className="input" onChange={handleImageUpload}   required/>
       </div>  

      <div className="inputfield">
          <label>Quantity</label>
          <input type="number" className="input" onChange={(e)=>{setpquantity(e.target.value)}}   required/>
       </div> 
       <div className="inputfield">
          <label>Price</label>
          <input type="number" className="input"  onChange={(e)=>{setprice(e.target.value)}}   required/>
       </div> 
        <div className="inputfield">
          <label>Type</label>
          <div className="custom_select">
            <select onChange={handleSelectChange}>
              <option value="">Select</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruits">Fruits</option>
              <option value="Junk Food">Junk Food</option>
              <option value="Beauty">Beauty</option>
              <option value="Kitchen">Kitchen</option>
            </select>
          </div>
       </div> 
        <div className="inputfield">
          <label>Description</label>
          <input type="text" className="input" onChange={(e)=>{setpdesc(e.target.value)}} required/>
       </div> 
       <div className="inputfield terms">
          <label className="check">
            <input type="checkbox" onChange={(e)=>{setpservice1(e.target.checked)}}/>
            <span className="checkmark"></span>
          </label>
          <p>Fast Delivery</p>
       </div> 
       <div className="inputfield terms">
          <label className="check">
            <input type="checkbox" onChange={(e)=>{setpservice2(e.target.checked)}}/>
            <span className="checkmark"></span>
          </label>
          <p>Return Policy</p>
       </div> 
       <div className="inputfield terms">
          <label className="check">
            <input type="checkbox" onChange={(e)=>{setpservice3(e.target.checked)}}/>
            <span className="checkmark"></span>
          </label>
          <p>Customer Care</p>
       </div> 
       <div className="inputfield terms">
          <label className="check">
            <input type="checkbox" onChange={(e)=>{setpservice4(e.target.checked)}}/>
            <span className="checkmark"></span>
          </label>
          <p>Cash Back</p>
       </div> 
      <div class="inputfield">
        <input type="submit" value="Create" class="btn" onClick={handlecreate}/>
      </div>
    </div>
</div>





</div>
    </div>
</div>

      </>
  );
}

export default Createproduct;