"use client";

import React from "react";
import type { Review } from "./page"; 

interface ReviewCardProps {
    review: Review;
    userEmail?: string;
    userIsAdmin?: boolean;
    onDelete: (id: string) => void;
}

/**
 * Displays a single review card, including star rating, content,
 * optional image, and a delete button if the user is authorized.
 */
export default function ReviewCard({
    review,
    userEmail,
    userIsAdmin,
    onDelete,
}: ReviewCardProps) {
  // Check if user can delete (owner or admin)
    const canDelete = review.email === userEmail || userIsAdmin;

    return (
        <div className="review-card">
            <h3 className="review-name">{review.name}</h3>

            {/* Star Rating */}
            <h3 className="review-rating">
                {Array.from({ length: review.stars }).map((_, i) => (
                <span key={i}>⭐</span>
                ))}
            </h3>

            <hr />
            <p className="review-title">{review.title}</p>
            <p className="review-content">{review.content}</p>

            {/* If an image exists, show it from Express route */}
            {review.image && review._id && (
                <img
                src={`http://localhost:3001/api/reviews/${review._id}/image`}
                alt={review.title}
                style={{ width: "150px", height: "auto" }}
                />
            )}

            {/* Conditionally render the delete button */}
            {canDelete && review._id && (
                <button
                className="delete-button"
                onClick={() => onDelete(review._id!)}
                >
                Delete
                </button>
            )}
        </div>
    );
}
