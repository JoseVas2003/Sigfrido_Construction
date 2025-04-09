const mongoose = require("mongoose");

const faqItemSchema = new mongoose.Schema({
    type: { type: String, enum: ['title', 'qa'], required: true },
    text: String,      // For titles
    question: String,  // For QA
    answer: String,    // For QA
}, { timestamps: true });

const FaqItem = mongoose.model("faq", faqItemSchema);
module.exports = FaqItem;
