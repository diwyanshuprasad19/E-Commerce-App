const express= require ('express');
const app = express();
const {body,validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const CustomerModel = require('./model/Customer');
const OtpModel = require('./model/otp');
const AdminModel = require('./model/Admin');
const ProductModel = require('./model/Product');
const CouponModel = require('./model/Coupons');
const CartModel = require('./model/Cart');
const OrderModel = require('./model/Order');
const ReviewModel = require('./model/Review');
const cors = require('cors');
app.use(express.json());
app.use(cors());
var jwt = require('jsonwebtoken');
var fetchuser = require('./middleware/fetchuser');


//email
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());



//server
mongoose.connect("mongodb+srv://diwyanshuprasad:qwerty12345@cluster0.i7t88bc.mongodb.net/Grocery?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
});



//signup user logic
app.post("/signupuser", [
    body('fullname', 'Enter a  name of min length 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation' ,errors: errors.array() });
    }

const fullname = req.body.fullname;
const email = req.body.email;
const password = req.body.password;
const image = req.body.image;
let user = await CustomerModel.findOne({ email: email });
    if (user) {
      return res.send({type:'email',errors:'Email already exist'});
    }
    else{
const hashpassword = await bcrypt.hash(password,10);
let user = new CustomerModel({fullname:fullname,email:email,password:hashpassword,image:image,ban:false,designation:'',view:0,address:'',cart:[],order:[]});

try{
let usercreate = await user.save();
res.send({type:'success'});
}
catch(err){
res.send({type:'user not saved',errors:err});
}
    }
});


//signup admin logic
app.post("/signupadmin", [
    body('fullname', 'Enter a  name of min length 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation' ,errors: errors.array() });
    }
const fullname = req.body.fullname;
const email = req.body.email;
const password = req.body.password;
const image = req.body.image;
let user = await AdminModel.findOne({ email: email });
    if (user) {
      return res.send({type:'email',errors:'Email already exist'});
    }
    else{
const hashpassword = await bcrypt.hash(password,10);
let user = new AdminModel({fullname:fullname,email:email,password:hashpassword,image:image,phone:''});

try{
let usercreate = await user.save();
res.send({type:'success'});
}
catch(err){
res.send({type:'user not saved',errors:err});
}
    }
});

//for login customer
app.post("/logincustomer", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation',errors: errors.array() });
    }
  
    const { email, password } = req.body;
      let user = await CustomerModel.findOne({ email:email });
      if (!user) {
        return res.send({ type:'email',errors: "Please try to login with correct email" });
      }
  
      const passwordCompare = await bcrypt.compare(req.body.password, user.password);
      if (!passwordCompare) {
        return res.send({ type:'password', errors: "Please try to login with correct password" });
      }
      const data = {
        user: {
          id: user._id,
          email:user.email
        }
      }
      const authtoken = jwt.sign(data, 'secretkey');
      let viewupdate = await CustomerModel.updateOne({ email:email },{$inc:{view:1}});
      return res.send({type:'success',token:authtoken});
    });


    //for login  admin
app.post("/loginadmin", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation',errors: errors.array() });
    }
  
    const { email, password } = req.body;
      let user = await AdminModel.findOne({ email:email });
      if (!user) {
        return res.send({ type:'email',errors: "Please try to login with correct email" });
      }
  
      const passwordCompare = await bcrypt.compare(req.body.password, user.password);
      if (!passwordCompare) {
        return res.send({ type:'password', errors: "Please try to login with correct password" });
      }
      const data = {
        user: {
          id: user._id,
          email:user.email
        }
      }
      const authtoken = jwt.sign(data, 'secretkey');
      return res.send({type:'success',token:authtoken});
    });




//for forgotpassword 
app.post("/forgotpassword", [
  body('email', 'Enter a valid email').isEmail(),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ type:'validation',errors: errors.array() });
  }

  const email = req.body.email;
    let user = await CustomerModel.findOne({ email:email });
    if (!user) {
      return res.send({ type:'email',errors: "Please try to login with correct email" });
    }
const otpcode = Math.floor((Math.random()*10000)+1);
const expirein = new Date().getTime() + 600*1000;
let otpdata = new OtpModel({email:email,code:otpcode,expireon:expirein});

try{
let otpresponse = await otpdata.save();

const to = user.email;
const subject = "OTP FOR PASSWORD RECOVERY";
const text = `Hi ${user.fullname} , yout otp for reset password is ${otpcode}. Hope we were helpfull.
This code is only valid for 10 minutes`;


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'diw199910@gmail.com',
    pass: 'bvkqidheqxnytxer',
  },
});



