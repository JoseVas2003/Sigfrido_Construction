import React, { CSSProperties, useState } from 'react';
import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  time: string;
  cost: string;
  imageUrls: string[];  
  editMode: boolean;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id, 
  title,
  description,
  category,
  time,
  cost,
  imageUrls,
  editMode,
  onDelete
}) => {
  const [hovered, setHovered] = useState<'delete' | 'edit' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    if (imageUrls.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
    }
  };

  const handlePrev = () => {
    if (imageUrls.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
    }
  };
  return (
    <div style={styles.cardContainer} data-testid="project-card">
      {/* Project Title */}
      <h2 style={styles.title}>{title}</h2>

      {/* Content Area */}
      <div style={styles.contentArea}>
        {/* Images */}
        {imageUrls && imageUrls.length > 0 ? (
          <div style={styles.imageCarouselContainer}>

        <img
          src={imageUrls[currentIndex]}
          alt={title}
          style={styles.image}

        />
        {/* Simple arrows or buttons */}
        {imageUrls.length > 1 && (
          <>
            <button 
              style={{ 
                ...styles.arrowButton, 
                left: '5px', 
              }} 
              onClick={handlePrev}
            >
              ←
            </button>
            <button 
              style={{ 
                ...styles.arrowButton, 
                right: '5px', 
              }} 
              onClick={handleNext}
            >
              →
            </button>
          </>
        )}
      </div>
    ) : (          
      // fallback if no images
      <div style={styles.noImagePlaceholder}>No Images</div>
    )}
        {/* Text Details */}
        <div style={styles.textContainer}>
          <p style={styles.descriptionTitle}>Description:</p>
          <p style={styles.descriptionText}>{description}</p>
          <p style={styles.detail} data-testid="project-category">
            <strong>Project Category:</strong> {category}
          </p>
          <p style={styles.detail}>
            <strong>Time:</strong> {time}
          </p>
          <p style={styles.detail}>
            <strong>Cost:</strong> {cost}
          </p>
        </div>
      </div>

      {/* Actions rendered when when edit mode is on */}
      {editMode && (
        <div style={styles.actionsContainer}>
          {/* Delete Button */}
          <div
            id="deleteButton"
            style={{
              ...styles.deleteIcon,
              backgroundColor: hovered === 'delete'
                ? '#4FB6CE'
                : styles.deleteIcon.backgroundColor,
            }}
            onMouseEnter={() => setHovered('delete')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onDelete(id)}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={hovered === 'delete' ? '#EBECE5' : '#1E2D3D'}
          >
            <path 
              d="M3 6h18" 
              stroke={hovered === 'delete' ? '#EBECE5' : '#1E2D3D'}
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            <path 
              d="M8 6v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6" 
              stroke={hovered === 'delete' ? '#EBECE5' : '#1E2D3D'} 
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            <path 
              d="M10 11v6" 
              stroke={hovered === 'delete' ? '#EBECE5' : '#1E2D3D'} 
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            <path 
              d="M14 11v6" 
              stroke={hovered === 'delete' ? '#EBECE5' : '#1E2D3D'} 
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            <path 
              d="M5 6h14l-1-3H6L5 6z" 
              stroke={hovered === 'delete' ? '#EBECE5' : '#1E2D3D'} 
              strokeWidth="2" 
              strokeLinecap="round" 
            />  
          </svg>
        </div>
        {/* Edit Button */}
          <Link href={`/editProject/${id}`}>
            <button
                style={{
                  ...styles.editButton,
                  backgroundColor: hovered === 'edit'
                    ? '#1E2D3D'
                    : styles.editButton.backgroundColor,
                  color: hovered === 'edit' ? '#EBECE5' : 'black',
                }}
                onMouseEnter={() => setHovered('edit')}
                onMouseLeave={() => setHovered(null)}
                data-testid="edit-project-button"
              >
                Editar Proyecto
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
const styles: { [key: string]: CSSProperties } = {
  cardContainer: {
    maxWidth: '700px',
    border: '1px solid #ccc',
    padding: '30px 30px 70px 30px',
    backgroundColor: '#EBECE5',
    position: 'relative', 
    margin: '20px',
    paddingBottom: '70px',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: 'black',
    fontWeight: 'bold',
  },
  contentArea: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  imageCarouselContainer: {
    position: 'relative',
    marginRight: '20px',
  },
  image: {
    width: '400px',
    height: '300px',
    objectFit: 'contain',
    marginRight: '20px',
    borderRadius: '4px',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
  textContainer: {
    flex: 1,
  },

  noImagePlaceholder: {
    width: '400px',
    height: '300px',
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionTitle: {
    fontWeight: 'bold',
    marginBottom: '8px',
    fontSize: '18px',
  },
  descriptionText: {
    marginBottom: '16px',
    lineHeight: '1.5',
    wordBreak: 'break-word',
  },
  detail: {
    marginBottom: '8px',
    fontSize: '16px',
    color: 'black',
  },
  actionsContainer: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    display: 'flex',
  },
  deleteIcon: {
    position: 'absolute',
    bottom: '5px',
    right: '10px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '5%',
    backgroundColor: '#EBECE5',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
  },
  editButton: {
    position: 'absolute',
    padding: '5px 10px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#4FB6CE',
    borderRadius: '5%',
    right: '50px',
    bottom: '6px',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
};
export default ProjectCard;