const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    fullname:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    image:{
        type : String,
        required : true,
    },
    ban:{
        type : Boolean,
        default : false,
    },
    designation:{
        type : String,
        required : false,
    },
    view:{
        type : Number,
        required : false,
    },
    address:{
        type : String,
        required : false,
    },
    phone:{
        type : String,
        required : false,
    },
},{
    timestamps:true
});
const Customer = mongoose.model("CustomerData",CustomerSchema);
module.exports = Customer;
