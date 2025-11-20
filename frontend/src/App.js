import React, { useState } from "react";
import { getContract } from "./utils/contract.js";
import RegisterProductModal from "./components/registerproductmodal.js";

function App() {
  const [status, setStatus] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  async function getAdmin() {
    try {
      const contract = await getContract();
      const adminAddress = await contract.admin(); 
      setStatus("Contract admin: " + adminAddress);
    } catch (err) {
      console.error(err);
      setStatus("Error calling contract: " + err.message);
    }
  }

  const handleRegisterProduct = async (data) => {
    try {
      const contract = await getContract();

      const tx = await contract.registerProduct(
        data.batchID,   // <-- FIXED
        data.metadata   // <-- FIXED
      );

      await tx.wait();
      alert("Product registered!");
    } catch (err) {
      console.error(err);
      alert("Failed to register product");
    }
  };

  async function assignManufacturer() {
    try {
      const contract = await getContract();
      const tx = await contract.setManufacturer(contract.admin(), true);
      await tx.wait();
      setStatus("Manufacturer registered successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Error Assigning: " + err.message);
    }
  }

  async function getProduct() {
    try {
      const contract = await getContract();
      const product = await contract.getProduct(1);
      setStatus("Product retrieved successfully! : " + product);
    } catch (err) {
      console.error(err);
      setStatus("Error retrieving product: " + err.message);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Supply Chain DApp</h1>

      <button onClick={getAdmin}>Get Contract Admin</button>

      {/* OPEN MODAL HERE */}
      <button onClick={() => setShowRegisterModal(true)} style={{ marginLeft: "10px" }}>
        Register Product
      </button>

      <button onClick={assignManufacturer} style={{ marginLeft: "10px" }}>
        Assign Manufacturer
      </button>

      <button onClick={getProduct} style={{ marginLeft: "10px" }}>
        Get Product
      </button>

      {/* Register Product Modal */}
      <RegisterProductModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSubmit={handleRegisterProduct}
      />

      <p>{status}</p>
    </div>
  );
}

export default App;
