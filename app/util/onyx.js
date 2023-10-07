// https://github.com/jpmorganchase/onyx-ssi-sdk

// Issuer creates the VC (verified credential) for a new business.
export const createVC = async () => {
    const ethrProvider = {
        name: 'maticmum', 
        rpcUrl: 'https://rpc-mumbai.maticvigil.com/', 
        registry: "0x41D788c9c5D335362D713152F407692c5EEAfAae"
    }
    
    const didEthr = new EthrDIDMethod(ethrProvider)
    const holderEthrDid = await didEthr.create();
}

// VC can create VP (verified presentation) to authenticate an actin.
export const createVPfromVC = async () => {


}

// VP can be verified by a verifier (the main app).
export const verifyVP = async () => {
//create DID resolvers
}

