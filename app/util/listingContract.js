import { REACH_CONTRACT} from "./metadata";
import { POLICY_CONTRACT } from "./policy";
import { ADMIN_ADDRESS } from "../constants";
import { ContractFactory } from "zksync-web3";

export async function deployPolicy(signer) {
    // Deploy contract with ethers
    const factory = new ContractFactory(
        POLICY_CONTRACT.abi,
        POLICY_CONTRACT.bytecode,
        signer
    );
    const contract = await factory.deploy(); // must match contract.
    // log
    console.log("Deploying policy contract...");
    await contract.deployed();
    console.log("deployed policy contract...", contract.address);
    return contract;
}

export async function deployContract(signer, cid, price) {
    // Deploy contract with ethers
    const factory = new ContractFactory(
        REACH_CONTRACT.abi,
        REACH_CONTRACT.bytecode,
        signer
    );
    const contract = await factory.deploy(cid, price, ADMIN_ADDRESS); // must match contract.
    // log
    console.log("Deploying contract...", cid, price);
    await contract.deployed();
    console.log("deployed contract...", contract.address);
    return contract;
}

export async function purchaseContract(signer, contractAddress, price) {
    // Deploy contract with ethers
    const contract = new Contract(
        contractAddress,
        REACH_CONTRACT.abi,
        signer
    );
    // log
    const tx = await contract.purchaseAccess({ value: price });
    await tx.wait();
    console.log("Purchased contract...", tx);
    const result = await contract.purchaseAccess.call();
    return {cid: result};
}

export const getMetadata = async (signer, address) => {
    const contract = new Contract(
        address,
        REACH_CONTRACT.abi,
        signer
    );
    const result = await contract.getMetadata.call();
    return result;
}