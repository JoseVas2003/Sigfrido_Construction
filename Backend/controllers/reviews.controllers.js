const Review = require("../models/reviews.model");


// Get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}); // Fetch all reviews
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new review
// const createReview = async (req, res) => {
//     console.log("Received review payload:", req.body);
//   try {
//     // Instead of relying on req.user, we now extract the user info from req.body.
//     const { name, email, title, content, stars, image } = req.body;

//     // Validate that the user information is present.
//     if (!name || !email) {
//       return res.status(400).json({ message: "Missing user information." });
//     }

//     // Create the review document using the forwarded user info and review data.
//     const newReview = new Review({
//       name,
//       email,
//       title,
//       content,
//       stars,
//       image,
//     });

//     await newReview.save();
//     return res.status(201).json(newReview);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };
// const createReview = async (req, res) => {
//   try {
//     console.log("File info:", req.file);
//     console.log("Body info:", req.body);

//     let reviewData = {
//       name: req.body.name,
//       email: req.body.email,
//       title: req.body.title,
//       content: req.body.content,
//       stars: req.body.stars
//     }
//     // const { name, email, title, content, stars } = req.body;
//     if (!name || !email || !title || !content || !stars) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // let reviewData = { name, email, title, content, stars };

//     if (req.file) {
//       reviewData.image = {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//       };
//     }

//     const newReview = await Review.create(reviewData);
//     return res.status(201).json(newReview);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
const createReview = async (req, res) => {
  try {
    console.log("File info:", req.file);
    console.log("Body info:", req.body);

    // Destructure the required fields from req.body
    const { name, email, title, content, stars } = req.body;

    if (!name || !email || !title || !content || !stars) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let reviewData = { name, email, title, content, stars };

    if (req.file) {
      reviewData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const newReview = await Review.create(reviewData);
    return res.status(201).json(newReview);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Retrieve review image
const getReviewImage = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review || !review.image || !review.image.data) {
      return res.status(404).send("No image found for this review");
    }

    res.set("Content-Type", review.image.contentType);
    res.send(review.image.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Update an existing review
const updateReview = async (req, res) => {
  try {
    // For update requests, we assume the Next.js API route has forwarded user info in the body.
    const { id } = req.params;
    const updatedData = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check authorization: compare the review's email to the forwarded user email.
    const userEmail = req.body.email; // forwarded from Next.js API route
    const userAdmin = req.body.admin; // forwarded flag (if available)
    const isOwner = review.email === userEmail;
    if (!isOwner && !userAdmin) {
      return res.status(403).json({ message: "Not authorized to update this review" });
    }

    const updatedReview = await Review.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(updatedReview);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    // Again, we assume that the Next.js API route forwarded user info in the request.
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check that the request is coming from the review owner or an admin.
    // const userEmail = req.body.email; // forwarded user email
    // const userAdmin = req.body.admin; // forwarded admin flag (if available)
    // const isOwner = review.email === userEmail;
    // if (!isOwner && !userAdmin) {
    //   return res.status(403).json({ message: "Not authorized to delete this review" });
    // }

    await Review.findByIdAndDelete(id);
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReviews,
  createReview,
  getReviewImage,
  updateReview,
  deleteReview,
};

