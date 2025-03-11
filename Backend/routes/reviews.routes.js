const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
const {
  getReviews,
  createReview,
  getReviewImage,
  updateReview,
  deleteReview
} = require("../controllers/reviews.controllers.js");


router.get("/", getReviews);
router.get("/:id/image", getReviewImage);
router.post("/", upload.single("image"), createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
