import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import '../../../css/Admin/Cards.css';
function Cards() {


const [user,setuser] = useState([]);
const [order,setorder] = useState([]);
const [review,setreview] = useState([]);
const [sumadd,setsumadd] = useState([]);

useEffect(()=>{

    Axios.get('http://localhost:3001/readrecustomer').then(res=>{
      if(res.data.type ==='Success')
      {
          setuser(res.data.items);
      }
    else if(res.data.type ==='error')
    {
        console.log(res.data.errors);
    }
    }).catch(err =>{
      console.log(err);
    });


    Axios.get('http://localhost:3001/readorderdash').then(res=>{
        if(res.data.type ==='Success')
        {
console.log(res.data.items);
           let sum = 0;
           for(let i=0;i<res.data.items.length;i++){
              let k = res.data.items[i].price*res.data.items[i].quantity*((100-res.data.items[i].discount)/100);
              console.log(k)
              sum+=k;
           }
            setsumadd(sum);
            setorder(res.data.items);
        }
      else if(res.data.type ==='error')
      {
          console.log(res.data.errors);
      }
      }).catch(err =>{
        console.log(err);
      });
      
      
      Axios.get('http://localhost:3001/readreviewdash').then(res=>{
        if(res.data.type ==='Success')
        {
            setreview(res.data.items);
        }
      else if(res.data.type ==='error')
      {
          console.log(res.data.errors);
      }
      }).catch(err =>{
        console.log(err);
      });


  },)


const handleuser =()=>{
    const sum = user.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.view;
      }, 0);

return sum;
}


const handleordernumber =()=>{
    const num = order.length;
    return num;
}


const handlereview =()=>{
    const rev = review.length;
    return rev;
}


const handlesales =()=>{
    const sum = order.reduce((accumulator, val) => {
        return accumulator + ((val.price*val.quantity)/(val.discount/100));
      }, 0);

return sum;
}



  return (
    <>
<div className="cardBox">
                <div className="card">
                    <div>
                        <div className="numbers">{handleuser()}</div>
                        <div className="cardName">Views</div>
                    </div>

                    <div className="iconBx">
                    <i class="fa-sharp fa-solid fa-eye"></i>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">{handleordernumber()}</div>
                        <div className="cardName">Orders</div>
                    </div>

                    <div className="iconBx">
                    <i class="fa-sharp fa-solid fa-cart-shopping"></i>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">{handlereview()}</div>
                        <div className="cardName">Reviews</div>
                    </div>

                    <div className="iconBx">
                    <i class="fa-sharp fa-solid fa-thumbs-up"></i>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">₹{sumadd}</div>
                        <div className="cardName">Sales</div>
                    </div>

                    <div className="iconBx">
                    <i class="fa-sharp fa-solid fa-money-bill"></i>
                    </div>
                </div>
            </div>
      </>
  );
}

export default Cards;