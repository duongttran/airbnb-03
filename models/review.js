const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    content: {
        type: String,
  
    },
    rating: {
        type: Number,
        require: [true, "Rating is required"]
    }, 
    experience:  {
        type: mongoose.Schema.ObjectId,
        ref: "Experience",
        required: [true, "Review must belong to an exp"]
    }
})

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review;

