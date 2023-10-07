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
import { abbreviate, convertCamelToHuman, formatCurrency, formatListing, getExplorerUrl, humanError, ipfsUrl, isEmpty } from '../util';
import { ACTIVE_CHAIN, APP_NAME, EXAMPLE_OFFERS, STAT_KEYS } from '../constants';
import { getProfileByHandle, getProfileById } from '../util/lens'

const ListingDetail = ({ listingId, provider }) => {
    const [loading, setLoading] = useState(true)
    const [showOfferModal, setShowOfferModal] = useState(false)
    const [claimResult, setClaimResult] = useState()
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
            console.log('got listing', res)
            // TODO: fetch from contract (zksync/free)
            res.isVerified = false;
            setProfile(res)


        } catch (e) {
            console.error('error getting listing', e)
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    async function claimAccount() {

    }

    async function sendInquiry() {

    }

    useEffect(() => {
        fetchListing(listingId)
    }, [listingId])

    const breadcrumbs = [
        {
            title: 'Listings',
            href: '/search'
        },
        {
            title: profile?.name,
            href: `/listing/${listingId}`
        }
    ]


    if (loading) {
        return <Spin size='large' />
    }

    if (error || !profile) {
        return <Result
            status="warning"
            title="Error finding profile"
            subTitle={error || 'Please try another hanle or return to search'}
            extra={[
                <Button type="primary" key={'search'} onClick={() => window.location.href = '/'}>Return to search</Button>
            ]}
        />
    }

    const { name, isVerified, bio, handle, picture, coverPicture, stats } = profile;

    return (
        <div className="listing-detail-page">
            <Breadcrumb items={breadcrumbs} />
            <br />

            <Card
                title={name}
                cover={
                    coverPicture ? (
                        <img src={coverPicture.original.url} alt={coverPicture.altTag} />
                    ) : null
                }
            >
                <Row gutter={16}>
                    <Col span={6}>
                        <Avatar src={picture.original.url} size="large" />
                    </Col>
                    <Col span={18}>
                        <Typography.Title level={4}>{handle}</Typography.Title>
                        {bio && <Typography.Paragraph>{bio}</Typography.Paragraph>}
                        <Statistic title="Followers" value={stats.totalFollowers} />
                        <Statistic title="Following" value={stats.totalFollowing} />
                        <Statistic title="Posts" value={stats.totalPosts} />
                    </Col>
                </Row>

                <Row>
                    <Col>

                        <div>
                            {isVerified ? <div className="verified-badge">
                                {/* <Image src="/verified.svg" width={20} height={20} alt="verified" /> */}
                                &nbsp;This account is verified.
                            </div> : <div className="unverified-badge">
                                {/* <Image src="/unverified.svg" width={20} height={20} alt="unverified" /> */}
                                &nbsp;This account is unverified.
                            </div>}
                        </div>

                        <Divider />

                        <p>
                            To claim this account, enter a valid Verifiable Presentation (VP) associated with this account. To get one, a {APP_NAME} admin can generate a credential for you.
                        </p>

                        {!isVerified && <Button size="large" type="primary" onClick={() => {
                            claimAccount()
                        }}>Claim account</Button>}
                    </Col>
                </Row>


            </Card>



            {/* TODO: enable offer */}
            <Modal
                title={profile?.name}
                open={showOfferModal}
                okText="Make offer"
                onOk={() => setShowOfferModal(false)}
                confirmLoading={loading}
                onCancel={() => setShowOfferModal(false)}
            >
                <Divider />

                <Input
                    type="number"
                    placeholder={`Enter amount (${ACTIVE_CHAIN.symbol})`}
                    prefix={`Your offer (${ACTIVE_CHAIN.symbol}):`}
                    value={amount}
                    onError={(e) => console.log('error', e)}
                    onChange={(e) => setAmount(e.target.value)}
                />

            </Modal>

        </div>)
};

export default ListingDetail;