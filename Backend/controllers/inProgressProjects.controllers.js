const InProgressProject = require("../models/inProgressProject.model");

const createInProgressProject = async (req, res) => {
try {
    const { customerName, email, projectType, estimatedCost, expectedCompletion } = req.body;
    
    // Validate required fields
    if (!customerName || !email || !projectType) {
        return res.status(400).json({ message: "Missing required fields: customerName, email, and projectType are required." });
    }
    
    const projectData = {
        customerName,
        email,
        projectType,
        estimatedCost,
        expectedCompletion,
        dateStarted: new Date(), // default to today's date
    };

    // If a quote file was uploaded, attach it
    if (req.file) {
        projectData.quote = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };
    }

    const project = await InProgressProject.create(projectData);
    return res.status(201).json(project);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
createInProgressProject,
// (Add additional functions for update, delete, etc. )
};
