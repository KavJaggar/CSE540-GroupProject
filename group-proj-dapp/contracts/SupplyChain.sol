// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "./ISupplyChain.sol";

/// @title SupplyChainProvenance (Draft/ Not Final)
/// @notice Blockchain-based product tracking for the CSE540 project.

contract SupplyChain{

    //This enum lists all of the different possible status tags that a product can have at any point along the supply chain
    enum Status { Unknown, Ordered, Shipped, InStorage, Delivered } 

    //Product struct storing all of the different notable attributes of a product while in the supply chain
    struct Product {
        uint256 id;
        address owner;
        string batchId;
        string metadataUri;
        Status status;
        uint256 createdAt;
    }
    //Creates a counter variable to assign new product ids by just incrementing up by 1 after the assignment
    uint256 private nextId = 1;

    //Creates mappings for all of the products so that they can be easily retrieved. Also creates mappings for holding the role assignments of
    //manufacturers, distributors, and retailers(usually only 1). Also includes a mapping for certifiers who are responsible for providing certificates/ validation
    //that an item is actually present on the blockchain
    mapping(uint256 => Product) public products;
    mapping(address => bool) public manufacturer;
    mapping(address => bool) public distributors;
    mapping(address => bool) public retailers;
    mapping(address => bool) public certifiers;

    //variable to store the address of the admin which is just set to msg.sender in the constructor later
    address public admin;

    //test variable
    uint256 public test = 1;

    //sets up the three events that will be emitted. one for a product being created. one for the ownership of a product being transferred to someone else along
    //the supply chain. and one for the status of the product being updated to one in the status enum declared above.
    event ProductCreated(uint256 indexed id, address indexed owner, string batchId);
    event OwnershipTransferred(uint256 indexed id, address indexed from, address indexed to);
    event StatusUpdated(uint256 indexed id, Status status);

    //creates a modifier to use for functions only meant to be ran by the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    //creates a modifier for functions only meant to be ran by manufacturers
    modifier onlyManufacturer() {
        require(manufacturer[msg.sender], "Only producer");
        _;
    }

    //creates a modifier for functions only meant to be ran by certifiers
    modifier onlyCertifier() {
        require(certifiers[msg.sender], "Only certifier");
        _;
    }

    //this constructor sets the deployer of the contract to the admin when it is first deployed. gives us permission as the admin when we deploy.
    constructor() {
        admin = msg.sender;
    }

    //function allowing only the admin to assign people as manufacturers
    function setManufacturer(address _addr, bool _ok) external onlyAdmin {
        manufacturer[_addr] = _ok;
    }

    //function allowing only the admin to assign people as distributors
    function setDistributor(address _addr, bool _ok) external onlyAdmin {
        distributors[_addr] = _ok;
    }

    //function allowing only the admin to assign people as retailers
    function setRetailer(address _addr, bool _ok) external onlyAdmin {
        retailers[_addr] = _ok;
    }

    //function allowing only the admin to assign people as certifiers. certifiers/ regulators must have the ability to access all data on the chain, so they 
    //must be added to every role in addition to the certifier one. often times, the admin also must be a certifier.
    function setCertifier(address _addr, bool _ok) external onlyAdmin {
        certifiers[_addr] = _ok;
        manufacturer[_addr] = _ok;
        distributors[_addr] = _ok;
        retailers[_addr] = _ok;
        
    }

    //function allowing only manufacturers to register products. the function registers the product based on the provided parameters
    //and then returns the id of the product that was just registered
    function registerProduct(string calldata batchId, string calldata metadataUri) external onlyManufacturer returns (uint256)
    {
        uint256 id = nextId++;
        products[id] = Product({
            id: id,
            owner: msg.sender,
            batchId: batchId,
            metadataUri: metadataUri,
            status: Status.Ordered,
            createdAt: block.timestamp
        });
        emit ProductCreated(id, msg.sender, batchId);
        return id;
    }

    //function that allows the owner of a product to transfer its ownership to someone else. emits an event stating the id of the product and who transferred its ownership
    //and to who it was transferred to
    function transferOwnership(uint256 id, address to) external {
        Product storage p = products[id];
        require(p.id != 0, "Product does not exist");
        require(p.owner == msg.sender, "Only owner can transfer");
        p.owner = to;
        emit OwnershipTransferred(id, msg.sender, to);
    }

    //function that allows the owner of the product to update the status of the product. also allows the admin to do so in the event of the product being misplaced or
    //lost somewhere along the way and requiring manual intervention to correct the information. emits an event stating which product was updated and what the status was updated to.
    function updateStatus(uint256 id, Status newStatus) external {
        Product storage p = products[id];
        require(p.id != 0, "Product does not exist");
        require(
            msg.sender == p.owner || msg.sender == admin,
            "Not authorized"
        );
        p.status = newStatus;
        emit StatusUpdated(id, newStatus);
    }

    //returns a product given a product id. can be called by anyone with access.
    function getProduct(uint256 id) external view returns (Product memory) {
        return products[id];
    }

    //returns a boolean value letting the user know if the product was able to be certified as owned by them or not. only callable by the certifier role. can later be modified
    //to actually store a certificate code of some sort on-chain
    function certifyProduct(uint256 id, address owner) external onlyCertifier view returns (bool){
        Product storage p = products[id];
        if (p.id == id && p.owner == owner)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
