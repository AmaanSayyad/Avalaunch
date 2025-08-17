import { useState, useContext } from "react";
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
import { WalletContext, shortenAddress } from "@/context/walletContext";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const walletOptions: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/lovable-uploads/7cc724d4-3e14-4e7c-9e7a-8d613fde54d0.png",
    description: "Connect to your MetaMask wallet",
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
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { connectWallet, isConnected, walletAddress } = useContext(WalletContext);

  const handleConnect = async (wallet: WalletOption) => {
    setSelectedWallet(wallet);
    setConnecting(true);
    setError(null);

    try {
      await connectWallet();
      
      if (onConnect) {
        onConnect(wallet.id);
      }
      
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  };

  const displayAddress = walletAddress ? shortenAddress(walletAddress) : "Connect Wallet";

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
          {isConnected ? displayAddress : "Connect Wallet"}
        </Button>
      )}
      <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-lg border-white/10">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your MetaMask wallet to interact with Avalaunch
          </DialogDescription>
        </DialogHeader>

        {!connecting ? (
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <Button
                key={wallet.id}
                onClick={() => handleConnect(wallet)}
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    className="w-8 h-8 rounded-lg"
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white">{wallet.name}</div>
                    <div className="text-sm text-gray-400">{wallet.description}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Connecting to {selectedWallet?.name}...</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}