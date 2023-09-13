import '../../css/footer.css';
function Footer() {


const medium ='https://res.cloudinary.com/dzmyfembe/image/upload/v1693843170/ciemjzkl8svqqcia7yma.jpg';
const geek ='https://res.cloudinary.com/dzmyfembe/image/upload/v1693843170/bw5zi1xhslnlv3a18suk.png';
const github ='https://res.cloudinary.com/dzmyfembe/image/upload/v1693843170/re8yj245myhlywqnoit5.png';
const linkedin = 'https://res.cloudinary.com/dzmyfembe/image/upload/v1693843170/a20jmrxbck5fmunzoty5.png';


    return (
      <>



<div className="bodyfooter">
<section className="footer">
  <div className="main-footer">
    <div className="logoinfo" data-aos="fade-up">
      <h2>Grocey Store</h2>
      <p>By Diwyanshu</p>

      <div className="contact-details">
        <h1>Contact Us</h1>
        <li>
          <div class="fa fa-phone"></div><a href="tel:+919326048690">+91 9839520453</a></li>
        <li>
          <div class="fa fa-envelope"></div><a href="mailto:yourmail@gmail.com">diwyanshu.prasad@gmail.com</a></li>
        </div>
    </div>
  <div className="com " data-aos="fade-up">
    <h1 className="leftabout">Project</h1>
    <ul>
      <li><a href="#">Grocey App</a></li>
	  <li><a href="#">Portfolio</a></li>
      <li><a href="#">CRUD App</a></li>
      <li><a href="#">Portfolio</a></li>
      <li><a href="#">Message App</a></li>
    </ul>
  </div>
  <div className="info" data-aos="fade-up">
    <h1>Social Media</h1>
    <div className="sociallogos">
      <div className="logobox">
        <a href="#" ><img src={github}  alt='1'/> </a>
        <a href="#"><img src={medium}  alt='1'/> </a>
        <a href="#" ><img src={linkedin}  alt='1'/> </a>
        <a href="#" ><img src={geek}  alt='1'/> </a>
      </div>
    </div>
  </div>
  </div>
  <footer>© Your Copyright 2023 All Rights Reserved</footer>
  </section>
  </div>







  </>
    );
  }
  
  export default Footer;