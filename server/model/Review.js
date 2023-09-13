const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    email:{
        type: String, 
        require:true,
    },
    rating: {
        type:Number,
        require:true,
    },
    review: {
        type: String, 
        require:true,
    },
    pname: {
        type: String, 
        require:true,
    }, 
    image: {
        type: String, 
        require:true,
    },
},{
    timestamps:true
});
const Review = mongoose.model("ReviewData",ReviewSchema);
module.exports = Review;