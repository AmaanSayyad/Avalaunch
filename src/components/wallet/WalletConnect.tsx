import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Wallet, ChevronRight, X } from "lucide-react";
import { useConnect } from "wagmi";
import { BrowserProvider } from "ethers";
import { useContext } from "react";
import { SignerContext } from "@/context/signerContext";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const walletOptions: WalletOption[] = [
  {
    id: "core",
    name: "Core",
    icon: "/lovable-uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png",
    description: "Connect to your Core wallet",
  },
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/lovable-uploads/7cc724d4-3e14-4e7c-9e7a-8d613fde54d0.png",
    description: "Connect to your MetaMask wallet",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "/lovable-uploads/5830bd79-3511-41dc-af6c-8db32d91fc2c.png",
    description: "Connect to your Coinbase wallet",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/lovable-uploads/1e2a48dc-059b-4919-a1ed-44685d771a32.png",
    description: "Connect with WalletConnect",
  },
];

interface WalletConnectProps {
  onConnect?: (walletId: string) => void;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
}

export function WalletConnect({
  onConnect,
  variant = "default",
  size = "default",
  className = "",
  children,
}: WalletConnectProps) {
  const [open, setOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { signer, setSigner, setProvider } = useContext(SignerContext);

  const handleConnect = async (wallet: WalletOption) => {
    setSelectedWallet(wallet);
    setConnecting(true);
    setError(null);

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock connection success
      if (wallet.id === "core" || wallet.id === "metamask") {
        if (onConnect) {
          onConnect(wallet.id);
        }
        setOpen(false);
      } else {
        // Mock connection error for other wallets
        throw new Error("Connection failed. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  };

  const { connectors, connect, status, error: connectError } = useConnect();

  const connectWallet = async (walletId: string) => {
    try {
      // Find the connector for this wallet
      const connector = connectors.find(c => c.id.toLowerCase() === walletId.toLowerCase());
      
      if (!connector) {
        throw new Error(`No connector found for ${walletId}`);
      }
      
      // Connect using wagmi
      connect({ connector });
      
      // For backward compatibility, also update our SignerContext
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        setProvider(provider);
        
        try {
          const signer = await provider.getSigner();
          setSigner(signer);
          
          if (onConnect) {
            onConnect(walletId);
          }
          setOpen(false);
        } catch (err) {
          console.error("Failed to get signer:", err);
          setError("Failed to connect wallet. Please try again.");
        }
      }
    } catch (err) {
      console.error("Connection error:", err);
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children || (
        <Button
          onClick={() => setOpen(true)}
          variant={variant}
          size={size}
          className={className}
        >
          <Wallet className="w-4 h-4 mr-2" />
          {signer ? `${signer.address.substring(0, 6)}...${signer.address.substring(signer.address.length - 4)}` : "Connect Wallet"}
        </Button>
      )}
      <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-lg border-white/10">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to interact with Avalaunch
          </DialogDescription>
        </DialogHeader>

        {!connecting ? (
          <div className="grid gap-4 py-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-red-500 text-sm mb-2">
                {error}
              </div>
            )}

            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/10 hover:border-white/20 transition-all"
                onClick={() => {
                  setSelectedWallet(wallet);
                  setConnecting(true);
                  connectWallet(wallet.id);
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    className="w-8 h-8 rounded-md object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium">{wallet.name}</p>
                    <p className="text-sm text-gray-400">
                      {wallet.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}

            <p className="text-xs text-gray-400 text-center mt-2">
              By connecting your wallet, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-4">
              <img
                src={selectedWallet?.icon}
                alt={selectedWallet?.name}
                className="w-8 h-8 object-cover"
              />
            </div>
            <h3 className="text-lg font-medium mb-1">
              Connecting to {selectedWallet?.name}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Confirm the connection in your wallet
            </p>

            <div className="animate-pulse w-8 h-1 bg-primary rounded-full"></div>

            <Button
              variant="outline"
              size="sm"
              className="mt-6 border-white/20"
              onClick={() => {
                setConnecting(false);
                setSelectedWallet(null);
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
