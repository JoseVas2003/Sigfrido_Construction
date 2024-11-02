"use client";

import React, { CSSProperties } from 'react';
import ProjectCard from './projectCard';
import fountainImage from '../portfolio/fountainExample.jpg';
import Navbar from '../navbar/navBar';


export default function Portfolio() {
    return (
        <div style={styles.container}>
            {/* Header Bar */}
            <Navbar/>
            {/* Header Container */}
            <div style={styles.headerContainer}>
                {/* Pencil Icon Button */}
                <div style={styles.iconSquare}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        stroke="#EBECE5"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>                
                </div>
                {/* Plus Icon Button */}
                <div style={styles.iconSquare}>
                    <span style={styles.plusSign}>+</span>
                </div>

                {/* Filter Dropdown */}
                <div style={styles.filterContainer}>
                    <label htmlFor="filter" style={styles.label}>Filter:</label>
                    <select id="filter" style={styles.dropdown}>
                        <option value="All">All</option>
                        <option value="Projects">Bath</option>
                        <option value="Articles">Housing</option>
                        <option value="Tutorials">Kitchen</option>
                    </select>
                </div> 
            </div>
                {/* Project Card */}
                <ProjectCard
                    title="Stone Mason Fountain"
                    description="This project is a stone mason fountain made."
                    category="Bath"
                    time="2 weeks"
                    cost="$600"
                    image={fountainImage}
                />
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {    
    container: {
        position: 'relative',
        backgroundColor: '#EBECE5', // Background color
        
      },
    headerContainer: {
        position: 'absolute',
        top: '100px',
        right: '10px',
        display: 'flex',
        alignItems: 'center',

    },
    iconSquare: {
        width: '44px',
        height: '44px',
        backgroundColor: '#1E2D3D', // Dark green color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px',

    },
    plusSign: {
        color: '#EBECE5',
        fontSize: '32px',

    },
    filterContainer: {
        padding: '8px 12px',
        backgroundColor: '#1E2D3D',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'none',

    },
    label: {
        fontWeight: 'bold',
        color: '#EBECE5', 
        marginRight: '10px',

    },
    dropdown: {
        backgroundColor: '#1E2D3D', 
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '5px',

    },
};