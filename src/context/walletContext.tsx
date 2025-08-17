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
          // Check if we're still authorized
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          if (accounts && accounts.length > 0) {
            // We're still connected
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            
            setProvider(provider);
            setSigner(signer);
            setWalletAddress(address);
            setIsConnected(true);
            console.log("Restored wallet connection:", shortenAddress(address));
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
  
  // Listen for account changes
  useEffect(() => {
    if (window.ethereum && typeof window.ethereum.on === 'function') {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet();
        } else if (isConnected) {
          // Account changed while connected
          try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            
            setProvider(provider);
            setSigner(signer);
            setWalletAddress(address);
            console.log("Account changed:", shortenAddress(address));
          } catch (error) {
            console.error("Error handling account change:", error);
          }
        }
      };
      
      try {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        
        return () => {
          if (typeof window.ethereum.removeListener === 'function') {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          }
        };
      } catch (error) {
        console.warn("Could not set up account change listener:", error);
      }
    }
  }, [isConnected]);
  
  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("No Ethereum provider found");
      throw new Error("No Ethereum provider found. Please install MetaMask or another wallet.");
    }
    
    try {
      // Request accounts
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }
      
      // Try switching to Avalanche Fuji Testnet
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xA869" }], // Fuji Testnet
        });
      } catch (switchError: any) {
        // If chain not added, add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
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
              ],
            });
          } catch (addError) {
            console.warn("Could not add Avalanche network:", addError);
            // Continue with connection even if network switch fails
          }
        } else {
          console.warn("Could not switch to Avalanche network:", switchError);
          // Continue with connection even if network switch fails
        }
      }
      
      // Once network is set → connect
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setProvider(provider);
      setSigner(signer);
      setWalletAddress(address);
      setIsConnected(true);
      
      // Save connection state
      localStorage.setItem('walletConnected', 'true');
      
      console.log("Connected to wallet:", shortenAddress(address));
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