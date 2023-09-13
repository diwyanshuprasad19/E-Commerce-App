import React from "react";
import '../../css/Cart/successfull.css';
import Navbar from "../navbar";
import Stepper from "./Stepper";
import Footer from "../Home/footer";
function Successfull() {

  return (
<>
<Navbar/>
<Stepper value={4}/>
<div className="paymentsuccess">
<div class="cardsuccess">
      <div className="success">
        <i class="checkmarksuccess">✓</i>
      </div>
        <h1>Success</h1> 
        <p>We received your purchase request;<br/> we'll be in touch shortly!</p>
        <a href="/Product">Shop Again</a>
      </div>

      </div>
      <Footer/>
</>
  );
}

export default Successfull;
