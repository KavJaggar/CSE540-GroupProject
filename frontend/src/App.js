import React, { useState } from "react";
import { getContract } from "./utils/contract.js";
import RegisterProductModal from "./components/registerproductmodal.js";
import GetProductModal from "./components/getproductmodal.js";
import AssignManufacturerModal from "./components/assignmanufacturermodal.js";
import AssignDistributorModal from "./components/assigndistributormodal.js";
import AssignCertifierModal from "./components/assigncertifiermodal.js";
import TransferOwnershipModal from "./components/transferownershipmodal.js";
import UpdateStatusModal from "./components/updatestatusmodal.js";
import CertifyProductModal from "./components/certifyproductmodal.js";
import StatusModal from "./components/statusmodal.js";
import { toBigInt } from "ethers";


function App() {
  const [status, setStatus] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showGetModal, setShowGetModal] = useState(false);
  const [showassignManufacturerModal, setShowAssignManufacturerModal] = useState(false);
  const [showassignDistributorModal, setShowAssignDistributorModal] = useState(false);
  const [showassignCertifierModal, setShowAssignCertifierModal] = useState(false);
  const [showtransferOwnershipModal, setShowtransferOwnershipModal] = useState(false);
  const [showupdateStatusModal, setShowupdateStatusModal] = useState(false);
  const [showCertifyModal, setShowCertifyModal] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");


  const [role, setRole] = useState("");

  const statusTags = {"Unknown" : 1, "Ordered" : 2, "Shipped" : 3, "InStorage" : 4, "Delivered" : 5}
  const statusTagsRev = {1 : "Unknown", 2 : "Ordered", 3 : "Shipped", 4 : "InStorage", 5 : "Delivered"}

  document.addEventListener("DOMContentLoaded", () => {
    const adminBtn = document.getElementById("adminButton");
    const manufacturerBtn = document.getElementById("manufacturerButton");
    const distributorBtn = document.getElementById("distributorButton");
    const certifierBtn = document.getElementById("certifierButton");

    adminBtn.onclick = () => setRole("admin");
    manufacturerBtn.onclick = () => setRole("manufacturer");
    distributorBtn.onclick = () => setRole("distributor");
    certifierBtn.onclick = () => setRole("certifier");
});

  async function getAdmin() {
    try {
      const contract = await getContract();
      const adminAddress = await contract.admin(); 
      showStatus("The Contract admin is: " + adminAddress);
    } catch (err) {
      console.error(err);
      showStatus("Error calling contract: " + err.message);
    }
  }

  const handleRegisterProduct = async (data) => {
    try {
      const contract = await getContract();

      const tx = await contract.registerProduct(
        data.batchID,  
        data.metadata   
      );

      const receipt = await tx.wait();

      const parsedLogs = receipt.logs
        .map((log) => {
          try {
            return contract.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      const event = parsedLogs.find((l) => l.name === "ProductCreated");

      if (!event) {
        showStatus("Error: ProductCreated event not found.");
        return;
      }

      const productId = event.args.id;
      const batchId = event.args.batchId; 
      const metadata = event.args.metadata;

      showStatus(
        `Product registered!\n` +
          `ID: ${productId}\n` +
          `Batch ID: ${batchId}\n` +
          `Metadata: ${metadata}`
      );

    } catch (err) {
      console.error(err);
      showStatus("Failed!");
      
    }
  };

  const handleGetProduct = async (data) => {
    try {
      const contract = await getContract();

      const tx = await contract.getProduct(
        data.productID  
      );

      showStatus("Product retrieved!\n \n" + 
          `ID:\n ${tx[0]}` +
          // `Batch ID: ${tx[2]}\n` +
          `\n\nMetadata:\n ${tx[3]}` +
          `\n\nOwner: ${tx[1]}` +
          `\n\nStatus:\n ${statusTagsRev[tx[4]]}`);
    } catch (err) {
      console.error(err);
      showStatus("Failed to get product : " + err);
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
      
      showStatus("Manufacturer Status updated for " + data.address + "!")
    } catch (err) {
      console.error(err);
      showStatus("Failed to get product");
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
      
      showStatus("Distributor Status updated for " + data.address + "!")
    } catch (err) {
      console.error(err);
      showStatus("Failed to get product");
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
      
      showStatus("Certifier Status updated for " + data.address + "!")
    } catch (err) {
      console.error(err);
      showStatus("Failed to get product");
    }
  };

  const handletransferOwnership = async (data) => {
    try {
      const contract = await getContract();

      const tx = await contract.transferOwnership(
      data.productID, data.address  
      );

      const receipt = await tx.wait();

      const parsedLogs = receipt.logs
        .map((log) => {
          try {
            return contract.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      const event = parsedLogs.find((l) => l.name === "OwnershipTransferred");

      if (!event) {
        showStatus("Error: ProductCreated event not found.");
        return;
      }

      const productId = event.args.id;
      const from = event.args.from; 
      const to = event.args.to;

      showStatus(
        `Product Transferred!\n\n` +
          `ID: ${productId}\n\n` +
          `Transferred From: ${from}\n\n` +
          `Transferred To: ${to}`
      );
    } catch (err) {
      console.error(err);
      showStatus("Failed to transfer ownership. Make sure you own the product you are trying to transfer.");
    }
  };

  const handleupdateStatus = async (data) => {
    try {
      const contract = await getContract();

        const tx = await contract.updateStatus(
        data.productID, statusTags[data.status]
        );
      
      showStatus("Status of Product " + data.productID + " updated to " + data.status + "!")
    } catch (err) {
      console.error(err);
      showStatus("Failed to Update Status. Make sure you own the product you are trying to update. : " + err);
    }
  };

  const handleCertify = async (data) => {
    try {
      const contract = await getContract();

        const tx = await contract.certifyProduct(
        data.productID, data.address
        );
      
      showStatus("Ownership of the product on the chain is verified to belong to: " + data.address + "!")
    } catch (err) {
      console.error(err);
      showStatus("Failed to verify ownership of Product to address: " + data.address);
    }
  };

  function showStatus(message) {
    setStatusMessage(message);
    setStatusModalOpen(true);
  }



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

      <div className="button-container">
        <button className="slide-button" style={{ animationDelay: "0s" }} onClick={() => setRole("admin")}>
          Admin
        </button>
        <button className="slide-button" style={{ animationDelay: "0.2s" }} onClick={() => setRole("manufacturer")}>
          Manufacturer
        </button>
        <button className="slide-button" style={{ animationDelay: "0.4s" }} onClick={() => setRole("distributor")}>
          Distributor
        </button>
        <button className="slide-button" style={{ animationDelay: "0.6s" }} onClick={() => setRole("certifier")}>
          Certifier
        </button>
      </div>


      <button id = "gcaBtn" className="action-button" style={{ animationDelay: "0s" }} onClick={getAdmin}>Get Contract Admin</button>

      {role === "admin" && (
        <>
          <button className="action-button" onClick={() => setShowAssignManufacturerModal(true)} style={{ marginLeft: "10px" }}>
            Assign Manufacturer
          </button>

          <button className="action-button" onClick={() => setShowAssignDistributorModal(true)} style={{ marginLeft: "10px" }}>
            Assign Distributor
          </button>

          <button className="action-button" onClick={() => setShowAssignCertifierModal(true)} style={{ marginLeft: "10px" }}>
            Assign Certifier
          </button>
        </>
      )}

      {role === "manufacturer" && (
          <button className="action-button" onClick={() => setShowRegisterModal(true)} style={{ marginLeft: "10px" }}>
            Register Product
          </button>
      )}

      {role === "certifier" && (
          <button className="action-button" onClick={() => setShowCertifyModal(true)} style={{ marginLeft: "10px" }}>
            Certify Product Ownership
          </button>
      )}

      <button id = "tpoBtn" className="action-button" style={{ animationDelay: "0.2s", marginLeft: "10px"}} onClick={() => setShowtransferOwnershipModal(true)}>
        Transfer Product Ownership
      </button>

      <button id = "upsBtn" className="action-button" style={{ animationDelay: "0.4s", marginLeft: "10px"}} onClick={() => setShowupdateStatusModal(true)}>
        Update Product Status
      </button>

      <button id = "gpBtn" className="action-button" style={{ animationDelay: "0.6s", marginLeft: "10px"}} onClick={() => setShowGetModal(true)}>
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

      {/* Update Status Modal */}
      <UpdateStatusModal
        isOpen={showupdateStatusModal}
        onClose={() => setShowupdateStatusModal(false)}
        onSubmit={handleupdateStatus}
      />

      {/* Certify Product Ownership */}
      <CertifyProductModal
        isOpen={showCertifyModal}
        onClose={() => setShowCertifyModal(false)}
        onSubmit={handleCertify}
      />

      {/* Status Message */}
      <StatusModal
        isOpen={statusModalOpen}
        message={statusMessage}
        onClose={() => setStatusModalOpen(false)}
      />

      <p>{status}</p>
    </div>
  );
}

export default App;
