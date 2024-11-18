"use client";

import React, { CSSProperties } from 'react';
import Navbar from '../navbar/navBar';
import galleryIcon from '../createProject/galleryIcon.png'
import Image from 'next/image';
import {clicksOut} from '../navbar/navBar'

export default function Portfolio() {
    const handleImageClick = () => {
        // Placeholder function; will add functionality in future
        console.log('Image icon clicked');
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
                            <label htmlFor='projectName'>Project Name:</label>
                            <input type="text" id="name" name="name" style={styles.input} />
                        </div>
                        {/* Description Section */}
                        <div style={styles.inputGroup}>
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" style={styles.textarea}></textarea>
                        </div>
                        {/* Time Taken & Cost Sections */}
                        {/* Time Taken Section */}
                        <div style={styles.row}>
                            <div style={styles.halfInputGroup}>
                                <label htmlFor='projectTime'>Time Taken:</label>
                                <input type="text" id="projectTime" name="projectTime" style={styles.input} />
                            </div>
                            {/* Cost Section */}
                            <div style={styles.halfInputGroup}>
                                <label htmlFor='projectCost'>Cost:</label>
                                <input type="text" id="projectCost" name="projectCost" style={styles.input} />
                            </div>
                        </div>
                        {/* Project Category & Add an Image Sections */}
                    <div style={styles.row}>
                        {/* Project Category Section */}
                        <div style={styles.halfInputGroup}>
                            <label style={styles.label}>Project Category:</label>
                            <div style={styles.checkboxGroup}>
                                <label style={styles.checkboxLabel}>
                                    <input type="checkbox" name="category" value="bath" style={styles.checkbox} />
                                    Bath
                                </label>
                                <label style={styles.checkboxLabel}>
                                    <input type="checkbox" name="category" value="money" style={styles.checkbox} />
                                    Housing
                                </label>
                                <label style={styles.checkboxLabel}>
                                    <input type="checkbox" name="category" value="house" style={styles.checkbox} />
                                    Kitchen
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
                            </div>                       
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
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        
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