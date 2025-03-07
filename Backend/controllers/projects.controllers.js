const Project= require('../models/projects.model');

const getProjects = async (req, res) => {
    try {
      const projects = await Project.find({});
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getProject = async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getProjectImage = async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);
      if (!project || !project.image || !project.image.data) {
        return res.status(404).send("No image found for this project");
      }
      // Set the proper content type (e.g., image/png)
      res.set("Content-Type", project.image.contentType);
      res.send(project.image.data);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };

  const createProject = async (req, res) => {
    console.log("Received request to create a project:", req.body);
    try {
      console.log("File info:", req.file);
      console.log("Body info:", req.body);
  
      // Create an object for Project based on req.body 
      // and the image data for the file provided
      const newProjectData = {
        name: req.body.name,
        description: req.body.description,
        timeTaken: req.body.timeTaken,
        cost: req.body.cost,
        categories: req.body.categories || [],
      };
  
      // If a file was uploaded, attach it
      if (req.file) {
        newProjectData.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype
        };
      }
      const project = await Project.create(newProjectData);
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateProject = async (req, res) => {
    try {
      const { id } = req.params;

      let updates = {
        name: req.body.name,
        description: req.body.description,
        timeTaken: req.body.timeTaken,
        cost: req.body.cost,
        categories: req.body.categories || [],
      };
      
      if (req.file) {
        updates.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype
        };
      }

      const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteProject = async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findByIdAndDelete(id);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectImage,
  };