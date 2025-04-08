"use client";

import galleryIcon from '@/app/createProject/galleryIcon.png';
import Navbar, { clicksOut } from '@/app/navbar/navBar';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams(); 
  const {id} = params;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    timeTaken: '',
    cost: '',
    categories: [] as string[],
    images: [] as File[],  
  });

  const [projectNameError, setProjectNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [timeTakenError, setTimeTakenError] = useState("");
  const [costError, setCostError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [imageError, setImageError] = useState("");
  const [submitHovered, setSubmitHovered] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`)
      .then((response) => {
        const project = response.data;
        setFormData((prev) => ({
          ...prev,
          name: project.name || '',
          description: project.description || '',
          timeTaken: project.timeTaken || '',
          cost: project.cost || '',
          categories: project.categories || [],
        }));
      })
      .catch((error) => {
        console.error('Error fetching project for edit:', error);
      });
  }, [id]);

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

        // If input length exceeds the custom limit, truncate and set error message
        if (value.length > maxLength) {
            inputValue = value.substring(0, maxLength);
            setError?.(`Ha llegado al límite de ${maxLength} caracteres.`);
        } else {
            // Clear the error if within limit
            setError?.("");
        }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

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

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    let selectedFiles = Array.from(files);

    // Limit to 5
    if (selectedFiles.length > 5) {
      setImageError("Solo se permiten un máximo de 5 imágenes.");
      selectedFiles = selectedFiles.slice(0, 5);
    }

    // Validate each file's type/size
    const validTypes = ["image/heic", "image/png", "image/jpeg"];
    for (const file of selectedFiles) {
      if (!validTypes.includes(file.type)) {
        setImageError("Solo se permiten imágenes en formato HEIC, PNG o JPEG.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setImageError("La imagen debe tener un tamaño inferior a 10 MB.");
        return;
      }
    }

    // Clear prior image error
    setImageError("");

    // Overwrite the existing "images" state with the newly selected files
    setFormData((prev) => ({
      ...prev,
      images: selectedFiles,
    }));
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

    // If a new image is provided, validate it. If not, we can keep existing one.
    if (formData.images.length > 0) {
      const validTypes = ["image/heic", "image/png", "image/jpeg"];
      for (const file of formData.images) {
        if (!validTypes.includes(file.type)) {
          setImageError("Solo se permiten imágenes en formato HEIC, PNG o JPEG.");
          valid = false;
          break;
        }
        if (file.size > 10 * 1024 * 1024) {
          setImageError("La imagen debe tener un tamaño inferior a 10 MB.");
          valid = false;
          break;
        }
      }
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

      if (formData.images.length > 0) {
        for (const file of formData.images) {
          data.append("images", file); // must match upload.array("images", 5)
        }
      }
      // send PUT to update
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/portfolio?message=" + encodeURIComponent("¡El proyecto se actualizó correctamente!"));

    } catch (error: any) {
      console.error('Error updating project:', error?.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      {/* Header Bar */}
      <div style={styles.Navbar}>
        <Navbar />
      </div>
      <div onClick={() => { clicksOut(); }}>
        {/* Form Container */}
        <div style={styles.formContainer}>
          <form style={styles.form} onSubmit={handleSubmit}>            
            {/* Project Name */}
            <div style={styles.inputGroup}>
              <label htmlFor='projectName'>Nombre del Proyecto:</label>
              <input
                type="text"
                id="projectName"
                name="name"
                style={{
                  ...styles.input,
                  border: projectNameError ? '3px solid red' : '2px solid black',
                }}
                value={formData.name}
                onChange={handleChange}
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
                style={{
                  ...styles.textarea,
                  border: descriptionError ? '3px solid red' : '2px solid black'
                }}
                value={formData.description}
                onChange={handleChange}
              />
              {descriptionError && (
                <p id="descriptionError" style={styles.errorText}>{descriptionError}</p>
              )}
            </div>

            {/* Time and Cost */}
            <div style={styles.row}>
              <div style={styles.halfInputGroup}>
                <label htmlFor='timeTaken'>Duración:</label>
                <input
                  type="text"
                  id="timeTaken"
                  name="timeTaken"
                  style={{
                    ...styles.input,
                    border: timeTakenError ? '3px solid red' : '2px solid black',
                  }}
                  value={formData.timeTaken}
                  onChange={handleChange}
                />
                {timeTakenError && (
                  <p id="timeTakenError"style={styles.errorText}>{timeTakenError}</p>
                )}
              </div>
              <div style={styles.halfInputGroup}>
                <label htmlFor='cost'>Costo:</label>
                <input
                  type="text"
                  id="cost"
                  name="cost"
                  style={{
                    ...styles.input,
                    border: costError ? '3px solid red' : '2px solid black',
                  }}
                  value={formData.cost}
                  onChange={handleChange}
                />
                {costError && (
                  <p id="costError" style={styles.errorText}>{costError}</p>
                )}
              </div>
            </div>

            {/* Categories and Image Upload */}
            <div style={styles.row}>
              {/* Categories */}
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

              {/* Image Upload */}
              <div style={styles.halfInputGroup}>
                <label style={styles.label}>Cambiar Imágenes (Opcional, máx 5):</label>           
                <div style={styles.imageContainer}>
                  <Image
                    src={galleryIcon}
                    alt="Gallery Icon"
                    className='companyLogo'
                    width={80}
                    height={80}
                    onClick={handleImageClick}
                    style={{ cursor: 'pointer' }}
                  />
                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="imageFile"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".heic,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
                {imageError && (
                  <p id="imageError" style={styles.errorText}>{imageError}</p>
                )}
              </div>
            </div>

            {/* Submit */}
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
                Guardar Cambios
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
    color: '#000'
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
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: '20px',
    marginTop: '5px',
    textAlign: 'center',
  },
};