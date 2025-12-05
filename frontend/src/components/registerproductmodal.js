import React, { useState } from "react";

export default function RegisterProductModal({ isOpen, onClose, onSubmit }) {
  const [batchID, setbatchID] = useState("");
  const [metadata, setmetadata] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ batchID, metadata });
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Register Product</h2>

        <div style={styles.field}>
          <label>Batch ID</label>
          <input
            type="text"
            value={batchID}
            onChange={(e) => setbatchID(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label>Metadata String: (Product Name, Company, Industry, Price)</label>
          <input
            type="text"
            value={metadata}
            onChange={(e) => setmetadata(e.target.value)}
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
