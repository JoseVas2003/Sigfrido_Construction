"use client";

import React, { CSSProperties } from 'react';

export default function ContactPage() {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Add form submission logic here
    };

    return (
        <div style={styles.container}>
            <div style={styles.splitContainer}>
                {/* Text Section */}
                <div style={styles.textSection}>
                    <p>Schedule a call to speak with us if you have additional questions or 
                        need assistance regarding jobs or projects, and we’ll call you at your chosen time.</p>
                    
                    <h2>ADDRESS</h2>
                    <p style={styles.centeredText}>Example Street</p>
                    <p style={styles.centeredText}>Salinas, CA 99999</p>
                    
                    <h2>CALL US TODAY!</h2>
                    <p style={styles.centeredText}>XXX-XXX-XXXX</p>
                    
                    <p>For all other inquiries, please complete and submit the form.</p>
                </div>

                {/* Form Section */}
                <div style={styles.formSection}>
                    <h1>Contact Us</h1>
                    <form id="contactForm" onSubmit={handleSubmit}>
                        <div style={styles.nameGroup}>
                            <div style={styles.formField}>
                                <label htmlFor="first-name">First Name:</label>
                                <input type="text" id="first-name" name="first-name" required style={styles.inputField} />
                            </div>
                            
                            <div style={styles.formField}>
                                <label htmlFor="last-name">Last Name:</label>
                                <input type="text" id="last-name" name="last-name" required style={styles.inputField} />
                            </div>
                        </div>

                        <div style={styles.contactGroup}>
                            <div style={styles.formField}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required style={styles.inputField} />
                            </div>

                            <div style={styles.formField}>
                                <label htmlFor="phone">Phone Number:</label>
                                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required placeholder="123-456-7890" style={styles.inputField} />
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" required style={styles.textArea}></textarea>
                        </div>

                        <button type="submit" style={styles.button}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBECE5',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#000',
    },
    splitContainer: {
        display: 'flex',
        gap: '20px',
        maxWidth: '900px',
        width: '100%',
    },
    textSection: {
        flex: 1,
        backgroundColor: '#5a5a5a',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    formSection: {
        flex: 1,
        backgroundColor: '#EBECE5',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    centeredText: {
        textAlign: 'center',
    },
    nameGroup: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px',
    },
    contactGroup: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px',
    },
    formField: {
        flex: 1,
    },
    inputField: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    textArea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        resize: 'vertical',
    },
    button: {
        padding: '10px',
        backgroundColor: '#5a5a5a',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};
