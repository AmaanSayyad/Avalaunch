import { useState, useEffect, useContext } from "react";
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
import { WalletContext, shortenAddress } from "@/context/walletContext";

export interface WalletButtonProps {
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  className?: string;
  onConnect?: () => void;
}

export function WalletButton({ size = "default", variant = "outline", className = "", onConnect }: WalletButtonProps) {
  const { 
    isConnected, 
    walletAddress, 
    disconnectWallet,
    connectWallet
  } = useContext(WalletContext);
  
  const [balance, setBalance] = useState<string | null>("125.45 AVAX"); // Mock balance
  
  const handleConnect = async () => {
    try {
      await connectWallet();
      
      // Call the onConnect callback if provided
      if (onConnect) {
        onConnect();
      }
    } catch (error) {
      console.error("Error in handleConnect:", error);
    }
  };
  
  const handleDisconnect = () => {
    disconnectWallet();
  };
  
  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
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
    if (walletAddress) {
      window.open(`https://subnets.avax.network/address/${walletAddress}`, "_blank");
    } else {
      window.open("https://subnets.avax.network/", "_blank");
    }
  };
  
  if (!isConnected) {
    return (
      <Button 
        onClick={handleConnect}
        variant={variant} 
        size={size} 
        className={className}
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    );
  }
  
  const displayAddress = walletAddress ? shortenAddress(walletAddress) : "";
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Wallet className="w-4 h-4 mr-2 flex-shrink-0" />
          {displayAddress}
          <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-lg border-white/10">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>Wallet</span>
            <span className="text-sm font-normal text-gray-400 truncate">{walletAddress}</span>
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