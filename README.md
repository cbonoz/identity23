<br/>
<p align='center'>
    <img src='./public/logo.png' width=400 />
</p>
<br/>

Blockreach
---

A modern Yellowpages for verified web3 businesses.

Create verifiable business landing pages where potential prospects can reach out to you in exchange for paying a known fee.

### Inspiration

Blockreach also enables secure B2B communication where both parties are known to be contacting an authorized source (and not an impersonator) by using a Blockreach issued verifiable credential (VC).

Accounts have an additional layer of security through Blockreach-issued DIDs and VCs for each verified partner on the ap.

Salespeople and partners are constantly looking for ways to get in contact with a business or make themselves known.

With blockreach, your business can create a free (or paid) secured contact page where folks can interest with a business provisioned smart contract all managed by the blockreach app.




## What it does

Master smart contract for the Blockreach application creates custom urls.

### Core functions
* Create business landing page
* Issuer (indicated by Blockreach admin) issues a VC to a newly registered business


## Configuration

Specify the following environment variables
<pre>
NEXT_PUBLIC_BLOCKREACH_CONTRACT= // address of new contract or use existing.
NEXT_PUBLIC_ADMIN_ADDRESS= // address of new contract or use existing.
</pre>

### Existing contract
https://goerli.explorer.zksync.io/address/0xf52c4F91ab2784200a68296b4c882Ee1520f20cf


## Technologies used

Blockreach pulls information from LENS to create a verified profile page for the business with contact information using Onyx and LENS. Zero/low fee interactions with the verified business account interactions facilitated with a paymaster ZkSync that refunds gas fees.

* JPM Onyx sdk: Social Identity Integration and Finance and Identity integration. The Onyx SDK is used for two key pieces.

1. Blockreach app has an admin ssue and verifier account that is stored server side and used to validate new business page creations.
2. These accounts verify all new page requests and generate unique keys that are saveable by the page owner once successfully verified.

These actions are all available from the `/admin` admin route when authenticated with an app wallet matching the admin address and should be the owner of the master contract as well.

* LENS: Pull business social profile information and recent history automatically. Enables landing pages without recreating information or social reputation from scratch.

* ZkSync: Zero fee outreach, low fee contract deploys and auditable trail for all businesses. A master smart contract is deployed for the app that manages metadata and the verifiable statuses for each business or entity on the platform. Payments are also mediated through this contract between visitors to the app and the profile page account owners.

 <p>Note this project is a hackathon prototype and would require additional work to be mainnet/production ready.</p>

## Running the project (from scratch)

1. Copy `.env.sample` -> `.env`

2. Define the the fields to your desired management and contract address in `.env`. To create a contract use 

3. `yarn; yarn dev`. The app should now be running on port 3000.

4. Go to `localhost:3000/admin`. Connect your wallet using the same address from step 3. Note other pages will not be functional yet.

5. Deploy tables and copy table values to `.env`. Fill in remaining `.env` values.

6. Restart the server and test locally.

7. Do a production build and deployment following the below.

Any repeated starts can be done with `yarn dev` once all variables set.

### Deployment build

This project is currently deployed with vercel.

## Challenges we ran into

## Accomplishments that we're proud of

## What we learned

### Screenshots
![Alt text](img/verified.png) ![Alt text](img/vc.png) ![Alt text](img/tx.png) ![Alt text](img/inquiry.png) ![Alt text](img/home.png) ![Alt text](img/history.png) ![Alt text](img/did.png) ![Alt text](img/deploy.png) ![Alt text](img/claim.png) ![Alt text](img/contract.png)

<!-- Social Identity Integration -->

<!-- Live Demo: https://data-x.surge.sh (calibration)

Demo video: https://youtu.be/QQEwZOEAQjI -->


## Potential future work


<!-- https://github.com/andrewszucs/onyx-hackathon-zktoro/blob/896ccf4b72fffba305d9e263b7fcd243aefd5ae2/src/app/api/vc/route.ts -->
### Useful links

* https://www.encode.club/digital-identity-hackathon
* https://www.w3.org/TR/did-core/
* https://www.w3.org/TR/vc-data-model/
* https://era.zksync.io/docs/reference/concepts/account-abstraction.html#introduction