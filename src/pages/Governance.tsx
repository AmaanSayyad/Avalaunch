import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ProposalCard, ProposalCardProps } from "@/components/governance/ProposalCard";
import { 
  Search, 
  ChevronDown, 
  Plus, 
  Filter,
  ArrowRight
} from "lucide-react";

// Sample proposals data
const proposals: ProposalCardProps[] = [
  {
    id: "prop1",
    title: "Milestone 3 Approval: AvaSwap Frontend Development",
    description: "Vote to approve the completion of Milestone 3 (Frontend Development & Beta Launch) for the AvaSwap DEX project and release the allocated funding.",
    creator: {
      name: "Alex Johnson",
      image: "https://avatars.githubusercontent.com/u/1234567?v=4"
    },
    projectId: "1",
    projectName: "AvaSwap DEX",
    projectLogo: "/lovable-uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png",
    createdAt: "Jun 15, 2023",
    endDate: "Jun 22, 2023",
    status: "active",
    votesFor: 28,
    votesAgainst: 5,
    votesAbstain: 3,
    totalVotes: 36,
    quorum: 50,
    type: "milestone"
  },
  {
    id: "prop2",
    title: "Platform Fee Adjustment Proposal",
    description: "Proposal to adjust the platform fee from 2% to 1.5% for all projects to encourage more founders to launch on Avalaunch.",
    creator: {
      name: "Sarah Chen",
      image: "https://avatars.githubusercontent.com/u/2345678?v=4"
    },
    createdAt: "Jun 10, 2023",
    endDate: "Jun 17, 2023",
    status: "active",
    votesFor: 42,
    votesAgainst: 12,
    votesAbstain: 8,
    totalVotes: 62,
    quorum: 100,
    type: "platform"
  },
  {
    id: "prop3",
    title: "AvaDAO Treasury Allocation Proposal",
    description: "Proposal to allocate 5,000 AVAX from the AvaDAO treasury for marketing and community growth initiatives.",
    creator: {
      name: "Michael Rodriguez",
      image: "https://avatars.githubusercontent.com/u/3456789?v=4"
    },
    projectId: "5",
    projectName: "AvaDAO",
    projectLogo: "/lovable-uploads/1e2a48dc-059b-4919-a1ed-44685d771a32.png",
    createdAt: "Jun 5, 2023",
    endDate: "Jun 12, 2023",
    status: "passed",
    votesFor: 75,
    votesAgainst: 15,
    votesAbstain: 10,
    totalVotes: 100,
    quorum: 80,
    userVoted: "for",
    type: "project"
  },
  {
    id: "prop4",
    title: "Milestone 1 Approval: AvaLend Smart Contracts",
    description: "Vote to approve the completion of Milestone 1 (Smart Contract Development) for the AvaLend project and release the allocated funding.",
    creator: {
      name: "Emily Zhang",
      image: "https://avatars.githubusercontent.com/u/4567890?v=4"
    },
    projectId: "3",
    projectName: "AvaLend",
    projectLogo: "/lovable-uploads/5830bd79-3511-41dc-af6c-8db32d91fc2c.png",
    createdAt: "May 25, 2023",
    endDate: "Jun 1, 2023",
    status: "passed",
    votesFor: 38,
    votesAgainst: 2,
    votesAbstain: 5,
    totalVotes: 45,
    quorum: 40,
    userVoted: "for",
    type: "milestone"
  },
  {
    id: "prop5",
    title: "Minimum Quorum Adjustment",
    description: "Proposal to adjust the minimum quorum requirement for platform governance proposals from 10% to 15% to ensure broader participation.",
    creator: {
      name: "James Rodriguez",
      image: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    createdAt: "May 20, 2023",
    endDate: "May 27, 2023",
    status: "failed",
    votesFor: 30,
    votesAgainst: 45,
    votesAbstain: 10,
    totalVotes: 85,
    quorum: 100,
    userVoted: "against",
    type: "platform"
  },
  {
    id: "prop6",
    title: "AvaInsure Premium Adjustment",
    description: "Proposal to adjust the premium structure for the AvaInsure protocol to make it more competitive in the market.",
    creator: {
      name: "Lisa Thompson",
      image: "https://avatars.githubusercontent.com/u/6789012?v=4"
    },
    projectId: "6",
    projectName: "AvaInsure",
    projectLogo: "/lovable-uploads/bb50362c-6879-4868-bbc9-c6e051fd8d7d.png",
    createdAt: "May 15, 2023",
    endDate: "May 22, 2023",
    status: "passed",
    votesFor: 25,
    votesAgainst: 5,
    votesAbstain: 3,
    totalVotes: 33,
    quorum: 30,
    userVoted: "abstain",
    type: "project"
  }
];

const Governance = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Filter proposals based on search query, status, and type
  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         proposal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (proposal.projectName && proposal.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter;
    
    const matchesType = typeFilter === "all" || proposal.type === typeFilter;
    
    // Filter based on the active tab
    const matchesTab = activeTab === "all" || 
                      (activeTab === "active" && proposal.status === "active") ||
                      (activeTab === "passed" && proposal.status === "passed") ||
                      (activeTab === "failed" && (proposal.status === "failed" || proposal.status === "canceled"));
    
    return matchesSearch && matchesStatus && matchesType && matchesTab;
  });

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-28 pb-12 bg-[#0A0A0A]">
        <div className="container px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-medium mb-4">Governance</h1>
            <p className="text-gray-300 text-lg mb-6">
              Participate in platform and project governance through voting on proposals. Help shape the future of Avalaunch and its projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="button-gradient">
                <Plus className="w-4 h-4 mr-2" /> Create Proposal
              </Button>
              <Button variant="outline" className="border-white/20">
                Governance Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Governance Content */}
      <div className="container px-4 py-12">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <TabsList className="grid grid-cols-4 max-w-md">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary/20">
                All Proposals
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-primary/20">
                Active
              </TabsTrigger>
              <TabsTrigger value="passed" className="data-[state=active]:bg-primary/20">
                Passed
              </TabsTrigger>
              <TabsTrigger value="failed" className="data-[state=active]:bg-primary/20">
                Failed
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search proposals..."
                  className="pl-10 bg-black/40 border-white/10 focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-white/10">
                      Status: {statusFilter === "all" ? "All" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                      <ChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/10">
                    <DropdownMenuItem onClick={() => setStatusFilter("all")} className="cursor-pointer">
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("active")} className="cursor-pointer">
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("passed")} className="cursor-pointer">
                      Passed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("failed")} className="cursor-pointer">
                      Failed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-white/10">
                      Type: {typeFilter === "all" ? "All" : typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
                      <ChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/10">
                    <DropdownMenuItem onClick={() => setTypeFilter("all")} className="cursor-pointer">
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTypeFilter("platform")} className="cursor-pointer">
                      Platform
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTypeFilter("milestone")} className="cursor-pointer">
                      Milestone
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTypeFilter("project")} className="cursor-pointer">
                      Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" className="border-white/10">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="space-y-6">
              {filteredProposals.length > 0 ? (
                filteredProposals.map((proposal) => (
                  <ProposalCard key={proposal.id} {...proposal} />
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-400">No proposals found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    className="text-primary mt-2"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            <div className="space-y-6">
              {filteredProposals.length > 0 ? (
                filteredProposals.map((proposal) => (
                  <ProposalCard key={proposal.id} {...proposal} />
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-400">No active proposals found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    className="text-primary mt-2"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="passed" className="mt-0">
            <div className="space-y-6">
              {filteredProposals.length > 0 ? (
                filteredProposals.map((proposal) => (
                  <ProposalCard key={proposal.id} {...proposal} />
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-400">No passed proposals found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    className="text-primary mt-2"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="failed" className="mt-0">
            <div className="space-y-6">
              {filteredProposals.length > 0 ? (
                filteredProposals.map((proposal) => (
                  <ProposalCard key={proposal.id} {...proposal} />
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-400">No failed proposals found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    className="text-primary mt-2"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* CTA Section */}
      <section className="container px-4 py-20 relative bg-black">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to create a proposal?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Submit your own governance proposal to improve Avalaunch or help projects reach their milestones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="button-gradient">
              Create Proposal
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20">
              Learn About Governance
            </Button>
          </div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Governance;