const mailOptions = {
  from: 'diw199910@gmail.com',
  to,
  subject,
  text,
};

// Send the email for otp
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
    res.send({type:'error',errors:'Error sending email'});
  } else {
    console.log('Email sent:', info.response);
    res.send({type:'success',message:'Email sent successfully'});
  }
});
}
catch(err){
console.log(err);
}
   
  });




//otp matches
app.post("/otpcheck", [
  body('email', 'Enter a valid email').isEmail(),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ type:'validation',errors: errors.array() });
  }

  const email= req.body.email;
  const otpcode= req.body.otpcode;
    let otp = await OtpModel.findOne({ email:email });
  const currenttime = new Date().getTime();
  const diff = otp.expireon - currenttime;
  if(diff<0)
  {
res.send({type:'error',errors:'Otp has expired'});
  }
  else
  {
     if(otpcode === otp.code)
     {
      res.send({type:'success',message:'otp matches'});
     }
     else
     {
      res.send({type:'error',message:'otp number does not matches'});
     }
  }
  });

//resetpassword for customer
app.post("/resetpassword", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation',errors: errors.array() });
    }
  
    const { email, password } = req.body;
    const hashpassword = await bcrypt.hash(password,10);
      let user = await CustomerModel.updateOne({email:email },{$set:{password:hashpassword}});
      if (!user) {
        return res.send({ type:'email',message: "Email error" });
      }
      let deleteallotp = await OtpModel.deleteMany({email:email });
         res.send({type:'success',message:user});

    
  

    });

//resetpassword for admin from profile
app.post("/resetpasswordadmin", [
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],fetchuser,async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ type:'validation',errors: errors.array() });
  }

  const email = req.user.email;
  const password = req.body.password;
  const hashpassword = await bcrypt.hash(password,10);
    let user = await AdminModel.updateOne({email:email },{$set:{password:hashpassword}});
    if (!user) {
      return res.send({ type:'email',message: "Email error" });
    }
       res.send({type:'success',message:user});

  


  });

//reset password for customer from profile

app.post("/resetpasswordcustomer",fetchuser, [
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ type:'validation',errors: errors.array() });
  }

  const email = req.user.email;
  const password = req.body.password;
  const hashpassword = await bcrypt.hash(password,10);
    let user = await CustomerModel.updateOne({email:email },{$set:{password:hashpassword}});
    if (!user) {
      return res.send({ type:'email',message: "Email error" });
    }
       res.send({type:'success',message:user});

  
  });

//Create Product
app.post("/admin/createproduct", [
  body('productname', 'Enter a  product name of min length 3').isLength({ min: 3 }),
  body('image', 'Enter a  valid image url').isURL(),
  body('quantity', 'Has to be numeric with min value 1').isInt({ min: 1 }),
  body('price', 'Has to be numeric with min value 1').isInt({ min: 1 }),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ type:'validation' ,errors: errors.array() });
  }

  const productname = req.body.productname;
  const image = req.body.image;
  const like = req.body.like;
  const  quantity = req.body.quantity;
  const  price = req.body.price;
  const description = req.body.description;
  const type = req.body.type;
  const service1 = req.body.service1;
  const service2 = req.body.service2;
  const service3 = req.body.service3;
  const service4 = req.body.service4;

let product = await ProductModel.findOne({ productname: productname,type:type });
  if (product) {
    return res.send({type:'similar',errors:'Product already exist'});
  }
  else{
let product = new ProductModel({productname:productname,image:image,like:like,quantity:quantity,price:price,Description:description,type:type,service1:service1,service2:service2,service3:service3,service4:service4});

try{
let createproduct = await product.save();
res.send({type:'success'});
}
catch(err){
res.send({type:'product not saved',errors:err});
}
  }
});

//Read Product
app.get("/admin/readproduct",async(req,res)=>{

try{
  let product = await ProductModel.find({});
  return res.send({type:'Success',items:product});
}
catch(err){
res.send({type:'error',errors:err});
}

});

