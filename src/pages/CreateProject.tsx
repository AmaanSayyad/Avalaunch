import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectForm from "../components/projects/ProjectForm";
import MilestoneForm from "../components/projects/MilestoneForm";
import TokenEconomicsForm from "../components/projects/TokenEconomicsForm";
import RevenueShareForm from "../components/projects/RevenueShareForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { WalletButton } from "@/components/wallet/WalletButton";
import { useContext } from "react";
import { ContractContext } from "@/context/contractContext";
import { WalletContext } from "@/context/walletContext";

type Step = "project" | "milestones" | "tokenomics" | "revenue" | "review";

const CreateProject = () => {
  const { createProject } = useContext(ContractContext);
  const { signer } = useContext(WalletContext);
  const [currentStep, setCurrentStep] = useState<Step>("project");
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    category: "",
    tags: [] as string[],
    fundingGoal: "",
    equity: "",
    coverImage: "",
    whitepaper: "",
    team: [] as { name: string; role: string; bio: string; avatar: string }[],
    socialMedia: {
      twitter: "",
      telegram: "",
      discord: "",
      github: "",
      website: "",
    },
    revenueSharing: {
      investorPercentage: "50",
      founderPercentage: "50",
      description: "",
    },
  });

  const [tokenEconomics, setTokenEconomics] = useState({
    hasToken: false,
    tokenName: "",
    tokenSymbol: "",
    tokenType: "",
    totalSupply: "",
    initialPrice: "",
    tokenUtility: "",
    tokenAllocations: [] as {
      category: string;
      percentage: number;
      lockupPeriod: string;
      vestingSchedule: string;
    }[],
  });
  const [milestones, setMilestones] = useState<
    {
      title: string;
      description: string;
      deliverables: string[];
      fundingPercentage: number;
      estimatedCompletion: string;
    }[]
  >([]);
  const { toast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleProjectDataChange = (data: typeof projectData) => {
    setProjectData(data);
  };

  const handleMilestonesChange = (data: typeof milestones) => {
    setMilestones(data);
  };

  const handleNextStep = () => {
    if (currentStep === "project") {
      // Validate project data
      if (
        !projectData.name ||
        !projectData.description ||
        !projectData.fundingGoal
      ) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required project details",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("milestones");
    } else if (currentStep === "milestones") {
      // Validate milestones
      if (milestones.length === 0) {
        toast({
          title: "No Milestones",
          description: "Please add at least one milestone",
          variant: "destructive",
        });
        return;
      }

      // Check if milestone funding percentages add up to 100%
      const totalPercentage = milestones.reduce(
        (sum, milestone) => sum + milestone.fundingPercentage,
        0
      );
      if (totalPercentage !== 100) {
        toast({
          title: "Invalid Milestone Allocation",
          description: "Milestone funding percentages must add up to 100%",
          variant: "destructive",
        });
        return;
      }

      setCurrentStep("tokenomics");
    } else if (currentStep === "tokenomics") {
      // Validate token economics if user has chosen to have a token
      if (tokenEconomics.hasToken) {
        if (
          !tokenEconomics.tokenName ||
          !tokenEconomics.tokenSymbol ||
          !tokenEconomics.tokenType ||
          !tokenEconomics.totalSupply
        ) {
          toast({
            title: "Missing Token Information",
            description: "Please fill in all required token details",
            variant: "destructive",
          });
          return;
        }

        // Check if token allocations add up to 100% if any allocations exist
        if (tokenEconomics.tokenAllocations.length > 0) {
          const totalAllocation = tokenEconomics.tokenAllocations.reduce(
            (sum, allocation) => sum + allocation.percentage,
            0
          );
          if (totalAllocation !== 100) {
            toast({
              title: "Invalid Token Allocation",
              description: "Token allocations must add up to 100%",
              variant: "destructive",
            });
            return;
          }
        }
      }

      setCurrentStep("revenue");
    } else if (currentStep === "revenue") {
      // Validate revenue sharing
      const investorPercentage = parseInt(
        projectData.revenueSharing.investorPercentage
      );
      const founderPercentage = parseInt(
        projectData.revenueSharing.founderPercentage
      );

      if (isNaN(investorPercentage) || isNaN(founderPercentage)) {
        toast({
          title: "Invalid Revenue Sharing",
          description: "Please set valid percentages for revenue sharing",
          variant: "destructive",
        });
        return;
      }

      if (investorPercentage + founderPercentage !== 100) {
        toast({
          title: "Invalid Revenue Allocation",
          description: "Revenue sharing percentages must add up to 100%",
          variant: "destructive",
        });
        return;
      }

      setCurrentStep("review");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "milestones") {
      setCurrentStep("project");
    } else if (currentStep === "tokenomics") {
      setCurrentStep("milestones");
    } else if (currentStep === "revenue") {
      setCurrentStep("tokenomics");
    } else if (currentStep === "review") {
      setCurrentStep("revenue");
    }
  };

  const handleRevenueChange = (data: typeof projectData.revenueSharing) => {
    setProjectData({
      ...projectData,
      revenueSharing: data,
    });
  };

  const handleTokenEconomicsChange = (data: typeof tokenEconomics) => {
    setTokenEconomics(data);
  };

  const handleSubmit = async () => {
    // if (!isWalletConnected) {
    //   toast({
    //     title: "Wallet Not Connected",
    //     description: "Please connect your wallet to submit your project",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    // string memory projectDataIPFS,
    // address projectOwnerAddress,
    // uint256 fundingRequired,
    // uint256 fundingRaiseDeadline,
    // uint256 projectOwnerProfitPercent

    // console.log(projectData);

    let today = new Date();

    // Add 10 days
    let futureDate = new Date();

    futureDate.setDate(today.getDate() + 10);
    let unixTimestamp = Math.floor(futureDate.getTime() / 1000);

    // console.log(futureDate.toString());

    // console.log({
    //   signer: signer.address,
    //   fundingGoal: projectData.fundingGoal,
    //   founderPercentage: projectData.revenueSharing.founderPercentage,
    // });

    createProject(signer, {
      projectDataJSON: "",
      fundingRequied: "1000",
      fundingRaiseDeadline: unixTimestamp,
      projectOwnerProfitPercent: "50",
    });
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          {/* Step 1: Project Details */}
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              currentStep === "project"
                ? "bg-primary text-white"
                : "bg-primary/20 text-primary"
            }`}
          >
            1
          </div>

          {/* Connector */}
          <div
            className={`h-1 w-10 ${
              currentStep === "project" ? "bg-gray-600" : "bg-primary"
            }`}
          ></div>

          {/* Step 2: Milestones */}
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              currentStep === "milestones"
                ? "bg-primary text-white"
                : currentStep === "tokenomics" ||
                  currentStep === "revenue" ||
                  currentStep === "review"
                ? "bg-primary/20 text-primary"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            2
          </div>

          {/* Connector */}
          <div
            className={`h-1 w-10 ${
              currentStep === "project" || currentStep === "milestones"
                ? "bg-gray-600"
                : "bg-primary"
            }`}
          ></div>

          {/* Step 3: Token Economics */}
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              currentStep === "tokenomics"
                ? "bg-primary text-white"
                : currentStep === "revenue" || currentStep === "review"
                ? "bg-primary/20 text-primary"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            3
          </div>

          {/* Connector */}
          <div
            className={`h-1 w-10 ${
              currentStep === "project" ||
              currentStep === "milestones" ||
              currentStep === "tokenomics"
                ? "bg-gray-600"
                : "bg-primary"
            }`}
          ></div>

          {/* Step 4: Revenue Sharing */}
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              currentStep === "revenue"
                ? "bg-primary text-white"
                : currentStep === "review"
                ? "bg-primary/20 text-primary"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            4
          </div>

          {/* Connector */}
          <div
            className={`h-1 w-10 ${
              currentStep === "review" ? "bg-primary" : "bg-gray-600"
            }`}
          ></div>

          {/* Step 5: Review */}
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              currentStep === "review"
                ? "bg-primary text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            5
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "project":
        return (
          <ProjectForm
            projectData={projectData}
            onChange={handleProjectDataChange}
          />
        );
      case "milestones":
        return (
          <MilestoneForm
            milestones={milestones}
            onChange={handleMilestonesChange}
          />
        );
      case "tokenomics":
        return (
          <TokenEconomicsForm
            tokenEconomics={tokenEconomics}
            onChange={handleTokenEconomicsChange}
          />
        );
      case "revenue":
        return (
          <RevenueShareForm
            revenueSharing={projectData.revenueSharing}
            onChange={handleRevenueChange}
          />
        );
      case "review":
        return (
          <div className="space-y-8">
            <div className="glass rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-medium mb-4">Project Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 mb-1">Project Name</p>
                  <p className="text-white">{projectData.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Category</p>
                  <p className="text-white">{projectData.category}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Funding Goal</p>
                  <p className="text-white">{projectData.fundingGoal} AVAX</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Equity Offered</p>
                  <p className="text-white">{projectData.equity}%</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400 mb-1">Description</p>
                  <p className="text-white">{projectData.description}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400 mb-1">Tags</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {projectData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <p className="text-gray-400 mb-1">Social Media & Links</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                    {projectData.socialMedia.website && (
                      <a
                        href={projectData.socialMedia.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                      >
                        <span>🌐</span> Website
                      </a>
                    )}
                    {projectData.socialMedia.github && (
                      <a
                        href={projectData.socialMedia.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                      >
                        <span>💻</span> GitHub
                      </a>
                    )}
                    {projectData.socialMedia.twitter && (
                      <a
                        href={projectData.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                      >
                        <span>🐦</span> Twitter
                      </a>
                    )}
                    {projectData.socialMedia.discord && (
                      <a
                        href={projectData.socialMedia.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                      >
                        <span>💬</span> Discord
                      </a>
                    )}
                    {projectData.socialMedia.telegram && (
                      <a
                        href={projectData.socialMedia.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                      >
                        <span>✈️</span> Telegram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-medium mb-4">Milestones</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="border border-white/10 rounded-lg p-4 bg-black/30"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">
                        Milestone {index + 1}: {milestone.title}
                      </h4>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {milestone.fundingPercentage}% of funds
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      {milestone.description}
                    </p>
                    <div className="mt-2">
                      <p className="text-gray-400 text-xs mb-1">
                        Deliverables:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {milestone.deliverables.map((deliverable, i) => (
                          <li key={i}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      Estimated completion: {milestone.estimatedCompletion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {tokenEconomics.hasToken && (
              <div className="glass rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-medium mb-4">Token Economics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-1">Token Name</p>
                    <p className="text-white">{tokenEconomics.tokenName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Token Symbol</p>
                    <p className="text-white">{tokenEconomics.tokenSymbol}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Token Type</p>
                    <p className="text-white">{tokenEconomics.tokenType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Total Supply</p>
                    <p className="text-white">{tokenEconomics.totalSupply}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Initial Price</p>
                    <p className="text-white">
                      {tokenEconomics.initialPrice} AVAX
                    </p>
                  </div>
                </div>

                {tokenEconomics.tokenAllocations.length > 0 && (
                  <div className="mt-6">
                    <p className="text-gray-400 mb-3">Token Allocation</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tokenEconomics.tokenAllocations.map(
                        (allocation, index) => (
                          <div
                            key={index}
                            className="bg-black/30 border border-white/10 rounded-lg p-3"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <p className="font-medium">
                                {allocation.category}
                              </p>
                              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                {allocation.percentage}%
                              </span>
                            </div>
                            <div className="flex gap-4 text-xs text-gray-400">
                              <span>
                                Lockup: {allocation.lockupPeriod || "None"}
                              </span>
                              <span>
                                Vesting: {allocation.vestingSchedule || "None"}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {tokenEconomics.tokenUtility && (
                  <div className="mt-6">
                    <p className="text-gray-400 mb-1">Token Utility</p>
                    <p className="text-white">{tokenEconomics.tokenUtility}</p>
                  </div>
                )}
              </div>
            )}

            <div className="glass rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-medium mb-4">Revenue Sharing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 mb-1">Investor Share</p>
                  <p className="text-white">
                    {projectData.revenueSharing.investorPercentage}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Founder Share</p>
                  <p className="text-white">
                    {projectData.revenueSharing.founderPercentage}%
                  </p>
                </div>
                {projectData.revenueSharing.description && (
                  <div className="md:col-span-2">
                    <p className="text-gray-400 mb-1">Description</p>
                    <p className="text-white">
                      {projectData.revenueSharing.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="glass rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-medium mb-4">
                Submission Requirements
              </h3>
              <p className="text-gray-300 mb-4">
                By submitting this project, you agree to the following:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
                <li>You are the authorized representative of this project</li>
                <li>All information provided is accurate and complete</li>
                <li>
                  You understand that funds will only be released upon milestone
                  completion approval
                </li>
                <li>You agree to BuildnFund's terms and conditions</li>
              </ul>

              <div className="mt-6">
                <Button
                  onClick={handleSubmit}
                  className="button-gradient w-full"
                  size="lg"
                >
                  <Save className="mr-2 h-4 w-4" /> Submit Project
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-normal mb-4 tracking-tight text-center">
              <span className="text-white font-medium">
                Create Your Project
              </span>
            </h1>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Launch your project on BuildnFund with milestone-based funding. Set
              clear goals, define milestones, and receive funding as you
              deliver.
            </p>

            {renderStepIndicator()}

            <div className="mt-8">{renderStepContent()}</div>

            <div className="mt-8 flex justify-between">
              {currentStep !== "project" && (
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="border-white/10 hover:bg-white/5"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              )}

              {currentStep !== "project" && <div></div>}

              {currentStep !== "review" ? (
                <Button
                  onClick={handleNextStep}
                  className="button-gradient ml-auto"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CreateProject;
