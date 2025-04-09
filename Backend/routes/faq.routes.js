const express = require("express");
const router = express.Router();

const {
    getAllFaqItems,
    saveFaqItems,
} = require("../controllers/faq.controllers");

router.get("/", getAllFaqItems);
router.post("/", saveFaqItems);

module.exports = router;
