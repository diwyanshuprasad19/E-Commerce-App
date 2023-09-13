import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import '../../../css/Admin/details.css';

function Details() {

    const [user,setuser] = useState([]);
    const [order,setorder] = useState([]);



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
                setorder(res.data.items);
            }
          else if(res.data.type ==='error')
          {
              console.log(res.data.errors);
          }
          }).catch(err =>{
            console.log(err);
          });

    
      },[])
    


const handlecost =(val)=>{
    let total = ((val.price*val.quantity)*(val.discount/100));
    return total;
}

const handledate =(val)=>{
    const date = val.createdAt.slice(0,10);
    return date;
}


  return (
    <>
            <div className="detailsdash">
                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>Recent Orders</h2>
                        <a href="/Admin/Order" className="btn">View All</a>
                    </div>

                    <table className='uptable'>
                        <thead>
                            <tr>
                                <td>Name(Type)</td>
                                <td>#OrderID</td>
                                <td>Total</td>
                                <td>Status</td>
                            </tr>
                        </thead>

                        <tbody>
    {order.slice(0,8).map((val,key)=>{
        return(
            <tr key={key}>
            <td>{val.name}({val.type})</td>
            <td>#{val.orderid}</td>
            <td>₹{handlecost(val)}</td>
            <td><span >{val.deliverystatus}</span></td>
        </tr>
        )
    })}

                        
                        </tbody>
                    </table>
                </div>





                <div className="recentCustomers">
                    <div className="cardHeader">
                        <h2>Recent Customers</h2>
                        <a href="/Admin/User" className="btn">View All</a>
                    </div>

                    <table>
                        {user.slice(0,5).map((val,key)=>{
                            return(
                                <tr key={key}>
                                <td width="60px">
                                    <div className="imgBx"><img src={val.image} alt="2"/></div>
                                </td>
                                <td>
                                    <h4>{val.fullname} <br/> <span>{handledate(val)}</span></h4>
                                </td>
                            </tr>


                            )
                        })}


                    
                    </table>
                </div>
            </div>
      </>
  );
}

export default Details;