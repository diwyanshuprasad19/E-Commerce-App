const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: {
        type: String, 
        unique: true,
        require:true,
    },
    discount: {
        type:Number,
        require:true,
    },
    expireon: {
        type:Date,
        require:true,
    },
    status: {
        type:Boolean, 
        default: true,
        require:true,
    },
});
const Coupon = mongoose.model("CouponData",CouponSchema);
module.exports = Coupon;