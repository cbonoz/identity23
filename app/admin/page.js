'use client';

import { Button, Card, Divider, Input } from "antd";
import { useState } from "react";
import { APP_NAME, OFFER_TABLE, LISTING_TABLE, ACTIVE_CHAIN } from "../constants";
import { deployContract } from "../util/profileContract";
import { useEthersSigner } from "../hooks/useEthersSigner";
import { postGenerateDid, postGenerateVC } from "../util/api";

export default function Admin() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [handle, setHandle] = useState()
    const [holderDid, setHolderDid] = useState()
    const [result, setResult] = useState({})

    const updateResult = (key, value) => {
        setResult({ ...result, [key]: value })
    }

    async function did() {
        try {
            const res = await postGenerateDid(handle)
            console.log('generated', res)
            updateResult('did', res)
        } catch (e) {
            console.error('generating did', e)
            // setError(e.message)
        }

    }

    async function generate() {
        try {
            const res = await postGenerateVC(handle, holderDid)
            console.log('generated', res)
            updateResult('vc', res)
        } catch (e) {
            console.error('generating vc', e)
            // setError(e.message)
        }
        // alert('TODO: generate verified credential for handle')

    }

    const signer = useEthersSigner({ chainId: ACTIVE_CHAIN.id })

    async function deploy() {
        setError()
        setLoading(true)
        try {
            const res = await deployContract(signer)
            updateResult('contract', res)
        } catch (e) {
            console.error('deploying master contract', e)
            setError(e.message)
        }
        setLoading(false)
    }

    return <div className="admin-page">
        <h1>Admin</h1>
        <br></br>
        <p>This page contains admin utilities for the {APP_NAME} application.</p>

        <Divider />

        <Card title='1. Deploy master contract'>
            <p>
                This will deploy the master contract for {APP_NAME}.
            </p>
            <Button type='primary' disabled={loading} loading={loading} onClick={deploy}>Deploy</Button>

            {result.contract && <div>
                <Divider />
                <p>Result</p>
                <pre>{JSON.stringify(result.contract, null, 2)}</pre>
            </div>}
        </Card>

        <br />

        <Card title='2. Generate DID (issuer and holder) keys' >
            <p>
                This will generate a new DID associated with the {ACTIVE_CHAIN.name} network.
            </p>
            {/* <Input
                value={handle}
                size='large'
                className='standard-padding standard-margin'
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Enter entity or individual lens handle"
                style={{ width: 400 }} /> */}

            <br />
            <Button type='primary' disabled={loading} loading={loading} onClick={did}>Generate DID </Button>


            {result.did && <div>
                <Divider />
                <p>Result</p>
                <pre>{JSON.stringify(result.did, null, 2)}</pre>
            </div>}
        </Card>

        <br />

        <Card title='3. Generate Verified Credentials (VC) and signed presentation (VP) for a new handle owner'>
            <p>
                This will generate a verified credential for the given handle using the {APP_NAME} issuer key. This should be shared with the business/entity handle owner.
            </p>
            <Input
                value={handle}
                size='large'
                className='standard-padding standard-margin'
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Enter entity or individual lens handle"
                style={{ width: 400 }} />

            {/* holder */}
            <br />
            <Input
                value={holderDid}
                size='large'
                className='standard-padding standard-margin'
                onChange={(e) => setHolderDid(e.target.value)}
                placeholder="Enter holder DID"
                style={{ width: 400 }} />



            <br />
            <br />
            <Button type='primary' disabled={loading || !handle || !holderDid} loading={loading} onClick={generate}>Generate</Button>


            {result.vc && <div style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
            }}>
                <Divider />
                <p>Result</p>
                {JSON.stringify(result.vc, null, 2)}
            </div>}
        </Card>




    </div>



}