const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    email: {
        type: String, 
        require:true,
    },
    code: {
        type:Number,
        require:true,
    },
    expireon: {
        type:Date,
        require:true,
    },
},{
    timestamps:true
});
const Otp = mongoose.model("OtpData",OtpSchema);
module.exports = Otp;