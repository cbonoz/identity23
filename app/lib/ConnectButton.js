import { Button } from 'antd'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
 
function ConnectButton({buttonType = 'primary'}) {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
 
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