//take read edit product
app.post("/admin/readeditproduct",async(req,res)=>{

  const id =req.body.id;
  try{
    let product = await ProductModel.find({_id: id});
    return res.send({type:'Success',item:product});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  
  });

//update Product
app.post("/admin/updateproduct", [
  body('productname', 'Enter a  product name of min length 3').isLength({ min: 3 }),
  body('image', 'Enter a  valid image url').isURL(),
  body('quantity', 'Has to be numeric with min value 1').isInt({ min: 1 }),
  body('price', 'Has to be numeric with min value 1').isInt({ min: 1 }),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ type:'validation' ,errors: errors.array() });
  }


  const id = req.body.id;
  const productname = req.body.productname;
  const image = req.body.image;
  const  quantity = req.body.quantity;
  const  price = req.body.price;
  const description = req.body.description;
  const type = req.body.type;
  const service1 = req.body.service1;
  const service2 = req.body.service2;
  const service3 = req.body.service3;
  const service4 = req.body.service4;

  let like = await ProductModel.findOne({_id:id});
  like =like.like;
  let product = await ProductModel.findOne({ productname: productname,type:type });
  if (product) {
    return res.send({type:'similar',errors:'Product already exist'});
  }

try{
  const update = await ProductModel.updateOne({_id:id},{$set:{productname:productname,image:image,like:like,quantity:quantity,price:price,Description:description,type:type,service1:service1,service2:service2,service3:service3,service4:service4}});
  res.send({type:'success'});
}
catch(error){
  res.send({type:'Error',errors:error});
}



});


//delete product
app.post("/admin/deleteproduct",async(req,res)=>{

  const id =req.body.id;
  try{
    let product = await ProductModel.deleteOne({_id: id});
    return res.send({type:'Success'});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  
  });

  //user read
  app.get("/admin/readcustomer",async(req,res)=>{

    try{
      let customer = await CustomerModel.find({});
      return res.send({type:'Success',items:customer});
    }
    catch(err){
    res.send({type:'error',errors:err});
    }
    
    });


  //user ban|unban
  app.post("/admin/bancustomer",async(req,res)=>{

    const id =req.body.id;
    try{
      let customer = await CustomerModel.findOne({_id: id});
      const ban = !customer.ban;
      let newcustomer = await CustomerModel.findOneAndUpdate({_id: id},{$set:{ban:ban}});
      return res.send({type:'Success'});
    }
    catch(err){
    res.send({type:'error',errors:err});
    }
    
    });

  //user delete
  app.post("/admin/deletecustomer",async(req,res)=>{

    const id =req.body.id;
    try{
      let customer = await CustomerModel.deleteOne({_id: id});
      return res.send({type:'Success'});
    }
    catch(err){
    res.send({type:'error',errors:err});
    }
    
    });


//Create Coupon
app.post("/admin/createcoupon", [
  body('code', 'Enter a  code of min length 3').isLength({ min: 3 }),
  body('discount', 'Enter some numeric value').isNumeric(),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ type:'validation' ,errors: errors.array() });
  }

 const code = req.body.code;
 const discount = req.body.discount;
 const expire = req.body.expire;
 const status = req.body.status === 'True';

let coupon = await CouponModel.findOne({ code: code });
  if (coupon) {
    return res.send({type:'similar',errors:'Coupon already exist'});
  }
  else{
let coupon = new CouponModel({code:code,discount:discount,expireon:expire,status:status});

try{
let createcoupon = await coupon.save();
res.send({type:'success'});
}
catch(err){
res.send({type:'Coupon not saved',errors:err});
}
  }
});


//Read Coupon
app.get("/admin/readcoupon",async(req,res)=>{

  try{
    let coupon = await CouponModel.find({});
    return res.send({type:'Success',items:coupon});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  
  });
  
  //take read edit coupon
  app.post("/admin/readeditcoupon",async(req,res)=>{
  
    const id =req.body.id;
    try{
      let coupon = await CouponModel.find({_id: id});
      return res.send({type:'Success',item:coupon});
    }
    catch(err){
    res.send({type:'error',errors:err});
    }
    
    });
  
  //update Coupon
  app.post("/admin/updatecoupon", [
    body('code', 'Enter a  code of min length 3').isLength({ min: 3 }),
    body('discount', 'Enter some numeric value').isNumeric(),
  ],async(req,res)=>{
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation' ,errors: errors.array() });
    }
    const id = req.body.id;
    const code = req.body.code;
    const discount = req.body.discount;
    const expire = req.body.expire;
    const status = req.body.status === 'True';

    let coupon = await CouponModel.findOne({ code: code,discount:discount });
    if (coupon) {
      return res.send({type:'similar',errors:'Coupon already exist'});
    }
  
  try{
    const update = await CouponModel.updateOne({_id:id},{$set:{code:code,discount:discount,expireon:expire,status:status}});
    res.send({type:'success'});
  }
  catch(error){
    res.send({type:'Error',errors:error});
  }
  
  
  
  });
  
  
  //delete Coupon
  app.post("/admin/deletecoupon",async(req,res)=>{
  
    const id =req.body.id;
    try{
      let product = await CouponModel.deleteOne({_id: id});
      return res.send({type:'Success'});
    }
    catch(err){
    res.send({type:'error',errors:err});
    }
    
    });

