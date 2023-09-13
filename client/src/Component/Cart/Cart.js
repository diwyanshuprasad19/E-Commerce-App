import '../../css/Cart/Cart.css';
import Listcart from './listcart';
import Footer from '../Home/footer';
import Navbar from '../navbar';
import Stepper from './Stepper';

function Cart() {

  return (
<>
<Navbar/>
<Stepper value={1}/>

<Listcart/>


<Footer/>


</>
  );
}

export default Cart;
