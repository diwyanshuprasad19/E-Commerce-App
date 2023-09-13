import '../../css/categorybef.css'
import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from "@fortawesome/free-solid-svg-icons";
function Home() {

const [heart,setheart] = useState(false);

const handlelike = ()=>{
    setheart(!heart);
}
    return (
      <>
			<div class="product">
				<img src="https://c0.wallpaperflare.com/preview/751/2/550/chart-graph-business-finance.jpg" alt='1'/>
				<div class="product-info">
					<h4 class="product-title">AirPod 2nd Gen
					</h4>
					<p class="product-price">$129</p>
                    {!heart && <p class="product-price" onClick={handlelike}><i class="fa-regular fa-heart"></i><span class="count">0</span></p>}
                    {heart && <p class="product-price"><FontAwesomeIcon icon={faHeart} onClick={handlelike}/><span class="count">0</span></p>}
					<a class="product-btn" href="/">Add to Cart</a>
                     
				</div>
			</div>
  </>
    );
  }
  
  export default Home;