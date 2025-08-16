import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowUpRight, 
  BarChart3, 
  Upload,
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
  Plus,
  FileText,
  Calendar,
  Users
} from "lucide-react";

// Sample data for the founder dashboard
const projectData = {
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
  milestones: [
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
  ]
};

const topInvestors = [
  {
    id: "inv1",
    name: "Michael Chen",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    invested: 5000,
    equity: 1.25,
    joinDate: "Jan 15, 2023"
  },
  {
    id: "inv2",
    name: "Sarah Johnson",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    invested: 3000,
    equity: 0.75,
    joinDate: "Jan 18, 2023"
  },
  {
    id: "inv3",
    name: "David Wilson",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    invested: 2500,
    equity: 0.625,
    joinDate: "Jan 20, 2023"
  },
  {
    id: "inv4",
    name: "Emily Zhang",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    invested: 2000,
    equity: 0.5,
    joinDate: "Feb 1, 2023"
  },
  {
    id: "inv5",
    name: "James Rodriguez",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    invested: 1500,
    equity: 0.375,
    joinDate: "Feb 5, 2023"
  }
];

const recentActivity = [
  {
    id: "activity1",
    type: "milestone_completed",
    description: "Milestone 2: Core Smart Contract Development marked as completed",
    date: "Apr 30, 2023"
  },
  {
    id: "activity2",
    type: "funds_received",
    description: "Received 15,000 AVAX for Milestone 2 completion",
    date: "May 5, 2023"
  },
  {
    id: "activity3",
    type: "investor_joined",
    investorName: "Emily Zhang",
    description: "New investor joined with 2,000 AVAX investment",
    date: "Feb 1, 2023"
  },
  {
    id: "activity4",
    type: "milestone_started",
    description: "Started work on Milestone 3: Frontend Development & Beta Launch",
    date: "May 1, 2023"
  }
];

const FounderDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const fundingProgress = (projectData.fundingRaised / projectData.fundingGoal) * 100;
  const completedMilestones = projectData.milestones.filter(m => m.status === "completed").length;
  const milestoneProgress = (completedMilestones / projectData.milestones.length) * 100;

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Dashboard Header */}
      <div className="pt-28 pb-8 bg-[#0A0A0A]">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src={projectData.logo}
                alt={projectData.name}
                className="w-16 h-16 rounded-xl object-cover border border-white/10"
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-medium">{projectData.name}</h1>
                <p className="text-gray-400 mt-1">
                  Founder Dashboard
                </p>
              </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
              <p className="text-gray-400 text-sm mb-1">Funding Raised</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-medium">{projectData.fundingRaised.toLocaleString()} AVAX</h3>
                <span className="text-sm text-gray-400">{fundingProgress.toFixed(0)}%</span>
              </div>
              <Progress value={fundingProgress} className="h-1.5 mt-2" />
            </Card>
            
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
              <p className="text-gray-400 text-sm mb-1">Milestone Progress</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-medium">{completedMilestones} of {projectData.milestones.length}</h3>
                <span className="text-sm text-gray-400">{milestoneProgress.toFixed(0)}%</span>
              </div>
              <Progress value={milestoneProgress} className="h-1.5 mt-2" />
            </Card>
            
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
              <p className="text-gray-400 text-sm mb-1">Total Investors</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-medium">{projectData.investors}</h3>
                <Button variant="link" className="text-primary p-0 h-auto" onClick={() => setActiveTab("investors")}>
                  View All
                </Button>
              </div>
            </Card>
            
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
              <p className="text-gray-400 text-sm mb-1">Equity Sold</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-medium">{projectData.equity}%</h3>
                <span className="text-sm text-gray-400">of total equity</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="container px-4 py-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 max-w-md mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="milestones" className="data-[state=active]:bg-primary/20">
              Milestones
            </TabsTrigger>
            <TabsTrigger value="investors" className="data-[state=active]:bg-primary/20">
              Investors
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-primary/20">
              Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-medium">Project Overview</h2>
                  <Button variant="outline" className="border-white/20">
                    <BarChart3 className="w-4 h-4 mr-2" /> Analytics
                  </Button>
                </div>
                
                <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6 mb-6">
                  <h3 className="text-xl font-medium mb-4">Current Milestone</h3>
                  
                  {projectData.milestones.find(m => m.status === "active") ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">
                            {projectData.milestones.find(m => m.status === "active")?.title}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {projectData.milestones.find(m => m.status === "active")?.startDate} - 
                            {projectData.milestones.find(m => m.status === "active")?.endDate}
                          </p>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-500">
                          In Progress
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">
                        {projectData.milestones.find(m => m.status === "active")?.description}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        <p className="text-sm font-medium">Deliverables:</p>
                        <ul className="space-y-2">
                          {projectData.milestones.find(m => m.status === "active")?.deliverables.map((deliverable, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1">
                                <div className="w-4 h-4 rounded-full border border-gray-500" />
                              </div>
                              <span className="text-sm text-gray-300">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="button-gradient">
                          <Upload className="w-4 h-4 mr-2" /> Submit for Approval
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No active milestone at the moment.</p>
                      <Button variant="outline" className="mt-4 border-white/20">
                        <Plus className="w-4 h-4 mr-2" /> Create New Milestone
                      </Button>
                    </div>
                  )}
                </Card>
                
                <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
                  <h3 className="text-xl font-medium mb-4">Recent Updates</h3>
                  
                  <div className="space-y-6">
                    {recentActivity.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "milestone_completed" ? "bg-primary/20" : 
                          activity.type === "funds_received" ? "bg-blue-500/20" : 
                          activity.type === "investor_joined" ? "bg-purple-500/20" :
                          "bg-orange-500/20"
                        }`}>
                          {activity.type === "milestone_completed" && <CheckCircle className="w-5 h-5 text-primary" />}
                          {activity.type === "funds_received" && <ArrowUpRight className="w-5 h-5 text-blue-500" />}
                          {activity.type === "investor_joined" && <Users className="w-5 h-5 text-purple-500" />}
                          {activity.type === "milestone_started" && <Calendar className="w-5 h-5 text-orange-500" />}
                        </div>
                        
                        <div>
                          <p className="text-gray-300">{activity.description}</p>
                          <p className="text-sm text-gray-400 mt-1">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <Button variant="link" className="text-primary" onClick={() => setActiveTab("activity")}>
                      View All Activity
                    </Button>
                  </div>
                </Card>
              </div>
              
              <div>
                <h2 className="text-2xl font-medium mb-6">Top Investors</h2>
                
                <div className="space-y-4">
                  {topInvestors.slice(0, 3).map((investor) => (
                    <Card key={investor.id} className="bg-black/40 backdrop-blur-lg border-white/10 p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white/10">
                          <AvatarImage src={investor.image} alt={investor.name} />
                          <AvatarFallback>{investor.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{investor.name}</p>
                          <p className="text-xs text-gray-400">Joined {investor.joinDate}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Invested</p>
                          <p className="font-medium">{investor.invested} AVAX</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Equity</p>
                          <p className="font-medium">{investor.equity}%</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 border-white/20" onClick={() => setActiveTab("investors")}>
                  View All Investors
                </Button>
                
                <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6 mt-8">
                  <h3 className="text-xl font-medium mb-4">Project Links</h3>
                  <div className="space-y-3">
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Project Page
                      <ArrowUpRight className="w-3 h-3 ml-auto" />
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Milestone Documentation
                      <ArrowUpRight className="w-3 h-3 ml-auto" />
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Investor Updates
                      <ArrowUpRight className="w-3 h-3 ml-auto" />
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="milestones" className="mt-0">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-medium mb-2">Project Milestones</h2>
                <p className="text-gray-400">
                  Track and manage your project milestones
                </p>
              </div>
              <Button className="button-gradient">
                <Plus className="w-4 h-4 mr-2" /> Add New Milestone
              </Button>
            </div>
            
            <div className="space-y-6">
              {projectData.milestones.map((milestone) => (
                <Card key={milestone.id} className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-medium">{milestone.title}</h3>
                        <Badge
                          className={`
                            ${milestone.status === "upcoming" ? "bg-gray-500/20 text-gray-400" : ""}
                            ${milestone.status === "active" ? "bg-blue-500/20 text-blue-500" : ""}
                            ${milestone.status === "completed" ? "bg-primary/20 text-primary" : ""}
                          `}
                        >
                          {milestone.status === "upcoming" ? "Upcoming" : ""}
                          {milestone.status === "active" ? "In Progress" : ""}
                          {milestone.status === "completed" ? "Completed" : ""}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm">{milestone.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">
                            {milestone.startDate} - {milestone.endDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">
                            {milestone.fundingAmount.toLocaleString()} AVAX ({milestone.fundingPercentage}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      {milestone.status === "upcoming" && (
                        <Button variant="outline" className="border-white/20">
                          Edit
                        </Button>
                      )}
                      
                      {milestone.status === "active" && (
                        <Button className="button-gradient">
                          <Upload className="w-4 h-4 mr-2" /> Submit for Approval
                        </Button>
                      )}
                      
                      {milestone.status === "completed" && (
                        <Button variant="outline" className="border-primary/20 text-primary">
                          <CheckCircle className="w-4 h-4 mr-2" /> Completed
                        </Button>
                      )}
                      
                      <Button variant="outline" className="border-white/20">
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  {milestone.status === "active" && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-sm font-medium mb-3">Deliverables:</p>
                      <ul className="space-y-2">
                        {milestone.deliverables.map((deliverable, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1">
                              <div className="w-4 h-4 rounded-full border border-gray-500" />
                            </div>
                            <span className="text-sm text-gray-300">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="investors" className="mt-0">
            <div className="mb-6">
              <h2 className="text-2xl font-medium mb-2">Project Investors</h2>
              <p className="text-gray-400">
                {projectData.investors} investors have funded your project
              </p>
            </div>
            
            <div className="space-y-4">
              {topInvestors.map((investor) => (
                <Card key={investor.id} className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border border-white/10">
                        <AvatarImage src={investor.image} alt={investor.name} />
                        <AvatarFallback>{investor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{investor.name}</p>
                        <p className="text-sm text-gray-400">Joined {investor.joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Invested</p>
                        <p className="font-medium">{investor.invested} AVAX</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Equity</p>
                        <p className="font-medium">{investor.equity}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Status</p>
                        <Badge className="bg-primary/20 text-primary">Active</Badge>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="border-white/20 ml-auto">
                      Contact
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0">
            <div className="mb-6">
              <h2 className="text-2xl font-medium mb-2">Project Activity</h2>
              <p className="text-gray-400">
                Recent activity and updates for your project
              </p>
            </div>
            
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <Card key={activity.id} className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "milestone_completed" ? "bg-primary/20" : 
                      activity.type === "funds_received" ? "bg-blue-500/20" : 
                      activity.type === "investor_joined" ? "bg-purple-500/20" :
                      "bg-orange-500/20"
                    }`}>
                      {activity.type === "milestone_completed" && <CheckCircle className="w-5 h-5 text-primary" />}
                      {activity.type === "funds_received" && <ArrowUpRight className="w-5 h-5 text-blue-500" />}
                      {activity.type === "investor_joined" && <Users className="w-5 h-5 text-purple-500" />}
                      {activity.type === "milestone_started" && <Calendar className="w-5 h-5 text-orange-500" />}
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-gray-300">{activity.description}</p>
                      <p className="text-sm text-gray-400 mt-1">{activity.date}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FounderDashboard;
