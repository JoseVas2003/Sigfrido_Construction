import React from 'react';
import customReviewStyles from '../Assets/css/adminReviews.modules.css';

const CustomerReviewsList = ({ reviews }) => {
    const renderStars = (num) => {
        return Array(num).fill(null).map((_, i) => <span key={i} className="star">⭐</span>);
    };

    return (
        <div className={customReviewStyles.reviewsOverride}>
            {reviews.map((review, index) => (
                <div key={index} className={customReviewStyles.reviewCardOverride}>
                    <h3 className="review-name">{review.name}</h3>
                    <div className="review-stars">{renderStars(review.stars)}</div>
                    <h4 className="review-title">{review.title}</h4>
                    <p className="review-content">{review.content}</p>
                </div>
            ))}
        </div>
    );
};

export default CustomerReviewsList;