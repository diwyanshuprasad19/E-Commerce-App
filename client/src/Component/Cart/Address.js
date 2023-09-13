import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { addressCreators } from '../../redux';
import '../../css/Cart/AddressPage.css';
import Footer from '../Home/footer';
import Navbar from '../navbar';
import Stepper from './Stepper';


function AddressPage() {

const navigate = useNavigate();
const dispatch = useDispatch();
const {addressstore} = bindActionCreators(addressCreators,dispatch);

const [fname,setfname] = useState('');
const [lname,setlname] = useState('');
const [email,setemail] = useState('');


const [saddress,setsaddress] = useState('');
const [scity,setscity] = useState('');
const [sstate,setsstate] = useState('');
const [szip,setszip] = useState('');
const [scountry,setscountry] = useState('');


const [baddress,setbaddress] = useState('');
const [bcity,setbcity] = useState('');
const [bstate,setbstate] = useState('');
const [bzip,setbzip] = useState('');
const [bcountry,setbcountry] = useState('');


const [check,setcheck] = useState(false);


const handleconfirm =(e)=>{
e.preventDefault();

    const detail = {
     fname:fname,
     lname:lname,
     email:email,
    }
    if(check)
    {
        const shipping = {
            fname:fname,
            lname:lname,
            email:email,
            address1:saddress,
            city:scity,
            state:sstate,
            zip:szip,
            country:scountry,
         }
         addressstore(shipping,shipping,detail);
    }
    else{
        const shipping = {
            fname:fname,
            lname:lname,
            email:email,
            address1:saddress,
            city:scity,
            state:sstate,
            zip:szip,
            country:scountry,
         }
         
         const billing ={
            fname:fname,
            lname:lname,
            email:email,
             address1:baddress,
             city:bcity,
             state:bstate,
             zip:bzip,
             country:bcountry,
         }
         addressstore(shipping,billing,detail);
    }
navigate('/Payment');

}




return (
<>
<Navbar/>
<Stepper value={2}/>





<div class="containeraddress">
    <div class="form__name">Shipping and Billing Form</div>
    <div class="form__container">
        <section class="form__personal">
            <div class="sections">
                <div class="box">1</div><span>Personal Information</span>
            </div>
            <div class="personal--form">
                <form class="form--name" action="">
                    <div class="first">
                        <label for="firstname">First Name</label>
                        <input placeholder="e.g. Richard" id="firstname" type="text" onChange={(e)=>{setfname(e.target.value)}} required/>
                    </div>
                    <div class="last">
                        <label for="firstname">Last Name</label>
                        <input placeholder="e.g. Bovell" id="firstname" type="text" onChange={(e)=>{setlname(e.target.value)}} required/>
                    </div>
                    <div class="email">
                        <label for="firstname">Email</label>
                        <input placeholder="e.g. rb@apple.com" id="firstname" type="email" onChange={(e)=>{setemail(e.target.value)}} required/>
                    </div>
                </form>
            </div>
        </section>
        <section class="form__billing">
            <div class="sections">
                <div class="box billing">2</div><span>Billing Address</span>
            </div>
            <div class="shipping--form">
                <form class="form--shipping" action="">
                    <div class="row one">
                        <div class="address">
                            <label for="address-one">Address Line 1</label>
                            <input placeholder="e.g. 1 Infinite Loop" id="address-one" type="text" onChange={(e)=>{setsaddress(e.target.value)}} required/>
                        </div>
                        <div class="address-two">
                            <label for="address-two">Address Line 2</label>
                            <input id="address-two" type="text" />
                        </div>
                    </div>




                    <div class="row two">
                        <div class="city">
                            <label for="city">City</label>
                            <input placeholder="e.g. Cupertino" id="city" type="text" onChange={(e)=>{setscity(e.target.value)}} required/>
                        </div>
                        <div class="state">
                            <label for="state">State / Province / Region</label>
                            <input placeholder="e.g. California" id="state" type="text" onChange={(e)=>{setsstate(e.target.value)}} required/>
                        </div>
                    </div>
                    <div class="row three">
                        <div class="zip">
                            <label for="zip">Zip / Postal Code</label>
                            <input placeholder="e.g. 95014" id="zip" type="text" onChange={(e)=>{setszip(e.target.value)}} required/>
                        </div>
                        <div class="country">
                            <label for="country">Country</label>
                            <input placeholder="e.g. U.S.A" id="country" type="text" onChange={(e)=>{setscountry(e.target.value)}} required/>
                        </div>
                    </div>



                </form>
            </div>
        </section>




        
{!check && <section class="form__shipping">
            <div class="sections">
                <div class="box">3</div><span>Shipping Address</span>
            </div>
            <div class="shipping--form">
                <form class="form--shipping" action="">
                    <div class="row one">
                        <div class="address">
                            <label for="address-one">Address Line 1</label>
                            <input placeholder="" id="address-one" type="text" onChange={(e)=>{setbaddress(e.target.value)}} required/>
                        </div>
                        <div class="address-two">
                            <label for="address-two">Address Line 2</label>
                            <input id="address-two" type="text" required/>
                        </div>
                    </div>




                    <div class="row two">
                        <div class="city">
                            <label for="city">City</label>
                            <input placeholder="e.g. Cupertino" id="city" type="text" onChange={(e)=>{setbcity(e.target.value)}} required/>
                        </div>
                        <div class="state">
                            <label for="state">State / Province / Region</label>
                            <input placeholder="e.g. California" id="state" type="text" onChange={(e)=>{setbstate(e.target.value)}} required/>
                        </div>
                    </div>
                    <div class="row three">
                        <div class="zip">
                            <label for="zip">Zip / Postal Code</label>
                            <input placeholder="e.g. 95014" id="zip" type="text" onChange={(e)=>{setbzip(e.target.value)}} required/>
                        </div>
                        <div class="country">
                            <label for="country">Country</label>
                            <input placeholder="e.g. U.S.A" id="country" type="text" onChange={(e)=>{setbcountry(e.target.value)}} required/>
                        </div>
                    </div>





                </form>
            </div>
        </section>} 
        
        <div class="form__question">
            <input type="checkbox" onChange={(e)=>{setcheck(e.target.checked)}}/>
            <p>Is your shipping address the same as your billing address ?</p>
        </div>
        <div class="form__confirmation">
            <button className='buttonship' onClick={handleconfirm}>Confirm Information</button>
        </div>
    </div>
</div>














<Footer/>

</>
  );
}

export default AddressPage;
