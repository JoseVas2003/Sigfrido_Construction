"use client";

import React, { CSSProperties, useState, useEffect } from 'react';
import ProjectCard from './projectCard';
import Navbar from '../navbar/navBar';
import Link from 'next/link';
import {clicksOut} from '../navbar/navBar'
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from 'next/navigation';

export default function Portfolio() {

    // session info
    const {data: session, status} = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [projects, setProjects] = useState<any[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [notification, setNotification] = useState("");

    // we fetch all the projects
    useEffect(() => {
        axios.get('http://localhost:3001/api/projects')
          .then((response: { data: React.SetStateAction<any[]>; }) => {
            setProjects(response.data);
          })
          .catch((error: any) => {
            console.error('Error fetching projects:', error);
          });
      }, []);    

      useEffect(() => {
        const message = searchParams.get("message");
        if (message) {
          setNotification(message);
          const timer = setTimeout(() => {
            setNotification("");
            router.replace("/portfolio"); 
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [searchParams, router]);    

      // For when pencil is clicked
      const toggleEditMode = () => {
        setEditMode((prev) => !prev);
      };
    
      // Delete a project by its id
      const handleDelete = async (id: string) => {
        try {
          await axios.delete(`http://localhost:3001/api/projects/${id}`);
          setProjects(prev => prev.filter(proj => proj._id !== id));
          
          // Deletion Message
          setNotification("Project has been deleted!");
          setTimeout(() => {
            setNotification("");
          }, 5000);          
        } catch (error) {
          console.error('Failed to delete project:', error);
        }
      };

    // Handle filter change
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(e.target.value);
    };

    // Filter projects based on selected filter
    const filteredProjects = projects.filter((proj) => {
        if (selectedFilter === "All") return true;
        if (!proj.categories) return false;
        return proj.categories.some((cat: string) => cat.toLowerCase() === selectedFilter.toLowerCase());
    });

    return (
        <div>
            {/* Header Bar */}
            <div style={styles.Navbar}>
                <Navbar />
            </div>
            <div onClick= {() => {clicksOut()}}>
                {/* Header Container */}
                <div style={styles.headerContainer}>
                    {/* Only show add / edit buttons to admin */}
                    {/* Pencil Icon Button */}
                    {(session?.user?.admin) && (
                        <div style={styles.iconSquare} onClick={toggleEditMode}>                        
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
                    )}
                    {/* Plus Icon Button with Link to createProject*/}
                    {(session?.user?.admin) && (
                        <Link href="/createProject">
                            <div style={styles.iconSquare} role="button">
                                <span style={styles.plusSign}>+</span>
                            </div>
                        </Link>
                    )}


                    {/* Filter Dropdown */}
                    <div style={styles.filterContainer}>
                        <label htmlFor="filter" style={styles.label}>Filter:</label>
                        <select
                            id="filter"
                            style={styles.dropdown}
                            value={selectedFilter}
                            onChange={handleFilterChange}
                        >
                            <option value="All">All</option>
                            <option value="ADU">ADU</option>
                            <option value="Bathrooms">Bathrooms</option>
                            <option value="Floors">Floors</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Roofs">Roofs</option>
                            <option value="Rooms">Rooms</option>
                        </select>
                    </div> 
                </div>

                {/* Notification Rectangle */}
                {notification && (
                <div style={styles.deleteNotification}>
                    {notification}
                </div>
                )}
                    {/* Project Card */}
                    <div style={styles.projectCardContainer}>
                    {filteredProjects.map((proj) => (
                            <ProjectCard
                                id={proj._id}
                                title={proj.name}                               
                                description={proj.description}
                                category={proj.categories?.join(', ') || ''}
                                time={proj.timeTaken}
                                cost={proj.cost}                                
                                imageUrl={`http://localhost:3001/api/projects/${proj._id}/image`}
                                editMode={editMode}
                                onDelete={handleDelete}                            
                            />
                        ))}
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
        backgroundColor: '#1E2D3D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px',
        cursor: 'pointer',        
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
    deleteNotification: {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#4FB6CE',
        padding: '10px 20px',
        borderRadius: '8px',
        color: '#000',
        fontSize: '18px',
        zIndex: 1500,
        fontWeight: 'bold',
      },
    dropdown: {
        backgroundColor: '#1E2D3D',
        color: '#EBECE5',  
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '5px',
        cursor: 'pointer',
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