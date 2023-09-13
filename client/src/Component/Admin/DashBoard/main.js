import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import '../../../css/Admin/main.css';

function Main() {
const email ='admin@gmail.com';
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
},)


    function toggleMenu() {
        const navigation = document.querySelector('.navigationdash');
        const main = document.querySelector('.maindash');
    
        navigation.classList.toggle('active');
        main.classList.toggle('active');
      }

  return (
    <>
            <div className="topbar">
                <div className="toggle"   onClick={toggleMenu}>
                <i class="fa-sharp fa-solid fa-bars"></i>
                </div>


                <div className="user">
                    <a href="/Admin/Profile"><img src={list.image} alt="1"/></a>
                </div>
            </div>

      </>
  );
}

export default Main;