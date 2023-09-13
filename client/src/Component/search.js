import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios  from 'axios';
import '../css/search.css';


function Search() {

  const navigate = useNavigate();
const [list,setlist] = useState([]);
const [name,setname] = useState('');
const [error,seterror] = useState(false);
const [show, setshow] = useState(false);




const handleInputFocus = () => {
  setshow(true);
};

const handleInputBlur = () => {
  setshow(false);
};




useEffect(()=>{
  //product
     Axios.get('http://localhost:3001/readproductdash').then(res=>{
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

const handlesub = (e)=>{
  if(e.key === 'Enter')
  {
     let arr = list.filter(item => item.productname.toLowerCase() === name.toLowerCase());
     console.log(arr);
     if(arr.length === 1)
     {
     navigate('/Description/'+arr[0]._id);
     }
     else
     {
       seterror(true);
       setTimeout(() => {
        seterror(false);
      }, 1000); // Del
     }
  }
}

  return (
    <>
<div className="autocomplete-container">
      <input
        type="text"
        value={name}
        onChange={(e)=>{setname(e.target.value)}}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Press Enter to search"
        className="search-input"
        onKeyDown={handlesub}
      />
      {error && <p>Write Correct name of product</p>}
      {show && 
      <ul className="suggestions-list" onClick={(e)=>{console.log('hello')}}>
     {list.filter(item=>item.productname.includes(name)).slice(0,5).map((val,key)=>{
      return(
        <li  key ={key} className="suggestion-item" >
        {val.productname}
       </li>
      )
     })}
   </ul>
   }
    </div>
</>
  );
}

export default Search;
