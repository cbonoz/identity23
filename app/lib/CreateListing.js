'use client'

import React, { useEffect, useState } from "react";
import { Button, Input, Row, Col, Steps, Result, Divider, Checkbox, Card, Image } from "antd";
import { listingUrl, ipfsUrl, getExplorerUrl, humanError, isEmpty, } from "../util";
import { uploadFiles } from "../util/stor";
import { ACTIVE_CHAIN, APP_NAME } from "../constants";
import { ethers } from "ethers";
import { deployContract } from "../util/profileContract";

const { Step } = Steps;

function CreateListing() {

  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const setDemo = () => setData({ ...data })

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const getActiveError = (data) => {
    if (!data.name || !data.description || !data.price) {
      return "Please provide a name, description, price for the item.";
    }

    if (!data.useCid && isEmpty(data.files)) {
      return "Must add at least one file";
    } else if (data.useCid && isEmpty(data.cid)) {
      return "Must provide a CID for the dataset";
    }

    return undefined
  };

  const errMessage = getActiveError(data);

  const create = async () => {
    setError(undefined);

    if (errMessage) {
      setError(errMessage)
      return;
    }

    if (!provider) {
      setError(`Please connect a valid ${ACTIVE_CHAIN.name} wallet`);
      return;
    }

    setLoading(true);
    const body = { ...data };
    if (!isEmpty(body.keywords)) {
      body['description'] = `${body.description}} | {${body.keywords}}}`
    }

    // Format files for upload.
    const files = (body.files || []).map((x) => {
      return x;
    });

    let res = { ...data };

    try {
      // TODO: add step 1/2 once tableland indexing ready.
      // 1) Create files/metadata to ipfs.
      let cid = data.cid
      if (!data.useCid) {
        if (!isEmpty(data.files)) {
          cid = await uploadFiles(
            files,
            res
          );
        } else {
          throw new Error("No files found");
        }
      }

      // 2) deploy contract with initial metadata
      let contract;
      const priceWei = ethers.utils.parseEther(res.price.toString()).toString();
      contract = await deployContract(provider.signer, cid, priceWei);
      // contract = {
      //   address: '0x1234'
      // }
      res["cid"] = cid;
      res["contract"] = contract.address;
      res["listingUrl"] = listingUrl(contract.address || cid);
      res["contractUrl"] = getExplorerUrl(contract.address);

      // 3) create table entry
      const listing = { ...data } // TODO: set all fields.
      listing['address'] = contract.address;
      // Result rendered after successful doc upload + contract creation.
      setResult(res);
    } catch (e) {
      console.error("error creating blockreach request", e);
      const message = e.reason || e.response?.message || e.message
      setError(humanError(message))
    } finally {
      setLoading(false)
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (!errMessage) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <div className="centered standard-margin">
            <Image src="logo.png" alt="Blockreach Logo" width={180} height={37} />
            <h3>Create new business listing</h3>
            <br />
            <br />
          </div>
        </Col>
      </Row>

      <Row>

        <Col span={16}>

          <div className="create-form white boxed">
            {!result && <>
              <h3 className="vertical-margin">General Information:</h3>
              <a href="#" onClick={e => {
                e.preventDefault()
                setDemo()
              }}>Set demo values</a>
              <Divider />

              <div>

                <Button
                  type="primary"
                  className="standard-button"
                  onClick={create}
                  disabled={loading || errMessage}
                  loading={loading}
                  size="large"
                >
                  Create Listing
                </Button>

                {!error && !result && loading && (
                <span className="italic">&nbsp;Deploying a listing contract. Confirmation may take a few moments.</span>
              )}
                <Divider/>

                <p className="bold">Note: Listings are considered unverified until confirmed by an admin of {APP_NAME} after posting.

                </p>
              </div>
      
              <br />
              <br />
            </>}
            {error && <div className="error-text">Error: {error}</div>}
            {result && (<div>
              <Result status="success"
                title="Listing created! Confirm last transaction to index the result" subTitle="Access your data page and content below. It may take a few minutes to confirm the listing on the network." />
              <div>
                <Button href={ipfsUrl(result.cid)} target="_blank">
                  Download files
                </Button>
                 {/* (download secure <a href="https://spec.filecoin.io/systems/filecoin_files/piece/#:~:text=In%20order%20to%20make%20a,un%2DCAR'ed%20constructions." target="_blank">.car</a> format) */}
                <br />
                <a href={result.contractUrl} target="_blank">
                  View created contract
                </a>
                <br />
                <br />
                <p>
                  Share or post this page with potential buyers:
                  <br />
                  <a href={result.listingUrl} target="_blank">
                    View listing page 
                  </a> (the listing may take a few minutes to become available on the network).
                </p>
              </div>
            </div>
            )}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              items={[{
                title: 'Fill in fields',
                description: 'Enter required data.'
              }, {
                title: `Create ${APP_NAME} listing`,
                description: 'Deploys a smart contract and creates a purchase page for the dataset'
              }, {
                title: 'Use the generated purchase page to sell your data',
              }]}
              current={getStep()}
            >
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreateListing.propTypes = {};

export default CreateListing;