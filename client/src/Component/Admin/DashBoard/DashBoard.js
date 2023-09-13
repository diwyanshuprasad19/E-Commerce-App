import React, {useEffect} from 'react';
import '../../../css/Admin/Body.css';
import Navigation from './navigation';
import Cards from './cards';
import Details from './details';
import Main from './main';
function DashBoard() {


  useEffect(() => {
    const list = document.querySelectorAll('.navigationdash li');

    function activeLink() {
      list.forEach((item) => {
        item.classList.remove('hovered');
      });
      this.classList.add('hovered');
    }

    list.forEach((item) => item.addEventListener('mouseover', activeLink));

    return () => {
      list.forEach((item) => item.removeEventListener('mouseover', activeLink));
    };
  }, []);






  return (
    <>
<div className='containerbody'>
    <div className='containerdashboard'>
<Navigation/>
<div className='maindash'>
<Main/>
<Cards/>
<Details/>

</div>
    </div>
</div>
      </>
  );
}

export default DashBoard;