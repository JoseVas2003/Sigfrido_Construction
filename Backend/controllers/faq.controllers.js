const Faq = require('../models/faq.model'); // Import FAQ model

// Get all FAQ sections with their questions
const getAllFaqs = async (req, res) => {
    try {
        const faqs = await Faq.find();
        res.json(faqs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new FAQ section
const createSection = async (req, res) => {
    try {
        const newSection = new Faq({ section: req.body.section, questions: [] });
        await newSection.save();
        res.status(201).json(newSection);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Add a question to a section
const addQuestionToSection = async (req, res) => {
    try {
        const section = await Faq.findById(req.params.sectionId);
        if (!section) return res.status(404).json({ message: 'Section not found' });

        section.questions.push({ question: req.body.question, answer: req.body.answer });
        await section.save();

        res.status(201).json(section);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a question in a section
const updateQuestionInSection = async (req, res) => {
    try {
        const section = await Faq.findById(req.params.sectionId);
        if (!section) return res.status(404).json({ message: 'Section not found' });

        const question = section.questions.id(req.params.questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        question.question = req.body.question || question.question;
        question.answer = req.body.answer || question.answer;

        await section.save();
        res.json(section);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a section
const deleteSection = async (req, res) => {
    try {
        await Faq.findByIdAndDelete(req.params.sectionId);
        res.json({ message: 'Section deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a question from a section
const deleteQuestionFromSection = async (req, res) => {
    try {
        const section = await Faq.findById(req.params.sectionId);
        if (!section) return res.status(404).json({ message: 'Section not found' });

        section.questions = section.questions.filter(q => q._id.toString() !== req.params.questionId);
        await section.save();

        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllFaqs,
    createSection,
    addQuestionToSection,
    updateQuestionInSection,
    deleteSection,
    deleteQuestionFromSection
};
