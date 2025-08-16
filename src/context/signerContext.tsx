import React from "react";
import { createContext, useState, useContext } from "react";

export const SignerContext = createContext(null);

export const SignerProvider = ({ children }) => {
  const [signer, setSigner] = useState();
  const [provider, setProvider] = useState();
  return (
    <SignerContext.Provider
      value={{ signer, setSigner, provider, setProvider }}
    >
      {children}
    </SignerContext.Provider>
  );
};
