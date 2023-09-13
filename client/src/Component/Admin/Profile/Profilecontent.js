import React,{useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../../../css/Admin/Profile.css';




const uploadPreset ="grocery";
const cloudName = "dzmyfembe";
function Profilecontent() {

const [active,setactive] =useState(true);
const [pass1,setpass1] =useState('');
const [pass2,setpass2] =useState('');
const [name,setname] =useState('');
const [phone,setphone] =useState('');
const [nmat,setnmat] =useState(false);
const [error,seterror] = useState('');
const [error1,seterror1] = useState('');
const token = localStorage.getItem('Admin-token');
const [imgupl,setimgupl] = useState('https://res.cloudinary.com/dzmyfembe/image/upload/v1692546952/wbb2wf8dnqqhrnj5mbwf.png');
const fileInputRef = useRef(null);
const [success,setsuccess] = useState(false);



const handleclick = ()=>{
  setactive(!active);
}


const handlechange =(e)=>{
e.preventDefault();
if(pass1 === pass2)
{
  Axios.post('http://localhost:3001/resetpasswordadmin',{
    token:token,
    password:pass1,
   }).then(res=>{
     if(res.data.type ==='success')
     {
      handlesuccess();
     }
     else if(res.data.type ==='validation')
   {
        seterror(res.data.errors);
   }
   else if(res.data.type ==='email')
   {
        seterror(res.data.errors);
   }
}).catch(err =>{
 console.log(err);
});

}
else{
console.log('same password');
setnmat(true);

setTimeout(() => {
  setnmat(false);
}, 2000);
}
}

const handleIconClick = () => {
  fileInputRef.current.click(); // Trigger the click event on the hidden input
};


const handleFileChange = async (event) => {
  const file = event.target.files[0];

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await Axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    const url = response.data.secure_url;
    setimgupl(url);
    console.log('Image uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};


const handlesuccess = () => {
  setsuccess(true);
  setTimeout(() => {
    setsuccess(false);
  }, 2000); 
};


const handlesetting = (e)=>{
e.preventDefault();

if(phone.length ===10)
{

  Axios.post('http://localhost:3001/updateadmin',{
    token:token,
    image:imgupl,
    name:name,
    phone:phone,
   }).then(res=>{
     if(res.data.type ==='success')
     {
      handlesuccess();
     }
     else if(res.data.type ==='validation')
   {
    handleerror1(res.data.errors);
   }
   else if(res.data.type ==='email')
   {
    handleerror1(res.data.errors);
   }
}).catch(err =>{
 console.log(err);
});
}
else{
  handleerror1('Phone number length must be 10 digits');
}
}


const handleerror1 = (error) => {
  seterror1(error);
  setTimeout(() => {
    seterror1('');
  }, 2000); 
};



const myStyles = {
  width:'80%',
  margin: '10px auto',
  backgroundColor: 'red',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'center',
  fontWeight: 'bold',
};

const myStyles1 = {
  width:'80%',
  margin: '10px auto',
  backgroundColor: 'green',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'center',
  fontWeight: 'bold',
};




  return (
    <>
     <section className="profile-section1">
    <div className="profile-header1">
      <div className="profile-buttons1">
        <button style={active ? { backgroundColor: '#0056b3'} : {backgroundColor: '#007bff'}}
            onClick={handleclick}>Profile</button>
        <button style={!active ? { backgroundColor: '#0056b3'} : {backgroundColor: '#007bff'}}
            onClick={handleclick}>Password</button>
      </div>
    </div>

   {active &&  <div className="profile-form1">
      <h1>Account Settings</h1>
      {success &&   <div className="success-messageproduct">
          Updated
        </div>}
      {error1 && <p style={myStyles}>{error1}</p>}
      <form onSubmit={handlesetting}>
      <div className='defimg'>
 <img src={imgupl} alt='1'  />
 <i class="fa-solid fa-plus" onClick={handleIconClick}></i>
 <input
  ref={fileInputRef}
        type="file"
        accept="image/*" // Set the accepted file types here
        style={{ display: 'none' }} // Hide the input visually
        onChange={handleFileChange}
      />
 </div>
        <div className="form-group1">
          <label for="first-name">User Name</label>
          <input type="text" id="first-name" placeholder="First Name" onChange={(e)=>{setname(e.target.value)}} required/>
        </div>
        <div className="form-group1">
          <label for="first-name">Phone Number</label>
          <input type="text" id="first-name" placeholder="Phone Number" onChange={(e)=>{setphone(e.target.value)}}/>
        </div>
        <div className="buttonsprofile1">
          <button class="btn-primary1">Update</button>
        </div>
      </form>
    </div>

  }
  {!active && 
    <div id="password-form" className="profile-form1 ">
      <h1>Password Settings</h1>
      {success &&   <div className="success-messageproduct">
          Updated
        </div>}
      {nmat && <p style={myStyles}>Password does not match</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handlechange}>
        <div className="form-group1">
          <label for="new-password">New Password</label>
          <input type="password" id="new-password" placeholder="New Password" onChange={(e)=>{setpass1(e.target.value)}} required/>
        </div>
        <div className="form-group1">
          <label for="confirm-password">Confirm New Password</label>
          <input type="password" id="confirm-password" placeholder="Confirm New Password" onChange={(e)=>{setpass2(e.target.value)}} required/>
        </div>
        <div className="buttonsprofile1">
          <button className="btn-primary1" >Update</button>
        </div>
      </form>
    </div>
}
  </section>

      </>
  );
}

export default Profilecontent;