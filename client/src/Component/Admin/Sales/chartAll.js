import React,{useState,useEffect} from 'react';
import Usercreated from './User/usercreated';
import Typeproduct from './product/typenumber';
import Salesmonth from './Order/Salesmonth';
import Totaltype from './Order/totaltype';
import Profitmonth from './Order/Profitmonth';
import Quantitytype from './Order/quantitytype';
import Reviewdate from './Review/Reviewdate';
import Reviewrating from './Review/reviewrating';
import '../../../css/barchart.css';



function ChartAll() {

const [userdate1,setuserdate1] = useState('2023');
const [userdate2,setuserdate2] = useState('2023');
const [userdate3,setuserdate3] = useState('2023');
const [userdate4,setuserdate4] = useState('2023');
const [option,setoption] = useState('1');

const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);







  return (
    <>
 
 {windowWidth >= 500 ?
    <div className='wrapperproduct'>
    <div className="search-containerpro">
      </div>
      <div className="buttonspro">
        <button className={`button-valuepro ${option === '1' ? ' activepro' :''}`} onClick={()=>{setoption('1')}}>
          User
        </button>
        <button className={`button-valuepro ${option === '2' ? ' activepro' :''}`} onClick={()=>{setoption('2')}}>
        Product
        </button>
        <button className={`button-valuepro ${option === '3' ? ' activepro' :''}`} onClick={()=>{setoption('3')}}>
          Order
        </button>
        <button class={`button-valuepro ${option === '4' ? ' activepro' :''}`} onClick={()=>{setoption('4')}}>
          Review
        </button>
      </div>
    </div>
    :    <div className="dropdown-container">
    <select className="dropdown-select" onChange={(e)=>{setoption(e.target.value)}}>
      <option value="1">User</option>
      <option value="2">Product</option>
      <option value="3">Order</option>
      <option value="4">Review</option>
    </select>
  </div>
}














{option === '1' && <div className='barchart'>
    <h1>Bar chart(user created at for each month)</h1>
    <div className="select-container">
    <select className="select-input" value={userdate1} onChange={(e)=>{setuserdate1(e.target.value)}}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
    </div>
    <Usercreated year={userdate1}/>
</div>}
    


{option === '2' && <div className='barchart'>
    <h1>Number of types of Product</h1>
<Typeproduct/>
</div>}


{option === '3' && <div><div className='barchart'>
    <h1>Sales Done Each Month</h1>
    <div className="select-container">
    <select className="select-input" value={userdate2} onChange={(e)=>{setuserdate2(e.target.value)}}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
    </div>
    <Salesmonth year={userdate2}/>
</div>



<div className='barchart'>
    <h1>Profit in each type</h1>
<Totaltype/>
</div>



<div className='barchart'>
    <h1>Profit each Month</h1>
    <div className="select-container">
    <select className="select-input" value={userdate3} onChange={(e)=>{setuserdate3(e.target.value)}}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
    </div>
    <Profitmonth year={userdate3}/>
</div>
<div className='barchart'>
    <h1>Number order sold on type</h1>
<Quantitytype/>
</div>

</div>}


{option === '4' && 
<div>
  <div className='barchart'>
    <h1>Review each month</h1>
    <div className="select-container">
    <select className="select-input" value={userdate4} onChange={(e)=>{setuserdate4(e.target.value)}}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
    </div>
    <Reviewdate year={userdate4}/>
</div>

<div className='barchart'>
    <h1>Rating number</h1>
<Reviewrating/>
</div>
</div>}


      </>
  );
}

export default ChartAll;