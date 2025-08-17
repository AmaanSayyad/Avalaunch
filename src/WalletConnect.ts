import { http, createConfig } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [avalanche, avalancheFuji],
  multiInjectedProviderDiscovery: false,
  connectors: [
    injected(), // This will automatically detect MetaMask
  ],
  transports: {
    [avalanche.id]: http(),
    [avalancheFuji.id]: http(),
  },
});