//active||unactive coupon
  //delete Coupon
  app.post("/admin/activecoupon",async(req,res)=>{
  
    const id =req.body.id;
    try{
      let coupon = await CouponModel.findOne({_id: id});
      const status = coupon.status ? false:true;
      let active = await CouponModel.updateOne({_id:id},{$set:{status:status}})
      return res.send({type:'Success'});
    }
    catch(err){
    res.send({type:'error',errors:err});
    }
    
    });


//Contact create
app.post("/admin/contact", [
  body('name', 'Enter a fullname of min length 3').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('desc', 'Enter a Description of min length 10').isLength({ min: 10 }),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ type:'validation' ,errors: errors.array() });
  }

 const fullname = req.body.name;
 const email = req.body.email;
 const phone = req.body.phone;
 const description = req.body.desc ;

// will send mail to contact guy
try{
  const to = email;
  const subject = "Contact Form Submission";
  const text = `Hi ${fullname} , We have contacted you regarding the contact form you submitted.
  You can also contact us on +91 123456789.Thank You for contacting us.We will connect with you shortly.`;
  
  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'diw199910@gmail.com',
      pass: 'bvkqidheqxnytxer',
    },
  });
  
  
  
  const mailOptions = {
    from: 'diw199910@gmail.com',
    to,
    subject,
    text,
  };
  
  // Send the email for contact
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.send({type:'error',errors:'Error sending email'});
    } else {
      console.log('Email sent:', info.response);
      res.send({type:'success'});
    }
  });
  }
  catch(err){
  console.log(err);
  }
});



