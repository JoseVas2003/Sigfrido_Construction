const Review = require("../models/reviews.model");

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
        const { name, title, content, stars, image } = req.body;

        const newReview = new Review({
            name,
            title,
            content,
            stars,
            image, // Store the Base64 image string
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Update existing review
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedReview = await Review.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Enforce schema validation
        });

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete review
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

module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview
};
