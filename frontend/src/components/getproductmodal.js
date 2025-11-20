import React, { useState } from "react";

export default function GetProductModal({ isOpen, onClose, onSubmit }) {
  const [productID, setproductID] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ productID });
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Register Product</h2>

        <div style={styles.field}>
          <label>Product ID</label>
          <input
            type="text"
            value={productID}
            onChange={(e) => setproductID(e.target.value)}
          />
        </div>

        <div style={styles.buttons}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "400px",
    padding: "20px",
    background: "white",
    borderRadius: "8px",
  },
  field: {
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "20px",
  },
};
