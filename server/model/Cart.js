const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
    },
    name:{
        type : String,
        required : true,
    },
    image:{
        type : String,
        required : true,
    },
    type:{
        type : String,
        required : true,
    },
    price:{
        type : Number,
        required : true,
    },
    
    quantity:{
        type : Number,
        required : true,
        default: 1,
    },
    status: {
        type:Boolean, 
        default: true,
        require:true,
    },

    //main points start now
    //date when item in order for - shipping,cancelled,returned.
    date:{
        type: Date, 
        default: Date.now,
        required : false,
    },

    //after bought discount there ot not:same for address,paymenttype
    discount:{
        type : Number,
        required : false,
        default:0,
    },
    //the guy whose name on shipping address
    shipname:{
        type : String,
        required : false,
    },
    address:{
        type : String,
        required : false,
    },
    paymenttype:{
        type : String,
        required : false,
    },
    //delivery status(shipping,delivered,cancelled,returned)
    deliverystatus:{
        type : String,
        required : false,
    },
    //date when item delivered
    dateofstatus:{
        type: Date, 
        default: Date.now,
        required : false,
    },
   orderid:{
        type : String,
        required : false,
    },
},{
    timestamps:true
});
const Cart = mongoose.model("CartData",CartSchema);
module.exports = Cart;