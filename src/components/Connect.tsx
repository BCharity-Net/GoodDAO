import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import truncateWalletAddress from '../utils/truncateWalletAddress'
import Meta from '../../public/metamask.png'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const Connect = () => {
	const { t } = useTranslation('common')
	const [btnTxt, setBtnTxt] = useState(<div></div>)

	const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
		chainId: 80001
	})

	useEffect(() => {
		
		const callData = () => {
			setBtnTxt(
			<div>
				{connectors.map((connector) => (
					<button disabled={!connector?.ready} key={connector.id} onClick={() => connect({ connector })} 
					className="bg-brand-500 hover:bg-brand-600 border border-brand-600 text-white focus:ring-brand-400 px-3 py-1 
					flex items-center space-x-1.5 rounded-lg font-bold disabled:opacity-50 shadow-sm focus:ring-2 focus:ring-opacity-50 focus:ring-offset-1 outline-none">
						<Image layout='intrinsic' className="!mr-1 w-4 h-4" width='20' height='20' src={Meta} alt="MetaMask Logo"/>	
					{'Connect'}
					{!connector?.ready && ' (unsupported)'}
					{isLoading && connector?.id === pendingConnector?.id && ' (connecting)'}
					</button>
				))}
			
				{error && <div>{error.message}</div>}
			</div>
			)
		}
		callData()
	}, [connect, connectors, error, isLoading, pendingConnector])
	 
	const { address, connector, isConnected } = useAccount()
	const { disconnect } = useDisconnect()
	const disconnectClick = () => {disconnect()}

	if (isConnected && connector) {
		return (
			<div>
				<div>{truncateWalletAddress(address || 'N/A')}</div>
				<button onClick={disconnectClick}>{t("Disconnect")}</button>
			</div>
		)
	}

	else{
		return (btnTxt
	  )
	}
	
}
export default Connect
