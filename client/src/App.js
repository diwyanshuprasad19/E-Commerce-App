import './App.css';
import {Routes,Route} from 'react-router-dom';







import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Signup from './Component/Login/Signup';
import Forgot from './Component/Login/forgot';
import OTP from './Component/Login/otp';
import ProductCategory from './Component/Products/Productcategory';
import Description from './Component/Products/Description';
import Cart from './Component/Cart/Cart';
import PaymentPage from './Component/Cart/PaymentPage';
import Review from './Component/Review/Review';
import Profileuser from './Component/Profileuser/Profileuser';
import Successfull from './Component/Cart/Successfull';
import Userorder from './Component/Order/userorder';
import AddressPage from './Component/Cart/Address';
import Resetpassword from './Component/Login/resetpassword';
import Test from './Component/Test/test';
import Trackorder from './Component/Order/track/track';
import Vieworder from './Component/Order/vieworder/vieworder';
import Revieworder from './Component/Order/review/Review';
import Invoice from './Component/Order/invoice';

import Dashboard from './Component/Admin/DashBoard/DashBoard';
import Usershow from './Component/Admin/UserList/Usershow';
import Ordershow from './Component/Admin/Order/Ordershow';
import Salesshow from './Component/Admin/Sales/Salesshow';
import Profileshow from './Component/Admin/Profile/Profileshow';
import Productshow from './Component/Admin/Product/Productshow';
import Couponshow from './Component/Admin/Coupon/Couponshow';
import Createproduct from './Component/Admin/Product/Createproduct';
import Createcoupon from './Component/Admin/Coupon/Createcoupon';
import Editproduct from './Component/Admin/Product/Editproduct';
import Editcoupon from './Component/Admin/Coupon/Editcoupon';



function App() {

  return (
    <>
    <div className='body'>
    <Routes>
     <Route path="/" element={<Login/>} />
     <Route path="/Home" element={<Home/>} />
     <Route path="/Signup" element={<Signup/>} />
     <Route path="/Forgot" element={<Forgot/>} />
     <Route path="/OTP" element={<OTP/>} />
     <Route path="/Reset" element={<Resetpassword/>} />
     <Route path="/Product" element={<ProductCategory/>} />
     <Route path="/Description/:id" element={<Description/>} />
     <Route path="/Cart" element={<Cart/>} />
     <Route path="/Address" element={<AddressPage/>} />
     <Route path="/Payment" element={<PaymentPage/>} />
     <Route path="/Review" element={<Review/>} />
     <Route path="/User/Profile" element={<Profileuser/>} />
     <Route path="/Successfull" element={<Successfull/>} />
     <Route path="/Order" element={<Userorder/>} />
     <Route path="/Order/:id" element={<Trackorder/>} />
     <Route path="/Order/Vieworder/:id" element={<Vieworder/>} />
     <Route path="/Order/Revieworder/:pname" element={<Revieworder/>} />
     <Route path="/Order/Invoice/:id" element={<Invoice/>} />
     <Route path="/Test" element={<Test/>} />
     


     <Route path="/Admin/DashBoard" element={<Dashboard/>} />
     <Route path="/Admin/User" element={<Usershow/>} />
     <Route path="/Admin/Order" element={<Ordershow/>} />
     <Route path="/Admin/Product" element={<Productshow/>} />
     <Route path="/Admin/Createproduct" element={<Createproduct/>} />
     <Route path="/Admin/Editproduct/:id" element={<Editproduct/>} />
     <Route path="/Admin/Sales" element={<Salesshow/>} />
     <Route path="/Admin/Profile" element={<Profileshow/>} />
     <Route path="/Admin/Coupon" element={<Couponshow/>} />
     <Route path="/Admin/CreateCoupon" element={<Createcoupon/>} />
     <Route path="/Admin/Editcoupon/:id" element={<Editcoupon/>} />
    </Routes>

    </div>
</>
  );
}

export default App;
