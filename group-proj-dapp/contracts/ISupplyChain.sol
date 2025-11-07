// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISupplyChain {
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
    
    //sets up the three events that will be emitted. one for a product being created. one for the ownership of a product being transferred to someone else along
    //the supply chain. and one for the status of the product being updated to one in the status enum declared above.
    event ProductCreated(uint256 indexed id, address indexed owner, string batchId);
    event OwnershipTransferred(uint256 indexed id, address indexed from, address indexed to);
    event StatusUpdated(uint256 indexed id, Status status);

    //function allowing only the admin to assign people as manufacturers
    function setManufacturer(address _addr, bool _ok) external;

    //function allowing only the admin to assign people as distributors
    function setDistributor(address _addr, bool _ok) external;

    //function allowing only the admin to assign people as retailers
    function setRetailer(address _addr, bool _ok) external;

    //function allowing only manufacturers to register products. the function registers the product based on the provided parameters
    //and then returns the id of the product that was just registered
    function registerProduct(string calldata batchId, string calldata metadataUri) external returns (uint256);

    //function that allows the owner of a product to transfer its ownership to someone else. emits an event stating the id of the product and who transferred its ownership
    //and to who it was transferred to
    function transferOwnership(uint256 id, address to) external;

    //function that allows the owner of the product to update the status of the product. also allows the admin to do so in the event of the product being misplaced or
    //lost somewhere along the way and requiring manual intervention to correct the information. emits an event stating which product was updated and what the status was updated to.
    function updateStatus(uint256 id, Status newStatus) external;

    //returns a product given a product id. can be called by anyone with access.
    function getProduct(uint256 id) external view returns (Product memory);


}