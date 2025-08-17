import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Wallet, 
  Search, 
  FileCheck, 
  BarChart3, 
  Vote, 
  Landmark, 
  Users, 
  CheckCircle2, 
  ArrowRightLeft,
  Milestone,
  LucideIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isLast?: boolean;
}

const StepCard = ({ number, title, description, icon: Icon, isLast = false }: StepCardProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center text-white font-medium text-lg">
          {number}
        </div>
        {!isLast && <div className="h-full w-0.5 bg-gradient-to-b from-primary to-transparent my-2"></div>}
      </div>
      <div className="glass rounded-xl p-6 border border-white/10 flex-grow mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-primary/10 p-3 rounded-lg mr-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h4 className="text-xl font-medium">{title}</h4>
        </div>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div 
      className="glass rounded-xl p-8 border border-white/10 h-full"
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(46, 229, 157, 0.2)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container px-4 mb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="md:w-1/2">
                <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
                  How <span className="text-gradient">BuildnFund</span> Works
                </h1>
                <p className="text-xl text-gray-400 text-center max-w-4xl mx-auto mb-16">
                  BuildnFund connects innovative founders with strategic investors through
                  a transparent, milestone-based funding platform built specifically for the Avalanche ecosystem.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="button-gradient" asChild>
                    <Link to="/explore">
                      Explore Projects <Search className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                    <Link to="/create-project">
                      Submit Your Project <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-[#22c55e] rounded-lg blur opacity-30"></div>
                  <div className="glass rounded-lg border border-white/10 p-6 relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-sm text-gray-400">BuildnFund Flow</div>
                    </div>
                    <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                      <code>{`// Milestone-based funding flow
function createProject(details) {
  const { milestones, equity, revenue } = details;
  
  // Verify project meets standards
  if (validateProject(details)) {
    // Open for investment
    const fundingPool = openInvestment(details);
    
    // For each milestone
    for (const milestone of milestones) {
      // Development phase
      await developMilestone(milestone);
      
      // Community verification
      const approved = await communityVote(milestone);
      
      if (approved) {
        // Release funds for this milestone
        releaseFunds(milestone.allocation);
      }
    }
    
    // Revenue distribution
    distributeRevenue(revenue.founderShare, 
                     revenue.investorShare);
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="container px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium mb-12 text-center">The BuildnFund <span className="text-gradient">Advantage</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <FeatureCard 
                  icon={Milestone} 
                  title="Milestone-Based Funding"
                  description="Funds are released in stages as project milestones are completed and verified, reducing risk for investors and ensuring accountability for founders."
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FeatureCard 
                  icon={Vote} 
                  title="Community Governance"
                  description="Investors vote on milestone completion, ensuring transparency and accountability. A 50% approval threshold is required to release milestone funds."
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FeatureCard 
                  icon={ArrowRightLeft} 
                  title="Revenue Sharing"
                  description="Founders determine how project revenue is shared with investors, creating a sustainable model for both parties based on actual project success."
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Tabs */}
        <section className="container px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium mb-4 text-center">How It <span className="text-gradient">Works</span></h2>
            <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
              Our platform connects founders and investors through a transparent, milestone-based process
              that benefits all participants in the Avalanche ecosystem.
            </p>
            
            <Tabs defaultValue="founders" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-2 w-full max-w-md">
                  <TabsTrigger value="founders" className="text-lg">For Founders</TabsTrigger>
                  <TabsTrigger value="investors" className="text-lg">For Investors</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="founders" className="mt-8">
                <div className="max-w-4xl mx-auto">
                  <StepCard 
                    number={1}
                    title="Project Submission"
                    description="Create a comprehensive project proposal including your team details, project description, funding requirements, equity offering, revenue sharing model, and clearly defined milestones."
                    icon={FileCheck}
                  />
                  
                  <StepCard 
                    number={2}
                    title="Funding Period"
                    description="Once approved, your project enters the funding period where investors can contribute to your funding goal. Projects must reach their minimum funding threshold to proceed."
                    icon={Wallet}
                  />
                  
                  <StepCard 
                    number={3}
                    title="Milestone Development"
                    description="Work on your project milestones as outlined in your proposal. Each milestone has a specific portion of the total funding allocated to it, which you'll receive upon completion."
                    icon={Milestone}
                  />
                  
                  <StepCard 
                    number={4}
                    title="Milestone Verification"
                    description="Submit your completed milestone for community verification. Investors will review your deliverables and vote on whether the milestone has been successfully completed."
                    icon={Vote}
                  />
                  
                  <StepCard 
                    number={5}
                    title="Fund Release & Revenue Sharing"
                    description="Upon milestone approval, the allocated funds are released to your project. As your project generates revenue, distribute the agreed percentage to your investors according to your revenue sharing model."
                    icon={ArrowRightLeft}
                    isLast
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="investors" className="mt-8">
                <div className="max-w-4xl mx-auto">
                  <StepCard 
                    number={1}
                    title="Project Discovery"
                    description="Browse through available projects in the Avalanche ecosystem. Review project details, team backgrounds, milestone plans, and revenue sharing models to find opportunities that align with your investment strategy."
                    icon={Search}
                  />
                  
                  <StepCard 
                    number={2}
                    title="Investment"
                    description="Once you've found a project you believe in, make your investment. Your funds are securely held in a smart contract and only released to the project when milestones are verified and approved by the investor community."
                    icon={Wallet}
                  />
                  
                  <StepCard 
                    number={3}
                    title="Milestone Governance"
                    description="Participate in milestone verification by reviewing project progress and voting on milestone completion. Your vote helps ensure that projects meet their commitments before receiving additional funding."
                    icon={Vote}
                  />
                  
                  <StepCard 
                    number={4}
                    title="Revenue Distribution"
                    description="As the project generates revenue, receive your share based on the agreed revenue sharing model. Track your investments, monitor project performance, and manage your portfolio through your investor dashboard."
                    icon={BarChart3}
                    isLast
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container px-4 mb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium mb-12 text-center">Frequently Asked <span className="text-gradient">Questions</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="glass rounded-xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4">How is BuildnFund different?</h3>
                <p className="text-gray-300 mb-6">
                  BuildnFund uses milestone-based funding where money is released only when verified goals are achieved.
                  This creates accountability for founders and reduces risk for investors. Additionally, our platform 
                  offers equity and revenue sharing rather than just perks or products.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass rounded-xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4">What projects can be funded?</h3>
                <p className="text-gray-300 mb-6">
                  BuildnFund is specifically designed for projects building on the Avalanche ecosystem. This includes 
                  DeFi protocols, NFT platforms, GameFi projects, infrastructure tools, and other blockchain applications 
                  that leverage Avalanche's technology.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass rounded-xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">How are milestones verified?</h3>
                <p className="text-gray-300 mb-6">
                  Project founders submit evidence of milestone completion including code repositories, demos, documentation, 
                  or other deliverables. Investors then review these submissions and vote on whether the milestone has been 
                  successfully completed. A minimum of 50% approval is required to release the funds.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass rounded-xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4">How is revenue sharing implemented?</h3>
                <p className="text-gray-300 mb-6">
                  Each project defines its own revenue sharing model during the submission process. The founder determines 
                  what percentage of revenue will be shared with investors. When the project generates revenue, the specified 
                  percentage is automatically distributed to investors proportional to their investment amount.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-[#22c55e]/30 rounded-xl blur-xl"></div>
              <div className="glass rounded-xl p-12 border border-white/10 text-center relative">
                <motion.h2 
                  className="text-3xl md:text-4xl font-medium mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Ready to Get Started?
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Whether you're a founder looking to launch your project or an investor seeking opportunities 
                  in the Avalanche ecosystem, BuildnFund provides the platform you need.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button size="lg" className="button-gradient" asChild>
                    <Link to="/explore">
                      Explore Projects <Search className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                    <Link to="/create-project">
                      Submit Your Project <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                    <Link to="/governance">
                      Join Governance <Vote className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HowItWorks;