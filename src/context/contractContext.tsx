import { createContext } from "react";
import contractABI from "../ABI/abi.json";
import { Contract, Signer } from "ethers";
const contract_address = "0xaD488Cd332034434240828F987d6E6B991D48125";

export const ContractContext = createContext(null);

export const ContractProvider = ({ children }) => {
  //                                                 projectDataIPFS,
  //                                                     projectOwnerAddress,
  //                                                     fundingRequired,
  //                                                     fundingRaiseDeadline,
  //                                                     projectOwnerProfitPercent
  const getContract = async (signer) => {
    const contract = new Contract(contract_address, contractABI, signer);
    return contract;
  };

  const createProject = async (signer: any, data: any) => {
    console.log(signer);
    const contract: any = await getContract(signer);
    console.log(contract);

    const res = await contract.createProject(
      data.projectDataJSON,
      signer.address,
      data.fundingRequied,
      data.fundingRaiseDeadline,
      data.projectOwnerProfitPercent
    );
    //   string memory projectDataIPFS,
    // address projectOwnerAddress,
    // uint256 fundingRequired,
    // uint256 fundingRaiseDeadline,
    // uint256 projectOwnerProfitPercent
  };
  return (
    <ContractContext.Provider value={{ createProject }}>
      {children}
    </ContractContext.Provider>
  );
};

// export const ContractContext = createContext({
//   createProject: async () => {}
// });

// export const ContractProvider = ({ children }) => {
//   const getContract = (signer: Signer) => {
//     const contract = new Contract(contract_address, contractABI, signer);
//     return contract;
//   };

//   const createProject = async (
//     projectData: string,
//     ownerAddress: string,
//     fundingRequired: string,
//     founderProfitPercent: string
//   ) => {
//     try {

//       return { success: true, message: "Project created successfully (mock)" };
//     } catch (error) {
//       console.error("Error creating project:", error);
//       throw error;
//     }
//   };

//   return (
//     <ContractContext.Provider value={{   }}>
//       {children}
//     </ContractContext.Provider>
//   );
// };
