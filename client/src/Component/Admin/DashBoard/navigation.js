import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/Admin/Navigation.css';
function Navigation() {
const navigate = useNavigate();




const handlelogout =(e)=>{
e.preventDefault();

localStorage.removeItem("Admin-token");
navigate('/');
}






  return (
    <>
<div class="navigationdash">
            <ul>
                <li>
                    <a href="/Admin/Dashboard">
                        <span className="title">Publix</span>
                    </a>
                </li>

                <li>
                    <a href="/Admin/Dashboard" >
                        <span className="icon">
                        <i class="fa-sharp fa-solid fa-house"></i>
                        </span>
                        <span className="title" >DashBoard</span>
                    </a>
                </li>

                <li>
                    <a href="/Admin/User">
                        <span className="icon">
                        <i class="fa-sharp fa-solid fa-user"></i>
                        </span>
                        <span className="title" >Users</span>
                    </a>
                </li>

                <li>
                    <a href="/Admin/Product">
                        <span className="icon">
                        <i class="fa-solid fa-clipboard"></i>
                        </span>
                        <span className="title" >Products</span>
                    </a>
                </li>

                <li>
                    <a href="/Admin/Sales">
                        <span className="icon">
                        <i class="fa-solid fa-money-bill"></i>
                        </span>
                        <span className="title" >Sales</span>
                    </a>
                </li>

                <li>
                    <a href="/Admin/Order">
                        <span className="icon">
                        <i class="fa-solid fa-warehouse"></i>
                        </span>
                        <span className="title" >Order</span>
                    </a>
                </li>

                <li>
                    <a href="/Admin/Coupon">
                        <span className="icon">
                        <i class="fa-solid fa-comments-dollar"></i>
                        </span>
                        <span className="title" >Coupons</span>
                    </a>
                </li>

                <li>
                    <a href="#" onClick={handlelogout}>
                        <span className="icon">
                        <i class="fa-solid fa-outdent"></i>
                        </span>
                        <span className="title">Logout</span>
                    </a>
                </li>
            </ul>
        </div>

      </>
  );
}

export default Navigation;