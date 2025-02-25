"use client";

import { useSession } from 'next-auth/react';
import { ChangeEvent, CSSProperties, useRef, useState } from 'react';
import Navbar from '../navbar/navBar';

export default function ContactPage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [panelHeights, setPanelHeights] = useState<number[]>([0, 0, 0]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([
        { question: 'How many days?', answer: '10 days.' },
        { question: 'How many months?', answer: '100 months.' },
        { question: 'How many years?', answer: '1000 years.' },
    ]);
    const [imageSrc, setImageSrc] = useState<string>("https://www.souderbrothersconstruction.com/blog/wp-content/uploads/2019/03/iStock-1316374976-825x510.jpg");

    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleAccordionClick = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

    const handleEditToggle = () => {
        setIsEditing(prev => !prev);
    };

    const handleChange = (index: number, field: 'question' | 'answer', value: string) => {
        setQuestionsAndAnswers(prev => {
            const newQuestions = [...prev];
            newQuestions[index] = { ...newQuestions[index], [field]: value };
            return newQuestions;
        });
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImageSrc(imageURL);
        }
    };

    const {data: session, status} = useSession();

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <Navbar />
            </div>

            {/* Title Section */}
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>Frequently Asked Questions</h1>
                
                {/* Image Section with Editable Option */}
                <div style={styles.imageContainer}>
                    <img src={imageSrc} alt="FAQ Illustration" style={styles.image} />
                    {isEditing && (
                        <input type="file" accept="image/*" onChange={handleImageChange} style={styles.fileInput} />
                    )}
                </div>
            </div>
            
            <div style={styles.contentWrapper}>
                {/* Accordion Section */}
                <div style={styles.accordionContainer}>
                    {questionsAndAnswers.map((qa, index) => (
                        <div key={index}>
                            <button className="accordion" onClick={() => handleAccordionClick(index)} style={styles.accordion}>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        value={qa.question} 
                                        onChange={(e) => handleChange(index, 'question', e.target.value)} 
                                        style={styles.input} 
                                    />
                                ) : (
                                    qa.question
                                )}
                            </button>
                            <div className="panel" style={{ ...styles.panel, maxHeight: activeIndex === index ? '100px' : '0' }}>
                                {isEditing ? (
                                    <textarea 
                                        value={qa.answer} 
                                        onChange={(e) => handleChange(index, 'answer', e.target.value)} 
                                        style={styles.textarea}
                                    />
                                ) : (
                                    <p>{qa.answer}</p>
                                )}
                            </div>

                            {isEditing && (
                                <button onClick={() => removeQuestion(index)} style={styles.removeButton}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    {isEditing && (
                        <button onClick={addQuestion} style={styles.addButton}>
                            Add Question
                        </button>
                    )}
                    {session?.user?.admin? ( <button onClick={handleEditToggle} style={styles.editButton}>
                        {isEditing ? 'Save' : 'Edit'}
                    </button> ):(<div> </div>)}
                    
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#EBECE5',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        color: '#000',
    },
    headerContainer: {
        width: '100%',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    titleContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#57bcd3',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '22px',
        fontWeight: 'bold',
        margin: 0,
        color: '#fff',
        flex: '1',
    },
    imageContainer: {
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    fileInput: {
        marginTop: '10px',
    },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '1200px',
        padding: '20px',
    },
    accordionContainer: {
        flex: '2',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        borderRadius: '8px',
    },
    accordion: {
        backgroundColor: '#eee',
        color: '#444',
        cursor: 'pointer',
        padding: '18px',
        width: '100%',
        border: 'none',
        textAlign: 'left',
        fontSize: '15px',
        margin: '5px 0',
    },
    panel: {
        padding: '0 18px',
        backgroundColor: 'white',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-out',
    },
    editButton: {
        backgroundColor: '#57bcd3',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

