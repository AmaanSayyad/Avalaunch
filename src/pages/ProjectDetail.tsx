import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MilestoneCard } from "@/components/projects/MilestoneCard";
import {
  ArrowUpRight,
  Calendar,
  Users,
  BarChart3,
  FileText,
  Github,
  Globe,
  Twitter,
  MessageSquare,
  Share2,
  Bookmark
} from "lucide-react";

// Sample project data
const projectData = {
  id: "1",
  name: "AvaSwap DEX",
  description: "A next-generation decentralized exchange built specifically for the Avalanche ecosystem with cross-subnet compatibility and milestone-based development funding.",
  longDescription: "AvaSwap is building the next generation decentralized exchange for the Avalanche ecosystem. Our platform will enable seamless trading across all Avalanche subnets with industry-leading speed and security. We're implementing advanced features like cross-chain swaps, concentrated liquidity pools, and gasless trading to create the most user-friendly DEX experience on Avalanche.\n\nOur team consists of experienced DeFi developers who previously worked at leading exchanges and Avalanche ecosystem projects. We're committed to building a sustainable DEX that serves the needs of both retail users and institutional traders.",
  logo: "/lovable-uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png",
  coverImage: "/lovable-uploads/86329743-ee49-4f2e-96f7-50508436273d.png",
  category: "DeFi",
  fundingGoal: 50000,
  fundingRaised: 35000,
  equity: 5,
  milestones: 4,
  completedMilestones: 2,
  daysLeft: 14,
  status: "active",
  team: [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://avatars.githubusercontent.com/u/1234567?v=4",
      bio: "Former lead developer at a major DEX, 8+ years in DeFi"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "https://avatars.githubusercontent.com/u/2345678?v=4",
      bio: "Blockchain architect, Avalanche ecosystem contributor"
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Smart Contract Developer",
      image: "https://avatars.githubusercontent.com/u/3456789?v=4",
      bio: "Security expert, audited 20+ DeFi protocols"
    }
  ],
  milestonesList: [
    {
      id: "m1",
      title: "Platform Architecture & Design",
      description: "Design system architecture, smart contracts, and user interface for the DEX.",
      fundingAmount: 10000,
      fundingPercentage: 20,
      startDate: "Jan 1, 2023",
      endDate: "Feb 15, 2023",
      deliverables: [
        "Technical architecture document",
        "Smart contract specifications",
        "UI/UX design mockups",
        "Security model documentation"
      ],
      status: "completed"
    },
    {
      id: "m2",
      title: "Core Smart Contract Development",
      description: "Develop and audit the core smart contracts for the exchange.",
      fundingAmount: 15000,
      fundingPercentage: 30,
      startDate: "Feb 16, 2023",
      endDate: "Apr 30, 2023",
      deliverables: [
        "AMM core contracts",
        "Liquidity pool contracts",
        "Token swap functionality",
        "Security audit report"
      ],
      status: "completed"
    },
    {
      id: "m3",
      title: "Frontend Development & Beta Launch",
      description: "Develop the frontend interface and launch a beta version on Avalanche Fuji testnet.",
      fundingAmount: 12500,
      fundingPercentage: 25,
      startDate: "May 1, 2023",
      endDate: "Jul 15, 2023",
      deliverables: [
        "Functional web interface",
        "Wallet integration",
        "Beta launch on Fuji testnet",
        "User testing report"
      ],
      status: "active"
    },
    {
      id: "m4",
      title: "Mainnet Launch & Marketing",
      description: "Launch on Avalanche mainnet and execute marketing campaign to attract users.",
      fundingAmount: 12500,
      fundingPercentage: 25,
      startDate: "Jul 16, 2023",
      endDate: "Sep 30, 2023",
      deliverables: [
        "Mainnet deployment",
        "Marketing campaign execution",
        "Partnership announcements",
        "Liquidity mining program launch"
      ],
      status: "upcoming"
    }
  ],
  updates: [
    {
      date: "Jun 15, 2023",
      title: "Frontend Development Progress Update",
      content: "We've completed 70% of the frontend development for the DEX. The wallet integration is now working seamlessly with MetaMask, Core, and other popular Avalanche wallets. We're now focusing on the trading interface and charts."
    },
    {
      date: "May 20, 2023",
      title: "Smart Contract Audit Completed",
      content: "We're happy to announce that our smart contracts have passed the security audit with no critical issues. The audit was conducted by a leading blockchain security firm, and the full report is available on our GitHub."
    },
    {
      date: "Apr 28, 2023",
      title: "Core Smart Contracts Completed",
      content: "We've completed the development of our core smart contracts, including the AMM, liquidity pools, and token swap functionality. The contracts are now being prepared for security audit."
    }
  ],
  links: {
    website: "https://avaswap.io",
    github: "https://github.com/avaswap",
    twitter: "https://twitter.com/avaswap",
    telegram: "https://t.me/avaswap"
  }
};

