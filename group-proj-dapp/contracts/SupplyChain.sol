// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title SupplyChainProvenance (Draft)
/// @notice Blockchain-based product tracking for the CSE540 project.

contract SupplyChainProvenance {
    enum Status { Unknown, Originated, Shipped, InStorage, Delivered }

    struct Product {
        uint256 id;
        address owner;
        string batchId;
        string metadataUri;
        Status status;
        uint256 createdAt;
    }

    uint256 private nextId = 1;
    mapping(uint256 => Product) public products;
    mapping(address => bool) public producers;
    mapping(address => bool) public distributors;
    mapping(address => bool) public retailers;
    address public admin;

    event ProductCreated(uint256 indexed id, address indexed owner, string batchId);
    event OwnershipTransferred(uint256 indexed id, address indexed from, address indexed to);
    event StatusUpdated(uint256 indexed id, Status status);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyProducer() {
        require(producers[msg.sender], "Only producer");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setProducer(address _addr, bool _ok) external onlyAdmin {
        producers[_addr] = _ok;
    }

    function setDistributor(address _addr, bool _ok) external onlyAdmin {
        distributors[_addr] = _ok;
    }

    function setRetailer(address _addr, bool _ok) external onlyAdmin {
        retailers[_addr] = _ok;
    }

    function registerProduct(string calldata batchId, string calldata metadataUri)
        external
        onlyProducer
        returns (uint256)
    {
        uint256 id = nextId++;
        products[id] = Product({
            id: id,
            owner: msg.sender,
            batchId: batchId,
            metadataUri: metadataUri,
            status: Status.Originated,
            createdAt: block.timestamp
        });
        emit ProductCreated(id, msg.sender, batchId);
        return id;
    }

    function transferOwnership(uint256 id, address to) external {
        Product storage p = products[id];
        require(p.id != 0, "Product does not exist");
        require(p.owner == msg.sender, "Only owner can transfer");
        p.owner = to;
        emit OwnershipTransferred(id, msg.sender, to);
    }

    function updateStatus(uint256 id, Status newStatus) external {
        Product storage p = products[id];
        require(p.id != 0, "Product does not exist");
        require(
            msg.sender == p.owner || producers[msg.sender] || distributors[msg.sender] || retailers[msg.sender],
            "Not authorized"
        );
        p.status = newStatus;
        emit StatusUpdated(id, newStatus);
    }

    function getProduct(uint256 id) external view returns (Product memory) {
        return products[id];
    }
}
