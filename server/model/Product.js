const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productname:{
        type : String,
        required : true,
    },
    image:{
        type : String,
        required : true,
    },
    rating:{
        type: Number,
        required: true,
        default:0,
    },
    norating:{
        type: Number,
        required: true,
        default:0,
    },
    quantity:{
        type : Number,
        required : true,
    },
    price:{
        type : Number,
        required : true,
    },
    Description:{
        type : String,
        required : true,
    },
    type:{
        type : String,
        required : true,
    },
    service1:{
        type : Boolean,
        default : false,
    },
    service2:{
        type : Boolean,
        default : false,
    },
    service3:{
        type : Boolean,
        default : false,
    },
    service4:{
        type : Boolean,
        default : false,
    },
});
const Product = mongoose.model("ProductData",ProductSchema);
module.exports = Product;