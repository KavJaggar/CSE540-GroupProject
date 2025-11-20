import React, { useState } from "react";
import { getContract } from "./utils/contract.js";
import RegisterProductModal from "./components/registerproductmodal.js";
import GetProductModal from "./components/getproductmodal.js";
import AssignManufacturerModal from "./components/assignmanufacturermodal.js";
import AssignDistributorModal from "./components/assigndistributormodal.js";
import AssignCertifierModal from "./components/assigncertifiermodal.js";
import TransferOwnershipModal from "./components/transferownershipmodal.js";


function App() {
  const [status, setStatus] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showGetModal, setShowGetModal] = useState(false);
  const [showassignManufacturerModal, setShowAssignManufacturerModal] = useState(false);
  const [showassignDistributorModal, setShowAssignDistributorModal] = useState(false);
  const [showassignCertifierModal, setShowAssignCertifierModal] = useState(false);
  const [showtransferOwnershipModal, setShowtransferOwnershipModal] = useState(false);

  async function getAdmin() {
    try {
      const contract = await getContract();
      const adminAddress = await contract.admin(); 
      alert("Contract admin: " + adminAddress);
    } catch (err) {
      console.error(err);
      alert("Error calling contract: " + err.message);
    }
  }

  const handleRegisterProduct = async (data) => {
    try {
      const contract = await getContract();

      const tx = await contract.registerProduct(
        data.batchID,  
        data.metadata   
      );

      await tx.wait();
      alert("Product registered!");
    } catch (err) {
      console.error(err);
      alert("Failed to register product : Only Manufacturers can resgiter products!");
    }
  };

  const handleGetProduct = async (data) => {
    try {
      const contract = await getContract();

      const tx = await contract.getProduct(
        data.productID  
      );

      //await tx.wait();
      alert("Product retrieved!\n Product: " + tx);
    } catch (err) {
      console.error(err);
      alert("Failed to get product : " + err);
    }
  };

  const handleAssignManufacturer = async (data) => {
    try {
      const contract = await getContract();

      if (data.mode == "add")
      {
          const tx = await contract.setManufacturer(
          data.address, true  
        );
      }
      else
      {
          const tx = await contract.setManufacturer(
          data.address, false  
        );
      }
      
      alert("Manufacturer Status updated for " + data.address + "!")
    } catch (err) {
      console.error(err);
      alert("Failed to get product");
    }
  };

  const handleAssignDistributor = async (data) => {
    try {
      const contract = await getContract();

      if (data.mode == "add")
      {
          const tx = await contract.setDistributor(
          data.address, true  
        );
      }
      else
      {
          const tx = await contract.setManufacturer(
          data.address, false  
        );
      }
      
      alert("Distributor Status updated for " + data.address + "!")
    } catch (err) {
      console.error(err);
      alert("Failed to get product");
    }
  };

  const handleAssignCertifier = async (data) => {
    try {
      const contract = await getContract();

      if (data.mode == "add")
      {
          const tx = await contract.setCertifier(
          data.address, true  
        );
      }
      else
      {
          const tx = await contract.setCertifier(
          data.address, false  
        );
      }
      
      alert("Certifier Status updated for " + data.address + "!")
    } catch (err) {
      console.error(err);
      alert("Failed to get product");
    }
  };

  const handletransferOwnership = async (data) => {
    try {
      const contract = await getContract();

        const tx = await contract.transferOwnership(
        data.productID, data.address  
        );
      
      alert("Ownership of Product updated to " + data.address + "!")
    } catch (err) {
      console.error(err);
      alert("Failed to transfer ownership. Make sure you own the product you are trying to transfer.");
    }
  };


  // async function assignManufacturer() {
  //   try {
  //     const contract = await getContract();
  //     const tx = await contract.setManufacturer(contract.admin(), true);
  //     await tx.wait();
  //     setStatus("Manufacturer registered successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     setStatus("Error Assigning: " + err.message);
  //   }
  // }

  // async function getProduct() {
  //   try {
  //     const contract = await getContract();
  //     const product = await contract.getProduct(1);
  //     setStatus("Product retrieved successfully! : " + product);
  //   } catch (err) {
  //     console.error(err);
  //     setStatus("Error retrieving product: " + err.message);
  //   }
  // }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Supply Chain DApp</h1>

      <button onClick={getAdmin}>Get Contract Admin</button>

      <button onClick={() => setShowRegisterModal(true)} style={{ marginLeft: "10px" }}>
        Register Product
      </button>

      <button onClick={() => setShowAssignManufacturerModal(true)} style={{ marginLeft: "10px" }}>
        Assign Manufacturer
      </button>

      <button onClick={() => setShowAssignDistributorModal(true)} style={{ marginLeft: "10px" }}>
        Assign Distributor
      </button>

      <button onClick={() => setShowAssignCertifierModal(true)} style={{ marginLeft: "10px" }}>
        Assign Certifier
      </button>

      <button onClick={() => setShowtransferOwnershipModal(true)} style={{ marginLeft: "10px" }}>
        Transfer Product Ownership
      </button>

      <button onClick={() => setShowGetModal(true)} style={{ marginLeft: "10px" }}>
        Get Product
      </button>

      {/* Register Product Modal */}
      <RegisterProductModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSubmit={handleRegisterProduct}
      />

      {/* Get Product Modal */}
      <GetProductModal
        isOpen={showGetModal}
        onClose={() => setShowGetModal(false)}
        onSubmit={handleGetProduct}
      />

      {/* Assign Manufacturer Modal */}
      <AssignManufacturerModal
        isOpen={showassignManufacturerModal}
        onClose={() => setShowAssignManufacturerModal(false)}
        onSubmit={handleAssignManufacturer}
      />

      {/* Assign Distributor Modal */}
      <AssignDistributorModal
        isOpen={showassignDistributorModal}
        onClose={() => setShowAssignDistributorModal(false)}
        onSubmit={handleAssignDistributor}
      />

      {/* Assign Certifier Modal */}
      <AssignCertifierModal
        isOpen={showassignCertifierModal}
        onClose={() => setShowAssignCertifierModal(false)}
        onSubmit={handleAssignCertifier}
      />

      {/* Transfer Ownership Modal */}
      <TransferOwnershipModal
        isOpen={showtransferOwnershipModal}
        onClose={() => setShowtransferOwnershipModal(false)}
        onSubmit={handletransferOwnership}
      />

      <p>{status}</p>
    </div>
  );
}

export default App;
