import { configureChains, createConfig } from 'wagmi'
import { mainnet, goerli }               from 'wagmi/chains'
import { publicProvider }                from 'wagmi/providers/public'
import { injected }                      from '@wagmi/connectors'

// configureChains now returns { chains, publicClient, webSocketPublicClient }
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli],
  [publicProvider()],
)

// createConfig is the v2 equivalent of createClient
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    injected({ chains }), // MetaMask & other injected wallets
  ],
  publicClient,
  webSocketPublicClient,
})
