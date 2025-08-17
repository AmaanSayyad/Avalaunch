import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  FileText, 
  Link, 
  ExternalLink,
  Calendar,
  AlertCircle,
  ArrowUpRight
} from "lucide-react";
import { ProposalCardProps } from "./ProposalCard";

interface ProposalDetailsProps {
  proposal: ProposalCardProps;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Comment {
  id: string;
  author: {
    name: string;
    image: string;
  };
  content: string;
  timestamp: string;
  vote?: "for" | "against" | "abstain";
}

// Sample comments data
const sampleComments: Comment[] = [
  {
    id: "c1",
    author: {
      name: "Sarah Chen",
      image: "https://avatars.githubusercontent.com/u/2345678?v=4"
    },
    content: "I support this proposal. The milestone has been completed according to the specifications and the team has provided all the necessary documentation.",
    timestamp: "2 days ago",
    vote: "for"
  },
  {
    id: "c2",
    author: {
      name: "Michael Rodriguez",
      image: "https://avatars.githubusercontent.com/u/3456789?v=4"
    },
    content: "I've reviewed the code and the implementation looks solid. The team has addressed all the concerns raised during the previous milestone review.",
    timestamp: "3 days ago",
    vote: "for"
  },
  {
    id: "c3",
    author: {
      name: "James Wilson",
      image: "https://avatars.githubusercontent.com/u/4567890?v=4"
    },
    content: "I'm concerned about the security audit results. There are still some medium severity issues that haven't been addressed yet.",
    timestamp: "4 days ago",
    vote: "against"
  },
  {
    id: "c4",
    author: {
      name: "Emily Zhang",
      image: "https://avatars.githubusercontent.com/u/5678901?v=4"
    },
    content: "The UI implementation looks great, but I'd like to see more comprehensive test coverage before approving this milestone.",
    timestamp: "5 days ago",
    vote: "abstain"
  }
];

export function ProposalDetails({ proposal, open, onOpenChange }: ProposalDetailsProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [userVote, setUserVote] = useState<"for" | "against" | "abstain" | null>(proposal.userVoted || null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  
  const forPercentage = (proposal.votesFor / proposal.totalVotes) * 100;
  const againstPercentage = (proposal.votesAgainst / proposal.totalVotes) * 100;
  const abstainPercentage = (proposal.votesAbstain / proposal.totalVotes) * 100;
  const quorumPercentage = (proposal.totalVotes / proposal.quorum) * 100;

  const handleVote = (vote: "for" | "against" | "abstain") => {
    if (proposal.status !== "active") return;
    setUserVote(vote);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: `c${comments.length + 1}`,
      author: {
        name: "You",
        image: "https://avatars.githubusercontent.com/u/1234567?v=4"
      },
      content: commentText,
      timestamp: "Just now",
      vote: userVote
    };
    
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  // Calculate time remaining for active proposals
  const getTimeRemaining = () => {
    if (proposal.status !== "active") return null;
    
    const now = new Date();
    const endDate = new Date(proposal.endDate);
    const diff = endDate.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return { days, hours };
  };
  
  const timeRemaining = getTimeRemaining();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl bg-black/90 backdrop-blur-lg border-white/10 p-0 max-h-[90vh] overflow-hidden">
        <div className="overflow-y-auto max-h-full">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                className={`
                  ${proposal.type === "platform" ? "bg-purple-500/20 text-purple-500" : ""}
                  ${proposal.type === "milestone" ? "bg-blue-500/20 text-blue-500" : ""}
                  ${proposal.type === "project" ? "bg-orange-500/20 text-orange-500" : ""}
                `}
              >
                {proposal.type === "platform" ? "Platform Governance" : ""}
                {proposal.type === "milestone" ? "Milestone Approval" : ""}
                {proposal.type === "project" ? "Project Governance" : ""}
              </Badge>
              
              <Badge
                className={`
                  ${proposal.status === "active" ? "bg-primary/20 text-primary" : ""}
                  ${proposal.status === "passed" ? "bg-green-500/20 text-green-500" : ""}
                  ${proposal.status === "failed" ? "bg-red-500/20 text-red-500" : ""}
                  ${proposal.status === "canceled" ? "bg-gray-500/20 text-gray-400" : ""}
                `}
              >
                {proposal.status === "active" ? "Active" : ""}
                {proposal.status === "passed" ? "Passed" : ""}
                {proposal.status === "failed" ? "Failed" : ""}
                {proposal.status === "canceled" ? "Canceled" : ""}
              </Badge>
              
              {proposal.status === "active" && timeRemaining && (
                <Badge variant="outline" className="border-primary/30 text-primary">
                  <Clock className="w-3 h-3 mr-1" />
                  {timeRemaining.days}d {timeRemaining.hours}h remaining
                </Badge>
              )}
            </div>
            
            <DialogTitle className="text-2xl font-medium">{proposal.title}</DialogTitle>
          </DialogHeader>
          
          <div className="p-6">
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 max-w-md mb-6">
                <TabsTrigger value="details" className="data-[state=active]:bg-primary/20">
                  Details
                </TabsTrigger>
                <TabsTrigger value="discussion" className="data-[state=active]:bg-primary/20">
                  Discussion
                </TabsTrigger>
                <TabsTrigger value="votes" className="data-[state=active]:bg-primary/20">
                  Votes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-0">
                <div className="space-y-6">
                  {proposal.projectName && (
                    <div className="flex items-center gap-3 mb-4">
                      {proposal.projectLogo && (
                        <img
                          src={proposal.projectLogo}
                          alt={proposal.projectName}
                          className="w-10 h-10 rounded-lg object-cover border border-white/10"
                        />
                      )}
                      <div>
                        <h3 className="font-medium">{proposal.projectName}</h3>
                        <a href={`/projects/${proposal.projectId}`} className="text-sm text-primary flex items-center hover:underline">
                          View Project <ArrowUpRight className="ml-1 w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                    <p className="text-gray-200 whitespace-pre-line">
                      {proposal.description}
                      
                      {proposal.type === "milestone" && `\n\nThis proposal is for the approval of a milestone completion. The milestone includes the following deliverables:\n\n1. Frontend implementation with wallet integration\n2. Beta launch on Fuji testnet\n3. User testing and feedback collection\n4. Documentation and testing reports\n\nAll deliverables have been submitted and are available for review in the attached documentation.`}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Proposal Information</h4>
                      <div className="bg-black/30 rounded-lg border border-white/10 p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">ID</span>
                          <span className="text-gray-200 font-mono">{proposal.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Created by</span>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={proposal.creator.image} alt={proposal.creator.name} />
                              <AvatarFallback>{proposal.creator.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-gray-200">{proposal.creator.name}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Created on</span>
                          <span className="text-gray-200">{proposal.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Voting ends</span>
                          <span className="text-gray-200">{proposal.endDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type</span>
                          <span className="text-gray-200 capitalize">{proposal.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Quorum</span>
                          <span className="text-gray-200">{proposal.quorum} votes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Voting Results</h4>
                      <div className="bg-black/30 rounded-lg border border-white/10 p-4 space-y-4">
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-green-500">For</span>
                              <span className="text-gray-300">{forPercentage.toFixed(1)}% ({proposal.votesFor})</span>
                            </div>
                            <Progress value={forPercentage} className="h-2 bg-gray-700">
                              <div className="h-full bg-green-500 rounded-full" />
                            </Progress>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-red-500">Against</span>
                              <span className="text-gray-300">{againstPercentage.toFixed(1)}% ({proposal.votesAgainst})</span>
                            </div>
                            <Progress value={againstPercentage} className="h-2 bg-gray-700">
                              <div className="h-full bg-red-500 rounded-full" />
                            </Progress>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Abstain</span>
                              <span className="text-gray-300">{abstainPercentage.toFixed(1)}% ({proposal.votesAbstain})</span>
                            </div>
                            <Progress value={abstainPercentage} className="h-2 bg-gray-700">
                              <div className="h-full bg-gray-500 rounded-full" />
                            </Progress>
                          </div>
                        </div>
                        
                        <Separator className="bg-white/5" />
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Quorum</span>
                            <span className="text-gray-300">{quorumPercentage.toFixed(1)}% ({proposal.totalVotes}/{proposal.quorum})</span>
                          </div>
                          <Progress value={quorumPercentage} className="h-2 bg-gray-700">
                            <div className="h-full bg-blue-500 rounded-full" />
                          </Progress>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                            <AlertCircle className="w-3 h-3" />
                            {quorumPercentage >= 100 ? 
                              "Quorum reached" : 
                              `${proposal.quorum - proposal.totalVotes} more votes needed to reach quorum`
                            }
                          </div>
                        </div>
                        
                        <Separator className="bg-white/5" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Total Votes</span>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-200 font-medium">{proposal.totalVotes}</span>
                          </div>
                        </div>
                      </div>
                      
                      {proposal.status === "active" && (
                        <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                          <h4 className="font-medium mb-3">Cast Your Vote</h4>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              variant={userVote === "for" ? "default" : "outline"}
                              className={userVote === "for" ? "bg-green-600 hover:bg-green-700 w-full" : "border-white/20 w-full"}
                              onClick={() => handleVote("for")}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              For
                            </Button>
                            <Button
                              variant={userVote === "against" ? "default" : "outline"}
                              className={userVote === "against" ? "bg-red-600 hover:bg-red-700 w-full" : "border-white/20 w-full"}
                              onClick={() => handleVote("against")}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Against
                            </Button>
                            <Button
                              variant={userVote === "abstain" ? "default" : "outline"}
                              className={userVote === "abstain" ? "bg-gray-600 hover:bg-gray-700 w-full" : "border-white/20 w-full"}
                              onClick={() => handleVote("abstain")}
                            >
                              Abstain
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {proposal.type === "milestone" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Milestone Deliverables</h4>
                      <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="bg-blue-500/20 p-2 rounded-lg mt-0.5">
                                <FileText className="w-4 h-4 text-blue-500" />
                              </div>
                              <div>
                                <h5 className="font-medium">Frontend Implementation</h5>
                                <p className="text-sm text-gray-400">Complete UI implementation with wallet integration</p>
                                <a href="#" className="text-xs text-primary flex items-center mt-1 hover:underline">
                                  View Documentation <ExternalLink className="ml-1 w-3 h-3" />
                                </a>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="bg-blue-500/20 p-2 rounded-lg mt-0.5">
                                <Link className="w-4 h-4 text-blue-500" />
                              </div>
                              <div>
                                <h5 className="font-medium">Beta Launch</h5>
                                <p className="text-sm text-gray-400">Testnet deployment and beta testing</p>
                                <a href="#" className="text-xs text-primary flex items-center mt-1 hover:underline">
                                  View Testnet Link <ExternalLink className="ml-1 w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="bg-blue-500/20 p-2 rounded-lg mt-0.5">
                                <Users className="w-4 h-4 text-blue-500" />
                              </div>
                              <div>
                                <h5 className="font-medium">User Testing</h5>
                                <p className="text-sm text-gray-400">User feedback collection and analysis</p>
                                <a href="#" className="text-xs text-primary flex items-center mt-1 hover:underline">
                                  View Testing Report <ExternalLink className="ml-1 w-3 h-3" />
                                </a>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="bg-blue-500/20 p-2 rounded-lg mt-0.5">
                                <Calendar className="w-4 h-4 text-blue-500" />
                              </div>
                              <div>
                                <h5 className="font-medium">Timeline</h5>
                                <p className="text-sm text-gray-400">Completed on schedule</p>
                                <p className="text-xs text-green-500 mt-1">2 days ahead of deadline</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="discussion" className="mt-0">
                <div className="space-y-6">
                  {proposal.status === "active" && (
                    <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                      <h4 className="font-medium mb-3">Add Comment</h4>
                      <textarea
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 min-h-[100px] text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Share your thoughts on this proposal..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      ></textarea>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-2">
                          {userVote && (
                            <Badge
                              className={`
                                ${userVote === "for" ? "bg-green-500/20 text-green-500" : ""}
                                ${userVote === "against" ? "bg-red-500/20 text-red-500" : ""}
                                ${userVote === "abstain" ? "bg-gray-500/20 text-gray-400" : ""}
                              `}
                            >
                              Voted: {userVote}
                            </Badge>
                          )}
                          {!userVote && <span className="text-xs text-gray-400">Vote to add your stance to your comment</span>}
                        </div>
                        
                        <Button 
                          onClick={handleAddComment}
                          disabled={!commentText.trim()}
                          className="button-gradient"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Discussion ({comments.length})</h4>
                    
                    {comments.length > 0 ? (
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <div key={comment.id} className="bg-black/30 rounded-lg border border-white/10 p-4">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={comment.author.image} alt={comment.author.name} />
                                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{comment.author.name}</span>
                                {comment.vote && (
                                  <Badge
                                    className={`
                                      ${comment.vote === "for" ? "bg-green-500/20 text-green-500" : ""}
                                      ${comment.vote === "against" ? "bg-red-500/20 text-red-500" : ""}
                                      ${comment.vote === "abstain" ? "bg-gray-500/20 text-gray-400" : ""}
                                    `}
                                  >
                                    Voted: {comment.vote}
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-gray-400">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-200">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-black/30 rounded-lg border border-white/10">
                        <MessageSquare className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-400">No comments yet</p>
                        <p className="text-sm text-gray-500 mt-1">Be the first to share your thoughts</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="votes" className="mt-0">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Votes ({proposal.totalVotes})</h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-500">{proposal.votesFor} For</Badge>
                      <Badge className="bg-red-500/20 text-red-500">{proposal.votesAgainst} Against</Badge>
                      <Badge className="bg-gray-500/20 text-gray-400">{proposal.votesAbstain} Abstain</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg border border-white/10 overflow-hidden">
                    <div className="grid grid-cols-3 gap-px bg-white/5">
                      <div className={`p-4 ${activeTab === "for" ? "bg-black/50" : "bg-black/30"}`}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between hover:bg-transparent"
                          onClick={() => setActiveTab("for")}
                        >
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            For
                          </span>
                          <Badge className="bg-green-500/20 text-green-500">{proposal.votesFor}</Badge>
                        </Button>
                      </div>
                      <div className={`p-4 ${activeTab === "against" ? "bg-black/50" : "bg-black/30"}`}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between hover:bg-transparent"
                          onClick={() => setActiveTab("against")}
                        >
                          <span className="flex items-center">
                            <XCircle className="w-4 h-4 mr-2 text-red-500" />
                            Against
                          </span>
                          <Badge className="bg-red-500/20 text-red-500">{proposal.votesAgainst}</Badge>
                        </Button>
                      </div>
                      <div className={`p-4 ${activeTab === "abstain" ? "bg-black/50" : "bg-black/30"}`}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between hover:bg-transparent"
                          onClick={() => setActiveTab("abstain")}
                        >
                          <span className="flex items-center">
                            <span className="w-4 h-4 mr-2 bg-gray-500 rounded-full"></span>
                            Abstain
                          </span>
                          <Badge className="bg-gray-500/20 text-gray-400">{proposal.votesAbstain}</Badge>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      {/* Sample voter list - would be dynamically generated based on actual votes */}
                      <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={`https://avatars.githubusercontent.com/u/${1000000 + i}?v=4`} />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">User {i + 1}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">2.5 AVAX</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-400">{i + 1} day{i !== 0 ? "s" : ""} ago</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
