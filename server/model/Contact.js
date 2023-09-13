const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    fullname:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    Description:{
        type : String,
        required : true,
    },
});
const Contact = mongoose.model("ContactData",ContactSchema);
module.exports = Contact;