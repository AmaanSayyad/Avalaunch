import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight } from "lucide-react";

export interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  category: string;
  fundingGoal: number;
  fundingRaised: number;
  equity: number;
  milestones: number;
  completedMilestones: number;
  daysLeft?: number;
  status: "active" | "completed" | "upcoming";
}

export function ProjectCard({
  id,
  name,
  description,
  logo,
  coverImage,
  category,
  fundingGoal,
  fundingRaised,
  equity,
  milestones,
  completedMilestones,
  daysLeft,
  status,
}: ProjectCardProps) {
  const fundingProgress = (fundingRaised / fundingGoal) * 100;
  const milestoneProgress = (completedMilestones / milestones) * 100;

  return (
    <Card className="overflow-hidden bg-black/40 backdrop-blur-lg border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={coverImage}
          alt={`${name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge
            className={`
              ${status === "active" ? "bg-primary/20 text-primary" : ""}
              ${status === "completed" ? "bg-blue-500/20 text-blue-500" : ""}
              ${status === "upcoming" ? "bg-orange-500/20 text-orange-500" : ""}
            `}
          >
            {status === "active" ? "Active Funding" : ""}
            {status === "completed" ? "Funded" : ""}
            {status === "upcoming" ? "Upcoming" : ""}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="border-white/20 text-white backdrop-blur-md bg-black/30">
            {category}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-10 h-10 rounded-full object-cover border border-white/10"
          />
          <h3 className="font-medium text-xl">{name}</h3>
        </div>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-400">Funding Progress</span>
              <span className="text-white">{fundingProgress.toFixed(0)}%</span>
            </div>
            <Progress value={fundingProgress} className="h-1.5" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-400">Milestone Progress</span>
              <span className="text-white">{completedMilestones} of {milestones}</span>
            </div>
            <Progress value={milestoneProgress} className="h-1.5" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400 text-xs mb-1">Funding Goal</p>
            <p className="font-medium">{fundingGoal.toLocaleString()} AVAX</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Equity Offered</p>
            <p className="font-medium">{equity}%</p>
          </div>
        </div>
        
        {daysLeft !== undefined && (
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-sm text-gray-400">
              {daysLeft > 0 ? `${daysLeft} days left` : "Funding closed"}
            </span>
            <a
              href={`/projects/${id}`}
              className="text-primary flex items-center text-sm hover:underline"
            >
              View Project <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
