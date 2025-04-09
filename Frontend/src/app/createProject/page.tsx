"use client";
import imageCompression from "browser-image-compression";
import axios from "axios";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { CSSProperties, useRef, useState } from 'react';
import galleryIcon from '../createProject/galleryIcon.png';
import Navbar, { clicksOut } from '../navbar/navBar';

interface ImageSlot {
  file: File | null;
  previewUrl: string;
}

export default function CreateProjectPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    timeTaken: '',
    cost: '',
    categories: [] as string[],
  });

  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([
    { file: null, previewUrl: '' },
    { file: null, previewUrl: '' },
    { file: null, previewUrl: '' },
    { file: null, previewUrl: '' },
    { file: null, previewUrl: '' },
  ]);

  const router = useRouter();

  const [projectNameError, setProjectNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [timeTakenError, setTimeTakenError] = useState("");
  const [costError, setCostError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [imageError, setImageError] = useState("");
  const [submitHovered, setSubmitHovered] = useState(false);

  // For picking images
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);

  // Handle text changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let inputValue = value;
    let maxLength = 0;
    let setError: React.Dispatch<React.SetStateAction<string>> | null = null;

    switch (name) {
      case 'name':
        maxLength = 30;
        setError = setProjectNameError;
        break;
      case 'timeTaken':
        maxLength = 15;
        setError = setTimeTakenError;
        break;
      case 'cost':
        maxLength = 15;
        setError = setCostError;
        break;
      case 'description':
        maxLength = 300;
        setError = setDescriptionError;
        break;
      default:
        maxLength = 100;
    }

    if (value.length > maxLength) {
      inputValue = value.substring(0, maxLength);
      setError?.(`Ha llegado al límite de ${maxLength} caracteres.`);
    } else {
      setError?.("");
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  // Handle multiple checkboxes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      let updatedCategories;
      if (checked) {
        updatedCategories = [...prevFormData.categories, value];
      } else {
        updatedCategories = prevFormData.categories.filter((cat) => cat !== value);
      }
      if (updatedCategories.length > 0) setCategoriesError("");
      return {
        ...prevFormData,
        categories: updatedCategories,
      };
    });
  };

  // This is called when the user clicks on one of the 5 boxes
  const handleBoxClick = (index: number) => {
    setSelectedBoxIndex(index);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || selectedBoxIndex == null) return;
  
    // Validate file type & size before compression if you’d like
    const validTypes = ["image/heic", "image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      setImageError("Solo se permiten imágenes en formato HEIC, PNG o JPEG.");
      return;
    }
  
    // Compression options
    const options = {
      maxSizeMB: 0.2,       
      maxWidthOrHeight: 1600, 
      useWebWorker: true,     // Offload compression to a web worker
      fileType: file.type,  
    };
  
    try {
      const compressedFile = await imageCompression(file, options);
  
      const previewUrl = URL.createObjectURL(compressedFile);
  
      setImageSlots((prevSlots) => {
        const updated = [...prevSlots];
        updated[selectedBoxIndex] = { file: compressedFile, previewUrl };
        return updated;
      });
  
      // Reset error if everything went fine
      setImageError("");
    } catch (error) {
      console.error("Error compressing file:", error);
      setImageError("Ocurrió un error al comprimir la imagen.");
    }
  };

  const validateForm = (): boolean => {
    let valid = true;

    if (!formData.name.trim()) {
      setProjectNameError("El nombre del proyecto no puede estar vacío.");
      valid = false;
    }
    if (!formData.description.trim()) {
      setDescriptionError("La descripción no puede estar vacía.");
      valid = false;
    }
    if (!formData.timeTaken.trim()) {
      setTimeTakenError("La duración no puede estar vacía.");
      valid = false;
    }
    if (!formData.cost.trim()) {
      setCostError("El costo no puede estar vacío.");
      valid = false;
    }
    if (formData.categories.length === 0) {
      setCategoriesError("Selecciona al menos una categoría para el proyecto.");
      valid = false;
    }

    // Ensure at least one image is present across the 5 slots
    const hasAtLeastOne = imageSlots.some((slot) => slot.file !== null);
    if (!hasAtLeastOne) {
      setImageError("Por favor, sube al menos una imagen (en uno de los 5 recuadros).");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("timeTaken", formData.timeTaken);
      data.append("cost", formData.cost);
      formData.categories.forEach((cat) => data.append("categories", cat));

      // Append whichever files are actually set
      // If a slot is empty, skip it
      for (const slot of imageSlots) {
        if (slot.file) {
          data.append("images", slot.file);
        }
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, data);
      router.push("/portfolio?message=" + encodeURIComponent("¡El proyecto se creó correctamente!"));
    } catch (error: any) {
      console.error('Error creating project:', error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div style={styles.Navbar}>
        <Navbar />
      </div>

      <div onClick={() => { clicksOut(); }}>
        <div style={styles.formContainer}>
          <form style={styles.form} onSubmit={handleSubmit}>
            {/* Project Name */}
            <div style={styles.inputGroup}>
              <label htmlFor='projectName'>Nombre del Proyecto:</label>
              <input
                type="text"
                id="projectName"
                name="name"
                style={{ ...styles.input, border: projectNameError ? '3px solid red' : '2px solid black' }}
                value={formData.name}
                onChange={handleChange}
                onInput={() => setProjectNameError("")}
              />
              {projectNameError && (
                <p id="projectNameError" style={styles.errorText}>{projectNameError}</p>
              )}
            </div>

            {/* Description */}
            <div style={styles.inputGroup}>
              <label htmlFor="descriptionText">Descripción:</label>
              <textarea
                id="descriptionText"
                name="description"
                style={{ ...styles.textarea, border: descriptionError ? '3px solid red' : '2px solid black' }}
                value={formData.description}
                onChange={handleChange}
                onInput={() => setDescriptionError("")}
              />
              {descriptionError && (
                <p id="descriptionError" style={styles.errorText}>{descriptionError}</p>
              )}
            </div>

            {/* Time & Cost */}
            <div style={styles.row}>
              <div style={styles.halfInputGroup}>
                <label htmlFor='timeTaken'>Duración:</label>
                <input
                  type="text"
                  id="timeTaken"
                  name="timeTaken"
                  style={{ ...styles.input, border: timeTakenError ? '3px solid red' : '2px solid black' }}
                  value={formData.timeTaken}
                  onChange={handleChange}
                  onInput={() => setTimeTakenError("")}
                />
                {timeTakenError && (
                  <p id="timeTakenError" style={styles.errorText}>{timeTakenError}</p>
                )}
              </div>
              <div style={styles.halfInputGroup}>
                <label htmlFor='cost'>Costo:</label>
                <input
                  type="text"
                  id="cost"
                  name="cost"
                  style={{ ...styles.input, border: costError ? '3px solid red' : '2px solid black' }}
                  value={formData.cost}
                  onChange={handleChange}
                  onInput={() => setCostError("")}
                />
                {costError && (
                  <p id="costError" style={styles.errorText}>{costError}</p>
                )}
              </div>
            </div>

            {/* Project Category */}
            <div style={styles.row}>
              <div style={styles.halfInputGroup}>
                <label style={styles.label}>Categoría(s) del Proyecto:</label>
                <div style={styles.checkboxGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      id="category-ADU"
                      name="category"
                      value="ADU"
                      checked={formData.categories.includes('ADU')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    ADU
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        id="category-bathrooms"
                        name="category"
                        value="Bathrooms"
                        checked={formData.categories.includes('Bathrooms')}
                        onChange={handleCheckboxChange}
                        style={styles.checkbox}
                    />
                    Baños
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      id="category-floors"
                      name="category"
                      value="Floors"
                      checked={formData.categories.includes('Floors')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    Pisos
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                        id="category-kitchens"
                      name="category"
                      value="Kitchens"
                      checked={formData.categories.includes('Kitchens')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    Cocinas
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      id="category-roofs"
                      name="category"
                      value="Roofs"
                      checked={formData.categories.includes('Roofs')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    Techos
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      id="category-rooms"
                      name="category"
                      value="Rooms"
                      checked={formData.categories.includes('Rooms')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    Cuartos
                  </label>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      id="category-pavement"
                      name="category"
                      value="Pavement"
                      checked={formData.categories.includes('Pavement')}
                      onChange={handleCheckboxChange}
                      style={styles.checkbox}
                    />
                    Pavimento
                  </label>
                </div>
                {categoriesError && (
                  <p id="categoriesError" style={styles.errorText}>{categoriesError}</p>
                )}
              </div>

              {/* The 5 image boxes */}
              <div style={styles.halfInputGroup}>
                <label style={styles.label}>Agrega Imágenes (5 slots):</label>

                {/* This hidden file input is triggered by whichever box user clicks */}
                <input
                  type="file"
                  id="imageFile"
                  name=""
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".heic,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />

                <div style={styles.boxContainer}>
                  {imageSlots.map((slot, index) => (
                    <div
                      key={index}
                      style={styles.box}
                      onClick={() => handleBoxClick(index)}
                    >
                      {slot.previewUrl ? (
                        <img
                          src={slot.previewUrl}
                          alt={`preview-${index}`}
                          style={styles.previewImage}
                        />
                      ) : (
                        // If no file selected, show an icon or text
                        <div style={styles.emptyBoxContent}>
                          <Image
                            src={galleryIcon}
                            alt="Gallery Icon"
                            width={40}
                            height={40}
                          />
                          <span style={{ fontSize: '14px' }}>Haz clic para Agregar</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {imageError && (
                  <p id="imageError" style={styles.errorText}>{imageError}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                type="submit"
                style={{
                  ...styles.button,
                  backgroundColor: submitHovered ? '#1E2D3D' : styles.button.backgroundColor,
                  color: submitHovered ? '#EBECE5' : styles.button.color,
                }}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
              >
                Crear Proyecto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
const styles: { [key: string]: CSSProperties } = {
  Navbar: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  formContainer: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
    zIndex: 1,
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '1500px',
    width: '100%',
    border: '2px solid black',
  },
  inputGroup: {
    marginBottom: '15px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    textAlign: 'center',
    fontSize: '24px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '15px',
    border: '2px solid black',
    fontSize: '24px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '15px',
    border: '2px solid black',
    minHeight: '100px',
    fontSize: '24px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '15px',
    backgroundColor: '#4FB6CE',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#000',
  },
  checkboxGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
    gap: '10px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'normal',
    fontSize: '24px',
    width: '175px',
  },
  checkbox: {
    marginRight: '10px',
    marginLeft: '20px',
    width: '25px',
    height: '25px',
    alignItems: 'center',
    cursor: 'pointer',
  },
  label: {
    display: 'block',
    fontSize: '24px',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  halfInputGroup: {
    width: '48%',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    textAlign: 'center',
    fontSize: '24px',
    marginTop: '00px',
  },
  errorText: {
    color: 'red',
    fontSize: '20px',
    marginTop: '5px',
    textAlign: 'center',
  },
  // The 5 boxes
  boxContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '15px',
  },
  box: {
    width: '100px',
    height: '100px',
    border: '2px dashed #ccc',
    borderRadius: '6px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBoxContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pointerEvents: 'none', // let clicks pass to the parent .box
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};