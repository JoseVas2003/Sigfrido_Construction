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

const getInProgressProjects = async (req, res) => {
    try {
      const projects = await InProgressProject.find(); // Fetch all projects
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const updateInProgressProject = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProject = await InProgressProject.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      return res.status(200).json(updatedProject);
    } catch (error) {
      return res.status(500).json({ message: "Error updating project", error: error.message });
    }
  };
  
  module.exports = {
    createInProgressProject,
    getInProgressProjects,
    updateInProgressProject,
// (Add additional functions for update, delete, etc. )
};
