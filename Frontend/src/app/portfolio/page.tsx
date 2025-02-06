"use client";

import React, { CSSProperties } from 'react';
import ProjectCard from './projectCard';
import fountainImage from '../portfolio/fountainExample.jpg';
import Navbar from '../navbar/navBar';
import Link from 'next/link';
import {clicksOut} from '../navbar/navBar'

export default function Portfolio() {
    return (
        <div>
            {/* Header Bar */}
            <div style={styles.Navbar}>
                <Navbar />
            </div>
            <div onClick= {() => {clicksOut()}}>
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
                    {/* Plus Icon Button with Link to createProject*/}
                    <Link href="/createProject">
                        <div style={styles.iconSquare} role="button">
                            <span style={styles.plusSign}>+</span>
                        </div>
                    </Link>

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
                    <div style={styles.projectCardContainer}>
                        <ProjectCard
                            title="Stone Mason Fountain"
                            description="This project is a stone mason fountain made."
                            category="Bath"
                            time="2 weeks"
                            cost="$600"
                            image={fountainImage}
                        />
                    </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {    
    container: {
        position: 'relative',
      },
    headerContainer: {
        position: 'relative',
        top: '5px',
        display: 'flex',
        paddingTop: '120px', // Add padding to offset the fixed Navbar height
        paddingRight: '20px', 
        justifyContent: 'flex-end',
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
        color: '#EBECE5',  
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '5px',
    },
    projectCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '30px',
    },
Navbar: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0, // Ensures the Navbar takes up the full width
    right: 0,
    zIndex: 1000, // High z-index to overlay content
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
},
};