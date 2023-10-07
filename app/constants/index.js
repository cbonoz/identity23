import { zkSyncTestnet } from "viem/chains";

export const APP_NAME = 'Blockreach'
export const APP_DESC = 'Blockreach is a landing page index of verified business web3 profiles'

export const CHAIN_OPTIONS = [
    zkSyncTestnet
]

export const ACTIVE_CHAIN = CHAIN_OPTIONS[0]


export const EXAMPLE_ITEM = {
}

export const IPFS_BASE_URL = 'https://ipfs.filebase.io/ipfs'

export const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS
