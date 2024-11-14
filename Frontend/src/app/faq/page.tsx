"use client";

import React, { useState, CSSProperties, useRef } from 'react';
import Navbar from '../navbar/navBar';

export default function ContactPage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [panelHeights, setPanelHeights] = useState<number[]>([0, 0, 0]);
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
                    <button
                        className="accordion"
                        onClick={() => handleAccordionClick(0)}
                        style={styles.accordion}
                    >
                        How many days?
                    </button>
                    <div
                        ref={(el) => (panelRefs.current[0] = el)}
                        className="panel"
                        style={{
                            ...styles.panel,
                            maxHeight: activeIndex === 0 ? `${panelHeights[0]}px` : '0',
                        }}
                    >
                        <p>10 days.</p>
                    </div>

                    <button
                        className="accordion"
                        onClick={() => handleAccordionClick(1)}
                        style={styles.accordion}
                    >
                        How many months?
                    </button>
                    <div
                        ref={(el) => (panelRefs.current[1] = el)}
                        className="panel"
                        style={{
                            ...styles.panel,
                            maxHeight: activeIndex === 1 ? `${panelHeights[1]}px` : '0',
                        }}
                    >
                        <p>100 months.</p>
                    </div>

                    <button
                        className="accordion"
                        onClick={() => handleAccordionClick(2)}
                        style={styles.accordion}
                    >
                        How many years?
                    </button>
                    <div
                        ref={(el) => (panelRefs.current[2] = el)}
                        className="panel"
                        style={{
                            ...styles.panel,
                            maxHeight: activeIndex === 2 ? `${panelHeights[2]}px` : '0',
                        }}
                    >
                        <p>1000 years.</p>
                    </div>
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
};
