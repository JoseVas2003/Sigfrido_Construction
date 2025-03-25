'use client';

import axios from 'axios';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { CSSProperties, useEffect, useState } from 'react';
import Navbar, { clicksOut } from '../navbar/navBar';
import ProjectCard from './projectCard';

export default function PortfolioContent() {
  // session info
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [notification, setNotification] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState<"pencil" | "plus" | null>(null);
  
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
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

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };
    
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`);
      setProjects(prev => prev.filter(proj => proj._id !== id));
      setNotification("Project has been deleted!");
      setTimeout(() => {
        setNotification("");
      }, 5000);          
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const filteredProjects = projects.filter((proj) => {
    if (selectedFilter === "All") return true;
    if (!proj.categories) return false;
    return proj.categories.some((cat: string) => cat.toLowerCase() === selectedFilter.toLowerCase());
  });

  return (
    <div>
      <div style={styles.Navbar}>
        <Navbar />
      </div>
      <div onClick={() => { clicksOut(); }}>
        <div style={styles.headerContainer}>
          {((session?.user as any)?.admin) && (
            <div
              id='editButton'
              style={{
                ...styles.iconSquare,
                backgroundColor: hoveredIcon === 'pencil' ? '#4FB6CE' : '#1E2D3D',
              }}
              onMouseEnter={() => setHoveredIcon('pencil')}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={toggleEditMode}
            >                        
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke={hoveredIcon === 'pencil' ? '#1E2D3D' : '#EBECE5'}
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>    
            </div>
          )}
          {((session?.user as any)?.admin) && (
            <Link href="/createProject">
              <div
                id="createButton"
                role="button"
                style={{
                  ...styles.iconSquare,
                  backgroundColor: hoveredIcon === 'plus' ? '#4FB6CE' : '#1E2D3D',
                }}
                onMouseEnter={() => setHoveredIcon('plus')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <span
                  style={{
                    ...styles.plusSign,
                    color: hoveredIcon === 'plus' ? '#1E2D3D' : '#EBECE5',
                  }}
                >
                  +
                </span>
              </div>
            </Link>
          )}
          <div style={styles.filterContainer}>
            <label htmlFor="filter" id='filterButton' style={styles.label}>Filter:</label>
            <select
              id="filter"
              style={styles.dropdown}
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option id="category-All" value="All">All</option>
              <option id="category-ADU" value="ADU">ADU</option>
              <option id="category-Bathrooms" value="Bathrooms">Bathrooms</option>
              <option id="category-Floors" value="Floors">Floors</option>
              <option id="category-Kitchen" value="Kitchen">Kitchen</option>
              <option id="category-Roofs" value="Roofs">Roofs</option>
              <option id="category-Rooms" value="Rooms">Rooms</option>
            </select>
          </div> 
        </div>

        {notification && (
          <div id="deleteNotification" style={styles.deleteNotification}>
            {notification}
          </div>
        )}
        <div style={styles.projectCardContainer}>
          {filteredProjects.map((proj) => (
            <ProjectCard
              id={proj._id}
              title={proj.name}                               
              description={proj.description}
              category={proj.categories?.join(', ') || ''}
              time={proj.timeTaken}
              cost={proj.cost}                                
              imageUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${proj._id}/image`}
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
    paddingTop: '120px',
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
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '30px',
  },
  Navbar: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};
