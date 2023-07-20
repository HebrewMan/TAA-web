import { Chain } from "wagmi";

export const taaTestChain = {
  id: 280,
  name: "zkSync",
  network: "Era Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "zkSync",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://testnet.era.zksync.dev"] },
    default: { http: ["https://testnet.era.zksync.dev"] },
  },
} as const satisfies Chain;

export const taaChain = {
  id: 324,
  name: "zkSync Era Testnet",
  network: "zkSync Era Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "zkSync",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://mainnet.era.zksync.io"] },
    default: { http: ["https://mainnet.era.zksync.io"] },
  },
} as const satisfies Chain;
