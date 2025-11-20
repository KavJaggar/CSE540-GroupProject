import { ethers } from "ethers";
import SupplyChainABI from "../contracts/SupplyChain.json"; 

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function getContract() {

  // Prompt user to connect wallet
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Create ethers provider and signer from MetaMask
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Create contract instance
  const contract = new ethers.Contract(CONTRACT_ADDRESS, SupplyChainABI.abi, signer);

  // Get bytecode at the contract address
  //const code = await provider.getCode(CONTRACT_ADDRESS);
  //console.log(code);
    

  return contract;
}
