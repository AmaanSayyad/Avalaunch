import { createContext, useState, ReactNode, useEffect } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";

interface WalletContextType {
  signer: JsonRpcSigner | null;
  setSigner: (signer: JsonRpcSigner | null) => void;
  provider: BrowserProvider | null;
  setProvider: (provider: BrowserProvider | null) => void;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

// Helper function to shorten addresses consistently
export const shortenAddress = (address: string): string => {
  if (!address) return "";
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
};

export const WalletContext = createContext<WalletContextType>({
  signer: null,
  setSigner: () => {},
  provider: null,
  setProvider: () => {},
  isConnected: false,
  setIsConnected: () => {},
  walletAddress: null,
  setWalletAddress: () => {},
  connectWallet: async () => Promise.resolve(),
  disconnectWallet: () => {}
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
  // Check for saved wallet connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      const savedIsConnected = localStorage.getItem('walletConnected') === 'true';
      
      if (savedIsConnected && window.ethereum) {
        try {
          // Check if we're still authorized using a simple request
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          if (accounts && accounts.length > 0) {
            // We're still connected - create provider and signer
            try {
              const provider = new BrowserProvider(window.ethereum);
              const signer = await provider.getSigner();
              const address = await signer.getAddress();
              
              setProvider(provider);
              setSigner(signer);
              setWalletAddress(address);
              setIsConnected(true);
              console.log("Restored wallet connection:", shortenAddress(address));
            } catch (providerError) {
              console.error("Error creating provider:", providerError);
              localStorage.removeItem('walletConnected');
              setIsConnected(false);
            }
          } else {
            // Authorization revoked
            localStorage.removeItem('walletConnected');
            setIsConnected(false);
          }
        } catch (error) {
          console.error("Error restoring wallet connection:", error);
          localStorage.removeItem('walletConnected');
          setIsConnected(false);
        }
      }
    };
    
    checkConnection();
  }, []);
  
  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("No Ethereum provider found");
      throw new Error("No Ethereum provider found. Please install MetaMask or another wallet.");
    }
    
    try {
      console.log("Starting wallet connection...");
      
      // Use a more direct approach - create provider first, then request accounts
      const provider = new BrowserProvider(window.ethereum);
      
      // Request accounts through the provider
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }
      
      console.log("Accounts received:", accounts);
      
      // Create signer
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      console.log("Provider and signer created successfully");
      
      // Set state
      setProvider(provider);
      setSigner(signer);
      setWalletAddress(address);
      setIsConnected(true);
      
      // Save connection state
      localStorage.setItem('walletConnected', 'true');
      
      console.log("Wallet connected successfully:", shortenAddress(address));
      
      // Try to switch to Avalanche network (optional, don't fail if it doesn't work)
      try {
        console.log("Attempting to switch to Avalanche network...");
        await provider.send("wallet_switchEthereumChain", [{ chainId: "0xA869" }]);
        console.log("Successfully switched to Avalanche network");
      } catch (switchError: any) {
        console.log("Could not switch to Avalanche network:", switchError.message);
        
        // If chain not added, try to add it
        if (switchError.code === 4902) {
          try {
            console.log("Adding Avalanche network...");
            await provider.send("wallet_addEthereumChain", [
              {
                chainId: "0xA869",
                chainName: "Avalanche Fuji C-Chain",
                nativeCurrency: {
                  name: "Avalanche",
                  symbol: "AVAX",
                  decimals: 18,
                },
                rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
                blockExplorerUrls: ["https://testnet.snowtrace.io/"],
              },
            ]);
            console.log("Successfully added Avalanche network");
          } catch (addError) {
            console.log("Could not add Avalanche network:", addError);
            // Continue with connection even if network setup fails
          }
        }
      }
      
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      disconnectWallet();
      throw error;
    }
  };
  
  const disconnectWallet = () => {
    setSigner(null);
    setProvider(null);
    setWalletAddress(null);
    setIsConnected(false);
    localStorage.removeItem('walletConnected');
    console.log("Wallet disconnected");
  };
  
  return (
    <WalletContext.Provider
      value={{ 
        signer, 
        setSigner, 
        provider, 
        setProvider,
        isConnected,
        setIsConnected,
        walletAddress,
        setWalletAddress,
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};