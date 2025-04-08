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
  
      const updates = {
        name,
        description,
        timeTaken,
        cost,
        categories: Array.isArray(categories) ? categories : [categories],
      };
  
      // If new images are uploaded, we'll overwrite images in the DB
      if (req.files && req.files.length > 0) {
        updates.images = req.files.map(file => ({
          data: file.buffer,
          contentType: file.mimetype
        }));
      }
      // If no files are uploaded, do NOT overwrite the images array
      // That means we must NOT set updates.images at all if no new files 
      // are provided. The above if-check ensures that.
  
      const project = await Project.findByIdAndUpdate(id, updates, { new: true });
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
    getProjectImageByIndex,
  };