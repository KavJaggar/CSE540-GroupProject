import React, { useState } from "react";
import { getContract } from "./utils//contract.js";

function App() {
  const [status, setStatus] = useState("");

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

  async function registerProduct() {
    try {
      const contract = await getContract();
      const tx = await contract.registerProduct("batch001", "ipfs://metadataURI");
      await tx.wait(); // Wait for transaction to be mined
      setStatus("Product registered successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Error registering product: " + err.message);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Supply Chain DApp</h1>

      <button onClick={getAdmin}>Get Contract Admin</button>
      <button onClick={registerProduct} style={{ marginLeft: "10px" }}>
        Register Product
      </button>

      <p>{status}</p>
    </div>
  );
}

export default App;
