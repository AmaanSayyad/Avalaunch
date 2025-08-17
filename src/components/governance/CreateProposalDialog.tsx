import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CreateProposalDialogProps {
  trigger?: React.ReactNode;
  onProposalCreated?: () => void;
}

interface Project {
  id: string;
  name: string;
  logo: string;
}

// Sample projects for selection
const sampleProjects: Project[] = [
  { id: "1", name: "AvaSwap DEX", logo: "/lovable-uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png" },
  { id: "3", name: "AvaLend", logo: "/lovable-uploads/5830bd79-3511-41dc-af6c-8db32d91fc2c.png" },
  { id: "5", name: "AvaDAO", logo: "/lovable-uploads/1e2a48dc-059b-4919-a1ed-44685d771a32.png" },
  { id: "6", name: "AvaInsure", logo: "/lovable-uploads/bb50362c-6879-4868-bbc9-c6e051fd8d7d.png" },
];

// Sample milestones for the selected project
const sampleMilestones = [
  { id: "m1", title: "Smart Contract Development", completed: true },
  { id: "m2", title: "Security Audit", completed: true },
  { id: "m3", title: "Frontend Development & Beta Launch", completed: false },
  { id: "m4", title: "Mainnet Launch & Marketing", completed: false },
];

export function CreateProposalDialog({ trigger, onProposalCreated }: CreateProposalDialogProps) {
  const [open, setOpen] = useState(false);
  const [proposalType, setProposalType] = useState<"platform" | "project" | "milestone">("platform");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedMilestone, setSelectedMilestone] = useState<string>("");
  const [votingPeriod, setVotingPeriod] = useState<number>(7);
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default to 7 days from now
  );
  const [quorum, setQuorum] = useState<number>(100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    
    // Validate required fields
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    
    if (!description.trim()) {
      setError("Description is required");
      return;
    }
    
    if (proposalType === "project" && !selectedProject) {
      setError("Please select a project");
      return;
    }
    
    if (proposalType === "milestone" && (!selectedProject || !selectedMilestone)) {
      setError("Please select both a project and milestone");
      return;
    }
    
    if (!endDate) {
      setError("Please select an end date for voting");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to create proposal
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      if (onProposalCreated) {
        onProposalCreated();
      }
      
      // Reset form and close dialog
      resetForm();
      setOpen(false);
    } catch (err) {
      setError("Failed to create proposal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedProject("");
    setSelectedMilestone("");
    setVotingPeriod(7);
    setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    setQuorum(100);
    setError(null);
  };
  
  const handleVotingPeriodChange = (days: number) => {
    setVotingPeriod(days);
    setEndDate(new Date(Date.now() + days * 24 * 60 * 60 * 1000));
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    if (date) {
      const diffTime = date.getTime() - new Date().getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setVotingPeriod(diffDays);
    }
  };
  
  const getProjectById = (id: string) => {
    return sampleProjects.find(project => project.id === id);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="button-gradient">
            <Plus className="w-4 h-4 mr-2" /> Create Proposal
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl bg-black/90 backdrop-blur-lg border-white/10">
        <DialogHeader>
          <DialogTitle>Create New Proposal</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {error && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-500">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label>Proposal Type</Label>
            <Tabs 
              defaultValue="platform" 
              value={proposalType}
              onValueChange={(value) => setProposalType(value as any)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="platform" className="data-[state=active]:bg-primary/20">
                  Platform
                </TabsTrigger>
                <TabsTrigger value="project" className="data-[state=active]:bg-primary/20">
                  Project
                </TabsTrigger>
                <TabsTrigger value="milestone" className="data-[state=active]:bg-primary/20">
                  Milestone
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-2 text-xs text-gray-400">
                {proposalType === "platform" && "Propose changes to platform parameters, fees, or governance rules"}
                {proposalType === "project" && "Propose changes specific to a project's parameters or treasury"}
                {proposalType === "milestone" && "Vote on milestone completion and funding release"}
              </div>
            </Tabs>
          </div>
          
          {(proposalType === "project" || proposalType === "milestone") && (
            <div className="space-y-2">
              <Label htmlFor="project">Select Project</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="bg-black/30 border-white/10">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent className="bg-black/80 backdrop-blur-lg border-white/10">
                  {sampleProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      <div className="flex items-center gap-2">
                        <img 
                          src={project.logo} 
                          alt={project.name} 
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span>{project.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {proposalType === "milestone" && selectedProject && (
            <div className="space-y-2">
              <Label htmlFor="milestone">Select Milestone</Label>
              <Select value={selectedMilestone} onValueChange={setSelectedMilestone}>
                <SelectTrigger className="bg-black/30 border-white/10">
                  <SelectValue placeholder="Select a milestone" />
                </SelectTrigger>
                <SelectContent className="bg-black/80 backdrop-blur-lg border-white/10">
                  {sampleMilestones
                    .filter(m => !m.completed)
                    .map((milestone) => (
                      <SelectItem key={milestone.id} value={milestone.id}>
                        {milestone.title}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="title">Proposal Title</Label>
            <Input
              id="title"
              placeholder="Enter a clear, descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black/30 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of your proposal..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-black/30 border-white/10 min-h-[150px]"
            />
            <p className="text-xs text-gray-400">
              Include relevant details, rationale, and expected outcomes. For milestone proposals, include links to deliverables.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Voting Period</Label>
              <div className="flex gap-2">
                {[3, 5, 7, 14].map((days) => (
                  <Button
                    key={days}
                    type="button"
                    variant={votingPeriod === days ? "default" : "outline"}
                    className={votingPeriod === days ? "bg-primary" : "border-white/10"}
                    onClick={() => handleVotingPeriodChange(days)}
                  >
                    {days} days
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left bg-black/30 border-white/10"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-black/80 backdrop-blur-lg border-white/10">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quorum">Quorum Requirement</Label>
            <div className="flex gap-2">
              {[50, 100, 150, 200].map((q) => (
                <Button
                  key={q}
                  type="button"
                  variant={quorum === q ? "default" : "outline"}
                  className={quorum === q ? "bg-primary" : "border-white/10"}
                  onClick={() => setQuorum(q)}
                >
                  {q} votes
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Minimum number of votes required for the proposal to be valid
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              className="border-white/10"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              className="button-gradient"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Proposal"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
