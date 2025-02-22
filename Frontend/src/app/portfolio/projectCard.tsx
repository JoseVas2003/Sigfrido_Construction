import Image from 'next/image';
import React, { CSSProperties } from 'react';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  time: string;
  cost: string;
  imageUrl: string;
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
  imageUrl,
  editMode,
  onDelete
}) => {
  return (
    <div style={styles.cardContainer}>
      {/* Project Title */}
      <h2 style={styles.title}>{title}</h2>

      {/* Content Area */}
      <div style={styles.contentArea}>
        {/* Image */}
        <Image src={image} alt={title} style={styles.image} />
        {/* Text Details */}
        <div style={styles.textContainer}>
          <p style={styles.descriptionTitle}>Description:</p>
          <p style={styles.descriptionText}>{description}</p>
          <p style={styles.detail}>
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

      {/* Conditionally render delete (garbage) icon when edit mode is on */}
      {editMode && (
        <div style={styles.deleteIcon} onClick={() => onDelete(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#1E2D3D"
          >
            <path d="M3 6h18" stroke="#1E2D3D" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 6v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6" stroke="#1E2D3D" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 11v6" stroke="#1E2D3D" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 11v6" stroke="#1E2D3D" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 6h14l-1-3H6L5 6z" stroke="#1E2D3D" strokeWidth="2" strokeLinecap="round" />
          </svg>
    </div>
      )}
          </div>

  );
};

const styles: { [key: string]: CSSProperties } = {
  cardContainer: {
    width: '600px',
    border: '1px solid #ccc',
    padding: '20px auto',
    backgroundColor: '#EBECE5',
    color: 'black',
    position: 'relative', 
    margin: '20px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: 'black',
  },
  contentArea: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  image: {
    width: '200px',
    height: 'auto',
    marginRight: '20px',
    borderRadius: '4px',
  },
  textContainer: {
    flex: 1,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    marginBottom: '8px',
    fontSize: '18px',
  },
  descriptionText: {
    marginBottom: '16px',
    lineHeight: '1.5',
  },
  detail: {
    marginBottom: '8px',
    fontSize: '16px',
    color: 'black',
  },

  deleteIcon: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '50%',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
  },
};

export default ProjectCard;