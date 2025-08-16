import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Calendar, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface Milestone {
  title: string;
  description: string;
  deliverables: string[];
  fundingPercentage: number;
  estimatedCompletion: string;
}

interface MilestoneFormProps {
  milestones: Milestone[];
  onChange: (milestones: Milestone[]) => void;
}

const MilestoneForm: React.FC<MilestoneFormProps> = ({ milestones, onChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState<Milestone>({
    title: "",
    description: "",
    deliverables: [],
    fundingPercentage: 0,
    estimatedCompletion: "",
  });
  const [newDeliverable, setNewDeliverable] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const totalPercentage = milestones.reduce((sum, milestone) => sum + milestone.fundingPercentage, 0);
  const remainingPercentage = 100 - totalPercentage;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMilestone({
      ...newMilestone,
      [name]: value,
    });
  };

  const handlePercentageChange = (value: number[]) => {
    setNewMilestone({
      ...newMilestone,
      fundingPercentage: value[0],
    });
  };

  const addDeliverable = () => {
    if (newDeliverable.trim() !== "") {
      setNewMilestone({
        ...newMilestone,
        deliverables: [...newMilestone.deliverables, newDeliverable.trim()],
      });
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (index: number) => {
    const updatedDeliverables = [...newMilestone.deliverables];
    updatedDeliverables.splice(index, 1);
    setNewMilestone({
      ...newMilestone,
      deliverables: updatedDeliverables,
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setNewMilestone({
        ...newMilestone,
        estimatedCompletion: format(selectedDate, "PPP"),
      });
    }
  };

  const addMilestone = () => {
    if (
      newMilestone.title &&
      newMilestone.description &&
      newMilestone.deliverables.length > 0 &&
      newMilestone.fundingPercentage > 0 &&
      newMilestone.estimatedCompletion
    ) {
      onChange([...milestones, { ...newMilestone }]);
      setNewMilestone({
        title: "",
        description: "",
        deliverables: [],
        fundingPercentage: Math.min(remainingPercentage - newMilestone.fundingPercentage, 25),
        estimatedCompletion: "",
      });
      setDate(undefined);
      setShowForm(false);
    }
  };

  const removeMilestone = (index: number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    onChange(updatedMilestones);
  };

  const updateMilestonePercentage = (index: number, newPercentage: number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      fundingPercentage: newPercentage,
    };
    onChange(updatedMilestones);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="glass rounded-xl border border-white/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">Project Milestones</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              Allocated: <span className={totalPercentage === 100 ? "text-green-500" : "text-yellow-500"}>{totalPercentage}%</span>
            </span>
            <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${totalPercentage === 100 ? "bg-green-500" : "bg-yellow-500"}`} 
                style={{ width: `${totalPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {totalPercentage !== 100 && (
          <Alert className="mb-6 bg-yellow-500/10 border-yellow-500/30 text-yellow-500">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Milestone funding must add up to 100%. Currently: {totalPercentage}% allocated, {remainingPercentage}% remaining.
            </AlertDescription>
          </Alert>
        )}

        {milestones.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-white/10 rounded-lg">
            <p className="text-gray-400 mb-2">No milestones defined yet</p>
            <p className="text-sm text-gray-500 mb-4">Add milestones to define your project's roadmap and funding schedule</p>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="bg-black/30 border border-white/10 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">Milestone {index + 1}: {milestone.title}</h4>
                    <p className="text-sm text-gray-400">Due: {milestone.estimatedCompletion}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-sm font-medium">{milestone.fundingPercentage}%</span>
                      <p className="text-xs text-gray-500">of funding</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMilestone(index)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-2">{milestone.description}</p>
                
                <div className="mt-2">
                  <p className="text-xs text-gray-400 mb-1">Deliverables:</p>
                  <ul className="list-disc list-inside text-sm text-gray-300">
                    {milestone.deliverables.map((deliverable, i) => (
                      <li key={i}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4">
                  <Label className="text-xs text-gray-400">Funding Percentage</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[milestone.fundingPercentage]}
                      min={1}
                      max={100}
                      step={1}
                      className="flex-grow"
                      onValueChange={(value) => updateMilestonePercentage(index, value[0])}
                    />
                    <span className="text-sm font-medium w-10 text-right">{milestone.fundingPercentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm ? (
          <div className="bg-black/30 border border-white/10 rounded-lg p-4">
            <h4 className="font-medium mb-4">Add New Milestone</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Milestone Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={newMilestone.title}
                  onChange={handleInputChange}
                  placeholder="e.g., MVP Release"
                  className="bg-black/50 border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimatedCompletion">Estimated Completion Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !newMilestone.estimatedCompletion && "text-gray-400"
                      } bg-black/50 border-white/10`}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {newMilestone.estimatedCompletion || "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-black/95 border border-white/10">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newMilestone.description}
                  onChange={handleInputChange}
                  placeholder="Describe what will be accomplished in this milestone"
                  className="bg-black/50 border-white/10"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label>Deliverables *</Label>
                {newMilestone.deliverables.length > 0 && (
                  <div className="mb-2 space-y-1">
                    {newMilestone.deliverables.map((deliverable, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-black/50 rounded px-3 py-1.5"
                      >
                        <span className="text-sm">{deliverable}</span>
                        <button
                          type="button"
                          onClick={() => removeDeliverable(index)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    placeholder="Add a deliverable"
                    className="bg-black/50 border-white/10"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addDeliverable();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addDeliverable}
                    className="border-white/10 hover:bg-white/5"
                    disabled={!newDeliverable.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between">
                  <Label>Funding Percentage *</Label>
                  <span className="text-sm">
                    {remainingPercentage} % remaining
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[newMilestone.fundingPercentage]}
                    min={1}
                    max={remainingPercentage || 100}
                    step={1}
                    className="flex-grow"
                    onValueChange={handlePercentageChange}
                  />
                  <span className="text-sm font-medium w-10 text-right">{newMilestone.fundingPercentage}%</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setNewMilestone({
                    title: "",
                    description: "",
                    deliverables: [],
                    fundingPercentage: 0,
                    estimatedCompletion: "",
                  });
                  setDate(undefined);
                }}
                className="border-white/10 hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={addMilestone}
                className="button-gradient"
                disabled={
                  !newMilestone.title ||
                  !newMilestone.description ||
                  newMilestone.deliverables.length === 0 ||
                  newMilestone.fundingPercentage <= 0 ||
                  !newMilestone.estimatedCompletion
                }
              >
                Add Milestone
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowForm(true)}
            className="border-white/10 hover:bg-white/5"
            disabled={remainingPercentage <= 0}
          >
            <Plus className="mr-2 h-4 w-4" /> 
            {remainingPercentage <= 0 
              ? "All funding allocated" 
              : "Add Milestone"
            }
          </Button>
        )}
      </div>
      
      <div className="glass rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-medium mb-4">Milestone Guidelines</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded mt-0.5">
              <span className="text-primary text-xs font-medium">1</span>
            </div>
            <p>Break your project into 2-5 clear, achievable milestones.</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded mt-0.5">
              <span className="text-primary text-xs font-medium">2</span>
            </div>
            <p>Each milestone should have concrete, verifiable deliverables.</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded mt-0.5">
              <span className="text-primary text-xs font-medium">3</span>
            </div>
            <p>Set realistic timeframes for completion.</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded mt-0.5">
              <span className="text-primary text-xs font-medium">4</span>
            </div>
            <p>Allocate funding percentages based on effort and value delivered.</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded mt-0.5">
              <span className="text-primary text-xs font-medium">5</span>
            </div>
            <p>Remember that funds are only released after milestone completion is approved by investors.</p>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default MilestoneForm;
