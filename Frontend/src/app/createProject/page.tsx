"use client";

import axios from "axios";
import Image from 'next/image';
import React, { CSSProperties } from 'react';
import galleryIcon from '../createProject/galleryIcon.png';
import Navbar, { clicksOut } from '../navbar/navBar';

export default function CreateProjectPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        timeTaken: '',
        cost: '',
        categories: [] as string[], 
        image: null as File | null,
    });

  // Error states for each field
  const [projectNameError, setProjectNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [timeTakenError, setTimeTakenError] = useState("");
  const [costError, setCostError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [imageError, setImageError] = useState("");

  // Ref for hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle text changes and clear errors on input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
        // Clear error when user starts typing
        if (name === "name") setProjectNameError("");
        if (name === "description") setDescriptionError("");
        if (name === "timeTaken") setTimeTakenError("");
        if (name === "cost") setCostError("");
    };

    // Handle multiple checkboxes
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prevFormData) => {
            let updatedCategories;
            if (checked) {
                updatedCategories = [...prevFormData.categories, value];
            } else {
                updatedCategories = prevFormData.categories.filter((cat) => cat !== value);
            }
            // Clear error if there is at least one category
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
        // Immediately check file type/size on selection
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

  // Validate the form fields before submitting
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
    if (!formData.image) {
      setImageError("Please upload an image.");
      valid = false;
    } else {
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

    // Submitting form using Axios
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

    try {
        // necessary since I am sending a reg file and text together
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("timeTaken", formData.timeTaken);
        data.append("cost", formData.cost);
        formData.categories.forEach((cat) => data.append("categories", cat));
        
        // Append file if it exists
        if (formData.image) {
            data.append("image", formData.image);
        }

        const response = await axios.post('http://localhost:3001/api/projects', data);
        console.log('Response from server:', response.data);
        alert('Project created successfully!');
    } catch (error: any) {
        console.error('Error response:', error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.message || error.message}`);
    }
};

    return (
        <div>
            {/* Header Bar */}
            <div style={styles.Navbar}>
                <Navbar />
            </div>
            <div onClick= {() => {clicksOut()}}>
                {/* White Box with Input Fields */}
                <div style={styles.formContainer}>
                    <form style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label htmlFor='name'>Project Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                style={{ ...styles.input, border: projectNameError ? '3px solid red' : '2px solid black',}}
                                value={formData.name}
                                onChange={handleChange}
                                onInput={() => setProjectNameError("")}
                            />
                            {projectNameError && (
                                <p style={styles.errorText}>{projectNameError}</p>
                            )}
                        </div>
                        {/* Description Section */}
                        <div style={styles.inputGroup}>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                style={{...styles.textarea, border: descriptionError ? '3px solid red' : '2px solid black'}}
                                value={formData.description}
                                onChange={handleChange}
                                onInput={() => setDescriptionError("")}
                            />
                            {descriptionError && (
                                <p style={styles.errorText}>{descriptionError}</p>
                            )}                    
                        </div>
                        {/* Time Taken & Cost Sections */}
                        {/* Time Taken Section */}
                        <div style={styles.row}>
                            <div style={styles.halfInputGroup}>
                                <label htmlFor='timeTaken'>Time Taken:</label>
                                <input
                                    type="text"
                                    id="timeTaken"
                                    name="timeTaken"
                                    style={{...styles.input,border: timeTakenError ? '3px solid red' : '2px solid black',}}                    
                                    value={formData.timeTaken}
                                    onChange={handleChange}
                                    onInput={() => setTimeTakenError("")}
                                />
                                {timeTakenError && (
                                    <p style={styles.errorText}>{timeTakenError}</p>
                                )}
                            </div>                            
                            {/* Cost Section */}
                            <div style={styles.halfInputGroup}>
                                <label htmlFor='cost'>Cost:</label>
                                <input
                                    type="text"
                                    id="cost"
                                    name="cost"
                                    style={{...styles.input,border: costError ? '3px solid red' : '2px solid black',}}
                                    value={formData.cost}
                                    onChange={handleChange}
                                    onInput={() => setCostError("")}
                                />
                                {costError && (
                                    <p style={styles.errorText}>{costError}</p>
                                )}
                            </div>
                        </div>
                    {/* Project Category & Add an Image Sections */}
                    <div style={styles.row}>
                        {/* Project Category Section */}
                        <div style={styles.halfInputGroup}>
                            <label style={styles.label}>Project Category:</label>
                            <div style={styles.checkboxGroup}>
                                <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="adu"
                                    checked={formData.categories.includes('adu')}
                                    onChange={handleCheckboxChange}
                                    style={styles.checkbox}
                                />
                                    ADU
                                </label>
                                <label style={styles.checkboxLabel}>
                                    <input
                                    type="checkbox"
                                    name="category"
                                    value="bathrooms"
                                    checked={formData.categories.includes('bathrooms')}
                                    onChange={handleCheckboxChange}
                                    style={styles.checkbox}
                                    />
                                    Bathrooms
                                </label>
                                <label style={styles.checkboxLabel}>
                                    <input
                                    type="checkbox"
                                    name="category"
                                    value="floors"
                                    checked={formData.categories.includes('floors')}
                                    onChange={handleCheckboxChange}
                                    style={styles.checkbox}
                                    />
                                    Floors
                                </label>
                                <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="kitchen"
                                    checked={formData.categories.includes('kitchen')}
                                    onChange={handleCheckboxChange}
                                    style={styles.checkbox}
                                />
                                    Kitchen
                                </label>
                                <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="roofs"
                                    checked={formData.categories.includes('roofs')}
                                    onChange={handleCheckboxChange}
                                    style={styles.checkbox}
                                />
                                    Roofs
                                </label>
                                <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="rooms"
                                    checked={formData.categories.includes('rooms')}
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
                        {/* Add an Image Section */}
                        <div style={styles.halfInputGroup}>
                            <label style={styles.label}>Add an Image:</label>
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
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button type="submit" style={styles.button}>Create Project</button>                
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
        left: 0, // Ensures the Navbar takes up the full width
        right: 0,
        zIndex: 1000, // High z-index to overlay content
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    formContainer: {
        marginTop: '100px', // Adjust to ensure it's below the navbar
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
        zIndex: 1,
    },
    form: {
        backgroundColor: '#ffffff', // White background
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
    imageUploadContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '200px',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: '#fafafa',
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