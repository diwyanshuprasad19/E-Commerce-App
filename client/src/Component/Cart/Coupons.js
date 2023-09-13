import '../../css/Cart/coupons.css';

function Coupons() {

  return (
<>
<div className='bodycoupons'>
  <div class="coupon-section">
    <div class="coupon-content">
      <h2>Special Offer!</h2>
      <p>Get 20% off on your next purchase</p>
      <label for="coupon-input">Enter coupon code:</label>
      <input type="text" id="coupon-input" placeholder="Enter code"/>
      <button class="coupon-button">Apply</button>
    </div>
  </div>

  </div>
</>
  );
}

export default Coupons;