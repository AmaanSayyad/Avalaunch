import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";

export interface MilestoneCardProps {
  id: string;
  title: string;
  description: string;
  fundingAmount: number;
  fundingPercentage: number;
  startDate: string;
  endDate: string;
  deliverables: string[];
  status: "upcoming" | "active" | "completed" | "failed" | "voting";
  votingProgress?: number;
  votingDeadline?: string;
}

export function MilestoneCard({
  id,
  title,
  description,
  fundingAmount,
  fundingPercentage,
  startDate,
  endDate,
  deliverables,
  status,
  votingProgress,
  votingDeadline,
}: MilestoneCardProps) {
  return (
    <Card className="bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">{title}</h3>
          <Badge
            className={`
              ${status === "upcoming" ? "bg-gray-500/20 text-gray-400" : ""}
              ${status === "active" ? "bg-blue-500/20 text-blue-500" : ""}
              ${status === "completed" ? "bg-primary/20 text-primary" : ""}
              ${status === "failed" ? "bg-red-500/20 text-red-500" : ""}
              ${status === "voting" ? "bg-orange-500/20 text-orange-500" : ""}
            `}
          >
            {status === "upcoming" ? "Upcoming" : ""}
            {status === "active" ? "In Progress" : ""}
            {status === "completed" ? "Completed" : ""}
            {status === "failed" ? "Failed" : ""}
            {status === "voting" ? "Voting" : ""}
          </Badge>
        </div>
        
        <p className="text-gray-400 text-sm mb-6">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-400 text-xs mb-1">Funding Amount</p>
            <p className="font-medium">{fundingAmount.toLocaleString()} AVAX</p>
            <p className="text-xs text-gray-500 mt-1">{fundingPercentage}% of total</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Timeline</p>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-sm">{startDate} - {endDate}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-400 text-xs mb-2">Key Deliverables</p>
          <ul className="space-y-2">
            {deliverables.map((deliverable, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1">
                  {status === "completed" ? (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-500" />
                  )}
                </div>
                <span className="text-sm text-gray-300">{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {status === "voting" && votingProgress !== undefined && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-400">Voting Progress</span>
              <span className="text-white">{votingProgress}% Approved</span>
            </div>
            <Progress value={votingProgress} className="h-1.5" />
            {votingDeadline && (
              <div className="flex items-center gap-1.5 mt-2">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <p className="text-xs text-orange-500">Voting ends in {votingDeadline}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-white/10 flex justify-end">
          {status === "upcoming" && (
            <Button variant="outline" className="border-white/20" disabled>
              Not Started
            </Button>
          )}
          
          {status === "active" && (
            <Button variant="outline" className="border-white/20">
              View Progress
            </Button>
          )}
          
          {status === "completed" && (
            <Button variant="outline" className="border-primary/20 text-primary">
              View Deliverables
            </Button>
          )}
          
          {status === "failed" && (
            <Button variant="outline" className="border-red-500/20 text-red-500">
              <AlertCircle className="w-4 h-4 mr-2" />
              View Issues
            </Button>
          )}
          
          {status === "voting" && (
            <div className="flex gap-3">
              <Button variant="destructive">Reject</Button>
              <Button className="button-gradient">Approve</Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
