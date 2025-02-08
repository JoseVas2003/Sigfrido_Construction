const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
        },
        title: {
            type: String,
            required: [true, 'Title'],
        },
        content: {
            type: String,
            required: [true, 'Let us know how we did!'],
        },
        stars: {
            type: Number,
            required: [true, 'Please rate your overall experience'],
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5'],
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true, 
    }
);

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;