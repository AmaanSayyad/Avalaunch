import { useContext, createContext } from "react";
import contractABI from "../ABI/abi.json";
import { Contract, Signer } from "ethers";
const contract_address = "0xaD488Cd332034434240828F987d6E6B991D48125";

export const ContractContext = createContext(null);

export const ContractProvider = ({ children }) => {
  // const contract = new Contract("")
  const createProject = async (signer: Signer) => {};
  return (
    <ContractContext.Provider value={{}}>{children}</ContractContext.Provider>
  );
};
