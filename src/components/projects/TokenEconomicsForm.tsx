import { useState } from "react";
import { motion } from "framer-motion";
import { Coins, Info, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TokenAllocation {
  category: string;
  percentage: number;
  lockupPeriod: string;
  vestingSchedule: string;
}

interface TokenEconomics {
  hasToken: boolean;
  tokenName: string;
  tokenSymbol: string;
  tokenType: string;
  totalSupply: string;
  initialPrice: string;
  tokenUtility: string;
  tokenAllocations: TokenAllocation[];
}

interface TokenEconomicsFormProps {
  tokenEconomics: TokenEconomics;
  onChange: (data: TokenEconomics) => void;
}

const defaultTokenAllocation: TokenAllocation = {
  category: "",
  percentage: 0,
  lockupPeriod: "",
  vestingSchedule: "",
};

const TokenEconomicsForm: React.FC<TokenEconomicsFormProps> = ({ tokenEconomics, onChange }) => {
  const [newAllocation, setNewAllocation] = useState<TokenAllocation>({...defaultTokenAllocation});
  const [showAllocationForm, setShowAllocationForm] = useState(false);
  
  const handleHasTokenChange = (value: boolean) => {
    onChange({
      ...tokenEconomics,
      hasToken: value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...tokenEconomics,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    onChange({
      ...tokenEconomics,
      [name]: value,
    });
  };

  const handleAllocationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAllocation({
      ...newAllocation,
      [name]: value,
    });
  };

  const handleAllocationSelectChange = (name: string, value: string) => {
    setNewAllocation({
      ...newAllocation,
      [name]: value,
    });
  };

  const handlePercentageChange = (value: number[]) => {
    setNewAllocation({
      ...newAllocation,
      percentage: value[0],
    });
  };

  const addAllocation = () => {
    if (newAllocation.category && newAllocation.percentage > 0) {
      onChange({
        ...tokenEconomics,
        tokenAllocations: [...tokenEconomics.tokenAllocations, { ...newAllocation }],
      });
      setNewAllocation({...defaultTokenAllocation});
      setShowAllocationForm(false);
    }
  };

  const removeAllocation = (index: number) => {
    const updatedAllocations = [...tokenEconomics.tokenAllocations];
    updatedAllocations.splice(index, 1);
    onChange({
      ...tokenEconomics,
      tokenAllocations: updatedAllocations,
    });
  };

  const totalAllocation = tokenEconomics.tokenAllocations.reduce(
    (sum, allocation) => sum + allocation.percentage,
    0
  );

  const remainingAllocation = 100 - totalAllocation;

  const tokenTypeOptions = [
    "ERC-20 / ARC-20",
    "Governance Token",
    "Utility Token",
    "Security Token",
    "NFT",
    "Other"
  ];

  const categoryOptions = [
    "Team",
    "Investors",
    "Advisors",
    "Community",
    "Ecosystem",
    "Treasury",
    "Liquidity",
    "Marketing",
    "Development",
    "Staking Rewards",
    "Airdrops",
    "Reserve",
    "Other"
  ];

  const lockupPeriodOptions = [
    "No lockup",
    "3 months",
    "6 months",
    "1 year",
    "2 years",
    "Custom"
  ];

  const vestingScheduleOptions = [
    "No vesting",
    "Linear (monthly)",
    "Linear (quarterly)",
    "Cliff (6 months)",
    "Cliff (1 year)",
    "Custom"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="glass rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-medium mb-6">Token Economics</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Will your project have a token?</Label>
            <Tabs 
              defaultValue={tokenEconomics.hasToken ? "yes" : "no"} 
              className="w-full"
              onValueChange={(value) => handleHasTokenChange(value === "yes")}
            >
              <TabsList className="grid w-full grid-cols-2 max-w-xs">
                <TabsTrigger value="yes" className="data-[state=active]:bg-primary/20">Yes</TabsTrigger>
                <TabsTrigger value="no" className="data-[state=active]:bg-primary/20">No</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {tokenEconomics.hasToken && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tokenName">Token Name *</Label>
                  <Input
                    id="tokenName"
                    name="tokenName"
                    value={tokenEconomics.tokenName}
                    onChange={handleInputChange}
                    placeholder="e.g., Avalanche Swap Token"
                    className="bg-black/30 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tokenSymbol">Token Symbol *</Label>
                  <Input
                    id="tokenSymbol"
                    name="tokenSymbol"
                    value={tokenEconomics.tokenSymbol}
                    onChange={handleInputChange}
                    placeholder="e.g., AST"
                    className="bg-black/30 border-white/10"
                    maxLength={8}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tokenType">Token Type *</Label>
                  <Select
                    value={tokenEconomics.tokenType}
                    onValueChange={(value) => handleSelectChange("tokenType", value)}
                  >
                    <SelectTrigger className="bg-black/30 border-white/10">
                      <SelectValue placeholder="Select token type" />
                    </SelectTrigger>
                    <SelectContent>
                      {tokenTypeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalSupply">Total Supply *</Label>
                  <Input
                    id="totalSupply"
                    name="totalSupply"
                    value={tokenEconomics.totalSupply}
                    onChange={handleInputChange}
                    placeholder="e.g., 1,000,000,000"
                    className="bg-black/30 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="initialPrice">Initial Price (in AVAX) *</Label>
                  <Input
                    id="initialPrice"
                    name="initialPrice"
                    value={tokenEconomics.initialPrice}
                    onChange={handleInputChange}
                    placeholder="e.g., 0.001"
                    className="bg-black/30 border-white/10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tokenUtility">Token Utility *</Label>
                <Textarea
                  id="tokenUtility"
                  name="tokenUtility"
                  value={tokenEconomics.tokenUtility}
                  onChange={handleInputChange}
                  placeholder="Describe how your token will be used within your project's ecosystem"
                  className="bg-black/30 border-white/10 min-h-[100px]"
                />
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Token Allocation</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      Allocated: <span className={totalAllocation === 100 ? "text-green-500" : "text-yellow-500"}>{totalAllocation}%</span>
                    </span>
                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${totalAllocation === 100 ? "bg-green-500" : "bg-yellow-500"}`} 
                        style={{ width: `${totalAllocation}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {tokenEconomics.tokenAllocations.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {tokenEconomics.tokenAllocations.map((allocation, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-black/30 border border-white/10 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Coins className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{allocation.category}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span>Lockup: {allocation.lockupPeriod}</span>
                              <span>Vesting: {allocation.vestingSchedule}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{allocation.percentage}%</span>
                          <button
                            type="button"
                            onClick={() => removeAllocation(index)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {showAllocationForm ? (
                  <div className="bg-black/30 border border-white/10 rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Add Token Allocation</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={newAllocation.category}
                          onValueChange={(value) => handleAllocationSelectChange("category", value)}
                        >
                          <SelectTrigger className="bg-black/50 border-white/10">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Percentage *</Label>
                          <span className="text-sm">
                            {remainingAllocation}% remaining
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Slider
                            value={[newAllocation.percentage]}
                            min={1}
                            max={remainingAllocation || 100}
                            step={1}
                            className="flex-grow"
                            onValueChange={handlePercentageChange}
                          />
                          <span className="text-sm font-medium w-10 text-right">{newAllocation.percentage}%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lockupPeriod">Lockup Period</Label>
                        <Select
                          value={newAllocation.lockupPeriod}
                          onValueChange={(value) => handleAllocationSelectChange("lockupPeriod", value)}
                        >
                          <SelectTrigger className="bg-black/50 border-white/10">
                            <SelectValue placeholder="Select lockup period" />
                          </SelectTrigger>
                          <SelectContent>
                            {lockupPeriodOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="vestingSchedule">Vesting Schedule</Label>
                        <Select
                          value={newAllocation.vestingSchedule}
                          onValueChange={(value) => handleAllocationSelectChange("vestingSchedule", value)}
                        >
                          <SelectTrigger className="bg-black/50 border-white/10">
                            <SelectValue placeholder="Select vesting schedule" />
                          </SelectTrigger>
                          <SelectContent>
                            {vestingScheduleOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAllocationForm(false);
                          setNewAllocation({...defaultTokenAllocation});
                        }}
                        className="border-white/10 hover:bg-white/5"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={addAllocation}
                        className="button-gradient"
                        disabled={!newAllocation.category || newAllocation.percentage <= 0}
                      >
                        Add Allocation
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAllocationForm(true)}
                    className="border-white/10 hover:bg-white/5"
                    disabled={remainingAllocation <= 0}
                  >
                    <Plus className="mr-2 h-4 w-4" /> 
                    {remainingAllocation <= 0 
                      ? "All tokens allocated" 
                      : "Add Token Allocation"
                    }
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="glass rounded-xl border border-white/10 p-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-500/20 p-3 rounded-lg mt-1">
            <Info className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Token Economics Best Practices</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Be transparent about token allocation and vesting schedules</li>
              <li>• Ensure your token has clear utility within your project's ecosystem</li>
              <li>• Consider lockup periods for team and early investor allocations</li>
              <li>• Allocate a significant portion to community and ecosystem development</li>
              <li>• Plan for long-term sustainability with treasury allocations</li>
              <li>• Ensure compliance with relevant regulations</li>
            </ul>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="link" className="text-primary px-0 mt-2">
                    Learn more about token economics
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm bg-black/95 border border-white/10 p-4">
                  <p className="text-sm">
                    Well-designed token economics are crucial for project success. They should align incentives between all stakeholders, create sustainable value, and support the project's long-term vision.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TokenEconomicsForm;
