"use client";

import React, {CSSProperties, useState, useEffect, useRef} from 'react';
import Navbar from '@/app/navbar/navBar';
import galleryIcon from '@/app/createProject/galleryIcon.png'
import Image from 'next/image';
import {clicksOut} from '@/app/navbar/navBar'; 
import axios from 'axios';
import {useRouter,useParams} from 'next/navigation';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams(); 
  const {id} = params;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    timeTaken: '',
    cost: '',
    categories: [] as string[],
    image: null as File | null,
  });

  const [projectNameError, setProjectNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [timeTakenError, setTimeTakenError] = useState("");
  const [costError, setCostError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [imageError, setImageError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:3001/api/projects/${id}`)
      .then((response) => {
        const project = response.data;
        setFormData((prev) => ({
          ...prev,
          name: project.name || '',
          description: project.description || '',
          timeTaken: project.timeTaken || '',
          cost: project.cost || '',
          categories: project.categories || [],
        }));
      })
      .catch((error) => {
        console.error('Error fetching project for edit:', error);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
        let inputValue = value;
        let maxLength = 0;
        let setError: React.Dispatch<React.SetStateAction<string>> | null = null;

        switch (name) {
            case 'name':
              maxLength = 30;
              setError = setProjectNameError;
              break;
            case 'timeTaken':
              maxLength = 15; 
              setError = setTimeTakenError;
              break;
            case 'cost':
              maxLength = 15; 
              setError = setCostError;
              break;
            case 'description':
              maxLength = 100;
              setError = setDescriptionError;
              break;
            default:
              maxLength = 100; // fallback
          }

        // If input length exceeds the custom limit, truncate and set error message
        if (value.length > maxLength) {
            inputValue = value.substring(0, maxLength);
            setError?.(`${maxLength} character max limit reached`);
        } else {
            // Clear the error if within limit
            setError?.("");
        }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      let updatedCategories;
      if (checked) {
        updatedCategories = [...prevFormData.categories, value];
      } else {
        updatedCategories = prevFormData.categories.filter((cat) => cat !== value);
      }
      if (updatedCategories.length > 0) setCategoriesError("");
      return {
        ...prevFormData,
        categories: updatedCategories,
      };
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageError("");
      const validTypes = ["image/heic", "image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        setImageError("Only HEIC, PNG and JPEG images are allowed.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setImageError("Image must be less than 10MB.");
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
      }));
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    if (!formData.name.trim()) {
      setProjectNameError("Project Name cannot be empty.");
      valid = false;
    }
    if (!formData.description.trim()) {
      setDescriptionError("Description cannot be empty.");
      valid = false;
    }
    if (!formData.timeTaken.trim()) {
      setTimeTakenError("Time Taken cannot be empty.");
      valid = false;
    }
    if (!formData.cost.trim()) {
      setCostError("Cost cannot be empty.");
      valid = false;
    }
    if (formData.categories.length === 0) {
      setCategoriesError("Please select at least one project category.");
      valid = false;
    }

    // If a new image is provided, validate it. If not, we can keep existing one.
    if (formData.image) {
      const validTypes = ["image/heic", "image/png", "image/jpeg"];
      if (!validTypes.includes(formData.image.type)) {
        setImageError("Only HEIC, PNG and JPEG images are allowed.");
        valid = false;
      }
      if (formData.image.size > 10 * 1024 * 1024) {
        setImageError("Image must be less than 10MB.");
        valid = false;
      }
    }
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("timeTaken", formData.timeTaken);
      data.append("cost", formData.cost);
      formData.categories.forEach((cat) => data.append("categories", cat));

      if (formData.image) {
        data.append("image", formData.image);
      }

      // send PUT to update
      const response = await axios.put(`http://localhost:3001/api/projects/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/portfolio?message=" + encodeURIComponent("Project updated successfully!"));

    } catch (error: any) {
      console.error('Error updating project:', error?.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      {/* Header Bar */}
      <div style={styles.Navbar}>
        <Navbar />
      </div>
      <div onClick={() => { clicksOut(); }}>
        {/* Form Container */}
        <div style={styles.formContainer}>
          <form style={styles.form} onSubmit={handleSubmit}>            
            {/* Project Name */}
            <div style={styles.inputGroup}>
              <label htmlFor='name'>Project Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                style={{
                  ...styles.input,
                  border: projectNameError ? '3px solid red' : '2px solid black',
                }}
                value={formData.name}
                onChange={handleChange}
              />
              {projectNameError && (
                <p style={styles.errorText}>{projectNameError}</p>
              )}
            </div>

            {/* Description */}
            <div style={styles.inputGroup}>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                style={{
                  ...styles.textarea,
                  border: descriptionError ? '3px solid red' : '2px solid black'
                }}
                value={formData.description}
                onChange={handleChange}
              />
              {descriptionError && (
                <p style={styles.errorText}>{descriptionError}</p>
              )}
            </div>

            {/* Time and Cost */}
            <div style={styles.row}>
              <div style={styles.halfInputGroup}>
                <label htmlFor='timeTaken'>Time Taken:</label>
                <input
                  type="text"
                  id="timeTaken"
                  name="timeTaken"
                  style={{
                    ...styles.input,
                    border: timeTakenError ? '3px solid red' : '2px solid black',
                  }}
                  value={formData.timeTaken}
                  onChange={handleChange}
                />
                {timeTakenError && (
                  <p style={styles.errorText}>{timeTakenError}</p>
                )}
              </div>
              <div style={styles.halfInputGroup}>
                <label htmlFor='cost'>Cost:</label>
                <input
                  type="text"
                  id="cost"
                  name="cost"
                  style={{
                    ...styles.input,
                    border: costError ? '3px solid red' : '2px solid black',
                  }}
                  value={formData.cost}
                  onChange={handleChange}
                />
                {costError && (
                  <p style={styles.errorText}>{costError}</p>
                )}
              </div>
            </div>

            {/* Categories and Image Upload */}
            <div style={styles.row}>
              {/* Categories */}
              <div style={styles.halfInputGroup}>
                <label style={styles.label}>Project Category:</label>
                <div style={styles.checkboxGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="category"
                      value="ADU"
                      checked={formData.categories.includes('ADU')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    ADU
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="category"
                      value="Bathrooms"
                      checked={formData.categories.includes('Bathrooms')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    Bathrooms
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="category"
                      value="Floors"
                      checked={formData.categories.includes('Floors')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    Floors
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="category"
                      value="Kitchen"
                      checked={formData.categories.includes('Kitchen')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    Kitchen
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="category"
                      value="Roofs"
                      checked={formData.categories.includes('Roofs')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    Roofs
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="category"
                      value="Rooms"
                      checked={formData.categories.includes('Rooms')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    Rooms
                  </label>
                </div>
                {categoriesError && (
                  <p style={styles.errorText}>{categoriesError}</p>
                )}
              </div>

              {/* Image Upload */}
              <div style={styles.halfInputGroup}>
                <label style={styles.label}>Change Image (optional):</label>           
                <div style={styles.imageContainer}>
                  <Image
                    src={galleryIcon}
                    alt="Gallery Icon"
                    className='companyLogo'
                    width={80}
                    height={80}
                    onClick={handleImageClick}
                    style={{ cursor: 'pointer' }}
                  />
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".heic,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>
                {imageError && (
                  <p style={styles.errorText}>{imageError}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button type="submit" style={styles.button}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {    
  Navbar: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  formContainer: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
    zIndex: 1,
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '1500px',
    width: '100%',
    border: '2px solid black',
  },
  inputGroup: {
    marginBottom: '15px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    textAlign: 'center',
    fontSize: '32px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '15px',
    border: '2px solid black',
    fontSize: '36px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '15px',
    border: '2px solid black',
    minHeight: '100px',
    fontSize: '24px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '15px',
    border: '2px solid black',
    backgroundColor: '#4FB6CE',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '32px',
    color: '#000'
  },
  checkboxGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'normal',
    fontSize: '36px',
  },
  checkbox: {
    marginRight: '10px',
    marginLeft: '20px',
    width: '30px',
    height: '30px',
    alignItems: 'center',

  },
  label: {
    display: 'block',
    fontSize: '32px',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  halfInputGroup: {
    width: '48%',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    textAlign: 'center',
    fontSize: '32px',
    marginTop: '30px',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: '20px',
    marginTop: '5px',
    textAlign: 'center',
  },
};