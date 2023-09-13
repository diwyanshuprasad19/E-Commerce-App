const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: {
        type: String, 
        require:true,
    },

},{
    timestamps:true
});
const Order = mongoose.model("OrderData",OrderSchema);
module.exports = Order;