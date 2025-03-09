"use client";

import React, {
    FormEvent,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from "react";
import type { Review } from "./page";

// Same shape as the newReview in page.tsx
interface NewReview {
    title: string;
    content: string;
    image: File | null;
    stars: number;
}

interface ReviewModalFormProps {
    isVisible: boolean;
    onClose: () => void;
    newReview: NewReview;
    setNewReview: Dispatch<SetStateAction<NewReview>>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

/**
 * A reusable modal form for creating (or editing) a review.
 */
export default function ReviewModalForm({
    isVisible,
    onClose,
    newReview,
    setNewReview,
    onSubmit,
    }: ReviewModalFormProps) {
    if (!isVisible) return null;

    // Generic input change handler
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({
        ...prev,
        [name]: name === "stars" ? Number(value) : value,
        }));
    };

    // File change handler
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
        setNewReview((prev) => ({ ...prev, image: e.target.files![0] }));
        } else {
        setNewReview((prev) => ({ ...prev, image: null }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-3xl font-semibold"
                    >
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4">Leave a Review</h2>

            <form onSubmit={onSubmit} className="space-y-4">
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
                    <option value="" disabled>
                        Select rating
                    </option>
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
                    />
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
    );
}
