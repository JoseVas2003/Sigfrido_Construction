'use client'
import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navBar";
import '../Assets/css/Reviews.modules.css';
import axios from "axios";

interface Review {
    _id?: string; // Made _id optional for new reviews
    name: string;
    stars: number;
    title: string;
    content: string;
    image?: File | null;
}

// Function to calculate star percentages
const calculateStarPercentages = (reviews: Review[]) => {
    const total = reviews.length;
    const starCount = [0, 0, 0, 0, 0];

    reviews.forEach((review) => {
        const stars = Number(review.stars);
        if (stars >= 1 && stars <= 5) {
            starCount[stars - 1] += 1;
        }
    });

    return starCount.map(count => (total > 0 ? (count / total) * 100 : 0));
};

export default function Reviews() {
    // State
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('');
    const [starPercentages, setStarPercentages] = useState<number[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newReview, setNewReview] = useState<Review>({
        name: "",
        title: "",
        content: "",
        image: null,
        stars: 1
    });

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/reviews");
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    // Update star percentages
    useEffect(() => {
        setStarPercentages(calculateStarPercentages(reviews));
    }, [reviews]);

    // Calculate average stars
    const averageStars = reviews.length > 0
        ? reviews.reduce((sum, obj) => sum + Number(obj.stars), 0) / reviews.length
        : 0;

    // Handle sorting
    const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sortOption = e.target.value;
        setSortBy(sortOption);

        const sortedReviews = [...reviews].sort((a, b) => {
            if (sortOption === 'Newest First') return new Date(b._id!).getTime() - new Date(a._id!).getTime();
            if (sortOption === 'Oldest First') return new Date(a._id!).getTime() - new Date(b._id!).getTime();
            if (sortOption === 'Highest First') return b.stars - a.stars;
            if (sortOption === 'Lowest First') return a.stars - b.stars;
            return 0;
        });

        setReviews(sortedReviews);
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewReview(prev => ({ ...prev, [name]: name === 'stars' ? Number(value) : value }));
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewReview({ ...newReview, image: e.target.files[0] });
        } else {
            setNewReview({ ...newReview, image: null });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:3001/api/reviews", newReview, {
                headers: { "Content-Type": "application/json" },
            });
    
            setReviews([...reviews, response.data]); 
            setNewReview({ name: "", title: "", content: "", image: null, stars: 1 });
            setShowModal(false);
        } catch (error) {
            console.error("❌ Error submitting review:", error);
            alert("Error submitting review.");
        }
    };
    

    // Handle deleting a review
    const handleDeleteReview = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3001/api/reviews/${id}`); 
            setReviews(reviews.filter((review) => review._id !== id)); 
        } catch (error) {
            console.error("❌ Error deleting review:", error);
            alert("Error deleting review.");
        }
    };


    // Handle updating review
    const handleUpdateReview = async (id: string, updatedReview: Review) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/reviews/${id}`, updatedReview, {
                headers: { "Content-Type": "application/json" },
            });
    
            setReviews(reviews.map((review) => (review._id === id ? response.data : review)));
        } catch (error) {
            console.error("❌ Error updating review:", error);
            alert("Error updating review.");
        }
    };
    
    

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <h1 className="reviews_title">Reviews</h1>

            <div className="top-level">
                <div className="star_box">
                    <div className="star_box_top">
                        <h1 className="star_average">{Math.round(averageStars * 10) / 10}⭐</h1>
                        <div className="star_bars">
                            {[5, 4, 3, 2, 1].map((starCount, index) => (
                                <div key={index} className="rating_row">
                                    <div className="rating_stars">{starCount} ⭐</div>
                                    <div className="star_bar_container">
                                        <div className="star_bar" style={{ width: `${starPercentages[starCount - 1]}%` }}></div>
                                        <div className="star_percentage">{starPercentages[starCount - 1]}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sort_section">
                        <select value={sortBy} onChange={handleSortByChange}>
                            <option>Newest First</option>
                            <option>Oldest First</option>
                            <option>Highest First</option>
                            <option>Lowest First</option>
                        </select>
                    </div>
                </div>
                {/* Leave a Review Section */}
                <div className="feedback_section">
                    <h1>We Value Your Feedback</h1>
                    <p>
                        We strive to improve and tailor our services to best meet your needs.
                        Please leave us a review to let us know how we are doing and how we
                        can make your experience even better.
                    </p>
                    <button className="leave_review" onClick={() => setShowModal(true)}>Leave Review</button>
                    {/* Review Form Modal */}
                    {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            {/* Close Button */}
            <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-3xl font-semibold"
            >
                &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Leave a Review</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <label className="block">
                    <span className="font-medium">Name:</span>
                    <input
                        type="text"
                        name="name"
                        required
                        value={newReview.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </label>

                {/* Image Upload */}
                <label className="block">
                    <span className="font-medium">Image:</span>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </label>

                {/* Title */}
                <label className="block">
                    <span className="font-medium">Title:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        value={newReview.title}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </label>

                {/* Star Rating */}
                <label className="block">
                    <span className="font-medium">Stars:</span>
                    <select
                        name="stars"
                        value={newReview.stars}
                        onChange={handleInputChange}
                        required
                        className="mt-1 p-2 w-full border rounded-md"
                    >
                        <option value="" disabled>Select rating</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </label>

                {/* Review Content */}
                <label className="block">
                    <span className="font-medium">Review:</span>
                    <textarea
                        name="content"
                        required
                        value={newReview.content}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    ></textarea>
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Submit Review
                </button>
            </form>
        </div>
    </div>
)}

                </div>
            </div>




            {/* Display Reviews */}
            <div className="reviews">
                {reviews.length === 0 && <div>No reviews available.</div>}
                {reviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <h3>{review.name}</h3>
                        <p>{review.title}</p>
                        <p>{review.content}</p>
                        <button onClick={() => handleDeleteReview(review._id!)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

