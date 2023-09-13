import React,{useState,useEffect} from 'react';
import Axios  from 'axios';
import '../../css/test.css'

const Test = () => {
const [list,setlist] = useState([]); 
const [error,seterror] = useState(''); 





    useEffect(()=>{

        Axios.get('http://localhost:3001/readreviewuser').then(res=>{
            if(res.data.type ==='Success')
            {
                setlist(res.data.items);
            }
          else if(res.data.type ==='error')
          {
               seterror(res.data.errors);
          }
      }).catch(err =>{
        console.log(err);
      });
    },[])
    
    





  return (
<>
<h1 className='custrevcomm'>Customer Review</h1>
<section className="maincomm">
        <div className="full-boxercomm">



   {list.map((val,key)=>{


let ratinguser =val.rating;
let emptyrating = 5 -val.rating;
let elements =[];
for (let i = 0; i <ratinguser; i++) {
  elements.push(<i class="fa-solid fa-star"></i>);
}
for (let k = 0; k < emptyrating; k++) {
  elements.push(<i class="fa-regular fa-star"></i>);
}
    return(
        <div className="comment-boxcomm">
                <div className="box-topcomm">
                    <div className="Profilecomm">
                        <div className="profile-imagecomm">
                            <img src={val.image} alt='1'/>
                        </div>
                        <div className="Namecomm">
                            <strong>{val.email}</strong>
                            <span> 

                          {elements}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="commentcomm">
                    <p>
                        {val.review}
                    </p>
                </div>
            </div>

    )
   })}

            





   

 
        </div>
    </section>
    
    </>
  );
};

export default Test;