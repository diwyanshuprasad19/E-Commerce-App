import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Product/Productcategory.css';
import '../../css/categorybef.css';
import Productlist from './Productlist';
import Footer from '../Home/footer';
import Navbar from '../navbar';
import Search from '../search';
import Filter from './filter';
function ProductCategory() {
  const navigate = useNavigate();





  return (
    <>
    <Navbar/>
    <Search/>
<Productlist/>
<Footer/>
      </>
  );
}

export default ProductCategory;