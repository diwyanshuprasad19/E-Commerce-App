const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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
    phone:{
        type : String,
        required : false,
    },
},{
    timestamps:true
});
const Admin = mongoose.model("AdminData",AdminSchema);
module.exports = Admin;