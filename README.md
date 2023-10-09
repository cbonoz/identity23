<br/>
<p align='center'>
    <img src='./public/logo.png' width=400 />
</p>
<br/>

Blockreach
---

A modern Yellowpages for verified web3 businesses.

Blockreach is a contemporary platform akin to Yellowpages amd tailored for verified web3 individuals and businesses. It serves as a bridge for secure B2B communication, ensuring that both parties can be confident they are contacting an authorized source. This assurance is achieved through Blockreach-issued verifiable credentials (VCs) and decentralized identifiers.

Live Demo (testnet, must be connected to Zksync Era): blockreach.vercel.com

Demo Video: 

### Inspiration

Accounts have an additional layer of security through Blockreach-issued DIDs and VCs for each verified partner on the ap.

Salespeople and partners are constantly looking for ways to get in contact with a business or make themselves known. Blockreach addresses this need by enabling businesses to create their own secure contact pages, facilitating interactions via smart contracts managed through the Blockreach app. Furthermore, Blockreach enhances security by assigning Decentralized Identifiers (DIDs) and VCs to verified partners.

With blockreach, your business can create a free (or paid) secured contact page where folks can interest with a business provisioned smart contract all managed by the blockreach app.



## What it does

Blockreach enables secure B2B communication where both parties are known to be contacting an authorized source (and not an impersonator) by using a Blockreach issued verifiable credential (VC).


### Core functions
* Create business landing page
* Issuer (indicated by Blockreach admin) issues a VC to a newly registered business


### Existing contract
https://goerli.explorer.zksync.io/address/0xcA5ce6dAe1156E7e222cD4c6BE35F6D343b11886


## Running the project (from scratch)

1. Generate a new Zksync contract for Blockreach by calling `yarn; yarn deploy` from the contracts folder. This will deploy the paymaster contract for the app.

2. Copy `.env.sample` -> `.env`

3. Define the the fields to your desired management and paymaster contract address from (1) in `.env`.

4. `yarn; yarn dev`. The app should now be running on port 3000.

5. Go to `localhost:3000/admin`. Connect your wallet using the same address from step 3.

6. Update the `issuer` credential found in `issuer.js`

7. Provision keys for handles using this page.

Any repeated starts can be done with `yarn dev` once all variables set.

## Technologies used

Blockreach pulls information from LENS to create a verified profile page for the business with contact information using Onyx and LENS. Zero/low fee interactions with the verified business account interactions facilitated with a paymaster ZkSync that refunds gas fees.

* JPM Onyx sdk: Social Identity Integration and Finance and Identity integration. The Onyx SDK is used for two key pieces.

1. Blockreach app has an admin ssue and verifier account that is stored server side and used to validate new business page creations.
2. These accounts verify all new page requests and generate unique keys that are saveable by the page owner once successfully verified.

These actions are all available from the `/admin` admin route when authenticated with an app wallet matching the admin address and should be the owner of the master contract as well.

* LENS: Pull business social profile information and recent history automatically. Enables landing pages without recreating information or social reputation from scratch.

* ZkSync: L2 paymaster contract transactions and auditable trail for all activities on the app. A master smart contract is deployethat manages metadata and the verifiable statuses for each business or entity on the platform. Payments and peer to peer outreach are also mediated through this contract between visitors to the app and the profile page account owners.

 <p>Note this project is a hackathon prototype and would require additional work to be mainnet ready.</p>

## Challenges we ran into:

Blockchain Integration Complexity: Integrating blockchain technology, especially ZkSync, presented several challenges. Ensuring seamless interactions with minimal fees and maintaining the security of smart contracts required careful consideration and expertise.

Verifiable Credential Issuance: Developing a robust system for issuing and managing verifiable credentials while maintaining security was a significant challenge. Ensuring that only legitimate businesses and individuals requires a separate portal and due dilligence process managed with Onyx.

User Authentication/Verification: Implementing secure user authentication processes, especially for admin functions, required a high level of attention to detail to prevent unauthorized access.

Hackathon Time Constraints: As a prototype developed for a hackathon, there were time constraints that limited the depth of development and testing. This posed challenges in ensuring the platform's robustness.

## Accomplishments that we're proud of:

Verifiable Credentials Implementation: Successfully implementing a system for issuing verifiable credentials that enhances the trustworthiness of interactions on the platform was a significant achievement.

Zero-Fee Outreach: Successfully managed deployment and contract interactions on L2 testnet through ZkSync, enabling users to interact with businesses without incurring excessive fees, was a notable accomplishment.

LENS Integration: Integrating with LENS to automatically populate business profile information and social history reduced the burden on businesses and improved user experience.

Admin Functions: Creating an admin interface that allows for efficient verification of new business pages and the issuance of verifiable credentials demonstrated the platform's robustness.

## What we learned:

Blockchain Expertise: The project deepened our understanding of blockchain technology, particularly when it comes to implementing secure and efficient smart contracts.

Identity Management: We gained valuable insights into identity management in the context of web3, particularly the importance of verifiable credentials and decentralized identifiers.

User Experience: Developing an intuitive and user-friendly interface for businesses and users in the web3 space is a unique challenge, and we learned valuable lessons in this regard.


### Deployment build

This project is currently deployed with vercel.

![Alt text](img/vercel.png)


### Screenshots

These screenhots show different phases of the Blockreach application including a snippet of the primary contract, provisioning dids for users, and submitting inquiries for a verified account.

![Alt text](img/verified.png) ![Alt text](img/vc.png) ![Alt text](img/tx.png) ![Alt text](img/inquiry.png) ![Alt text](img/home.png) ![Alt text](img/history.png) ![Alt text](img/did.png) ![Alt text](img/deploy.png) ![Alt text](img/claim.png) ![Alt text](img/contract.png) ![Alt text](img/paymaster.png)
![Alt text](img/vc.png) ![Alt text](img/deploy.png)

## Potential future work
* Enhanced Security Measures: Implement advanced security features, such as multi-factor authentication and additional encryption layers, to fortify user data and interactions.
* Mainnet Deployment: Transition from the hackathon prototype to a fully functional and secure mainnet-ready platform for broader adoption.
* Integration with more identity and blockchain sources: Extend compatibility to multiple blockchains to provide users with options and flexibility when conducting verified transactions.
* Community Governance: Establish a governance model that empowers platform users to influence decision-making and ensure long-term sustainability.


<!-- https://github.com/andrewszucs/onyx-hackathon-zktoro/blob/896ccf4b72fffba305d9e263b7fcd243aefd5ae2/src/app/api/vc/route.ts -->
### Useful links

* https://www.encode.club/digital-identity-hackathon
* https://www.w3.org/TR/did-core/
* https://www.w3.org/TR/vc-data-model/
* https://era.zksync.io/docs/reference/concepts/account-abstraction.html#introduction