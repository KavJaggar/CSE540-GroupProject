# CSE540-GroupProject
## Description: 
This project implements a blockchain-based supply chain provenance system using Solidity and Hardhat. It ensures transparency and traceability in product movement by recording creation, ownership transfer, and delivery updates on the blockchain. The system allows manufacturers, distributors, and retailers to maintain verifiable product records throughout the supply chain. This project also provides the important ability for people to openly track the sales of specific products on the blockchain. Many online retail marketplaces do not provide this data access, making it extremely hard for manufacturers to see the sales figures of products other than their own. This allows for a truly open marketplace where product sales figures can be collected and analyzed in order to make more informed product marketing and development decisions.

## Dependencies and Setup Steps:
- Create a folder and clone this repo into that folder.
- Navigate to the group-proj-dapp folder within your chosen folder
- Install nvm if you do not have it
- Run to install the preferred node version:
    - nvm install 22
    - nvm use 22
- Run:
    - npm install
    - npx hardhat compile
- If the last setp (npx hardhat install) works without error, then all of the needed dependencies should be installed and setup as needed now.

## How to deploy (TO CHANGE AS PROJECT DEVELOPMENT CONTINUES):
- Start a local test blockchain by running:
    - npx hardhat node
- Open a new terminal instance and run:
    - npx hardhat run scripts/deploy.js --network localhost
- You should now see: SupplyChain deployed to: 0x.....
- Then Run:
    - npx hardhat console --network localhost
- You should now be able to interact with it in the console!

## For grader:
The contract interface and draft contract with some implemented function code is avalable in:
- group-project-dapp/contracts/ISupplyChain.sol
- group-project-dapp/contracts/SupplyChain.sol

