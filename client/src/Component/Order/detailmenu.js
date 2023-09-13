import React from 'react';
import '../../css/Order/detailmenu.css'
function Detailmenu() {

    





  return (
    <>
   <div className="containerorder">
        <div className="statusorder">
            <p>Status: Shipped</p>
            <button className="return-buttonorder buttonorder">Track Shipment</button>
        </div>
        <div className="deliveryorder">
            <p>Estimated Delivery: 5th Aug, 2014</p>
        </div>
        <div className="productorder">
            <div class="product-detailsorder">
                <img src="https://res.cloudinary.com/dzmyfembe/image/upload/v1691282729/i9tea2exwz1squpjc2xi.jpg" alt="Product Image"/>
            </div>
            <div className="product-infoorder">
                <p>Product Name: 1 x Product Name</p>
                <p>Price: $85</p>
                <p>Total: $85</p>
                <p>Return Date: [Insert Return Date]</p>
            </div>
            <div className="buttonsorder">
    <div className="button-grouporder">
        <button className="slim-buttonorder buttonorder">Review</button>
        <button className="slim-buttonorder buttonorder">Return</button>
        <button className="slim-buttonorder buttonorder">Invoice</button>
    </div>
</div>
        </div>
    </div>

</>
  );
}

export default Detailmenu;
