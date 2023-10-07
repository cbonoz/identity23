import { REACH_CONTRACT} from "./metadata";
import { ADMIN_ADDRESS } from "../constants";
import { ContractFactory } from "zksync-web3";


// https://era.zksync.io/docs/reference/concepts/account-abstraction.html#building-custom-accounts
export async function deployContract(signer) {
    // Deploy contract with ethers
    const factory = new ContractFactory(
        REACH_CONTRACT.abi,
        REACH_CONTRACT.bytecode,
        signer,
        "createAccount"
    );
    const contract = await factory.deploy();
    // log
    console.log("Deploying contract...");
    await contract.deployed();
    console.log("deployed contract...", contract.address);
    return contract;
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