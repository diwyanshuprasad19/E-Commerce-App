import { useEffect, useState } from 'react';
import Axios from 'axios';
import '../../css/test.css';
function Test() {
  const [click,setclick] = useState(false);

 
  return (
    <>

<div className="Click-here" onClick={(e)=>{setclick(!click)}}>Click Here</div>        
<div className={`custom-model-main ${click ? 'model-open' : ''}`}>
    <div className="custom-model-inner">        
    <div className="close-btn" onClick={(e)=>{setclick(!click)}}>×</div>
        <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">
               Content Here
            </div>
        </div>  
    </div>  
    <div className="bg-overlay"></div>
</div> 


    </>
  );
}

export default Test;