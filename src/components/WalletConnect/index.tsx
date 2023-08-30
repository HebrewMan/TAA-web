import { taaTestChain, taaChain } from "@/config/constants";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// 自定义链  aithChain
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    taaChain,
    taaTestChain,
    ...(import.meta.env.VITE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

// const { connectors } = getDefaultWallets({
//   appName: "RainbowKit demo",
//   projectId: "YOUR_PROJECT_ID",
//   chains,
// });
const connectors = connectorsForWallets([
  {
    groupName: "Suggested",
    wallets: [
      injectedWallet({ chains }),
      coinbaseWallet({ chains, appName: "Coinbase" }),
      metaMaskWallet({ chains, projectId: "" }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function Web3Provider({ children }: any) {
  return (
    <div className="h-full w-full overflow-hidden">
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}
