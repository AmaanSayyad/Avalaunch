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
  Wallet,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Bell,
  Settings,
  LogOut
} from "lucide-react";

// Sample data for the investor dashboard
const portfolioData = {
  totalInvested: 5000,
  totalProjects: 6,
  totalEquity: 12.5,
  pendingVotes: 3,
  portfolioValue: 6200,
  portfolioGrowth: 24,
  investments: [
    {
      id: "1",
      projectName: "AvaSwap DEX",
      logo: "/lovable-uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png",
      invested: 1500,
      equity: 0.75,
      currentValue: 1950,
      growth: 30,
      status: "active",
      pendingVotes: 1
    },
    {
      id: "2",
      projectName: "AvaStorage",
      logo: "/lovable-uploads/7cc724d4-3e14-4e7c-9e7a-8d613fde54d0.png",
      invested: 1000,
      equity: 0.5,
      currentValue: 1200,
      growth: 20,
      status: "completed",
      pendingVotes: 0
    },
    {
      id: "3",
      projectName: "AvaLend",
      logo: "/lovable-uploads/5830bd79-3511-41dc-af6c-8db32d91fc2c.png",
      invested: 800,
      equity: 0.4,
      currentValue: 880,
      growth: 10,
      status: "active",
      pendingVotes: 1
    },
    {
      id: "5",
      projectName: "AvaDAO",
      logo: "/lovable-uploads/1e2a48dc-059b-4919-a1ed-44685d771a32.png",
      invested: 1200,
      equity: 0.6,
      currentValue: 1320,
      growth: 10,
      status: "active",
      pendingVotes: 1
    },
    {
      id: "6",
      projectName: "AvaInsure",
      logo: "/lovable-uploads/bb50362c-6879-4868-bbc9-c6e051fd8d7d.png",
      invested: 500,
      equity: 0.25,
      currentValue: 450,
      growth: -10,
      status: "active",
      pendingVotes: 0
    }
  ]
};

const pendingVotes = [
  {
    id: "vote1",
    projectId: "1",
    projectName: "AvaSwap DEX",
    logo: "/lovable-uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png",
    milestoneTitle: "Frontend Development & Beta Launch",
    milestoneNumber: 3,
    deadline: "3 days",
    currentVotes: 42,
    description: "Develop the frontend interface and launch a beta version on Avalanche Fuji testnet."
  },
  {
    id: "vote2",
    projectId: "3",
    projectName: "AvaLend",
    logo: "/lovable-uploads/5830bd79-3511-41dc-af6c-8db32d91fc2c.png",
    milestoneTitle: "Smart Contract Development",
    milestoneNumber: 1,
    deadline: "5 days",
    currentVotes: 38,
    description: "Develop and audit core lending protocol smart contracts."
  },
  {
    id: "vote3",
    projectId: "5",
    projectName: "AvaDAO",
    logo: "/lovable-uploads/1e2a48dc-059b-4919-a1ed-44685d771a32.png",
    milestoneTitle: "Governance Framework",
    milestoneNumber: 2,
    deadline: "2 days",
    currentVotes: 65,
    description: "Implement the DAO governance framework and voting mechanisms."
  }
];

