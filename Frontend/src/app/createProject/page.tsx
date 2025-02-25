"use client";

import React, { CSSProperties, useState, useRef} from 'react';
import Navbar from '../navbar/navBar';
import galleryIcon from '../createProject/galleryIcon.png'
import Image from 'next/image';
import {clicksOut} from '../navbar/navBar'
import axios from "axios"


export default function CreateProjectPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        timeTaken: '',
        cost: '',
        categories: [] as string[], 
        image: null as File | null,
    });


  // Ref for hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle text changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    };

    // Handle multiple checkboxes
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prevFormData) => {
            // If checked, add category
            if (checked) {
            return {
                ...prevFormData,
                categories: [...prevFormData.categories, value],
            };
            } 
            // If unchecked, remove category
            else {
            return {
                ...prevFormData,
                categories: prevFormData.categories.filter((cat) => cat !== value),
            };
            }
        });
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };

    
  // Handle file selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type or trust 'accept' attribute
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
      }));
    }
  };


    // Submitting form using Axios
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

        const response = await axios.post(
            'http://localhost:3001/api/projects', data);
        console.log('Response from server:', response.data);
        alert('Project created successfully!');
    }catch (error: any) {
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
                    <form style={styles.form} onSubmit={handleSubmit}>
                        {/* Project Name */}
                        <div style={styles.inputGroup}>
                            <label htmlFor='name'>Project Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                style={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Description Section */}
                        <div style={styles.inputGroup}>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                style={styles.textarea}
                                value={formData.description}
                                onChange={handleChange}
                            />                    
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
                                    style={styles.input}
                                    value={formData.timeTaken}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Cost Section */}
                            <div style={styles.halfInputGroup}>
                                <label htmlFor='cost'>Cost:</label>
                                <input
                                    type="text"
                                    id="cost"
                                    name="cost"
                                    style={styles.input}
                                    value={formData.cost}
                                    onChange={handleChange}
                                />
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
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button type="submit" style={styles.button}>
                            Create Project
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
};