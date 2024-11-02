'use client'
import React, { useState } from "react";
import Navbar from "../navbar/navBar";
import '../Assets/css/Reviews.modules.css';


export default function Reviews() {
    // Fake reviews data
    const reviewsData = [
        {
            name: "Emily R.",
            stars: 5,
            title: "Outstanding Renovation Work",
            content: "Absolutely thrilled with the results! Sigfrido and his team were professional, timely, and attentive to all of our needs. Highly recommend!"
        },
        {
            name: "Mike J.",
            stars: 4,
            title: "Kitchen Remodel Success",
            content: "Five stars! This team went above and beyond to ensure our kitchen remodel was a success. Great communication and craftsmanship."
        },
        {
            name: "Jordan K.",
            stars: 5,
            title: "Exquisite Custom Fountain Build",
            content: "We hired this team to construct a custom fountain in our garden, and the result is nothing short of magical. The craftsmanship is top-tier, and the design perfectly complements our outdoor space. They managed every aspect of the build with precision, from the initial design to the intricate stone work and water features. Truly a focal point that enhances our garden's beauty."
        }
    ];

        // State for storing and sorting reviews
        const [reviews, setReviews] = useState(reviewsData);
        const [sortBy, setSortBy] = useState(''); // could be 'name', 'rating', etc.
        const [showModal, setShowModal] = useState(false);
        const [newReview, setNewReview] = useState({
            name: "",
            title: "",
            content: "",
            imageFile: null,
            stars: 0
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setNewReview({...newReview, [name]: value});
        };
    
        const handleFileChange = (e) => {
            setNewReview({...newReview, imageFile: e.target.files[0]});
        };
    
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setReviews([...reviews, {...newReview, stars: 5}]); // Assuming 5 stars for simplicity
            setShowModal(false);
            setNewReview({ name: "", title: "", content: "", imageFile: null }); // Reset form
        };
        

        const renderStars = (num: number) => {
            return Array(num).fill(null).map((_, i) => <span key={i} className="star">⭐</span>);
        };
        // Gets average star rating from array of dummy review objects
        const averageStars = reviewsData.reduce((sum, obj) => sum + obj.stars, 0) / reviewsData.length
        
        
    return (
        <div>
            {/* need header bar here */}
            <Navbar />
            <h1 className="reviews_title">Reviews</h1>
            <div className="top-level">
                <div className="star_box">
                    {/*average number of stars*/}
                    <h1>{Math.round(averageStars * 10)/10}⭐</h1>
                    <div className="star_bars">
                        <div className="left">
                            <h2>5 Stars:</h2>
                            <h2>4 Stars:</h2>
                            <h2>3 Stars:</h2>
                            <h2>2 Stars:</h2>
                            <h2>1 Stars:</h2>
                        </div>
                        <div className="right">
                            <div className="star_bar"></div>
                            <div className="star_bar"></div>
                            <div className="star_bar"></div>
                            <div className="star_bar"></div>
                            <div className="star_bar"></div>
                        </div>
                    </div>
                    <div className="sort_section">
                        <h2>Sort Reviews By:</h2>
                        {/* implement dropdown menu */}
                        <select></select>
                    </div>
                </div>
                <div className="feedback_section">
                    <h1>We Value Your Feedback</h1>
                    <p>
                        We strive to improve and tailor our services to best meet your needs. Please leave us
                        a review to let us know how we are doing and how we can make your experience even better.
                    </p>
                    <button className="leave_review" onClick={() => setShowModal(true)}>
                        Leave Review
                    </button>
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                                <button onClick={() => setShowModal(false)} className="float-right text-3xl font-semibold">&times;</button>
                                <form onSubmit={handleSubmit} className="mt-4">
                                    <label className="block">
                                        Name: <input type="text" name="name" required onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md"/>
                                    </label>
                                    <label className="block mt-4">
                                        Image: <input type="file" name="image" onChange={handleFileChange} className="mt-1 p-2 w-full border rounded-md"/>
                                    </label>
                                    <label className="block mt-4">
                                        Title: <input type="text" name="title" required onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md"/>
                                    </label>
                                    <label className="block mt-4">
                                        Stars:
                                        <select
                                            name="stars"
                                            value={newReview.stars}
                                            onChange={(e) => setNewReview({...newReview, stars: Number(e.target.value)})}
                                            required
                                            className="mt-1 p-2 w-full border rounded-md"
                                        >
                                            <option value="" disabled>Select rating</option>
                                            <option value="0">0 Stars</option>
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Stars</option>
                                            <option value="3">3 Stars</option>
                                            <option value="4">4 Stars</option>
                                            <option value="5">5 Stars</option>
                                        </select>
                                    </label>
                                    <label className="block mt-4">
                                        Review: <textarea name="content" required onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md"></textarea>
                                    </label>
                                    <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Submit Review
                                    </button>
                                </form>

                            </div>
                        </div>
                    )}

                </div>
            </div>
            {/* reviews section, should be rendered from database and sorted based on menu selection */}
            <div className="reviews">
                {reviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <h3 className="review-name">{review.name}</h3>
                        <div className="review-stars">{renderStars(review.stars)}</div>
                        <h4 className="review-title">{review.title}</h4>
                        <p className="review-content">{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
