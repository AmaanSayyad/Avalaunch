import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Search,
  ChevronDown,
  Plus,
  Filter,
  Bell,
  Settings,
  LogOut,
  ArrowRight
} from "lucide-react";

// Sample projects data
const founderProjects = [
  {
    id: "1",
    name: "AvaSwap DEX",
    description: "A next-generation decentralized exchange built specifically for the Avalanche ecosystem with cross-subnet compatibility.",
    logo: "/lovable-uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png",
    coverImage: "/lovable-uploads/86329743-ee49-4f2e-96f7-50508436273d.png",
    category: "DeFi",
    fundingGoal: 50000,
    fundingRaised: 35000,
    equity: 5,
    investors: 42,
    status: "active",
    milestones: 4,
    completedMilestones: 2,
    nextMilestone: "Frontend Development & Beta Launch",
    nextMilestoneDeadline: "Jul 15, 2023"
  },
  {
    id: "2",
    name: "AvaLend",
    description: "P2P lending protocol enabling users to borrow and lend assets with customizable terms and milestone-based repayments.",
    logo: "/lovable-uploads/5830bd79-3511-41dc-af6c-8db32d91fc2c.png",
    coverImage: "/lovable-uploads/b6436838-5c1a-419a-9cdc-1f9867df073d.png",
    category: "DeFi",
    fundingGoal: 40000,
    fundingRaised: 28000,
    equity: 4,
    investors: 31,
    status: "active",
    milestones: 3,
    completedMilestones: 1,
    nextMilestone: "Smart Contract Development",
    nextMilestoneDeadline: "Aug 30, 2023"
  },
  {
    id: "3",
    name: "AvaDAO",
    description: "DAO creation and management platform with advanced governance features and milestone-based treasury management.",
    logo: "/lovable-uploads/1e2a48dc-059b-4919-a1ed-44685d771a32.png",
    coverImage: "/lovable-uploads/a2c0bb3a-a47b-40bf-ba26-d79f2f9e741b.png",
    category: "Governance",
    fundingGoal: 60000,
    fundingRaised: 45000,
    equity: 8,
    investors: 53,
    status: "active",
    milestones: 4,
    completedMilestones: 2,
    nextMilestone: "Governance Framework",
    nextMilestoneDeadline: "Jun 20, 2023"
  }
];

const FounderProjectsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter projects based on search query and status
  const filteredProjects = founderProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Dashboard Header */}
      <div className="pt-28 pb-8 bg-[#0A0A0A]">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium">My Projects</h1>
              <p className="text-gray-400 mt-1">
                Manage your Avalanche ecosystem projects
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="border-white/20">
                <Bell className="w-4 h-4 mr-2" /> Notifications
              </Button>
              <Button variant="outline" className="border-white/20">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </Button>
              <Button variant="outline" className="border-white/20">
                <LogOut className="w-4 h-4 mr-2" /> Disconnect
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mt-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search projects..."
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
                  <DropdownMenuItem onClick={() => setStatusFilter("completed")} className="cursor-pointer">
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="border-white/10">
                <Filter className="w-4 h-4" />
              </Button>
              
              <Button className="button-gradient">
                <Plus className="w-4 h-4 mr-2" /> Create Project
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects List */}
      <div className="container px-4 py-8">
        {filteredProjects.length > 0 ? (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-black/40 backdrop-blur-lg border-white/10 p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-64 flex-shrink-0">
                    <img
                      src={project.logo}
                      alt={project.name}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 mb-4"
                    />
                    <h3 className="text-xl font-medium mb-2">{project.name}</h3>
                    <Badge
                      className={`
                        ${project.status === "active" ? "bg-primary/20 text-primary" : ""}
                        ${project.status === "completed" ? "bg-blue-500/20 text-blue-500" : ""}
                      `}
                    >
                      {project.status === "active" ? "Active" : ""}
                      {project.status === "completed" ? "Completed" : ""}
                    </Badge>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <p className="text-gray-300 text-sm">{project.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Funding Progress</p>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-white font-medium">{project.fundingRaised.toLocaleString()} AVAX</span>
                          <span className="text-gray-400">{((project.fundingRaised / project.fundingGoal) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={(project.fundingRaised / project.fundingGoal) * 100} className="h-1.5" />
                      </div>
                      
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Milestone Progress</p>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-white font-medium">{project.completedMilestones} of {project.milestones}</span>
                          <span className="text-gray-400">{((project.completedMilestones / project.milestones) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={(project.completedMilestones / project.milestones) * 100} className="h-1.5" />
                      </div>
                      
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Investors</p>
                        <p className="font-medium">{project.investors}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Equity Sold</p>
                        <p className="font-medium">{project.equity}%</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Next Milestone</p>
                        <p className="text-sm font-medium">{project.nextMilestone} <span className="text-gray-400 font-normal">· Due {project.nextMilestoneDeadline}</span></p>
                      </div>
                      
                      <Button 
                        className="button-gradient"
                        onClick={() => window.location.href = `/founder-dashboard/project/${project.id}`}
                      >
                        Manage Project <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400 mb-4">No projects found matching your criteria.</p>
            <Button 
              variant="link" 
              className="text-primary mb-8"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
            >
              Clear filters
            </Button>
            
            <div className="max-w-md mx-auto bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-medium mb-4">Create your first project</h3>
              <p className="text-gray-300 mb-6">
                Get started by creating your first project on BuildnFund and connect with investors in the Avalanche ecosystem.
              </p>
              <Button className="button-gradient">
                <Plus className="w-4 h-4 mr-2" /> Create Project
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FounderProjectsList;
