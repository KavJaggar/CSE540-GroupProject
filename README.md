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
- If the last step (npx hardhat install) works without error, then all of the needed dependencies should be installed and set up as needed now.

## How to deploy:
- Start a local test blockchain by running:
    - npx hardhat node
- Open a new terminal instance and run:
    - npx hardhat run scripts/deploy.js --network localhost
- You should now see: SupplyChain deployed to: 0x.....
- Then Run:
    - npx hardhat console --network localhost
- You should now be able to interact with it in the console!
_____________________________________
- Open a new terminal and navigate to the frontend folder.
- Update the CONTRACT_ADDRESS field in contract.js to the outputted address of the contract from "npx hardhat run scripts/deploy.js --network localhost".
- npm install
- npm start
- This will run the react app and provide you with a link to access it in your browser.
- Once you have done this, install the MetaMask Chrome extension from the Chrome WebStore.
- Create an account and sign in.
- Click on the extension and navigate to the accounts menu.
- Click "Add Wallet" -> "Import an Account" -> Enter your Private Key from the "npx hardhat node" output.
- If you want to be the admin, enter the first account's private key.
- After completing this, select "Add Custom Network" and fill out the details based on the "npx hardhat node" output.
____________________________________
- Open a new terminal and navigate to the listener folder
- npm install
- node listener.js
- This will run the listener script and start storing the data.

## For grader :
The contract interface and draft contract with the implemented function code is avalable in:
- group-project-dapp/contracts/ISupplyChain.sol
- group-project-dapp/contracts/SupplyChain.sol

