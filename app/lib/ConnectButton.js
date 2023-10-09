import { Button } from 'antd'
import { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { ACTIVE_CHAIN } from '../constants'
 
function ConnectButton({buttonType = 'primary'}) {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
  useSwitchNetwork()

  useEffect(() => {
    if (pendingChainId !== ACTIVE_CHAIN.id) {
      switchNetwork?.(ACTIVE_CHAIN.id)
    }
  }, [pendingChainId, address, isConnected])

  if (isConnected)
    return (
      <div>
        Connected to: {address}
        <Button type="link" onClick={() => disconnect()}>Disconnect</Button>
      </div>
    )
  return <Button type={buttonType} onClick={() => connect()}>Connect Wallet</Button>
}

export default ConnectButton