import { createContext, useState } from "react";

export const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [signer, setSigner] = useState();
  const [provider, setProvider] = useState();
  return (
    <WalletContext.Provider
      value={{ signer, setSigner, provider, setProvider }}
    >
      {children}
    </WalletContext.Provider>
  );
};
