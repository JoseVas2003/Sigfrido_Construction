const Review = require("../models/reviews.model");
const User = require("../models/users.model");

// Get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({}); // Fetch all reviews
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// Create a new review
const createReview = async (req, res) => {
    try {
        const newReview = await Review.create(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
};

// Update existing review
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReview = await Review.findByIdAndUpdate( id, req.body, {
            new: true, //Return updated document
            runValidators: true, // Make sure update follows schema
        } );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found'});
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const deleteReview = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
    

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found'});
        }

        res.status(200).json({ message: 'Review deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

