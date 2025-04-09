const Project= require('../models/projects.model');

const getProjectImageByIndex = async (req, res) => {
  try {
    const { id, imageIndex } = req.params;
    const project = await Project.findById(id);
    if (!project || !project.images || project.images.length === 0) {
      return res.status(404).send("No images found for this project");
    }

    // Convert imageIndex to a number
    const idx = parseInt(imageIndex, 10);
    if (idx < 0 || idx >= project.images.length) {
      return res.status(404).send("Image index out of range");
    }

    const image = project.images[idx];
    res.set("Content-Type", image.contentType);
    res.send(image.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

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

  const createProject = async (req, res) => {
    try {
      // Body data
      const { name, description, timeTaken, cost, categories } = req.body;
  
      const newProjectData = {
        name,
        description,
        timeTaken,
        cost,
        categories: Array.isArray(categories) ? categories : [categories],
        images: [],
      };
  
      // If files were uploaded, attach them
      // req.files is an array of up to 5 images
      if (req.files && req.files.length > 0) {
        newProjectData.images = req.files.map(file => ({
          data: file.buffer,
          contentType: file.mimetype,
        }));
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
      const { name, description, timeTaken, cost, categories } = req.body;
      
      // Fetch the existing project
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Update basic fields and categories
      project.name = name;
      project.description = description;
      project.timeTaken = timeTaken;
      project.cost = cost;
      project.categories = Array.isArray(categories) ? categories : [categories];
      
      // For each of the 5 image slots, update only if there is a new file.
      for (let i = 0; i < 5; i++) {
        const fieldName = `image_${i}`;
        if (req.files && req.files[fieldName] && req.files[fieldName].length > 0) {
          project.images[i] = {
            data: req.files[fieldName][0].buffer,
            contentType: req.files[fieldName][0].mimetype,
          };
        }
        // If no new file for slot i is provided, retain project.images[i] (even if it might be undefined)
      }
      
      await project.save();
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
  
  const deleteProjectImage = async (req, res) => {
    try {
      const { id, imageIndex } = req.params;
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      const index = parseInt(imageIndex, 10);
      if (isNaN(index) || index < 0 || index >= project.images.length) {
        return res.status(400).json({ message: "Invalid image index" });
      }
      project.images.splice(index, 1); // remove the selected image
      await project.save();
      res.status(200).json({ message: "Image deleted successfully" });
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
    getProjectImageByIndex,
    deleteProjectImage,
  };