"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface AddProjectFormProps {
  onProjectAdded?: (project: any) => void;
  initialCustomerName?: string;
  initialEmail?: string;
}

export default function AddProjectForm({ onProjectAdded, initialCustomerName = "", initialEmail = "" }: AddProjectFormProps) {
  const [formData, setFormData] = useState({
    customerName: initialCustomerName,
    email: initialEmail,
    projectType: "",
    estimatedCost: "",
    expectedCompletion: "",
    quote: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If initial values change, update the form (optional)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      customerName: initialCustomerName,
      email: initialEmail,
    }));
  }, [initialCustomerName, initialEmail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, quote: e.target.files![0] }));
    } else {
      setFormData((prev) => ({ ...prev, quote: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("customerName", formData.customerName);
    data.append("email", formData.email);
    data.append("projectType", formData.projectType);
    data.append("estimatedCost", formData.estimatedCost);
    data.append("expectedCompletion", formData.expectedCompletion);
    if (formData.quote) {
      data.append("quote", formData.quote);
    }

    try {
      const response = await axios.post("http://localhost:3001/api/inProgressProjects", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onProjectAdded && onProjectAdded(response.data);
      // Clear the form
      setFormData({
        customerName: "",
        email: "",
        projectType: "",
        estimatedCost: "",
        expectedCompletion: "",
        quote: null,
      });
    } catch (err: any) {
      console.error("Error submitting project:", err);
      setError("Error submitting project.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="addProjectForm">
      <div className="formField">
        <label>Customer Name: *</label>
        <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label>Email: *</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </div>
      <div className="formField">
        <label>Project Type: *</label>
        <select name="projectType" value={formData.projectType} onChange={handleInputChange} required>
          <option value="" disabled>Select project type</option>
          <option value="ADU">ADU</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Floor">Floor</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Roof">Roof</option>
          <option value="Rooms">Rooms</option>
        </select>
      </div>
      <div className="formField">
        <label>Estimated Cost:</label>
        <input type="number" name="estimatedCost" value={formData.estimatedCost} onChange={handleInputChange} />
      </div>
      <div className="formField">
        <label>Expected Completion:</label>
        <input type="text" placeholder="mm/dd/yyyy" name="expectedCompletion" value={formData.expectedCompletion} onChange={handleInputChange} />
      </div>
      <div className="formField">
        <label>Quote (optional):</label>
        <input type="file" name="quote" onChange={handleFileChange} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Add Project"}</button>
    </form>
  );
}
