'use client'
import React, { useState } from "react";
import Navbar from "../navbar/navBar";
import '../Assets/css/Reviews.modules.css';
import { useEffect } from "react";



    
    interface Review {
        name: string;
        stars: number;
        title: string;
        content: string;
        image?: File | null;
    }

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

    // Function to calculate what percentage of reviews each star value makes up
    const calculateStarPercentages = (reviews: Review[]) => {
        const total = reviews.length; 
        const starCount = [0, 0, 0, 0, 0];
    
        reviews.forEach((review) => {
            const stars = Number(review.stars)
            if (stars >= 1 && stars <= 5) {
                starCount[stars - 1] += 1;  //  increment count of reviews with that many stars
            }
        });
    
        const percentages = starCount.map(count => total > 0 ? (count / total) * 100 : 0); // Convert counts to percentages
        return percentages;
    };


    const ReviewCard = ({ review }: { review: Review }) => (
        <div className="review-card">
            <div className="review-top">
                <h3 className="review-name">{review.name}</h3>
                <div className="review-stars">{renderStars(review.stars)}</div>
            </div>
            <hr className="review-hr" />
            <h4 className="review-title">{review.title}</h4>
            <p className="review-content">{review.content}</p>
        </div>
    );

    const renderStars = (num: number) => {
        const n = Number(num);
        return Array(n).fill(null).map((_, i) => <span key={i} className="star">⭐</span>);
    };

    const renderRatingStars = (totalStars: number, filledStars: number) => {
        return (
            <>
                {Array.from({ length: filledStars }, (_, i) => (
                    <span key={i} className="star filled">⭐</span>
                ))}
                {Array.from({ length: totalStars - filledStars }, (_, i) => (
                    <span key={i} className="star outlined">☆</span>
                ))}
            </>
        );
    };

    
export default function Reviews() {

     // State for storing and sorting reviews
    const [reviews, setReviews] = useState(reviewsData);
    const [sortBy, setSortBy] = useState(''); // could be 'name', 'rating', etc.
    const [starPercentages, setStarPercentages] = useState(() => calculateStarPercentages(reviewsData));
    const [showModal, setShowModal] = useState(false);
    const [averageStars, setAverageStars] = useState(reviewsData.reduce((sum, obj) => sum + obj.stars, 0) / reviewsData.length);
    const [newReview, setNewReview] = useState<Review>({
        name: "",
        title: "",
        content: "",
        image: null,
        stars: 1
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewReview(prev => ({ ...prev, [name]: name === 'stars' ? Number(value) : value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewReview({...newReview, image: e.target.files[0]});
        } else {
            setNewReview({...newReview, image: null})
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setReviews(prevReviews => [...prevReviews, newReview]); 
        setNewReview({name: '', title: "", content: "", image: null, stars: 1})
        setShowModal(false);
    };

    const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value)
    }

       // useEffect to update star percentages when reviews change
    useEffect(() => {
        const percentages = calculateStarPercentages(reviews);
        setStarPercentages(percentages);
        setAverageStars(reviews.reduce((sum, obj) => sum + Number(obj.stars), 0) / reviews.length); // Recalculate and update state
    }, [reviews]); 
    
    return (
        <div>
            <Navbar />
            <h1 className="reviews_title">Reviews</h1>
            <div className="top-level">
                <div className="star_box">
                    <div className="star_box_top">
                        {/*average number of stars*/}
                        <h1 className="star_average">{Math.round(averageStars * 10)/10}⭐</h1>
                        <div className="star_bars">
                            {[5, 4, 3, 2, 1].map((starCount, index) => (
                                <div key={index} className="rating_row">

                                    <div className="rating_stars">
                                        {renderRatingStars(5, starCount)}
                                    </div>
                                    <div className="star_bar_container">
                                        <div className="star_bar" style={{width: `${starPercentages[starCount - 1]}%`,}}>
                                            
                                        </div>
                                        <div className="star_percentage">
                                            {starPercentages[starCount - 1]}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr></hr>
                    <div className="sort_section">
                        <h2>Sort Reviews By:</h2>
                        {/* implement dropdown menu */}
                        <select value={sortBy} onChange={handleSortByChange}>
                            <option>Newest First</option>
                            <option>Oldest First</option>
                            <option>Highest First</option>
                            <option>Lowest First</option>
                        </select>
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
                                    <label className="block mt-4">
                                        Review: <input name="content" required onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md"></input>
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
                {reviews.map((review, index) => <ReviewCard key={index} review={review} />)}
            </div>
        </div>
    );
}
