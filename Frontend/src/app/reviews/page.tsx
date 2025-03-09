"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Navbar from "../navbar/navBar";
import "../Assets/css/Reviews.modules.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReviewCard from "./ReviewCard";
import ReviewModalForm from "./ReviewModalForm";

// ------------------ TYPES ------------------ //
export interface Review {
    _id?: string;
    email: string;
    name: string;
    stars: number;
    title: string;
    content: string;
    // image is stored as Buffer in the database, but on the client side
    // it may be a File or a placeholder. We'll just define it as possibly null.
    image?: string | File | null;
}

// For creating a new review (the user name/email come from session)
interface NewReview {
    title: string;
    content: string;
    image: File | null;
    stars: number;
}

export default function Reviews() {
    const { data: session } = useSession();
    const router = useRouter();

    // State
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("");
    const [starPercentages, setStarPercentages] = useState<number[]>([]);
    const [showModal, setShowModal] = useState(false);

    // New review form state
    const [newReview, setNewReview] = useState<NewReview>({
        title: "",
        content: "",
        image: null,
        stars: 1,
    });

  // ------------------ FETCH REVIEWS ------------------ //
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("/api/reviews");
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

  // ------------------ STAR PERCENTAGES ------------------ //
    useEffect(() => {
        setStarPercentages(calculateStarPercentages(reviews));
    }, [reviews]);

    function calculateStarPercentages(reviewList: Review[]) {
        const total = reviewList.length;
        const starCount = [0, 0, 0, 0, 0];

        reviewList.forEach((rev) => {
        const stars = Number(rev.stars);
        if (stars >= 1 && stars <= 5) {
            starCount[stars - 1] += 1;
        }
        });

        return starCount.map((count) => (total > 0 ? (count / total) * 100 : 0));
    }

    // Calculate average stars
    const averageStars =
        reviews.length > 0
            ? reviews.reduce((sum, r) => sum + Number(r.stars), 0) / reviews.length
            : 0;

    // ------------------ SORTING ------------------ //
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const option = e.target.value;
        setSortOption(option);

        const sorted = [...reviews].sort((a, b) => {
        if (option === "Newest First") {
                return new Date(b._id!).getTime() - new Date(a._id!).getTime();
        } else if (option === "Oldest First") {
            return new Date(a._id!).getTime() - new Date(b._id!).getTime();
        } else if (option === "Highest First") {
            return b.stars - a.stars;
        } else if (option === "Lowest First") {
            return a.stars - b.stars;
        }
        return 0;
        });

        setReviews(sorted);
    };

    // ------------------ HANDLERS ------------------ //
    const handleLeaveReviewClick = () => {
        // If user is not logged in, redirect to login
        if (!session) {
        router.push("/login");
        return;
        }
        setShowModal(true);
    };

    // Submit new review
    const handleSubmitReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
        const formData = new FormData();
        formData.append("title", newReview.title);
        formData.append("content", newReview.content);
        formData.append("stars", newReview.stars.toString());

        // Overwrite with session user info if available
        if (session?.user?.name) formData.append("name", session.user.name);
        if (session?.user?.email) formData.append("email", session.user.email);

        if (newReview.image) {
            formData.append("image", newReview.image);
        }

        const response = await axios.post("/api/reviews", formData);
        setReviews((prev) => [...prev, response.data]);

        // Clear form and close modal
        setNewReview({ title: "", content: "", image: null, stars: 1 });
        setShowModal(false);
        } catch (error) {
            console.error("❌ Error submitting review:", error);
            alert("Error submitting review.");
        }
    };

  // Delete a review
    const handleDeleteReview = async (id: string) => {
        try {
            await axios.delete(`/api/reviews/${id}`);
            setReviews((prev) => prev.filter((review) => review._id !== id));
        } catch (error) {
            console.error("❌ Error deleting review:", error);
            alert("Error deleting review.");
        }
    };

  // ------------------ RENDER ------------------ //
    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <h1 className="reviews_title">Reviews</h1>

            <div className="top-level">
                {/* Star / Sorting Section */}
                <div className="star_box">
                    <div className="star_box_top">
                        <h1 className="star_average">{Math.round(averageStars * 10) / 10} ⭐</h1>
                        <div className="star_bars">
                        {[5, 4, 3, 2, 1].map((starCount) => (
                            <div key={starCount} className="rating_row">
                            <div className="rating_stars">{starCount} ⭐</div>
                            <div className="star_bar_container">
                                <div
                                className="star_bar"
                                style={{ width: `${starPercentages[starCount - 1]}%` }}
                                />
                                <div className="star_percentage">
                                {starPercentages[starCount - 1].toFixed(1)}%
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="sort_section">
                        <select value={sortOption} onChange={handleSortChange}>
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
                    <button className="leave_review" onClick={handleLeaveReviewClick}>
                        Leave Review
                    </button>
                </div>
            </div>

            {/* Review Modal */}
            <ReviewModalForm
                isVisible={showModal}
                onClose={() => setShowModal(false)}
                newReview={newReview}
                setNewReview={setNewReview}
                onSubmit={handleSubmitReview}
            />

            {/* Display Reviews */}
            <div className="reviews">
                {reviews.length === 0 && <div>No reviews available.</div>}
                {reviews.map((review) => (
                <ReviewCard
                    key={review._id}
                    review={review}
                    userEmail={session?.user?.email ?? undefined}
                    userIsAdmin={!!(session?.user as {admin: boolean}).admin}
                    onDelete={handleDeleteReview}
                />
                ))}
            </div>
        </div>
    );
}
