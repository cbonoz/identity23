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

Salespeople are constantly looking for ways to get in contact with a business or make themselves known.

With blockreach, your business can create a free (or paid) secured contact page where folks can interest with a business provisioned smart contract all managed by the blockreach app.

Blockreach also enables secure B2B communication where both parties are known to be contacting an authorized source (and not an impersonator) by using a Blockreach issued verifiable credential (VC).

Blockreach pulls information from 



## What it does

Master smart contract for the Blockreach application creates custom urls.

### Core functions
* Create business landing page
* Issuer (indicated by Blockreach admin) issues a VC to a newly registered business


## Configuration

Specify the following environment variables
<pre>
    NEXT_PUBLIC_ISSUER_ADDRESS

</pre>




## Technologies used
Onyx sdk: Social Identity Integration and Finance and Identity integration

<!-- Saturn: Data validation (using browser client). https://github.com/filecoin-saturn/browser-client -->

 <p>Note this project is a hackathon prototype and would require additional work to be mainnet/production ready.</p>


## Running the project (from scratch)

1. Copy `.env.sample` -> `.env`

2. Define the `NEXT_PUBLIC_ADMIN_ADDRESS` to your desired management address in `.env`. This account will be used to set up the app tables and verify submitted listings.

3. `yarn; yarn dev`. The app should now be running on port 3000.

4. Go to `localhost:3000/admin`. Connect your wallet using the same address from step 3. Note other pages will not be functional yet.

5. Deploy tables and copy table values to `.env`. Fill in remaining `.env` values.

6. Restart the server and test locally.

7. Do a production build and deployment following the below.

Any repeated starts can be done with `yarn dev` once all variables set.

### Deployment build

This command deploys the build site to surge.sh by default, feel free to edit to your desired deployment destination in `package.json`.

`yarn build; yarn deploy`

<!-- ## Challenges we ran into

## Accomplishments that we're proud of

## What we learned -->

### Screenshots
![Alt text](<img/Screenshot 2023-09-26 at 9.58.12 PM.png>) ![Alt text](<img/Screenshot 2023-09-26 at 9.56.06 PM.png>) ![Alt text](<img/Screenshot 2023-09-26 at 9.56.15 PM.png>) ![Alt text](<img/Screenshot 2023-09-26 at 9.56.31 PM.png>) ![Alt text](<img/Screenshot 2023-09-26 at 9.56.37 PM.png>) ![Alt text](<img/Screenshot 2023-09-26 at 9.57.44 PM.png>) ![Alt text](<img/Screenshot 2023-09-26 at 9.57.51 PM.png>) ![Alt text](<img/Screenshot 2023-09-26 at 9.57.56 PM.png>) ![Alt text](<img/Screenshot 2023-09-26 at 10.02.57 PM.png>)


<!-- Social Identity Integration -->

<!-- Live Demo: https://data-x.surge.sh (calibration)

Demo video: https://youtu.be/QQEwZOEAQjI -->


## Potential future work


### Useful links
* https://www.encode.club/digital-identity-hackathon
* https://www.w3.org/TR/did-core/
* https://www.w3.org/TR/vc-data-model/
* https://era.zksync.io/docs/reference/concepts/account-abstraction.html#introduction