//Read most liked product
app.get("/like",async(req,res)=>{

  try{
    let product = await ProductModel.find({}).sort({ rating: -1 }).limit(6);
    return res.send({type:'Success',items:product});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  
  });
  

//productdescription
  app.post("/productdescription",async(req,res)=>{
  
    const id =req.body.id;
    try{
      let desc = await ProductModel.findOne({_id: id});
      if(desc)
      {
        return res.send({type:'Success',items:desc});
      }
      else
      {
        return res.send({type:'error',erros:"Admistrative issue"});
      }
     
    }
    catch(err){
    res.send({type:'error',errors:err});
    }
    
    });

//Cart add
app.post("/addtocart",fetchuser,async(req,res)=>{
  
const email = req.user.email;
const pname = req.body.pname;
const image = req.body.image;
const type = req.body.type;
const quantity = req.body.quantity;
const price = req.body.price;

  try{
    let cart = await CartModel.findOne({email:email,name:pname,type:type,status:true});
   
if(cart)
{
 let count = cart.quantity + quantity;
      let active = await CartModel.updateOne({email:email,name:pname,type:type,status:true},{$set:{quantity:count}})
      return res.send({type:'Success'});
}
else
{
  let cart = new CartModel({email:email,name:pname,image:image,type:type,quantity:quantity,price:price,status:true});
  let cartcreate = await cart.save();
      return res.send({type:'Success'});

}   
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  
  });

//Read review
app.get("/readreviewuser",async(req,res)=>{

  try{
    let review = await ReviewModel.find({}).sort({ rating: 1 }).limit(4);
    return res.send({type:'Success',items:review});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });

//Read Cart
app.post("/readcart",fetchuser,async(req,res)=>{

  const email = req.user.email;
  try{
    let cart = await CartModel.find({email:email,status:true});
    return res.send({type:'Success',items:cart});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });
  
//plus item
app.post("/cartplus",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const name = req.body.name;

  try{
    let cart = await CartModel.findOne({email:email,status:true,name:name});
    let quantity = cart.quantity+1;

    let update = await CartModel.updateOne({email:email,status:true,name:name},{$set:{quantity:quantity}});
    return res.send({type:'Success'});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });



//minus item
app.post("/cartminus",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const name = req.body.name;

  try{
    let cart = await CartModel.findOne({email:email,status:true,name:name});
    let quantity = cart.quantity-1;
    let update = await CartModel.updateOne({email:email,status:true,name:name},{$set:{quantity:quantity}});
    return res.send({type:'Success'});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });




//remove from cart
app.post("/delcart",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const name = req.body.name;
  console.log(email,name)
  try{
    let cart = await CartModel.deleteOne({email:email,status:true,name:name});
    return res.send({type:'Success'});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });


//coupon code
app.post("/couponcode",async(req,res)=>{

  const code = req.body.code;
let codeupper = code.toUpperCase();

  try{
    let cart = await CouponModel.findOne({code:codeupper});
    let date = new Date();
    if(date > cart.expireon)
    {
      return res.send({type:'Expire',message:'Coupon has Expired'});
    }
    if( cart.status === false)
    {
      return res.send({type:'Expire',message:'Coupon been deactivated by Admin'});
    }
    return res.send({type:'Success',discount:cart.discount});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });

//add to order
app.post("/orderadd",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const discount = req.body.discount;
  const shipname = req.body.shipname;
  const address = req.body.address;
  const paymenttype = req.body.paymenttype;
  const deliverystatus = req.body.deliverystatus;
   const datebought = new Date();

   const day = datebought.getDate();

   // JavaScript months are 0-indexed, so we add 1 to get the correct month number
   const month = datebought.getMonth() + 1;
   
   // Get the current year
   const year = datebought.getFullYear();

   const totalamount = req.body.totalamount;
   const subamounttotal = req.body.subamounttotal;
   const discountamount = req.body.discountamount;


   //unique id
   const prefix = datebought.toString(); // Use timestamp as a prefix for uniqueness
   const randomSuffix = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
   const uniqueNumber = prefix + randomSuffix;
  const orderid =  uniqueNumber.substring(uniqueNumber.length - 7);

  try{
    let cart = await CartModel.updateMany({email:email,status:true},{$set:{status:false,discount:discount,date:datebought,shipname:shipname,address:address,paymenttype:paymenttype,deliverystatus:deliverystatus,orderid:orderid}},  { new: true } );
    let user =await CustomerModel.updateMany({email:email},{$inc:{bought:1}});


//send mail to the customer that payment successfull
const to = email;
const subject = "Order Successfull";
const text = `
Hi ${shipname},
Thank you for your recent order with Publix. We are excited to confirm your purchase and provide you with the order details:
Order Number: ${orderid}
Order Date: ${day}/${month}/${year}
Shipping Address: ${address}

Order Summary:
[Subtotal]: Rs ${subamounttotal}
[Shipping]: Rs 100
[Discount]: Rs ${discountamount}
[Total]: Rs ${totalamount }

Payment Information:
Payment Method: ${paymenttype}

Shipping Information:
Shipping Method: Truck
Estimated Delivery Date: 7 days

Order Status: ${deliverystatus}

Please note that you will receive a separate email with the shipment tracking details once your order has been dispatched.

If you have any questions or need further assistance, feel free to reply to this email or contact our customer support team at publix.banega.crorepati@gmail.com or 123456789.

Thank you for choosing Publix. We value your business and look forward to serving you again in the future.

Best regards,
Jon Doe
Sales 
halkat inc
123456789
`;


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'diw199910@gmail.com',
    pass: 'bvkqidheqxnytxer',
  },
});



const mailOptions = {
  from: 'diw199910@gmail.com',
  to,
  subject,
  text,
};

// Send the email for contact
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
    res.send({type:'error',errors:'Error sending email'});
  } else {
    console.log('Email sent:', info.response);
    res.send({type:'Success many'});
  }
});

    return res.send({type:'Success many'});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });





