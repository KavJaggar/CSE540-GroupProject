import React from "react";

export default function StatusModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p style={styles.text}>{message}</p>

        <button style={styles.button} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "350px",
    maxWidth: "90%",        
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    textAlign: "center",
    boxSizing: "border-box",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
    wordWrap: "break-word", 
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap", 
    lineHeight: "1.4",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    backgroundColor: "gray",
    color: "white",
    border: "none",
    fontSize: "16px",
    transition: "transform 0.2s",
  },
};
