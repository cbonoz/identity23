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
    Tooltip,
} from 'antd';
import Image from 'next/image'
import { ACTIVE_CHAIN, APP_NAME, EXAMPLE_OFFERS, STAT_KEYS } from '../constants';
import { getProfileByHandle, getProfileById } from '../util/lens'
import VerifiedCheck from '../lib/VerifiedCheck';
import { formatDate, isEmpty } from '../util';
import { postVerifyVP } from '../util/api';
import { Comment } from '@ant-design/compatible';
import { InfoCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

const ListingDetail = ({ listingId, provider }) => {
    const [loading, setLoading] = useState(true)
    const [showOfferModal, setShowOfferModal] = useState(false)
    const [claimResult, setClaimResult] = useState()
    const [showClaimModal, setShowClaimModal] = useState(false)
    const [presentation, setPresentation] = useState()
    const [result, setResult] = useState()
    const [error, setError] = useState()
    const [profile, setProfile] = useState()
    const [amount, setAmount] = useState()
    console.log('listing', listingId)

    const verifyPresentation = async () => {
        if (!presentation) {
            return
        }
        setLoading(true)
        try {
            const res = await postVerifyVP(presentation, profile?.handle || listingId)
            console.log('verified', res)
            setShowClaimModal(false)
            if (res.verified) {
                alert('Account verified!')
            } else {
                const err = res.error || 'Is your VP valid for this handle?'
                alert('Account could not be verified: ' + err);
            }
            setResult(res)
        } catch (e) {
            console.error('error verifying', e)
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

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
            res.verified = false;
            setProfile(res);


        } catch (e) {
            console.error('error getting listing', e)
            setError(e.message)
        } finally {
            setLoading(false)
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
            title="Profile page error"
            subTitle={error || 'Please try another handle or return to search'}
            extra={[
                <Button type="primary" key={'refresh page'} onClick={() => setError()}>Return to page</Button>,
                <Button type="dashed" key={'search'} onClick={() => window.location.href = '/'}>Return to search</Button>
            ]}
        />
    }

    const { name, verified, bio, handle, picture, coverPicture, stats } = profile.profile;
    const publications = profile.publications || [];

    const isVerified = result?.verified || verified;

    const cardTitle = `${name} (${handle})`


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

    const profileImage = picture ? picture.original.url : '/profile.png'

    return (
        <div className="listing-detail-page">
            <div>
                {/* <Image src={logo}/> */}
            </div>
            <br />
            <Breadcrumb style={{ fontSize: 16 }} items={breadcrumbs} />
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
                        <Image src={profileImage}
                            alt="profile picture"
                            layout='fill'
                            objectFit='contain'
                        />
                    </Col>
                    <Col span={16}>
                        <span>
                            <span className='handle-header bold'>{handle}</span>
                            <span className='float-right'>
                                <VerifiedCheck verified={isVerified} />
                            </span>
                        </span>
                        {bio && <Typography.Paragraph>{bio}</Typography.Paragraph>}
                        <Statistic title="Followers" value={stats.totalFollowers} />
                        <Statistic title="Following" value={stats.totalFollowing} />
                        <Statistic title="Posts" value={stats.totalPosts} />
                    </Col>
                </Row>

                <Divider />

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
                            setShowClaimModal(true)
                        }}>Claim account</Button>}

                        {/* Send inquiry */}
                        <br />
                        <br />

                        {!isVerified && <Tooltip title="Account must be verified to send inquiries">
                            <InfoCircleOutlined />
                        </Tooltip>}
                        <Button size="large" type="primary" disabled={!isVerified} onClick={() => {
                            setShowOfferModal(true)
                        }}>Send inquiry</Button>&nbsp;
                        <Button size="large" type="primary" disabled={!isVerified} onClick={() => {
                            setShowOfferModal(true)
                        }}>Submit payment</Button>



                        {result && <div>
                            <Divider />
                            <p>Result</p>
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                        </div>}

                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <br />
                        <br />
                        <h1>Recent Activity</h1>


                        {publications.map((p) => {
                            const { createdAt, metadata, appId } = p
                            return <div key={p.id}>
                                <Comment content={metadata.content} datetime={formatDate(createdAt)} avatar={
                                    <Avatar src={profileImage} alt={metadata.name} />
                                }
                                    author={`${metadata.name} (${appId})`} />
                            </div>
                        })}
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


            <Modal
                title={'Claim account'}
                open={showClaimModal}
                okText="Claim account"
                size="large"
                onOk={() => verifyPresentation()}
                confirmLoading={loading}
                onCancel={() => setShowClaimModal(false)}>
                <p>
                    To claim this account, enter a valid Verifiable Presentation (VP) associated with this account. To get one, a {APP_NAME} admin can generate a credential for you.
                </p>
                <br />
                <TextArea placeholder="Enter VP" value={presentation} onChange={(e) => setPresentation(e.target.value)} />

            </Modal>

        </div>)
};

export default ListingDetail;