const recentActivity = [
  {
    id: "activity1",
    type: "milestone_completed",
    projectName: "AvaStorage",
    logo: "/lovable-uploads/7cc724d4-3e14-4e7c-9e7a-8d613fde54d0.png",
    description: "Milestone 5: Mainnet Launch completed",
    date: "2 days ago"
  },
  {
    id: "activity2",
    type: "vote_cast",
    projectName: "AvaSwap DEX",
    logo: "/lovable-uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png",
    description: "You voted to approve Milestone 2",
    date: "1 week ago"
  },
  {
    id: "activity3",
    type: "investment",
    projectName: "AvaDAO",
    logo: "/lovable-uploads/1e2a48dc-059b-4919-a1ed-44685d771a32.png",
    description: "You invested 1200 AVAX for 0.6% equity",
    date: "2 weeks ago"
  },
  {
    id: "activity4",
    type: "funds_released",
    projectName: "AvaLend",
    logo: "/lovable-uploads/5830bd79-3511-41dc-af6c-8db32d91fc2c.png",
    description: "Milestone 1 funds released (200 AVAX)",
    date: "3 weeks ago"
  }
];

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Dashboard Header */}
      <div className="pt-28 pb-8 bg-[#0A0A0A]">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium">Investor Dashboard</h1>
              <p className="text-gray-400 mt-1">
                Manage your investments and milestone voting
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
              <p className="text-gray-400 text-sm mb-1">Total Invested</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-medium">{portfolioData.totalInvested} AVAX</h3>
              </div>
            </Card>
            
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
              <p className="text-gray-400 text-sm mb-1">Portfolio Value</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-medium">{portfolioData.portfolioValue} AVAX</h3>
                <span className={`text-sm ${portfolioData.portfolioGrowth >= 0 ? 'text-primary' : 'text-red-500'}`}>
                  {portfolioData.portfolioGrowth >= 0 ? '+' : ''}{portfolioData.portfolioGrowth}%
                </span>
              </div>
            </Card>
            
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
              <p className="text-gray-400 text-sm mb-1">Projects Invested</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-medium">{portfolioData.totalProjects}</h3>
                <span className="text-sm text-gray-400">Projects</span>
              </div>
            </Card>
            
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
              <p className="text-gray-400 text-sm mb-1">Pending Votes</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-medium">{portfolioData.pendingVotes}</h3>
                <Button variant="link" className="text-primary p-0 h-auto" onClick={() => setActiveTab("votes")}>
                  View All
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="container px-4 py-8">
        <Tabs defaultValue="portfolio" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mb-8">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-primary/20">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="votes" className="data-[state=active]:bg-primary/20">
              Pending Votes
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-primary/20">
              Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="mt-0">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-medium">Your Investments</h2>
              <Button variant="outline" className="border-white/20">
                <BarChart3 className="w-4 h-4 mr-2" /> Analytics
              </Button>
            </div>
            
            <div className="space-y-4">
              {portfolioData.investments.map((investment) => (
                <Card key={investment.id} className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={investment.logo}
                        alt={investment.projectName}
                        className="w-12 h-12 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <h3 className="font-medium">{investment.projectName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={`
                              ${investment.status === "active" ? "bg-primary/20 text-primary" : ""}
                              ${investment.status === "completed" ? "bg-blue-500/20 text-blue-500" : ""}
                            `}
                          >
                            {investment.status === "active" ? "Active" : "Completed"}
                          </Badge>
                          {investment.pendingVotes > 0 && (
                            <Badge className="bg-orange-500/20 text-orange-500">
                              {investment.pendingVotes} Pending Vote{investment.pendingVotes > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Invested</p>
                        <p className="font-medium">{investment.invested} AVAX</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Equity</p>
                        <p className="font-medium">{investment.equity}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Current Value</p>
                        <p className="font-medium">{investment.currentValue} AVAX</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Growth</p>
                        <p className={`font-medium ${investment.growth >= 0 ? 'text-primary' : 'text-red-500'}`}>
                          {investment.growth >= 0 ? '+' : ''}{investment.growth}%
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="border-white/20 ml-auto" onClick={() => window.location.href = `/projects/${investment.id}`}>
                      View Project <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="votes" className="mt-0">
            <div className="mb-6">
              <h2 className="text-2xl font-medium">Pending Milestone Votes</h2>
              <p className="text-gray-400 mt-1">
                Vote on milestone completion to release funding to projects
              </p>
            </div>
            
            <div className="space-y-4">
              {pendingVotes.map((vote) => (
                <Card key={vote.id} className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={vote.logo}
                        alt={vote.projectName}
                        className="w-12 h-12 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <h3 className="font-medium">{vote.projectName}</h3>
                        <p className="text-primary text-sm">Milestone {vote.milestoneNumber}: {vote.milestoneTitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 max-w-md">
                      <p className="text-sm text-gray-300">{vote.description}</p>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-400">Current Approval</span>
                        <span className="text-white">{vote.currentVotes}%</span>
                      </div>
                      <Progress value={vote.currentVotes} className="h-1.5 mt-1" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-4">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-orange-500">{vote.deadline} left</span>
                      </div>
                      <Button variant="destructive" className="px-4">Reject</Button>
                      <Button className="button-gradient px-4">Approve</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                You've reviewed all pending votes. Check back later for more.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0">
            <div className="mb-6">
              <h2 className="text-2xl font-medium">Recent Activity</h2>
              <p className="text-gray-400 mt-1">
                Your recent actions and project updates
              </p>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <Card key={activity.id} className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "milestone_completed" ? "bg-primary/20" : 
                      activity.type === "vote_cast" ? "bg-blue-500/20" : 
                      activity.type === "investment" ? "bg-purple-500/20" :
                      "bg-orange-500/20"
                    }`}>
                      {activity.type === "milestone_completed" && <CheckCircle className="w-5 h-5 text-primary" />}
                      {activity.type === "vote_cast" && <CheckCircle className="w-5 h-5 text-blue-500" />}
                      {activity.type === "investment" && <Wallet className="w-5 h-5 text-purple-500" />}
                      {activity.type === "funds_released" && <ArrowUpRight className="w-5 h-5 text-orange-500" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={activity.logo}
                          alt={activity.projectName}
                          className="w-6 h-6 rounded-full object-cover border border-white/10"
                        />
                        <span className="font-medium">{activity.projectName}</span>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">{activity.description}</p>
                    </div>
                    
                    <span className="text-sm text-gray-400">{activity.date}</span>
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

export default InvestorDashboard;
