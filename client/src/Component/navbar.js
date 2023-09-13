import React,{useState,useEffect} from 'react';
import Axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { userCreators } from '../redux';
import '../css/navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faUser,faCartShopping} from "@fortawesome/free-solid-svg-icons";

const Navbar =()=>{
  const navigate = useNavigate();
  const token = localStorage.getItem('Customer-token');
const dispatch = useDispatch();
const {userstore} = bindActionCreators(userCreators,dispatch);


  const [list,setlist] = useState([]); 
  const [error,seterror] = useState(''); 
  const [option,setoption] = useState(1);



  useEffect(()=>{
    Axios.post('http://localhost:3001/readcart',{
       token:token,
      }).then(res=>{
        if(res.data.type ==='Success')
        {
            setlist(res.data.items);
        }
      else if(res.data.type ==='error')
      {
           seterror(res.data.errors);
      }
  }).catch(err =>{
    console.log(err);
  });
},)





  const handlelogout = ()=>{
    userstore({});
    localStorage.removeItem("Customer-token");
  }



  const countlist = ()=>{
    return list.length;
  }

const handlenext =(e,val)=>{
  e.preventDefault();
  if(val === 1)
  {
    setoption(val);
    navigate('/Home');
  }
  else if(val === 2)
  {
    setoption(val);
    navigate('/Product');
  }
  else if(val === 3)
  {
    setoption(val);
    navigate('/Order');
  }
  else if(val === 4)
  {
    setoption(val);
    navigate('/Review');
  }
  else if(val === 5)
  {
    setoption(val);
    navigate('/Cart');
  }

}

  return (
    <>
    <div className='navbody'>
    <div className='navcontainer'>
   
<nav>
 <input type='checkbox' id='check'/>
 <label htmlFor="check" className='checkbtn'>
  <FontAwesomeIcon icon={faBars} />
  </label>
   
<label className='logo'>
  Publix
</label>

<ul>
  <li><a  onClick={(e)=>handlenext(e,1)}    href='#'>
    Home
    </a>
  </li>
  <li><a  onClick={(e)=>handlenext(e,2)}    href='#'>
    Products
    </a>
  </li>
  <li>
  <a  onClick={(e)=>handlenext(e,5)}    href='#'>
  <label><FontAwesomeIcon icon={faCartShopping} /></label><span className="count">{countlist()}</span>
    </a>
  </li>
  <li><a  onClick={(e)=>handlenext(e,3)}    href='#'>
    Orders
    </a>
  </li>
  <li><a  onClick={(e)=>handlenext(e,4)}    href='#'>
    Contact Us
    </a>
  </li>
  <li><a href='/User/Profile'>
  <label><FontAwesomeIcon icon={faUser} /></label>
  </a>
</li>


  <li><a href='/' onClick={handlelogout}>
  <i class="fa-solid fa-right-from-bracket"></i>
    </a>
  </li>
 
</ul>
</nav>
</div>
</div>
    </>
  );
}

export default Navbar;
