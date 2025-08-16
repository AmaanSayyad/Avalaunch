import { createContext, useState, ReactNode } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";

interface WalletContextType {
  signer: JsonRpcSigner | null;
  setSigner: (signer: JsonRpcSigner | null) => void;
  provider: BrowserProvider | null;
  setProvider: (provider: BrowserProvider | null) => void;
}

export const WalletContext = createContext<WalletContextType>({
  signer: null,
  setSigner: () => {},
  provider: null,
  setProvider: () => {}
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  
  return (
    <WalletContext.Provider
      value={{ signer, setSigner, provider, setProvider }}
    >
      {children}
    </WalletContext.Provider>
  );
};