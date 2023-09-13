import React,{useState} from 'react';
import Axios from 'axios';
import '../../css/Review/review.css';
import Navbar from '../navbar';
import Footer from '../Home/footer';
function Review() {


const [name,setname] =useState('');
const [email,setemail] = useState('');
const [phone,setphone] = useState('');
const[desc,setdesc] = useState('');
const [error,seterror] = useState('');
const [success,setsuccess] = useState(false);




const handlesuccess = () => {
	setsuccess(true);
	setTimeout(() => {
	  setsuccess(false);
	}, 2000); 
  };
  
const handlesubmit =(e)=>{
	e.preventDefault();
	e.preventDefault();
Axios.post('http://localhost:3001/admin/contact',{
	name:name,
	email:email,
	phone:phone,
	desc:desc,
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

	 else if(res.data.type === 'error'){
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


  return (
    <>
<Navbar/>
<section className="section-contact">
			<div className="container">
				<h1>Contact Us</h1>
				<p>We value your feedback! Contact us through our website's contact page for any inquiries or suggestions. We're here to assist you. Thank you!</p>

				<form onSubmit={handlesubmit}>
				{error && <p>{error}</p>}
    {success &&   <div className="success-messageproduct">
          Contacted successfully
        </div>}
					<div className="form-group">
						<label for="firstname">Full Name</label>
						<input 
							type="text" 
							name="firstname" 
							id="firstname" 
							required 
							className="form-element"
							placeholder="Full Name"
							onChange={(e)=>{setname(e.target.value)}} />
					</div>
					<div className="form-group">
						<label for="Email">Email</label>
						<input 
							type="email" 
							name="email" 
							id="email" 
							required 
							className="form-element"
							placeholder="Email" 
							onChange={(e)=>{setemail(e.target.value)}}/>
					</div>
					<div className="form-group">
						<label for="Phone">Phone</label>
						<input 
							type="text" 
							name="phone" 
							id="phone" 
							required 
							className="form-element"
							placeholder="phone" 
							onChange={(e)=>{setphone(e.target.value)}}/>
					</div>

					<div className="form-group full">
						<label for="message">Write inquiries Here</label>
						<textarea name="message" id="message" className="form-element" placeholder="No more than 100 words" onChange={(e)=>{setdesc(e.target.value)}}></textarea>
					</div>
					<div className="submit-group">
						<input type="submit" value="Submit" />
					</div>
				</form>
			</div>
		</section>
        <Footer/>
   </>
  );
}

export default Review;