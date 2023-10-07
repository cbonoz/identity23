// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract BlockreachContract {
    // owner
    address public owner;

    struct Profile {
        string handle;
        // string name;
        // string description;
        address owner;
        bool isVerified;
    }

    struct Inquiry {
        address sender;
        string handle;
        string message;
    }

    Inquiry[] public inquiries;
    mapping(string => Profile) public profiles;

    event InquirySent(address sender, string handle, string message, uint256 value);

    // constructor
    constructor() {
        owner = msg.sender;
    }

    // claim profile (must be unverified)
    function claimProfile(string memory _handle) public {
        Profile memory profile = profiles[_handle];
        require(!profile.isVerified, "Profile must be unverified");
        profile.handle = _handle;
        profile.owner = msg.sender;
        profile.isVerified = false;
        profiles[_handle] = profile;
    }


    // get profile
    function getProfile(string memory _handle) public view returns (Profile memory) {
        return profiles[_handle];
    }

    // send inquiry (profile must be verified). Add optional payment
    function sendInquiry(string memory _handle, string memory _message) public payable {
        Profile memory profile = profiles[_handle];
        require(profile.isVerified, "Profile must be verified");

        // If value on payment, transfer to profile owner.
        if (msg.value > 0) {
            payable(profile.owner).transfer(msg.value);
        }

        Inquiry memory inquiry = Inquiry(msg.sender, _handle, _message);
        inquiries.push(inquiry);
        emit InquirySent(msg.sender, _handle, _message, msg.value);
    }
   

    // verify profile (owner only)
    function verifyProfile(string memory _handle) public {
        require(msg.sender == owner, "Only owner can verify profile");
        Profile memory profile = profiles[_handle];
        profile.isVerified = true;
        profiles[_handle] = profile;
    }


}
