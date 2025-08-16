import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Users, CheckCircle, XCircle } from "lucide-react";

export interface ProposalCardProps {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    image: string;
  };
  projectId?: string;
  projectName?: string;
  projectLogo?: string;
  createdAt: string;
  endDate: string;
  status: "active" | "passed" | "failed" | "canceled";
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  totalVotes: number;
  quorum: number;
  userVoted?: "for" | "against" | "abstain" | null;
  type: "platform" | "milestone" | "project";
}

export function ProposalCard({
  id,
  title,
  description,
  creator,
  projectId,
  projectName,
  projectLogo,
  createdAt,
  endDate,
  status,
  votesFor,
  votesAgainst,
  votesAbstain,
  totalVotes,
  quorum,
  userVoted,
  type
}: ProposalCardProps) {
  const [userVote, setUserVote] = useState<"for" | "against" | "abstain" | null>(userVoted || null);
  
  const forPercentage = (votesFor / totalVotes) * 100;
  const againstPercentage = (votesAgainst / totalVotes) * 100;
  const abstainPercentage = (votesAbstain / totalVotes) * 100;
  const quorumPercentage = (totalVotes / quorum) * 100;
  
  const handleVote = (vote: "for" | "against" | "abstain") => {
    if (status !== "active") return;
    setUserVote(vote);
  };
  
  return (
    <Card className="bg-black/40 backdrop-blur-lg border-white/10 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              className={`
                ${type === "platform" ? "bg-purple-500/20 text-purple-500" : ""}
                ${type === "milestone" ? "bg-blue-500/20 text-blue-500" : ""}
                ${type === "project" ? "bg-orange-500/20 text-orange-500" : ""}
              `}
            >
              {type === "platform" ? "Platform Governance" : ""}
              {type === "milestone" ? "Milestone Approval" : ""}
              {type === "project" ? "Project Governance" : ""}
            </Badge>
            
            <Badge
              className={`
                ${status === "active" ? "bg-primary/20 text-primary" : ""}
                ${status === "passed" ? "bg-green-500/20 text-green-500" : ""}
                ${status === "failed" ? "bg-red-500/20 text-red-500" : ""}
                ${status === "canceled" ? "bg-gray-500/20 text-gray-400" : ""}
              `}
            >
              {status === "active" ? "Active" : ""}
              {status === "passed" ? "Passed" : ""}
              {status === "failed" ? "Failed" : ""}
              {status === "canceled" ? "Canceled" : ""}
            </Badge>
          </div>
          
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          
          {projectName && (
            <div className="flex items-center gap-2 mb-3">
              {projectLogo && (
                <img
                  src={projectLogo}
                  alt={projectName}
                  className="w-5 h-5 rounded-full object-cover border border-white/10"
                />
              )}
              <span className="text-sm text-gray-300">
                Project: {projectName}
              </span>
            </div>
          )}
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={creator.image} alt={creator.name} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-400">{creator.name}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">
                {status === "active" ? `Ends ${endDate}` : `Ended ${endDate}`}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">
                {totalVotes} votes
              </span>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-500">For</span>
                <span className="text-gray-300">{forPercentage.toFixed(1)}% ({votesFor})</span>
              </div>
              <Progress value={forPercentage} className="h-2 bg-gray-700">
                <div className="h-full bg-green-500 rounded-full" />
              </Progress>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-500">Against</span>
                <span className="text-gray-300">{againstPercentage.toFixed(1)}% ({votesAgainst})</span>
              </div>
              <Progress value={againstPercentage} className="h-2 bg-gray-700">
                <div className="h-full bg-red-500 rounded-full" />
              </Progress>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Abstain</span>
                <span className="text-gray-300">{abstainPercentage.toFixed(1)}% ({votesAbstain})</span>
              </div>
              <Progress value={abstainPercentage} className="h-2 bg-gray-700">
                <div className="h-full bg-gray-500 rounded-full" />
              </Progress>
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Quorum</span>
                <span className="text-gray-300">{quorumPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={quorumPercentage} className="h-1 bg-gray-700">
                <div className="h-full bg-blue-500 rounded-full" />
              </Progress>
            </div>
          </div>
          
          {status === "active" && (
            <div className="flex gap-3">
              <Button
                variant={userVote === "for" ? "default" : "outline"}
                className={userVote === "for" ? "bg-green-600 hover:bg-green-700" : "border-white/20"}
                onClick={() => handleVote("for")}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                For
              </Button>
              <Button
                variant={userVote === "against" ? "default" : "outline"}
                className={userVote === "against" ? "bg-red-600 hover:bg-red-700" : "border-white/20"}
                onClick={() => handleVote("against")}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Against
              </Button>
              <Button
                variant={userVote === "abstain" ? "default" : "outline"}
                className={userVote === "abstain" ? "bg-gray-600 hover:bg-gray-700" : "border-white/20"}
                onClick={() => handleVote("abstain")}
              >
                Abstain
              </Button>
            </div>
          )}
          
          {status !== "active" && userVoted && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">You voted:</span>
              <Badge
                className={`
                  ${userVoted === "for" ? "bg-green-500/20 text-green-500" : ""}
                  ${userVoted === "against" ? "bg-red-500/20 text-red-500" : ""}
                  ${userVoted === "abstain" ? "bg-gray-500/20 text-gray-400" : ""}
                `}
              >
                {userVoted === "for" ? "For" : ""}
                {userVoted === "against" ? "Against" : ""}
                {userVoted === "abstain" ? "Abstain" : ""}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex md:flex-col justify-end gap-3">
          <Button variant="outline" className="border-white/20">
            View Details
          </Button>
          
          {status === "active" && (
            <Button variant="outline" className="border-white/20">
              Discussion
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
