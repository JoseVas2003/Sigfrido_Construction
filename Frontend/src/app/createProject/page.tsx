"use client";

import React, { CSSProperties, useState, useRef} from 'react';
import Navbar from '../navbar/navBar';
import galleryIcon from '../createProject/galleryIcon.png'
import Image from 'next/image';
import {clicksOut} from '../navbar/navBar'
import axios from "axios"
import {useRouter} from 'next/navigation';

export default function CreateProjectPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        timeTaken: '',
        cost: '',
        categories: [] as string[], 
        image: null as File | null,
    });
    const router = useRouter();

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
                maxLength = 100;
        }

        // If the length exceeds the character limit, then truncate and set error message
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
            router.push("/portfolio?message=" + encodeURIComponent("Project created successfully!"));
            //router.push('/portfolio');
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
                    <form style={styles.form} onSubmit={handleSubmit}>
                        {/* Project Name */}
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
        fontSize: '24px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '15px',
        border: '2px solid black',
        fontSize: '24px',
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
        fontSize: '24px',
        color: '#000'
    },
    checkboxGroup: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
        gap: '10px', 
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'normal',
        fontSize: '24px',
        width: '175px',
    },
    checkbox: {
        marginRight: '10px',
        marginLeft: '20px',
        width: '25px',
        height: '25px',
        alignItems: 'center',
        cursor: 'pointer',
    },
    label: {
        display: 'block',
        fontSize: '24px',
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
        fontSize: '24px',
        marginTop: '00px',
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