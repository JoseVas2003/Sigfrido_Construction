const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const SectionSchema = new mongoose.Schema({
    section: { type: String, required: true },
    questions: [QuestionSchema]
});

const Faq = mongoose.model('Faq', SectionSchema);
module.exports = Faq;
