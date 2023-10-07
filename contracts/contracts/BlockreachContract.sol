// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract BlockreachContract {
    struct Business {
        string name;
        string description;
        address owner;
        bool isVerified;
    }

    struct Inquiry {
        address sender;
        string message;
    }

    Business[] public businesses;
    Inquiry[] public inquiries;

    mapping(address => bool) public verifiedBusinesses;

    event BusinessCreated(string name, string description, address owner);
    event BusinessVerified(address indexed owner, bool isVerified);
    event InquirySubmitted(address indexed sender, string message);

    function createBusiness(string memory _name, string memory _description) external {
        require(!verifiedBusinesses[msg.sender], "You already have a verified business profile.");
        businesses.push(Business({
            name: _name,
            description: _description,
            owner: msg.sender,
            isVerified: false
        }));
        verifiedBusinesses[msg.sender] = false;
        emit BusinessCreated(_name, _description, msg.sender);
    }

    function verifyBusiness() external {
        require(!verifiedBusinesses[msg.sender], "Your business is already verified.");
        verifiedBusinesses[msg.sender] = true;
        emit BusinessVerified(msg.sender, true);
    }

    function submitInquiry(string memory _message) external {
        require(verifiedBusinesses[msg.sender], "Your business is not verified.");
        inquiries.push(Inquiry({
            sender: msg.sender,
            message: _message
        }));
        emit InquirySubmitted(msg.sender, _message);
    }

    function getBusinessCount() external view returns (uint256) {
        return businesses.length;
    }

    function getInquiryCount() external view returns (uint256) {
        return inquiries.length;
    }
}
