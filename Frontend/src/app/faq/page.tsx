"use client";

import React, { useState, CSSProperties, useRef, DragEvent } from 'react';
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

    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleAccordionClick = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

    const updatePanelHeight = (index: number) => {
        if (panelRefs.current[index]) {
            setPanelHeights(prevHeights => {
                const newHeights = [...prevHeights];
                newHeights[index] = panelRefs.current[index]!.scrollHeight;
                return newHeights;
            });
        }
    };

    React.useEffect(() => {
        if (activeIndex !== null) {
            updatePanelHeight(activeIndex);
        }
    }, [activeIndex]);

    const handleEditToggle = () => {
        setIsEditing(prev => !prev);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleChange = (index: number, field: 'question' | 'answer', value: string) => {
        setQuestionsAndAnswers(prev => {
            const newQuestions = [...prev];
            newQuestions[index] = { ...newQuestions[index], [field]: value };
            return newQuestions;
        });
    };

    const handleDragStart = (index: number, event: DragEvent) => {
        event.dataTransfer.setData("index", index.toString());
    };

    const handleDrop = (index: number, event: DragEvent) => {
        const fromIndex = Number(event.dataTransfer.getData("index"));
        if (fromIndex !== index) {
            const newQuestions = [...questionsAndAnswers];
            const movedItem = newQuestions[fromIndex];
            newQuestions.splice(fromIndex, 1);
            newQuestions.splice(index, 0, movedItem);
            setQuestionsAndAnswers(newQuestions);
        }
    };

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    const addQuestion = () => {
        setQuestionsAndAnswers(prev => [
            ...prev,
            { question: 'New question?', answer: 'New answer.' }
        ]);
    };

    const removeQuestion = (index: number) => {
        setQuestionsAndAnswers(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <div style={styles.headerContainer}>
                <Navbar />
            </div>

            {/* Title Section */}
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>Frequently Asked Questions</h1>
                <div style={styles.imageContainer}>
                    <img 
                        src="https://www.souderbrothersconstruction.com/blog/wp-content/uploads/2019/03/iStock-1316374976-825x510.jpg" 
                        alt="Construction"
                        style={styles.image}
                    />
                </div>
            </div>
            
            <div style={styles.contentWrapper}>
                {/* Accordion Section */}
                <div style={styles.accordionContainer}>
                    {questionsAndAnswers.map((qa, index) => (
                        <div 
                            key={index} 
                            draggable={isEditing}
                            onDragStart={(e) => handleDragStart(index, e)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(index, e)}
                        >
                            <button
                                className="accordion"
                                onClick={() => handleAccordionClick(index)}
                                style={styles.accordion}
                            >
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
                            <div
                                ref={(el) => (panelRefs.current[index] = el)}
                                className="panel"
                                style={{
                                    ...styles.panel,
                                    maxHeight: activeIndex === index ? `${panelHeights[index]}px` : '0',
                                }}
                            >
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

                            {/* Remove Question Button */}
                            {isEditing && (
                                <button 
                                    onClick={() => removeQuestion(index)} 
                                    style={styles.removeButton}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Add Question Button */}
                    {isEditing && (
                        <button 
                            onClick={addQuestion} 
                            style={styles.addButton}
                        >
                            Add Question
                        </button>
                    )}

                    {/* Toggle Edit/Save Button */}
                    <button 
                        onClick={handleEditToggle} 
                        style={styles.editButton}
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
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
        width: '250px', // Adjust the width as needed
        marginLeft: '20px', // Adds some space between the title and the image
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
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
        outline: 'none',
        fontSize: '15px',
        margin: '5px 0',
        transition: '0.4s',
    },
    panel: {
        padding: '0 18px',
        backgroundColor: 'white',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-out',
    },
    input: {
        width: '100%',
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        width: '100%',
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minHeight: '50px',
    },
    editButton: {
        backgroundColor: '#57bcd3',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    addButton: {
        backgroundColor: '#57bcd3',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    removeButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};
