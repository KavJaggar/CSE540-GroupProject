import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const supplyChain = await SupplyChain.deploy();
  
  console.log("SupplyChain deployed to:", supplyChain.target); 
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
