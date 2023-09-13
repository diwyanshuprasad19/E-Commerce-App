import Slider from './Slider';
import Ourproduct from './ourproduct';
import Test from './test';
import Footer from './footer';
import Navbar from '../navbar';
import Ourservices from '../Review/Ourservices';
function Home() {

    return (
      <>
<Navbar/>
     <Slider/>
     <Ourservices/>
     <Ourproduct/>
     <Test/>
     <Footer/>
  </>
    );
  }
  
  export default Home;