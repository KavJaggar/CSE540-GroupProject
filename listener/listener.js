import { ethers } from "ethers";
import fs from "fs";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open({
  filename: './events.db',
  driver: sqlite3.Database
});

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
    await db.run(
        `INSERT OR REPLACE INTO products (id, owner, batchId, metadataUri, status, createdAt)
         VALUES (?, ?, ?, ?, ?, ?)`,
        tx.id,
        tx.owner,
        tx.batchId,
        tx.metadataUri,
        'Delivered',
        tx.createdAt
    );
    console.log("Inserted into database:", tx.id);
    console.log("-------------------------------------");
});