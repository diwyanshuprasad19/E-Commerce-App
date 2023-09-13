
import '../../css/Cart/Cart.css';
function Costpage() {

  return (
<>
<div className='blockcart'>
<div className='concart2'>
<p className='headcart'>Cart Total</p>
<div className='costcart'>
<p className='leftcart'>Subtotal</p>
<p className='rightcart'>RS 500</p>
</div>

<div className='costcart'>
<p className='leftcart'>Shipping</p>
<p className='rightcart'>RS 100</p>
</div>


<div className='costcart'>
<p className='leftcart'>Discount</p>
<p className='rightcart'>RS 0</p>
</div>

<div className='totalbottom'></div>


<div className='costcart'>
<div className='leftcart'>Total Cost</div>
<div className='rightcart'>RS 600</div>
</div>

</div>
</div>
<div className='costbtncontent'>
<button className='costbtn'>BuY Now</button>
</div>

</>
  );
}

export default Costpage;