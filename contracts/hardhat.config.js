// import "@matterlabs/hardhat-zksync-deploy";
// import "@matterlabs/hardhat-zksync-solc";

module.exports = {
  zksolc: {
    version: "latest", // Uses latest available in https://github.com/matter-labs/zksolc-bin/
    settings: {},
  },
  defaultNetwork: "zkSyncTestnet",
  networks: {
    hardhat: {
      zksync: false,
    },
    goerli: {
      url: "https://goerli.com/api/abcdef12345",
      zksync: false,
    },
    mainnet: {
      url: "https://ethereum.mainnet.com/api/abcdef12345",
      zksync: false,
    },
    zkSyncTestnet: {
      url: "https://testnet.era.zksync.dev",
      ethNetwork: "goerli", // or a Goerli RPC endpoint from Infura/Alchemy/Chainstack etc.
      zksync: true,
    },
  },
  solidity: {
    version: "0.8.13",
  },
  // OTHER SETTINGS...
};

