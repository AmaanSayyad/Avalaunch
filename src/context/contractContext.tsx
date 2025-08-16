import { createContext } from "react";
import contractABI from "../ABI/abi.json";
import { Contract, Signer } from "ethers";
const contract_address = "0xaD488Cd332034434240828F987d6E6B991D48125";

interface ContractContextType {
  createProject: (projectData: string, ownerAddress: string, fundingRequired: string, founderProfitPercent: string) => Promise<any>;
}

export const ContractContext = createContext<ContractContextType>({
  createProject: async () => {}
});

export const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const getContract = (signer: Signer) => {
    const contract = new Contract(contract_address, contractABI, signer);
    return contract;
  };

  const createProject = async (
    projectData: string, 
    ownerAddress: string, 
    fundingRequired: string,
    founderProfitPercent: string
  ) => {
    try {
      console.log("Creating project with data:", {
        projectData,
        ownerAddress,
        fundingRequired,
        founderProfitPercent
      });
      
      // This is a mock implementation since we don't have a connected signer yet
      // In a real implementation, you would:
      // const contract = getContract(signer);
      // const tx = await contract.createProject(
      //   projectData,
      //   ownerAddress,
      //   fundingRequired,
      //   Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
      //   founderProfitPercent
      // );
      // await tx.wait();
      // return tx;
      
      return { success: true, message: "Project created successfully (mock)" };
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  };

  return (
    <ContractContext.Provider value={{ createProject }}>
      {children}
    </ContractContext.Provider>
  );
};