import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WalletConnect } from "./WalletConnect";
import { Wallet, User, LogOut, Copy, ExternalLink, ChevronDown } from "lucide-react";

export interface WalletButtonProps {
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  className?: string;
  onConnect?: () => void;
}

// Helper function to shorten addresses consistently
const shortenAddress = (address: string): string => {
  if (!address) return "";
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
};

export function WalletButton({ size = "default", variant = "outline", className = "", onConnect }: WalletButtonProps) {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [fullAddress, setFullAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  
  const handleConnect = (walletId: string) => {
    // Mock wallet connection
    const mockAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
    setFullAddress(mockAddress);
    setWalletAddress(shortenAddress(mockAddress));
    setBalance("125.45 AVAX");
    setConnected(true);
    
    // Call the onConnect callback if provided
    if (onConnect) {
      onConnect();
    }
  };
  
  const handleDisconnect = () => {
    setConnected(false);
    setWalletAddress(null);
    setFullAddress(null);
    setBalance(null);
  };
  
  const handleCopyAddress = () => {
    if (fullAddress) {
      navigator.clipboard.writeText(fullAddress)
        .then(() => {
          alert("Address copied to clipboard!");
        })
        .catch(err => {
          console.error('Failed to copy address: ', err);
          alert("Failed to copy address");
        });
    }
  };
  
  const handleViewOnExplorer = () => {
    // In a real implementation, open the explorer with the wallet address
    if (fullAddress) {
      window.open(`https://subnets.avax.network/address/${fullAddress}`, "_blank");
    } else {
      window.open("https://subnets.avax.network/", "_blank");
    }
  };
  
  if (!connected) {
    return (
      <WalletConnect 
        onConnect={handleConnect} 
        variant={variant} 
        size={size} 
        className={className}
      />
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Wallet className="w-4 h-4 mr-2 flex-shrink-0" />
          {walletAddress}
          <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-lg border-white/10">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>Wallet</span>
            <span className="text-sm font-normal text-gray-400 truncate">{fullAddress}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem className="flex justify-between">
          <span>Balance</span>
          <span>{balance}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={() => window.location.href = "/investor-dashboard"}>
          <User className="w-4 h-4 mr-2" />
          <span>Investor Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.location.href = "/founder-dashboard"}>
          <User className="w-4 h-4 mr-2" />
          <span>Founder Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={handleCopyAddress}>
          <Copy className="w-4 h-4 mr-2" />
          <span>Copy Address</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleViewOnExplorer}>
          <ExternalLink className="w-4 h-4 mr-2" />
          <span>View on Explorer</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={handleDisconnect} className="text-red-500 focus:text-red-500">
          <LogOut className="w-4 h-4 mr-2" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}