// https://github.com/jpmorganchase/onyx-ssi-sdk
import {
    EthrDIDMethod,
    JWTService,
    KeyDIDMethod,
    createAndSignPresentationJWT,
    createCredential,
    createPresentation,
    getCredentialsFromVP,
    getSupportedResolvers,
    verifyDIDs,
    verifyPresentationJWT,
} from "@jpmorganchase/onyx-ssi-sdk";
import { ACTIVE_CHAIN } from "../constants";

const didKey = new KeyDIDMethod();
const ethrProvider = {
    name: ACTIVE_CHAIN.network,
    rpcUrl: ACTIVE_CHAIN.rpcUrls.default.http,
    registry: ACTIVE_CHAIN.contracts?.multicall3?.address,
}
// const ethrProvider = {
//     name: 'maticmum',
//     rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
//     registry: "0x41D788c9c5D335362D713152F407692c5EEAfAae"
// }
const didEthr = new EthrDIDMethod(ethrProvider);
const jwtService = new JWTService();

// type holder, issuer
export const createDid = async (handle, type) => {
    if (type === 'holder') {
        return await didKey.create();
    }

    return await didEthr.create();

}


// Issuer creates the VC (verified credential) for a new business.
// Could add more metadata to the VC re: company information.
export const createVC = async (handle, issuerEthrDid, holderDID) => {

    //create DID for VC to support Revocation of Credential
    const vcDID = await didEthr.create();

    const credentialType = "PROOF_OF_NAME";
    const subjectData = {
        handle
    };

    //vc id, expirationDate, credentialStatus, credentialSchema, etc
    const additionalParams = {
        id: vcDID.did,
    };

    console.log(`\nGenerating Verifiable Credential of type ${credentialType}\n`);


    const vc = createCredential(
        issuerEthrDid.did, holderDID.did, subjectData, [credentialType], additionalParams)
    console.log('vc', JSON.stringify(vc, null, 2))


    const jwtService = new JWTService()
    const jwtVC = await jwtService.signVC(issuerEthrDid.did, vc)
    console.log(jwtVC)
    return jwtVC;
}

// VC can create VP (verified presentation) to authenticate an action.
export const createVPfromVC = async (holderDID, signedVcJwt) => {
    console.log('vp')
    const vp = createPresentation(holderDID.did, [signedVcJwt])
    console.log(JSON.stringify(vp, null, 2))
    const holder = JSON.parse(holderDID)
    console.log('did', holder.did)

    const jwtVP = await jwtService.signVP(holder.did, vp)
    console.log(jwtVP)
    return jwtVP;
}

// VP can be verified by a verifier (the main app).
// https://github.com/jpmorganchase/onyx-ssi-sdk-examples/blob/main/src/verifier/verify.ts
export const verifyVP = async (signedVpJwt) => {

    const didResolver = getSupportedResolvers([didKey, didEthr]);

    console.log("\nReading an existing signed VP JWT\n");
    console.log(signedVpJwt);

    console.log("\nVerifying VP JWT\n");
    // Inovking the verification fuction from the sdk
    // To know more about verification and api reference please refer to readme in src > verifier > readme.md in the sdk
    const isVpJwtValid = await verifyPresentationJWT(
        signedVpJwt,
        didResolver
    );

    console.log("\nVP JWT verification result\n");
    console.log(isVpJwtValid);
    return isVpJwtValid
}

//create DID resolvers

