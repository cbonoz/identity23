'use client';

import { usePathname } from "next/navigation"
import Link from "next/link";
import { abbreviate, isAdminAddress } from "../util";
import { ACTIVE_CHAIN, APP_NAME } from "../constants";
import StyledComponentsRegistry from "./AntdRegistry";
import { Button, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import ConnectButton from "./ConnectButton";
import Image from "next/image";

function UiLayoutWrapper({ children }) {

    const pathname = usePathname()
    const isListingPage = pathname.startsWith('/listing')
    const menuItems = []
    if (!isListingPage) {
        menuItems.push({
            key: '/search',
            label: <Link href="/search">Search</Link>,
            href: '/search',
        })
        menuItems.push(
            {
                key: '/create',
                label: <Link href="/create">Create</Link>,
                href: '/create',
            })
    }

    menuItems.push({
        key: '/about',
        label: <Link href="/about">About</Link>,
        href: '/about',
    })


    const isAdmin = true;

    if (isAdmin) {
        menuItems.push({
            key: '/admin',
            label: <Link href="/admin">Admin</Link>,
            href: '/admin',
        })
    }

    return (
        <StyledComponentsRegistry>

            <Layout>
                <Header style={{ background: '#fff', display: 'flex' }}>
                    <Image src="/logo.png" alt="Blockreach Logo"
                        className='header-logo'
                        height={48}
                        onClick={() => {
                            window.location.href = '/'
                        }}
                        width={160}
                    />

                    <Menu style={{ minWidth: '800px' }}
                        mode="horizontal" defaultSelectedKeys={pathname} items={menuItems} />

                    <span style={{ float: 'right', right: 20, position: 'absolute' }}>
                        <ConnectButton />
                    </span>


                </Header>
                <span className='float-right bold active-network' >
                    Active network: {ACTIVE_CHAIN.name}&nbsp;
                </span>
                <Content className='container'>
                    {/* Pass children to the content area */}
                    <div className='container'>
                        {children}
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    <hr />
                    <br />
                    {APP_NAME} ©2023. Created for the&nbsp;
                    <a href="https://www.encode.club/open-data-hack" target='_blank'>Encode Open Data Hack</a>.

                </Footer>
            </Layout>

        </StyledComponentsRegistry>
    )
}

export default UiLayoutWrapper