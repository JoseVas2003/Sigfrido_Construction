"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import '../Assets/css/adminProjects.modules.css'; 

interface Project {
  _id: string;
  customerName: string;
  email: string;
  projectType: string;
  estimatedCost?: number;
  expectedCompletion?: string;
  dateStarted?: string;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [updatedProject, setUpdatedProject] = useState<Partial<Project>>({});

  useEffect(() => {
    fetchProjects();
  }, []);

  //  Fetch Projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>("http://localhost:3001/api/inProgressProjects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  //  Enable Edit Mode
  const handleEdit = (project: Project) => {
    setEditing(project._id);
    setUpdatedProject({ ...project });
  };

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedProject((prev) => ({ ...prev, [name]: value }));
  };

  //  Save Updated Project to Backend
  const handleSave = async (id: string) => {
    try {
      await axios.put(`http://localhost:3001/api/inProgressProjects/${id}`, updatedProject);
      fetchProjects();
      setEditing(null);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">🚧 In Progress Projects</h1>
      <div className="admin-projects-list">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div className="admin-card" key={project._id}>
              <div className="admin-card-header">
                <strong>{project.customerName}</strong>
              </div>
              <div className="admin-card-body">
                <p>
                  <strong>Email:</strong>{" "}
                  {editing === project._id ? (
                    <input type="email" name="email" value={updatedProject.email || ""} onChange={handleChange} className="admin-input"/>
                  ) : (
                    project.email
                  )}
                </p>
                <p>
                  <strong>Project Type:</strong>{" "}
                  {editing === project._id ? (
                    <select name="projectType" value={updatedProject.projectType || ""} onChange={handleChange} className="admin-input">
                      <option value="ADU">ADU</option>
                      <option value="Bathroom">Bathroom</option>
                      <option value="Floor">Floor</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Roof">Roof</option>
                      <option value="Rooms">Rooms</option>
                    </select>
                  ) : (
                    project.projectType
                  )}
                </p>
                <p>
                  <strong>Estimated Cost:</strong>{" "}
                  {editing === project._id ? (
                    <input type="number" name="estimatedCost" value={updatedProject.estimatedCost || ""} onChange={handleChange} className="admin-input"/>
                  ) : (
                    `$${project.estimatedCost}`
                  )}
                </p>
                <p>
                  <strong>Expected Completion:</strong>{" "}
                  {editing === project._id ? (
                    <input type="date" name="expectedCompletion" value={updatedProject.expectedCompletion || ""} onChange={handleChange} className="admin-input"/>
                  ) : (
                    project.expectedCompletion ? new Date(project.expectedCompletion).toLocaleDateString() : "N/A"
                  )}
                </p>
              </div>
              <div className="admin-card-footer">
                {editing === project._id ? (
                  <button className="admin-saveButton admin-button" onClick={() => handleSave(project._id)}>Save</button>
                ) : (
                  <button className="admin-editButton admin-button" onClick={() => handleEdit(project)}>Edit</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-projects">No projects available</p>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
