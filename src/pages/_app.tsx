import '../styles/globals.css'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import '../styles/styling.css'
import { WagmiConfig, createClient, defaultChains, configureChains, chain } from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, provider, webSocketProvider} = configureChains([chain.polygonMumbai], [publicProvider()])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  provider, webSocketProvider
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  ) 
}

export default MyApp
