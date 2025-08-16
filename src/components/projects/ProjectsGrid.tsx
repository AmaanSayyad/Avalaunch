import { useState } from "react";
import { ProjectCard, ProjectCardProps } from "./ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

// Sample project data
const sampleProjects: ProjectCardProps[] = [
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
    milestones: 4,
    completedMilestones: 2,
    daysLeft: 14,
    status: "active"
  },
  {
    id: "2",
    name: "AvaStorage",
    description: "Decentralized storage solution leveraging Avalanche's speed and security for enterprise-grade data management.",
    logo: "/lovable-uploads/7cc724d4-3e14-4e7c-9e7a-8d613fde54d0.png",
    coverImage: "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png",
    category: "Infrastructure",
    fundingGoal: 75000,
    fundingRaised: 75000,
    equity: 7.5,
    milestones: 5,
    completedMilestones: 5,
    status: "completed"
  },
  {
    id: "3",
    name: "AvaLend",
    description: "P2P lending protocol enabling users to borrow and lend assets with customizable terms and milestone-based repayments.",
    logo: "/lovable-uploads/5830bd79-3511-41dc-af6c-8db32d91fc2c.png",
    coverImage: "/lovable-uploads/b6436838-5c1a-419a-9cdc-1f9867df073d.png",
    category: "DeFi",
    fundingGoal: 40000,
    fundingRaised: 28000,
    equity: 4,
    milestones: 3,
    completedMilestones: 1,
    daysLeft: 21,
    status: "active"
  },
  {
    id: "4",
    name: "AvaIdentity",
    description: "Self-sovereign identity solution for the Avalanche ecosystem, enabling secure and private identity verification.",
    logo: "/lovable-uploads/bf56a0c6-48e4-49f7-b286-8e3fda9a3385.png",
    coverImage: "/lovable-uploads/79f2b901-8a4e-42a5-939f-fae0828e0aef.png",
    category: "Identity",
    fundingGoal: 30000,
    fundingRaised: 0,
    equity: 6,
    milestones: 3,
    completedMilestones: 0,
    daysLeft: 30,
    status: "upcoming"
  },
  {
    id: "5",
    name: "AvaDAO",
    description: "DAO creation and management platform with advanced governance features and milestone-based treasury management.",
    logo: "/lovable-uploads/1e2a48dc-059b-4919-a1ed-44685d771a32.png",
    coverImage: "/lovable-uploads/a2c0bb3a-a47b-40bf-ba26-d79f2f9e741b.png",
    category: "Governance",
    fundingGoal: 60000,
    fundingRaised: 45000,
    equity: 8,
    milestones: 4,
    completedMilestones: 2,
    daysLeft: 7,
    status: "active"
  },
  {
    id: "6",
    name: "AvaInsure",
    description: "Decentralized insurance protocol for crypto assets with automated claims processing and milestone-based coverage.",
    logo: "/lovable-uploads/bb50362c-6879-4868-bbc9-c6e051fd8d7d.png",
    coverImage: "/lovable-uploads/e143cef1-4ad0-404b-b47a-147e89bc017c.png",
    category: "Insurance",
    fundingGoal: 45000,
    fundingRaised: 12000,
    equity: 5.5,
    milestones: 4,
    completedMilestones: 1,
    daysLeft: 25,
    status: "active"
  },
];

// Categories for filtering
const categories = ["All", "DeFi", "Infrastructure", "Identity", "Governance", "Insurance"];

// Statuses for filtering
const statuses = ["All", "Active", "Completed", "Upcoming"];

export function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  
  // Filter projects based on search query, category, and status
  const filteredProjects = sampleProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    
    const matchesStatus = selectedStatus === "All" || 
                         (selectedStatus === "Active" && project.status === "active") ||
                         (selectedStatus === "Completed" && project.status === "completed") ||
                         (selectedStatus === "Upcoming" && project.status === "upcoming");
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <section className="py-16">
      <div className="container px-4">
        <h2 className="text-4xl font-normal mb-6">
          Explore <span className="text-gradient font-medium">Avalanche Projects</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
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
                  {selectedCategory} <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/10">
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="cursor-pointer"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white/10">
                  {selectedStatus} <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/10">
                {statuses.map((status) => (
                  <DropdownMenuItem 
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className="cursor-pointer"
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" className="border-white/10">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">No projects found matching your criteria.</p>
            <Button 
              variant="link" 
              className="text-primary mt-2"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedStatus("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
