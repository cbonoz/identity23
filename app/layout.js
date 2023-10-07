import Head from 'next/head';
import Script from 'next/script';
import UiLayoutWrapper from './lib/UiLayoutWrapper';


import './globals.css';

export default function RootLayout({ children }) {

  return (<html>
    <head>
      <link rel="favicon" href="/favicon.ico" sizes="any" />
      {/* <link rel="icon" href="/favicons/icon.ico" type="image/svg+xml" /> */}
      <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      <link rel="manifest" href="/favicons/manifest.json" />

      <title>Blockreach | Web3 verified business index</title>
      <meta name="description" content="Privy Auth Starter" />
    </head>
    <body>
        <UiLayoutWrapper>
          {children}
        </UiLayoutWrapper>
    </body>
  </html>
  )

}