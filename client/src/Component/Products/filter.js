import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterCreators } from '../../redux';
import '../../css/Product/Productcategory.css';
import '../../css/categorybef.css';
function Filter() {



  const dispatch = useDispatch();
const {filterstore} = bindActionCreators(filterCreators,dispatch);
  const [option,setoption] = useState('');
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


    filterstore(option);




    return (
      <>

{windowWidth >= 725 ?
    <div className='wrapperproduct'>
    <div className="search-containerpro">
      </div>
      <div className="buttonspro">
        <button className={`button-valuepro ${option === '' ? ' activepro' :''}`} onClick={()=>{setoption('')}}  >All</button>
        <button className={`button-valuepro ${option === 'Vegetable' ? ' activepro' :''}`} onClick={()=>{setoption('Vegetable')}} >
          Vegetable
        </button>
        <button className={`button-valuepro ${option === 'Fruits' ? ' activepro' :''}`} onClick={()=>{setoption('Fruits')}} >
        Fruits
        </button>
        <button className={`button-valuepro ${option === 'Junk Food' ? ' activepro' :''}`} onClick={()=>{setoption('Junk Food')}} >
          Junk Food
        </button>
        <button className={`button-valuepro ${option === 'Beauty' ? ' activepro' :''}`} onClick={()=>{setoption('Beauty')}}  >
          Beauty
        </button>
        <button className={`button-valuepro ${option === 'Kitchen' ? ' activepro' :''}`} onClick={()=>{setoption('Kitchen')}}  >
          Kitchen
        </button>
      </div>
    </div>
    :    <div className="dropdown-container">
    <select className="dropdown-select" onChange={(e)=>{setoption(e.target.value)}}>
      <option value="">All</option>
      <option value="Vegetable">Vegetable</option>
      <option value="Fruits">Fruits</option>
      <option value="Junk Food">Junk Food</option>
      <option value="Beauty">Beauty</option>
      <option value="Kitchen">Kitchen</option>
    </select>
  </div>
}
  </>
    );
  }
  
  export default Filter;