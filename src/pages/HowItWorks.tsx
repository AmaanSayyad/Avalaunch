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
  ArrowRightLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container px-4 mb-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-medium mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              How <span className="text-gradient">Avalaunch</span> Works
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Avalaunch is a milestone-based funding platform for Avalanche ecosystem projects. 
              Learn how our platform connects innovative founders with strategic investors through 
              a transparent, community-governed process.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button size="lg" className="button-gradient" asChild>
                <Link to="/explore">
                  Explore Projects <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                <Link to="/create-project">
                  Submit Your Project <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="container px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="glass rounded-xl p-8 md:p-12 border border-white/10">
              <h2 className="text-3xl font-medium mb-8 text-center">Platform Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black/30 p-6 rounded-lg border border-white/5 flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Landmark className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">For Founders</h3>
                  <p className="text-gray-300">
                    Launch your Avalanche ecosystem project with milestone-based funding. Set clear goals, 
                    receive funding as you deliver, and build investor confidence.
                  </p>
                </div>
                
                <div className="bg-black/30 p-6 rounded-lg border border-white/5 flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">For Investors</h3>
                  <p className="text-gray-300">
                    Invest in promising Avalanche projects with reduced risk. Funds are released only when 
                    milestones are completed and verified by community governance.
                  </p>
                </div>
                
                <div className="bg-black/30 p-6 rounded-lg border border-white/5 flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Vote className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Community Governance</h3>
                  <p className="text-gray-300">
                    Participate in platform governance and milestone verification. Your vote ensures 
                    transparency and accountability throughout the funding process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Steps */}
        <section className="container px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-medium mb-12 text-center">The Avalaunch Process</h2>
            
            {/* For Founders */}
            <div className="mb-16">
              <h3 className="text-2xl font-medium mb-6 flex items-center">
                <span className="bg-primary/20 text-primary p-2 rounded-full mr-3">
                  <Landmark className="w-5 h-5" />
                </span>
                For Founders
              </h3>
              
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-medium">1</div>
                    <div className="h-full w-0.5 bg-white/10 my-2"></div>
                  </div>
                  <div className="glass rounded-xl p-6 border border-white/10 flex-grow">
                    <h4 className="text-xl font-medium mb-2">Project Submission</h4>
                    <p className="text-gray-300 mb-4">
                      Create a comprehensive project proposal including your team details, project description, 
                      funding requirements, equity offering, and most importantly - clearly defined milestones.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h5 className="font-medium mb-2">Key Components:</h5>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Project details and vision</li>
                        <li>Team background and experience</li>
                        <li>Funding goal and equity percentage</li>
                        <li>Detailed milestone breakdown</li>
                        <li>Revenue sharing model</li>
                        <li>Token economics (if applicable)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-medium">2</div>
                    <div className="h-full w-0.5 bg-white/10 my-2"></div>
                  </div>
                  <div className="glass rounded-xl p-6 border border-white/10 flex-grow">
                    <h4 className="text-xl font-medium mb-2">Funding Period</h4>
                    <p className="text-gray-300 mb-4">
                      Once your project is approved, it enters the funding period where investors can contribute 
                      to your funding goal. Projects must reach their minimum funding threshold to proceed.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h5 className="font-medium mb-2">During This Phase:</h5>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Your project is listed in the Explore section</li>
                        <li>Investors can review your proposal and milestones</li>
                        <li>You can engage with potential investors</li>
                        <li>Funding progress is tracked transparently</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-medium">3</div>
                    <div className="h-full w-0.5 bg-white/10 my-2"></div>
                  </div>
                  <div className="glass rounded-xl p-6 border border-white/10 flex-grow">
                    <h4 className="text-xl font-medium mb-2">Milestone Development</h4>
                    <p className="text-gray-300 mb-4">
                      Work on your project milestones as outlined in your proposal. Each milestone has a 
                      specific portion of the total funding allocated to it, which you'll receive upon completion.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h5 className="font-medium mb-2">Development Process:</h5>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Complete milestone deliverables</li>
                        <li>Provide regular updates to investors</li>
                        <li>Document progress for verification</li>
                        <li>Submit completed milestones for review</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-medium">4</div>
                    <div className="h-full w-0.5 bg-white/10 my-2"></div>
                  </div>
                  <div className="glass rounded-xl p-6 border border-white/10 flex-grow">
                    <h4 className="text-xl font-medium mb-2">Milestone Verification</h4>
                    <p className="text-gray-300 mb-4">
                      Submit your completed milestone for community verification. Investors will review your 
                      deliverables and vote on whether the milestone has been successfully completed.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h5 className="font-medium mb-2">Verification Requirements:</h5>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Provide evidence of completed deliverables</li>
                        <li>Demonstrate functionality if applicable</li>
                        <li>Address investor questions and feedback</li>
                        <li>Milestone must receive 50%+ approval to pass</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-medium">5</div>
                  </div>
                  <div className="glass rounded-xl p-6 border border-white/10 flex-grow">
                    <h4 className="text-xl font-medium mb-2">Fund Release & Revenue Sharing</h4>
                    <p className="text-gray-300 mb-4">
                      Upon milestone approval, the allocated funds are released to your project. As your project 
                      generates revenue, distribute the agreed percentage to your investors according to your 
                      revenue sharing model.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h5 className="font-medium mb-2">After Completion:</h5>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Receive milestone funding automatically</li>
                        <li>Begin work on the next milestone</li>
                        <li>Distribute revenue according to your model</li>
                        <li>Maintain transparency with your investors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* For Investors */}
            <div>
              <h3 className="text-2xl font-medium mb-6 flex items-center">
                <span className="bg-primary/20 text-primary p-2 rounded-full mr-3">
                  <Users className="w-5 h-5" />
                </span>
                For Investors
              </h3>
              
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-medium">1</div>
                    <div className="h-full w-0.5 bg-white/10 my-2"></div>
                  </div>
                  <div className="glass rounded-xl p-6 border border-white/10 flex-grow">
                    <h4 className="text-xl font-medium mb-2">Project Discovery</h4>
                    <p className="text-gray-300 mb-4">
                      Browse through available projects in the Avalanche ecosystem. Review project details, 
                      team backgrounds, milestone plans, and revenue sharing models to find opportunities 
                      that align with your investment strategy.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h5 className="font-medium mb-2">What to Evaluate:</h5>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Project viability and market potential</li>
                        <li>Team experience and track record</li>
                        <li>Milestone feasibility and timelines</li>
                        <li>Equity offering and revenue sharing terms</li>
                        <li>Token economics (if applicable)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-medium">2</div>
                    <div className="h-full w-0.5 bg-white/10 my-2"></div>
                  </div>
                  <div className="glass rounded-xl p-6 border border-white/10 flex-grow">
                    <h4 className="text-xl font-medium mb-2">Investment</h4>
                    <p className="text-gray-300 mb-4">
                      Once you've found a project you believe in, make your investment. Your funds are securely 
                      held in a smart contract and only released to the project when milestones are verified 
                      and approved by the investor community.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h5 className="font-medium mb-2">Investment Process:</h5>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Connect your Avalanche-compatible wallet</li>
                        <li>Choose your investment amount</li>
                        <li>Confirm transaction on the blockchain</li>
                        <li>Receive equity representation tokens</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-medium">3</div>
                    <div className="h-full w-0.5 bg-white/10 my-2"></div>
                  </div>
                  <div className="glass rounded-xl p-6 border border-white/10 flex-grow">
                    <h4 className="text-xl font-medium mb-2">Milestone Governance</h4>
                    <p className="text-gray-300 mb-4">
                      Participate in milestone verification by reviewing project progress and voting on 
                      milestone completion. Your vote helps ensure that projects meet their commitments 
                      before receiving additional funding.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h5 className="font-medium mb-2">Governance Activities:</h5>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Review milestone deliverables</li>
                        <li>Ask questions and request clarifications</li>
                        <li>Vote on milestone completion</li>
                        <li>Participate in project-level decisions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-medium">4</div>
                  </div>
                  <div className="glass rounded-xl p-6 border border-white/10 flex-grow">
                    <h4 className="text-xl font-medium mb-2">Revenue Distribution</h4>
                    <p className="text-gray-300 mb-4">
                      As the project generates revenue, receive your share based on the agreed revenue sharing 
                      model. Track your investments, monitor project performance, and manage your portfolio 
                      through your investor dashboard.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                      <h5 className="font-medium mb-2">Investor Benefits:</h5>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Receive revenue distributions automatically</li>
                        <li>Track project performance metrics</li>
                        <li>Manage your investment portfolio</li>
                        <li>Participate in future funding rounds</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="container px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-medium mb-12 text-center">Key Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6 border border-white/10">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Milestone-Based Funding</h3>
                <p className="text-gray-300">
                  Funds are released in stages as project milestones are completed and verified, 
                  reducing risk for investors and ensuring accountability for founders.
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 border border-white/10">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                  <Vote className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Community Governance</h3>
                <p className="text-gray-300">
                  Investors vote on milestone completion, ensuring transparency and accountability. 
                  A 50% approval threshold is required to release milestone funds.
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 border border-white/10">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                  <ArrowRightLeft className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Revenue Sharing</h3>
                <p className="text-gray-300">
                  Founders determine how project revenue is shared with investors, creating 
                  a sustainable model for both parties based on actual project success.
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 border border-white/10">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Transparent Metrics</h3>
                <p className="text-gray-300">
                  Track project progress, milestone completion, funding allocation, and revenue 
                  distribution with transparent on-chain metrics and reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-medium mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-medium mb-2">How is Avalaunch different from traditional crowdfunding?</h3>
                <p className="text-gray-300">
                  Avalaunch uses milestone-based funding where money is released only when verified goals are achieved. 
                  This creates accountability for founders and reduces risk for investors. Additionally, our platform 
                  offers equity and revenue sharing rather than just perks or products.
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-medium mb-2">What types of projects can be funded on Avalaunch?</h3>
                <p className="text-gray-300">
                  Avalaunch is specifically designed for projects building on the Avalanche ecosystem. This includes 
                  DeFi protocols, NFT platforms, GameFi projects, infrastructure tools, and other blockchain applications 
                  that leverage Avalanche's technology.
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-medium mb-2">How are milestone completions verified?</h3>
                <p className="text-gray-300">
                  Project founders submit evidence of milestone completion including code repositories, demos, documentation, 
                  or other deliverables. Investors then review these submissions and vote on whether the milestone has been 
                  successfully completed. A minimum of 50% approval is required to release the funds.
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-medium mb-2">How is revenue sharing implemented?</h3>
                <p className="text-gray-300">
                  Each project defines its own revenue sharing model during the submission process. The founder determines 
                  what percentage of revenue will be shared with investors. When the project generates revenue, the specified 
                  percentage is automatically distributed to investors proportional to their investment amount.
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-medium mb-2">What happens if a project fails to complete a milestone?</h3>
                <p className="text-gray-300">
                  If a project fails to complete a milestone or doesn't receive the required 50% approval from investors, 
                  the remaining funds are held in the smart contract. The project team can resubmit the milestone with 
                  improvements, or in cases of project abandonment, remaining funds may be returned to investors based on 
                  governance decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass rounded-xl p-8 md:p-12 border border-white/10 text-center">
              <h2 className="text-3xl font-medium mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Whether you're a founder looking to launch your project or an investor seeking opportunities 
                in the Avalanche ecosystem, Avalaunch provides the platform you need.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
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
