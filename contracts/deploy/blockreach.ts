import { utils, Wallet, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const provider = new Provider("https://testnet.era.zksync.dev");

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script`);
  const walletPrivateKey = process.env.TEST_WALLET_KEY;
  if (walletPrivateKey === undefined) {
    throw new Error("Please set TEST_WALLET_KEY environment variable");
  }

  // Initialize the wallet.
  const wallet = new Wallet(walletPrivateKey);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  // Load contract
  const artifact = await deployer.loadArtifact("BlockreachContract");

  // Deploy this contract. The returned object will be of a `Contract` type,
  // similar to the ones in `ethers`.
//   const greeting = "Hi there!";
  // `greeting` is an argument for contract constructor.
  const reachContract = await deployer.deploy(artifact, []);

  // Show the contract info.
  console.log(`${artifact.contractName} was deployed to ${reachContract.address}`);

  console.log("Funding paymaster with ETH");
  // Supplying paymaster with ETH
  await (
    await deployer.zkWallet.sendTransaction({
      to: reachContract.address,
      value: ethers.utils.parseEther("0.0025"),
    })
  ).wait();

  let paymasterBalance = await provider.getBalance(reachContract.address);

  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);

}