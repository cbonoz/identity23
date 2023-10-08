'use client';

import React, { useState, useEffect, Suspense, use } from 'react';
import {
    Button,
    Row,
    Avatar,
    Typography,
    Card,
    Col,
    Spin,
    Divider,
    Modal,
    Input,
    Breadcrumb,
    Result,
    Statistic,
} from 'antd';
import Image from 'next/image'
import { ACTIVE_CHAIN, APP_NAME, EXAMPLE_OFFERS, STAT_KEYS } from '../constants';
import { getProfileByHandle, getProfileById } from '../util/lens'
import { isEmpty } from '../util';
import { postVerifyVP } from '../util/api';

const ListingDetail = ({ listingId, provider }) => {
    const [loading, setLoading] = useState(true)
    const [showOfferModal, setShowOfferModal] = useState(false)
    const [claimResult, setClaimResult] = useState()
    const [presentation, setPresentation] = useState()
    const [result, setResult] = useState()
    const [error, setError] = useState()
    const [profile, setProfile] = useState()
    const [amount, setAmount] = useState()
    console.log('listing', listingId)

    async function fetchListing(id) {
        setError()
        setLoading(true)
        try {
            const res = await getProfileByHandle(id)
            if (isEmpty(res)) {
                throw new Error('Profile not found. Do you have a valid profile url?')
            }
            console.log('got profile', res)
            // TODO: fetch from contract (zksync/free)
            res.isVerified = false;
            setProfile(res.profile)


        } catch (e) {
            console.error('error getting listing', e)
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    async function claimAccount() {

        try {
            const res = await postVerifyVP(presentation)
            console.log('verified', res)
            setResult(res)
        } catch (e) {
            console.error('error verifying', e)
            setError(e.message)
        }
    }

    async function sendInquiry() {

    }

    useEffect(() => {
        fetchListing(listingId)
    }, [listingId])



    if (loading) {
        return <Spin size='large' />
    }

    if (error || !profile) {
        return <Result
            status="warning"
            title="Error accessing profile"
            subTitle={error || 'Please try another hanle or return to search'}
            extra={[
                <Button type="primary" key={'search'} onClick={() => window.location.href = '/'}>Return to search</Button>
            ]}
        />
    }

    const { name, isVerified, bio, handle, picture, coverPicture, stats } = profile;

    const cardTitle = `${name} (${handle})}`


    const breadcrumbs = [
        {
            title: APP_NAME,
            href: '/'
        },
        {
            title: 'Search Profiles',
            href: '/search'
        },
        {
            title: cardTitle,
            href: `/profile/${listingId}`
        }
    ]

    return (
        <div className="listing-detail-page">
            <div>
                {/* <Image src={logo}/> */}
            </div>
            <br/>
            <Breadcrumb style={{fontSize: 16}} items={breadcrumbs} />
            <br />

            <Card
                title={cardTitle}
                cover={
                    coverPicture ? (
                        <img src={coverPicture.original.url} alt={coverPicture.altTag} />
                    ) : null
                }
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <Image src={picture.original.url} 
                        alt="profile picture"
                         layout='fill'
                         objectFit='contain'
                         />
                    </Col>
                    <Col span={16}>
                        <span>
                        <span className='handle-header bold'>{handle}</span>
                        <span className='float-right'>
Verified
</span>
                        </span>
                        {bio && <Typography.Paragraph>{bio}</Typography.Paragraph>}
                        <Statistic title="Followers" value={stats.totalFollowers} />
                        <Statistic title="Following" value={stats.totalFollowing} />
                        <Statistic title="Posts" value={stats.totalPosts} />
                    </Col>
                </Row>

                <Divider/>

                <Row gutter={16}>
                    <Col span={24}>

                        <p>
                            {isVerified ? <div className="verified-badge success-text">
                                {/* <Image src="/verified.svg" width={20} height={20} alt="verified" /> */}
                                This account is verified by {APP_NAME}.
                            </div> : <div className="unverified-badge error-text">
                                {/* <Image src="/unverified.svg" width={20} height={20} alt="unverified" /> */}
                                This account is unverified.
                            </div>}
                        </p>

                        <p>
                            To claim this account, enter a valid Verifiable Presentation (VP) associated with this account. To get one, a {APP_NAME} admin can generate a credential for you.
                        </p>

                        {!isVerified && <Button size="large" type="primary" onClick={() => {
                            claimAccount()
                        }}>Claim account</Button>}

                        {/* Send inquiry */}
                        <br/>
                        <br/>
                        <Button size="large" type="primary" onClick={() => {
                            setShowOfferModal(true)
                        }}>Send inquiry</Button>


                        {result && <div>
                            <Divider />
                            <p>Result</p>
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                        </div>}

                    </Col>
                </Row>


            </Card>



            {/* TODO: enable offer */}
            <Modal
                title={'Send inquiry'}
                open={showOfferModal}
                okText="Make offer"
                onOk={() => setShowOfferModal(false)}
                confirmLoading={loading}
                onCancel={() => setShowOfferModal(false)}
            >
                <Divider />

                <Input
                    type="number"
                    placeholder={`Enter amount (${ACTIVE_CHAIN.nativeCurrency.symbol})`}
                    prefix={`Your offer (${ACTIVE_CHAIN.nativeCurrency.symbol}):`}
                    value={amount}
                    onError={(e) => console.log('error', e)}
                    onChange={(e) => setAmount(e.target.value)}
                />

            </Modal>

        </div>)
};

export default ListingDetail;