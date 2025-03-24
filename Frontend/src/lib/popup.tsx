export const openPopup = () => {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = "flex";
    }
  };
  
  export const closePopup = () => {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = "none";
    }
  };
  