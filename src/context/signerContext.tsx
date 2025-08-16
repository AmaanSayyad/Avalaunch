import React from "react";
import { createContext, useState, useContext, ReactNode } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";

interface SignerContextType {
  signer: JsonRpcSigner | null;
  setSigner: React.Dispatch<React.SetStateAction<JsonRpcSigner | null>>;
  provider: BrowserProvider | null;
  setProvider: React.Dispatch<React.SetStateAction<BrowserProvider | null>>;
}

const defaultContext: SignerContextType = {
  signer: null,
  setSigner: () => {},
  provider: null,
  setProvider: () => {},
};

export const SignerContext = createContext<SignerContextType>(defaultContext);

interface SignerProviderProps {
  children: ReactNode;
}

export const SignerProvider = ({ children }: SignerProviderProps) => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  
  return (
    <SignerContext.Provider
      value={{ signer, setSigner, provider, setProvider }}
    >
      {children}
    </SignerContext.Provider>
  );
};
