'use client';

import { Button, Card, Divider, Input } from "antd";
import { useState } from "react";
import { APP_NAME, OFFER_TABLE, LISTING_TABLE, ACTIVE_CHAIN } from "../constants";
import { deployContract } from "../util/profileContract";
import { useEthersSigner } from "../hooks/useEthersSigner";
import { postGenerateVC } from "../util/api";

export default function Admin() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [handle, setHandle] = useState()
    const [result, setResult] = useState({})

    const updateResult = (key, value) => {
        setResult({ ...result, [key]: value })
    }

    async function generate() {
        try {
            const res = await postGenerateVC(handle)
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

    return <div>
        <h1>Admin</h1>

        <Divider />

        <Card title='Deploy master contract'>
            <Button type='primary' disabled={loading} loading={loading} onClick={deploy}>Deploy</Button>


            {result.contract && <div>
                <Divider />
                <p>Result</p>
                <pre>{JSON.stringify(result.contract, null, 2)}</pre>
            </div>}
        </Card>

        <br />


        <Card title='Generate Verified credential for handle'>
            <Input
                value={handle}
                size='large'
                className='standard-padding'
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Enter handle"
                style={{ width: 200 }} />

            <br />
            <Button type='primary' disabled={loading || !handle} loading={loading} onClick={generate}>Generate</Button>


            {result.vc && <div>
                <Divider />
                <p>Result</p>
                <pre>{JSON.stringify(result.vc, null, 2)}</pre>
            </div>}
        </Card>


    </div>



}