const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const fundingProgress = (projectData.fundingRaised / projectData.fundingGoal) * 100;
  const milestoneProgress = (projectData.completedMilestones / projectData.milestones) * 100;

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-12">
        <div className="absolute inset-0 h-80 overflow-hidden">
          <img
            src={projectData.coverImage}
            alt={`${projectData.name} cover`}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </div>
        
        <div className="container px-4 relative z-10 pt-16">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <img
              src={projectData.logo}
              alt={`${projectData.name} logo`}
              className="w-20 h-20 rounded-xl object-cover border border-white/10"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-medium">{projectData.name}</h1>
                <Badge
                  className={`
                    ${projectData.status === "active" ? "bg-primary/20 text-primary" : ""}
                    ${projectData.status === "completed" ? "bg-blue-500/20 text-blue-500" : ""}
                    ${projectData.status === "upcoming" ? "bg-orange-500/20 text-orange-500" : ""}
                  `}
                >
                  {projectData.status === "active" ? "Active Funding" : ""}
                  {projectData.status === "completed" ? "Funded" : ""}
                  {projectData.status === "upcoming" ? "Upcoming" : ""}
                </Badge>
              </div>
              <p className="text-gray-400 mb-4 max-w-3xl">
                {projectData.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="border-white/20 text-white">
                  {projectData.category}
                </Badge>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {projectData.daysLeft} days left
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {projectData.team.length} team members
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
              <Button variant="outline" className="border-white/20">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
              <Button variant="outline" className="border-white/20">
                <Bookmark className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button className="button-gradient">
                Invest Now
              </Button>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-4">Funding Progress</h3>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Raised</span>
                <span className="text-white">
                  {projectData.fundingRaised.toLocaleString()} / {projectData.fundingGoal.toLocaleString()} AVAX
                </span>
              </div>
              <Progress value={fundingProgress} className="h-2 mb-4" />
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Equity Offered</p>
                  <p className="font-medium">{projectData.equity}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Min Investment</p>
                  <p className="font-medium">100 AVAX</p>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-4">Milestone Progress</h3>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Completed</span>
                <span className="text-white">
                  {projectData.completedMilestones} of {projectData.milestones} milestones
                </span>
              </div>
              <Progress value={milestoneProgress} className="h-2 mb-4" />
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Current Milestone</p>
                  <p className="font-medium">Frontend Development</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Next Release</p>
                  <p className="font-medium">Jul 15, 2023</p>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-4">Project Links</h3>
              <div className="space-y-3">
                <a href={projectData.links.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <Globe className="w-4 h-4 text-gray-400" />
                  Website
                  <ArrowUpRight className="w-3 h-3 ml-auto" />
                </a>
                <a href={projectData.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <Github className="w-4 h-4 text-gray-400" />
                  GitHub
                  <ArrowUpRight className="w-3 h-3 ml-auto" />
                </a>
                <a href={projectData.links.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4 text-gray-400" />
                  Twitter
                  <ArrowUpRight className="w-3 h-3 ml-auto" />
                </a>
                <a href={projectData.links.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  Telegram
                  <ArrowUpRight className="w-3 h-3 ml-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="container px-4 py-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 max-w-2xl mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="milestones" className="data-[state=active]:bg-primary/20">
              Milestones
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-primary/20">
              Team
            </TabsTrigger>
            <TabsTrigger value="updates" className="data-[state=active]:bg-primary/20">
              Updates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-medium mb-4">About {projectData.name}</h2>
                <div className="text-gray-300 space-y-4">
                  {projectData.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-medium mb-4">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Cross-subnet trading with minimal slippage</li>
                    <li>Concentrated liquidity pools for capital efficiency</li>
                    <li>Gasless trading options for improved UX</li>
                    <li>Advanced trading features including limit orders and stop losses</li>
                    <li>Governance token with revenue sharing for early investors</li>
                  </ul>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-medium mb-4">Roadmap</h3>
                  <div className="space-y-6">
                    {projectData.milestonesList.map((milestone, index) => (
                      <div key={milestone.id} className="flex gap-4">
                        <div className="relative">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            milestone.status === "completed" ? "bg-primary" : 
                            milestone.status === "active" ? "bg-blue-500" : "bg-gray-700"
                          }`}>
                            {milestone.status === "completed" && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          {index < projectData.milestonesList.length - 1 && (
                            <div className={`absolute top-6 bottom-0 left-1/2 w-0.5 -translate-x-1/2 ${
                              milestone.status === "completed" ? "bg-primary" : "bg-gray-700"
                            }`} />
                          )}
                        </div>
                        <div className="pb-8">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">{milestone.startDate} - {milestone.endDate}</p>
                          <p className="text-sm text-gray-300 mt-2">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="glass p-6 rounded-xl">
                  <h3 className="text-lg font-medium mb-4">Investment Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Funding Goal</p>
                      <p className="font-medium">{projectData.fundingGoal.toLocaleString()} AVAX</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Equity Offered</p>
                      <p className="font-medium">{projectData.equity}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Minimum Investment</p>
                      <p className="font-medium">100 AVAX</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Token Type</p>
                      <p className="font-medium">Equity + Governance Token</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Vesting Period</p>
                      <p className="font-medium">12 months (25% quarterly)</p>
                    </div>
                  </div>
                  <Button className="button-gradient w-full mt-6">
                    Invest Now
                  </Button>
                </div>
                
                <div className="glass p-6 rounded-xl">
                  <h3 className="text-lg font-medium mb-4">Documents</h3>
                  <div className="space-y-3">
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Whitepaper.pdf
                      <ArrowUpRight className="w-3 h-3 ml-auto" />
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Technical_Architecture.pdf
                      <ArrowUpRight className="w-3 h-3 ml-auto" />
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Security_Audit_Report.pdf
                      <ArrowUpRight className="w-3 h-3 ml-auto" />
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Tokenomics.pdf
                      <ArrowUpRight className="w-3 h-3 ml-auto" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="milestones" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <div className="mb-6">
                <h2 className="text-2xl font-medium mb-2">Project Milestones</h2>
                <p className="text-gray-400">
                  Funding is released based on milestone completion and investor voting. Each milestone must be approved by at least 50% of investors.
                </p>
              </div>
              
              {projectData.milestonesList.map((milestone) => (
                <MilestoneCard
                  key={milestone.id}
                  {...milestone}
                  votingProgress={milestone.status === "voting" ? 42 : undefined}
                  votingDeadline={milestone.status === "voting" ? "3 days" : undefined}
                />
              ))}
              
              {/* Example of a milestone in voting status */}
              <MilestoneCard
                id="m3-voting"
                title="Frontend Development & Beta Launch"
                description="Develop the frontend interface and launch a beta version on Avalanche Fuji testnet."
                fundingAmount={12500}
                fundingPercentage={25}
                startDate="May 1, 2023"
                endDate="Jul 15, 2023"
                deliverables={[
                  "Functional web interface",
                  "Wallet integration",
                  "Beta launch on Fuji testnet",
                  "User testing report"
                ]}
                status="voting"
                votingProgress={42}
                votingDeadline="3 days"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="mt-0">
            <div className="mb-6">
              <h2 className="text-2xl font-medium mb-2">Team Members</h2>
              <p className="text-gray-400">
                Meet the team building {projectData.name}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projectData.team.map((member, index) => (
                <div key={index} className="glass p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-primary text-sm">{member.role}</p>
                      <p className="text-gray-400 text-sm mt-2">{member.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="updates" className="mt-0">
            <div className="mb-6">
              <h2 className="text-2xl font-medium mb-2">Project Updates</h2>
              <p className="text-gray-400">
                Latest news and progress updates from the {projectData.name} team
              </p>
            </div>
            
            <div className="space-y-6">
              {projectData.updates.map((update, index) => (
                <div key={index} className="glass p-6 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-white/20 text-white">
                      {update.date}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{update.title}</h3>
                  <p className="text-gray-300">{update.content}</p>
                </div>
              ))}
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
            Ready to invest in {projectData.name}?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join other investors in funding this promising Avalanche ecosystem project through milestone-based equity funding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="button-gradient">
              Invest Now
            </Button>
            <Button size="lg" variant="outline" className="border-white/20">
              View All Milestones
            </Button>
          </div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectDetail;