//Read order
app.post("/readorder",fetchuser,async(req,res)=>{

  const email = req.user.email;
  try{
    let cart = await CartModel.find({email:email,status:false});
    return res.send({type:'Success',items:cart});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });
  
  
//Read order admin
app.get("/readorderadmin",async(req,res)=>{

  try{
    let cart = await CartModel.find({status:false});
    return res.send({type:'Success',items:cart});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });



//Read order with id
app.post("/readorderwithid",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const id = req.body.id;
  try{
    let cart = await CartModel.findOne({email:email,_id:id});
    return res.send({type:'Success',items:cart});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });


//Read order with id
app.post("/vieworderwithid",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const id = req.body.id;
  try{
    let cart = await CartModel.findOne({email:email,_id:id});
    return res.send({type:'Success',items:cart});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });

//cancel order that is being shipped
app.post("/cancelorderid",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const id = req.body.id;
  try{
    let cart = await CartModel.updateOne({email:email,_id:id},{$set:{deliverystatus:'Cancel',dateofstatus:new Date()}});
    return res.send({type:'Success',items:cart});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });


//return order that is been delivered
app.post("/returnorderid",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const id = req.body.id;
  try{
    let cart = await CartModel.updateOne({email:email,_id:id},{$set:{deliverystatus:'Returned',dateofstatus:new Date()}});
    return res.send({type:'Success',items:cart});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });




//Review save and update the product review
app.post("/reviewsave",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const pname = req.body.name;
  const rate = req.body.rate;
  const desc = req.body.desc;
  

  //check if that user for that product already reviewed
  let userimage = await CustomerModel.findOne({email:email});
  let reviewalready = await ReviewModel.findOne({pname:pname,email:email});
  if(reviewalready)
  {
    res.send({type:'Already reviewed'});
  }
  else
  {
    try{
      //update in review
      let review = new ReviewModel({email:email,rating:rate,review:desc,pname:pname,image:userimage.image});
      let reviewcreate = await review.save();
  
    //product review update
    let product = await ProductModel.findOne({productname:pname});
    let prate = product.rating;
    let pnumber = product.norating;
    let total = ((prate * pnumber)+rate*100)/(pnumber+1);
    let totalnew = parseInt(total);
    let productupdate = await ProductModel.updateOne({productname:pname},{$set:{rating:totalnew,norating:pnumber+1}});
  
      return res.send({type:'Success'});
    }
    catch(err){
    res.send({type:'error',errors:err});
    }
  }
  });



//read review for that unique product
app.post("/readreview",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const pname = req.body.pname;
  try{
    let review = await ReviewModel.find({email:email,pname:pname}).limit(5);
    return res.send({type:'Success',items:review});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });


//get all user for view
app.get("/readrecustomer",async(req,res)=>{

  try{
    let user = await CustomerModel.find({});
    return res.send({type:'Success',items:user});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });

//get all the product
app.get("/readproductdash",async(req,res)=>{

  try{
    let user = await ProductModel.find({});
    return res.send({type:'Success',items:user});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });


//get all the order
app.get("/readorderdash",async(req,res)=>{

  try{
    let order = await CartModel.find({status:false});
    return res.send({type:'Success',items:order});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });

//get all the review
app.get("/readreviewdash",async(req,res)=>{

  try{
    let review = await ReviewModel.find({});
    return res.send({type:'Success',items:review});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });


//get all the admin specific user
app.post("/readadminspecific",fetchuser,async(req,res)=>{
const email = req.user.email;
  try{
    let admin = await AdminModel.findOne({email:email});
    return res.send({type:'Success',items:admin});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });


  //update admin
  app.post("/updateadmin",[
    body('name', 'Enter a  name of min length 5').isLength({ min: 5 }),
    body('phone', 'Phone number must be of 10 characters').isLength({ min: 10, max:10 }),
  ],fetchuser,async(req,res)=>{
    const email = req.user.email;
    const image = req.body.image;
    const name = req.body.name;
    const phone = req.body.phone;



      try{
        let adminupdate = await AdminModel.updateOne({email:email},{$set:{fullname:name,phone:phone,image:image}});
        return res.send({type:'Success',items:adminupdate});
      }
      catch(err){
      res.send({type:'error',errors:err});
      }
      });



  //update customer
  app.post("/updateuser",fetchuser,[
    body('name', 'Enter a  name of min length 5').isLength({ min: 5 }),
    body('phone', 'Phone number must be of 10 characters').isLength({ min: 10, max:10 }),
  ],async(req,res)=>{
    const email = req.user.email;
    const image = req.body.image;
    const name = req.body.name;
    const phone = req.body.phone;



      try{
        let adminupdate = await CustomerModel.updateOne({email:email},{$set:{fullname:name,phone:phone,image:image}});
        let reviewupdate = await ReviewModel.updateMany({email:email},{$set:{image:image}});
        return res.send({type:'Success',items:adminupdate});
      }
      catch(err){
      res.send({type:'error',errors:err});
      }
      });

//Admin change status to delivered
  app.post("/deliverorder",async(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const orderid = req.body.orderid;
    const id = req.body.id;
      try{
        let orderdeliver = await CartModel.updateOne({_id:id,email:email,orderid:orderid,name:name},{$set:{deliverystatus:'Delivered'}});
        return res.send({type:'Success',items:orderdeliver});
      }
      catch(err){
      res.send({type:'error',errors:err});
      }
      });

app.listen(3001,()=>{

    console.log('server running');
})