import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Vote, 
  BarChart3, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

// Custom Vote icon since it's not in lucide-react
function VoteIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5 5v5h5" />
      <path d="M4 15a8.1 8.1 0 0 0 15.5 2m.5-5v-5h-5" />
    </svg>
  );
}

interface GovernanceStatsProps {
  totalProposals: number;
  activeProposals: number;
  totalVotes: number;
  passRate: number;
  quorumRate: number;
  userParticipation: number;
  upcomingProposals: number;
}

export function GovernanceStats({
  totalProposals,
  activeProposals,
  totalVotes,
  passRate,
  quorumRate,
  userParticipation,
  upcomingProposals
}: GovernanceStatsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Governance Overview</h2>
        <Badge variant="outline" className="border-primary/20 text-primary">
          <Clock className="w-3 h-3 mr-1" />
          Last 30 days
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-black/30 border-white/10 p-4 h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Proposals</p>
                <h3 className="text-3xl font-medium mt-1">{activeProposals}</h3>
                <p className="text-xs text-primary mt-1">
                  {upcomingProposals > 0 ? `+${upcomingProposals} upcoming` : "No upcoming proposals"}
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded-lg">
                <VoteIcon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-black/30 border-white/10 p-4 h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Votes Cast</p>
                <h3 className="text-3xl font-medium mt-1">{totalVotes.toLocaleString()}</h3>
                <p className="text-xs text-primary mt-1">
                  {userParticipation}% user participation
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-black/30 border-white/10 p-4 h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pass Rate</p>
                <h3 className="text-3xl font-medium mt-1">{passRate}%</h3>
                <div className="flex items-center mt-1">
                  <Progress value={passRate} className="h-1 w-16 bg-gray-700">
                    <div className="h-full bg-green-500 rounded-full" />
                  </Progress>
                </div>
              </div>
              <div className="bg-green-500/10 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-black/30 border-white/10 p-4 h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">Quorum Rate</p>
                <h3 className="text-3xl font-medium mt-1">{quorumRate}%</h3>
                <div className="flex items-center mt-1">
                  <Progress value={quorumRate} className="h-1 w-16 bg-gray-700">
                    <div className="h-full bg-blue-500 rounded-full" />
                  </Progress>
                </div>
              </div>
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="md:col-span-2"
        >
          <Card className="bg-black/30 border-white/10 p-4 h-full">
            <h3 className="font-medium mb-3">Proposal Distribution</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-black/40 rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="bg-purple-500/20 p-2 rounded-full mb-2">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                </div>
                <p className="text-xs text-gray-400">Platform</p>
                <p className="text-lg font-medium">42%</p>
              </div>
              
              <div className="bg-black/40 rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="bg-blue-500/20 p-2 rounded-full mb-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-xs text-gray-400">Milestone</p>
                <p className="text-lg font-medium">35%</p>
              </div>
              
              <div className="bg-black/40 rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="bg-orange-500/20 p-2 rounded-full mb-2">
                  <Users className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-xs text-gray-400">Project</p>
                <p className="text-lg font-medium">23%</p>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="bg-black/30 border-white/10 p-4 h-full">
            <h3 className="font-medium mb-3">Vote Distribution</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-green-500">For</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-1.5 bg-gray-700">
                  <div className="h-full bg-green-500 rounded-full" />
                </Progress>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-500">Against</span>
                  <span>22%</span>
                </div>
                <Progress value={22} className="h-1.5 bg-gray-700">
                  <div className="h-full bg-red-500 rounded-full" />
                </Progress>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Abstain</span>
                  <span>10%</span>
                </div>
                <Progress value={10} className="h-1.5 bg-gray-700">
                  <div className="h-full bg-gray-500 rounded-full" />
                </Progress>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
