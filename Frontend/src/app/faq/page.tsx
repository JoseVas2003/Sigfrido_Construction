"use client";

import { useSession } from 'next-auth/react';
import { CSSProperties, ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navBar';

export default function faqPage() {
    const [activeIndex, setActiveIndex] = useState<{ [key: number]: number | null }>({});
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [sections, setSections] = useState([]);
    const [imageSrc, setImageSrc] = useState<string>("https://t4.ftcdn.net/jpg/02/31/09/95/360_F_231099575_lZ0t1s4lR3YtrQbeEqUPDqiW0UsQNKcy.jpg");

    const { data: session, status } = useSession();
    const [language, setLanguage] = useState<'en' | 'es'>('en');

    const translations = {
        en: {
            title: 'Frequently Asked Questions',
            removeSection: 'Remove Section',
            addSection: 'Add Section',
            removeQuestion: 'Remove Question',
            addQuestion: 'Add Question',
            edit: 'Edit',
            save: 'Save',
            contactUsText: "Don't see your question answered here? Feel free to ",
            contactLinkText: 'contact us here',
            editTipsTitle: 'Edit Tips',
            editTip1: 'Click on a question or answer to edit.',
            editTip2: 'Click the "Save" button to save changes.',
            editTip3: 'You can add, remove, and change sections and questions.',
        },
        es: {
            title: 'Preguntas Frecuentes',
            removeSection: 'Eliminar Sección',
            addSection: 'Añadir Sección',
            removeQuestion: 'Eliminar Pregunta',
            addQuestion: 'Añadir Pregunta',
            edit: 'Editar',
            save: 'Guardar',
            contactUsText: '¿No ves tu pregunta respondida aquí? No dudes en ',
            contactLinkText: 'contactarnos aquí',
            editTipsTitle: 'Consejos de Edición',
            editTip1: 'Haz clic en una pregunta o respuesta para editar.',
            editTip2: 'Haz clic en el botón "Guardar" para guardar los cambios.',
            editTip3: 'Puedes añadir, eliminar y cambiar secciones y preguntas. ',
        },
    };

    useEffect(() => {
        // Fetch the FAQ data from the backend on component mount
        const fetchFaqData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/faq');
                setSections(response.data);
            } catch (error) {
                console.error('Error fetching FAQ data', error);
            }
        };
        fetchFaqData();
    }, []);

    const handleAccordionClick = (sectionIndex: number, index: number) => {
        setActiveIndex(prev => ({
            ...prev,
            [sectionIndex]: prev[sectionIndex] === index ? null : index,
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(prev => !prev);
    };

    const handleChange = (sectionIndex: number, index: number, field: 'question' | 'answer', value: string) => {
        setSections(prev => {
            const updatedSections = [...prev];
            updatedSections[sectionIndex].question[index] = {
                ...updatedSections[sectionIndex].questions[index],
                [field]: value,
            };
            return updatedSections;
        });
    };

    const handleSectionTitleChange = (index: number, newTitle: string) => {
        setSections(prev => {
            const updatedSections = [...prev];
            updatedSections[index].sectionTitleContainer = newTitle;
            return updatedSections;
        });
    };

    const addSection = async () => {
        try {
            const newSection = { section: 'New Section', questions: [{ question: 'New question?', answer: 'New answer.' }] };
            const response = await axios.post('http://localhost:3001/api/faq/sections', newSection);
            setSections(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Error adding section', error);
        }
    };

    const removeSection = async (index: number) => {
        try {
            const sectionId = sections[index]._id; // Assuming each section has an _id
            await axios.delete(`http://localhost:3001/api/faq/sections/${sectionId}`);
            setSections(prev => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error removing section', error);
        }
    };

    const addQuestion = async (sectionIndex: number) => {
        try {
            const newQuestion = { question: 'New question?', answer: 'New answer.' };
            const sectionId = sections[sectionIndex]._id;
            const response = await axios.post(`http://localhost:3001/api/faq/${sectionId}/questions`, newQuestion);
            setSections(prev => {
                const updatedSections = [...prev];
                updatedSections[sectionIndex].questions.push(response.data);
                return updatedSections;
            });
        } catch (error) {
            console.error('Error adding question', error);
        }
    };

    const removeQuestion = async (sectionIndex: number, index: number) => {
        try {
            const sectionId = sections[sectionIndex]._id;
            const questionId = sections[sectionIndex].questions[index]._id;
            await axios.delete(`http://localhost:3001/api/faq/${sectionId}/questions/${questionId}`);
            setSections(prev => {
                const updatedSections = [...prev];
                updatedSections[sectionIndex].questions = updatedSections[sectionIndex].questions.filter(
                    (_, i) => i !== index
                );
                return updatedSections;
            });
        } catch (error) {
            console.error('Error removing question', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const updateData = sections.map(section => ({
                section: section.section,
                questions: section.questions.map(qa => ({
                    question: qa.question,
                    answer: qa.answer,
                })),
            }));
            await axios.put('http://localhost:3001/api/faq', updateData);
        } catch (error) {
            console.error('Error saving changes', error);
        }
    };

    const handleImageUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        setImageSrc(event.target.value);
    };

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'en' ? 'es' : 'en'));
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <Navbar />
            </div>

            {/* Title Section */}
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>{translations[language].title}</h1>
                
                {/* Image Section with Editable Option */}
                <div style={styles.imageContainer}>
                    <img src={imageSrc} alt="FAQ Illustration" style={styles.image} />
                    {isEditing && (
                        <input 
                        type="text" 
                        value={imageSrc} 
                        onChange={handleImageUrlChange} 
                        placeholder="Enter Image URL" 
                        style={styles.input}
                    />
                    )}
                </div>
            </div>
            
            <div style={styles.contentWrapper}>
                {/* Accordion Section */}
                <div style={styles.accordionContainer}>
                    {sections.map((section, sectionIndex) => (
                        <div 
                            key={sectionIndex} 
                            draggable={isEditing}
                            onDragStart={(e) => handleSectionDragStart(sectionIndex, e)}
                            onDragOver={handleSectionDragOver}
                            onDrop={(e) => handleSectionDrop(sectionIndex, e)}
                        >
                            {/* Section Title */}
                            <div style={styles.sectionTitleContainer}>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        value={section.title} 
                                        onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)} 
                                        style={styles.input} 
                                    />
                                ) : (
                                    <h2>{section.title}</h2>
                                )}

                                {/* Remove Section Button */}
                                {isEditing && (
                                    <button onClick={() => removeSection(sectionIndex)} style={styles.removeButton}>
                                        {translations[language].removeSection}
                                    </button>
                                )}
                            </div>

                            {/* Accordion for Questions in the Section */}
                            <div>
                                {section.questions.map((qa, index) => (
                                    <div key={index} draggable={isEditing}>
                                        <button
                                            className="accordion"
                                            onClick={() => handleAccordionClick(sectionIndex, index)} // Pass sectionIndex and index
                                            style={styles.accordion}
                                        >
                                            {isEditing ? (
                                                <input 
                                                    type="text" 
                                                    value={qa.question} 
                                                    onChange={(e) => handleChange(sectionIndex, index, 'question', e.target.value)} 
                                                    style={styles.input} 
                                                />
                                            ) : (
                                                qa.question
                                            )}
                                        </button>
                                        <div
                                            className="panel"
                                            style={{
                                                ...styles.panel,
                                                maxHeight: activeIndex[sectionIndex] === index ? '100px' : '0', // Use section-specific activeIndex
                                            }}
                                        >
                                            {isEditing ? (
                                                <textarea
                                                    value={qa.answer}
                                                    onChange={(e) => handleChange(sectionIndex, index, 'answer', e.target.value)}
                                                    style={styles.textarea}
                                                />
                                            ) : (
                                                <p>{qa.answer}</p>
                                            )}
                                        </div>

                                        {isEditing && (
                                            <button onClick={() => removeQuestion(sectionIndex, index)} style={styles.removeButton}>
                                                {translations[language].removeQuestion}
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {isEditing && (
                                    <button onClick={() => addQuestion(sectionIndex)} style={styles.addButton}>
                                        {translations[language].addQuestion}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {isEditing && (
                        <button onClick={addSection} style={styles.addButton}>
                            {translations[language].addSection}
                        </button>
                    )}
                </div>

                <div style={styles.saveContainer}>
                    <button onClick={handleEditToggle} style={styles.saveButton}>
                        {isEditing ? translations[language].save : translations[language].edit}
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
        fontWeight: 'bold',  // Title is now bold
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
    sectionTitleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        fontWeight: 'bold',  // Section titles are now bold
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
    removeButton: {
        backgroundColor: '#FE0000',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '5px',
    },
    addButton: {
        backgroundColor: '#50C878',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '5px',
        marginRight: '5px',
    },
    input: {
        padding: '5px',
        fontSize: '14px',
        width: '300px',
    },
    textarea: {
        padding: '5px',
        fontSize: '14px',
        width: '100%',
        minHeight: '80px',
    },
    contactUsContainer: {
        textAlign: 'center',
        marginTop: '40px',
        padding: '10px',
    },
    contactUsText: {
        fontSize: '16px',
    },
    contactLink: {
        color: '#57bcd3',
        textDecoration: 'none',
    },
    languageToggleContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    languageToggleButton: {
        backgroundColor: '#57bcd3',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};