import React, { CSSProperties } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  time: string;
  cost: string;
  imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  category,
  time,
  cost,
  imageUrl,
}) => {
  return (
    <div style={styles.cardContainer}>
      {/* Project Title */}
      <h2 style={styles.title}>{title}</h2>

      {/* Content Area */}
      <div style={styles.contentArea}>
        {/* Image */}
        <img
          src={imageUrl}
          alt={title}
          style={styles.image}

          />
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
    width: '400px',
    height: '300px',
    objectFit: 'contain',
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
};

export default ProjectCard;