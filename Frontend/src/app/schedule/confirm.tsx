import React from "react";

interface ConfirmationProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p className="popup-message">{message}</p>
                <div className="popup-buttons">
                    <button onClick={onConfirm} className="confirm-button">Confirm</button>
                    <button onClick={onCancel} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
