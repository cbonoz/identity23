export const APP_NAME = 'Blockreach'
export const APP_DESC = 'Blockreach is a landing page index of verified business web3 profiles'

export const ACTIVE_CHAIN = {
    id: 314159,
    name: 'Filecoin Calibration',
    symbol: 'tFIL',
    blockTimeSeconds: 30,
    rpc: 'https://calibration.node.glif.io/',
    explorerUrl: 'https://calibration.filscan.io/',
}

export const LISTING_TABLE = process.env.NEXT_PUBLIC_LISTING_TABLE;
export const OFFER_TABLE = process.env.NEXT_PUBLIC_OFFER_TABLE;

export const EXAMPLE_ITEM = {
}

// Create a time series data set of 10 data points with random values between 1 and 5 to one decimal.
  // ["2023-05-01", 1], ...
export const EXAMPLE_OFFERS = [["2023-05-01", ], ["2023-06-01", 2], ["2023-07-01", 3], ["2023-08-01", 4], ["2023-09-01", 5], ["2023-9-04", 4], ["2023-9-06", 3], ["2023-12-01", 2], ["2024-01-01", 1], ["2024-02-01", 2]].map(x => [x[0], x[1] / 100])

export const generateItem = () => {
    return {
        ...EXAMPLE_ITEM,
        id: Math.round(Math.random() * 100000000),
        createdAt: Date.now(), // timestamp
        price: Math.round(Math.random() * 10) / 10
    }
}

// export const IPFS_BASE_URL = 'https://ipfs.filebase.io/ipfs'
// export const IPFS_BASE_URL = 'https://gateway.pinata.cloud/ipfs'
export const IPFS_BASE_URL = 'https://saturn.ms/ipfs'

export const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS
