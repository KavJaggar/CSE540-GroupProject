import { ethers } from "ethers";
import fs from "fs";

const provider = new ethers.JsonRpcProvider("http://localhost:8545");

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const contractJson = JSON.parse(fs.readFileSync("./SupplyChain.json"));
const abi = contractJson.abi;

const contract = new ethers.Contract(contractAddress, abi, provider);

const statusTags = {"Unknown" : 1, "Ordered" : 2, "Shipped" : 3, "InStorage" : 4, "Delivered" : 5};
const statusTagsRev = {1 : "Unknown", 2 : "Ordered", 3 : "Shipped", 4 : "InStorage", 5 : "Delivered"};

//Listen forever for ONLY status changes
contract.on("StatusUpdated", async (id, status, event) => {

    const tx = await contract.getProduct(id);  

    console.log("New StatusUpdated Event Detected!\n");

    console.log(`ID: ${tx.id}`);
    console.log(`Owner: ${tx.owner}`);
    console.log(`Batch ID: ${tx.batchId}`);
    console.log(`Metadata URI: ${tx.metadataUri}`);
    console.log(`Status: ${statusTagsRev[tx.status]}`);

    console.log("-------------------------------------");
});