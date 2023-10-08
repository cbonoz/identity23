// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {IPaymaster, ExecutionResult, PAYMASTER_VALIDATION_SUCCESS_MAGIC} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymaster.sol";
import {IPaymasterFlow} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymasterFlow.sol";
import {TransactionHelper, Transaction} from "@matterlabs/zksync-contracts/l2/system-contracts/libraries/TransactionHelper.sol";

import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockreachContract is IPaymaster, Ownable {
        modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this method"
        );
        // Continue execution if called from the bootloader.
        _;
    }

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    )
        external
        payable
        onlyBootloader
        returns (bytes4 magic, bytes memory context)
    {
        // By default we consider the transaction as accepted.
        magic = PAYMASTER_VALIDATION_SUCCESS_MAGIC;
        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );

        bytes4 paymasterInputSelector = bytes4(
            _transaction.paymasterInput[0:4]
        );
        if (paymasterInputSelector == IPaymasterFlow.general.selector) {
            // Note, that while the minimal amount of ETH needed is tx.gasPrice * tx.gasLimit,
            // neither paymaster nor account are allowed to access this context variable.
            uint256 requiredETH = _transaction.gasLimit *
                _transaction.maxFeePerGas;

            // The bootloader never returns any data, so it can safely be ignored here.
            (bool success, ) = payable(BOOTLOADER_FORMAL_ADDRESS).call{
                value: requiredETH
            }("");
            require(
                success,
                "Failed to transfer tx fee to the Bootloader. Paymaster balance might not be enough."
            );
        } else {
            revert("Unsupported paymaster flow in paymasterParams.");
        }
    }

    function postTransaction(
        bytes calldata _context,
        Transaction calldata _transaction,
        bytes32,
        bytes32,
        ExecutionResult _txResult,
        uint256 _maxRefundedGas
    ) external payable override onlyBootloader {}

    function withdraw(address payable _to) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = _to.call{value: balance}("");
        require(success, "Failed to withdraw funds from paymaster.");
    }

    receive() external payable {}

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
        uint256 value;
    }

    Inquiry[] public inquiries;
    mapping(string => Profile) public profiles;

    event InquirySent(address sender, string handle, string message, uint256 value);

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
            payable(profile.owner).call{value: msg.value}("");
        }

        Inquiry memory inquiry = Inquiry(msg.sender, _handle, _message, msg.value);
        inquiries.push(inquiry);
        emit InquirySent(msg.sender, _handle, _message, msg.value);
    }
   

    // verify profile (owner only)
    function verifyProfile(string memory _handle) public onlyOwner {
        Profile memory profile = profiles[_handle];
        profile.isVerified = true;
        profiles[_handle] = profile;
    }


}
