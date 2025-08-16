import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FileUpload from "@/components/projects/FileUpload";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface SocialMedia {
  twitter: string;
  telegram: string;
  discord: string;
  github: string;
  website: string;
}

interface ProjectData {
  name: string;
  description: string;
  category: string;
  tags: string[];
  fundingGoal: string;
  equity: string;
  coverImage: string;
  whitepaper: string;
  team: TeamMember[];
  socialMedia: SocialMedia;
  revenueSharing: {
    investorPercentage: string;
    founderPercentage: string;
    description: string;
  };
}

interface ProjectFormProps {
  projectData: ProjectData;
  onChange: (data: ProjectData) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectData, onChange }) => {
  const [newTag, setNewTag] = useState("");
  const [newTeamMember, setNewTeamMember] = useState<TeamMember>({
    name: "",
    role: "",
    bio: "",
    avatar: "",
  });
  const [showTeamForm, setShowTeamForm] = useState(false);
  
  // Initialize socialMedia if it doesn't exist in projectData
  if (!projectData.socialMedia) {
    projectData.socialMedia = {
      twitter: "",
      telegram: "",
      discord: "",
      github: "",
      website: ""
    };
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Check if this is a social media field
    if (name.startsWith('social_')) {
      const socialType = name.split('_')[1];
      onChange({
        ...projectData,
        socialMedia: {
          ...projectData.socialMedia,
          [socialType]: value
        }
      });
    } else {
      onChange({
        ...projectData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    onChange({
      ...projectData,
      [name]: value,
    });
  };

  const handleFileUpload = (name: string, url: string) => {
    onChange({
      ...projectData,
      [name]: url,
    });
  };

  const addTag = () => {
    if (newTag && !projectData.tags.includes(newTag)) {
      onChange({
        ...projectData,
        tags: [...projectData.tags, newTag],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange({
      ...projectData,
      tags: projectData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleTeamMemberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTeamMember({
      ...newTeamMember,
      [name]: value,
    });
  };

  const handleTeamAvatarUpload = (url: string) => {
    setNewTeamMember({
      ...newTeamMember,
      avatar: url,
    });
  };

  const addTeamMember = () => {
    if (newTeamMember.name && newTeamMember.role) {
      onChange({
        ...projectData,
        team: [...projectData.team, { ...newTeamMember }],
      });
      setNewTeamMember({
        name: "",
        role: "",
        bio: "",
        avatar: "",
      });
      setShowTeamForm(false);
    }
  };

  const removeTeamMember = (index: number) => {
    const updatedTeam = [...projectData.team];
    updatedTeam.splice(index, 1);
    onChange({
      ...projectData,
      team: updatedTeam,
    });
  };

  const projectCategories = [
    "DeFi",
    "NFT",
    "GameFi",
    "Infrastructure",
    "DAO",
    "Social",
    "Metaverse",
    "DEX",
    "Lending",
    "Analytics",
    "Other",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="glass rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-medium mb-6">Project Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              name="name"
              value={projectData.name}
              onChange={handleInputChange}
              placeholder="Enter your project name"
              className="bg-black/30 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={projectData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger className="bg-black/30 border-white/10">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {projectCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              placeholder="Describe your project in detail"
              className="bg-black/30 border-white/10 min-h-[120px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fundingGoal">Funding Goal (AVAX) *</Label>
            <Input
              id="fundingGoal"
              name="fundingGoal"
              type="number"
              value={projectData.fundingGoal}
              onChange={handleInputChange}
              placeholder="e.g., 1000"
              className="bg-black/30 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="equity">Equity Offered (%) *</Label>
            <Input
              id="equity"
              name="equity"
              type="number"
              value={projectData.equity}
              onChange={handleInputChange}
              placeholder="e.g., 10"
              className="bg-black/30 border-white/10"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {projectData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-primary hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-black/30 border-white/10"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addTag}
                className="border-white/10 hover:bg-white/5"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-medium mb-6">Social Media & Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="social_website">Website</Label>
            <Input
              id="social_website"
              name="social_website"
              value={projectData.socialMedia.website}
              onChange={handleInputChange}
              placeholder="https://yourproject.com"
              className="bg-black/30 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="social_github">GitHub</Label>
            <Input
              id="social_github"
              name="social_github"
              value={projectData.socialMedia.github}
              onChange={handleInputChange}
              placeholder="https://github.com/yourproject"
              className="bg-black/30 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="social_twitter">Twitter</Label>
            <Input
              id="social_twitter"
              name="social_twitter"
              value={projectData.socialMedia.twitter}
              onChange={handleInputChange}
              placeholder="https://twitter.com/yourproject"
              className="bg-black/30 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="social_discord">Discord</Label>
            <Input
              id="social_discord"
              name="social_discord"
              value={projectData.socialMedia.discord}
              onChange={handleInputChange}
              placeholder="https://discord.gg/yourproject"
              className="bg-black/30 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="social_telegram">Telegram</Label>
            <Input
              id="social_telegram"
              name="social_telegram"
              value={projectData.socialMedia.telegram}
              onChange={handleInputChange}
              placeholder="https://t.me/yourproject"
              className="bg-black/30 border-white/10"
            />
          </div>
        </div>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-medium mb-6">Project Assets</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <FileUpload
              onUpload={(url) => handleFileUpload("coverImage", url)}
              currentFile={projectData.coverImage}
              accept="image/*"
              maxSize={5}
            />
            <p className="text-xs text-gray-400 mt-1">
              Recommended: 1200x630px, max 5MB
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Whitepaper / Pitch Deck</Label>
            <FileUpload
              onUpload={(url) => handleFileUpload("whitepaper", url)}
              currentFile={projectData.whitepaper}
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              maxSize={10}
            />
            <p className="text-xs text-gray-400 mt-1">
              PDF or document, max 10MB
            </p>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-medium mb-6">Team Members</h3>
        
        {projectData.team.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {projectData.team.map((member, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-black/30 rounded-lg border border-white/10"
              >
                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {member.bio && <p className="text-sm mt-2">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {showTeamForm ? (
          <div className="bg-black/30 rounded-lg border border-white/10 p-4">
            <h4 className="font-medium mb-4">Add Team Member</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Name *</Label>
                <Input
                  id="teamName"
                  name="name"
                  value={newTeamMember.name}
                  onChange={handleTeamMemberChange}
                  placeholder="Full name"
                  className="bg-black/50 border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="teamRole">Role *</Label>
                <Input
                  id="teamRole"
                  name="role"
                  value={newTeamMember.role}
                  onChange={handleTeamMemberChange}
                  placeholder="e.g., CTO, Developer"
                  className="bg-black/50 border-white/10"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="teamBio">Bio</Label>
                <Textarea
                  id="teamBio"
                  name="bio"
                  value={newTeamMember.bio}
                  onChange={handleTeamMemberChange}
                  placeholder="Brief bio"
                  className="bg-black/50 border-white/10"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label>Avatar</Label>
                <FileUpload
                  onUpload={handleTeamAvatarUpload}
                  currentFile={newTeamMember.avatar}
                  accept="image/*"
                  maxSize={2}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowTeamForm(false);
                  setNewTeamMember({
                    name: "",
                    role: "",
                    bio: "",
                    avatar: "",
                  });
                }}
                className="border-white/10 hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={addTeamMember}
                className="button-gradient"
              >
                Add Member
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowTeamForm(true)}
            className="border-white/10 hover:bg-white/5"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Team Member
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectForm;
