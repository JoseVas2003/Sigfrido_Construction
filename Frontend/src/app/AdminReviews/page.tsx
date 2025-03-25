"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "../Assets/css/adminReviews.modules.css"; // New CSS file
import Navbar from "../navbar/navBar";

interface Review {
    _id: string;
    name: string;
    stars: number;
    title: string;
    content: string;
    createdAt: string;
}

export default function AdminReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch reviews
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`)
            .then((response) => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching reviews:", error));
    }, []);

    // Delete a review
    const handleDeleteReview = (id: string) => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`)
            .then(() => {
                setReviews(reviews.filter((review) => review._id !== id));
            })
            .catch((error) => console.error("Error deleting review:", error));
    };

    return (
        <div>
            <Navbar />
            <div className="admin-reviews-container">
                <h1>All Customer Reviews</h1>

                <div className="sectionWrapper">
                    <section className="reviews">
                        <h2 className="sectionHeader">Reviews</h2>
                        {loading ? (
                            <p>Loading reviews...</p>
                        ) : reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className="review-card">
                                    <p><strong>{review.name}</strong> <span>{"⭐".repeat(review.stars)}</span></p>
                                    <p><em>{new Date(review.createdAt).toLocaleString()}</em></p>
                                    <p><strong>{review.title}</strong></p>
                                    <p>{review.content}</p>
                                    <div className="review-buttons">
                                        <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
                                        <button>Reply</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews available.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}