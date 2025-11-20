import React, { useState } from "react";

export default function AssignManufacturerModal({ isOpen, onClose, onSubmit }) {
  const [address, setaddress] = useState("");
  const [mode, setMode] = useState("add");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ address, mode});
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Register Product</h2>

        {/* {box to enter address} */}
        <div style={styles.field}>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />
        </div>

        {/* Radio Toggle */}
        <div style={styles.field}>
          <label>Action</label>

          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                value="add"
                checked={mode === "add"}
                onChange={() => setMode("add")}
              />
              Add Manufacturer
            </label>

            <label>
              <input
                type="radio"
                value="remove"
                checked={mode === "remove"}
                onChange={() => setMode("remove")}
              />
              Remove Manufacturer
            </label>
          </div>
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
