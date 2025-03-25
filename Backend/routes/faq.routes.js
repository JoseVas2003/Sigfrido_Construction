const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faq.controllers'); 

// Get all FAQ sections with their questions
router.get('/', faqController.getAllFaqs);

// Create a new FAQ section
router.post('/sections', faqController.createSection);

// Add a question to a section
router.post('/:sectionId/questions', faqController.addQuestionToSection);

// Update a question in a section
router.put('/:sectionId/questions/:questionId', faqController.updateQuestionInSection);

// Delete a section
router.delete('/sections/:sectionId', faqController.deleteSection);

// Delete a question from a section
router.delete('/:sectionId/questions/:questionId', faqController.deleteQuestionFromSection);

module.exports = router;
