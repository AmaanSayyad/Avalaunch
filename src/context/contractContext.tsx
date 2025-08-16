import { useContext, createContext } from "react";
import contractABI from "../ABI/abi.json";
import { Contract, Signer } from "ethers";
const contract_address = "0xaD488Cd332034434240828F987d6E6B991D48125";

export const ContractContext = createContext(null);

export const ContractProvider = ({ children }) => {
  const getContract = (signer: Signer) => {
    const contract = new Contract(contract_address, contractABI, signer);
    return contract;
  };

  const createProject = async (signer: any, data: any) => {
    const contract = getContract(signer);
    const res = await contract.createProject(
      data.ipfs,
      signer.address,
      data.fundingRequired,
      data.fundingRaiseDeadline,
      data.projectOwnerProfitPercent
    );

    console.log(res);
  };
  return (
    <ContractContext.Provider value={{ createProject }}>
      {children}
    </ContractContext.Provider>
  );
};
