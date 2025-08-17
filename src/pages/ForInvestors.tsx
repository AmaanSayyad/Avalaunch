import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BarChart3, 
  Vote, 
  Search, 
  Shield, 
  LineChart, 
  Wallet, 
  BadgeDollarSign,
  Percent,
  Layers,
  Clock,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const InvestmentCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color = "from-primary to-[#22c55e]" 
}: { 
  title: string; 
  description: string; 
  icon: any;
  color?: string;
}) => {
  return (
    <motion.div 
      className="glass rounded-xl border border-white/10 p-8 h-full"
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(46, 229, 157, 0.2)" }}
      transition={{ duration: 0.2 }}
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-6`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const ForInvestors = () => {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl font-medium mb-6 tracking-tight leading-tight">
                  Invest in the Future of <span className="text-gradient">Avalanche</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Discover promising projects, invest with confidence, and earn returns through 
                  milestone-based funding and revenue sharing on the Avalanche ecosystem.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="button-gradient" asChild>
                    <Link to="/explore">
                      Explore Projects <Search className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                    <Link to="/investor-dashboard">
                      Investor Dashboard <BarChart3 className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-[#22c55e] rounded-lg blur opacity-30"></div>
                  <div className="glass rounded-lg border border-white/10 p-6 relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-sm text-gray-400">Investment Portfolio</div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Portfolio Value</h3>
                          <p className="text-2xl font-bold text-gradient">1,250 AVAX</p>
                        </div>
                        <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" /> +12.5%
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Active Investments</span>
                          <span>5 Projects</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Pending Milestone Votes</span>
                          <span>3 Votes</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Revenue Distributed</span>
                          <span>85 AVAX</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Governance Participation</span>
                          <span>92%</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-white/10">
                        <div className="text-sm font-medium mb-2">Investment Allocation</div>
                        <div className="flex gap-1 h-3">
                          <div className="bg-primary rounded-l w-[35%]" title="DeFi: 35%"></div>
                          <div className="bg-blue-500 w-[25%]" title="GameFi: 25%"></div>
                          <div className="bg-purple-500 w-[20%]" title="NFT: 20%"></div>
                          <div className="bg-orange-500 w-[15%]" title="Infrastructure: 15%"></div>
                          <div className="bg-red-500 rounded-r w-[5%]" title="Other: 5%"></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>DeFi</span>
                          <span>GameFi</span>
                          <span>NFT</span>
                          <span>Infra</span>
                          <span>Other</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Investment Benefits */}
        <section className="container px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">Why Invest on <span className="text-gradient">Avalaunch</span></h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform offers unique advantages for investors looking to fund innovative projects in the Avalanche ecosystem.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <InvestmentCard 
                  icon={Shield} 
                  title="Reduced Risk"
                  description="Funds are released only when milestones are completed and verified, protecting your investment from projects that don't deliver."
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <InvestmentCard 
                  icon={Percent} 
                  title="Revenue Sharing"
                  description="Earn ongoing returns through revenue sharing agreements with projects, creating sustainable long-term value beyond equity."
                  color="from-blue-500 to-blue-400"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <InvestmentCard 
                  icon={Vote} 
                  title="Governance Power"
                  description="Vote on milestone completions and participate in project governance, ensuring accountability and transparency."
                  color="from-purple-500 to-purple-400"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <InvestmentCard 
                  icon={Layers} 
                  title="Curated Projects"
                  description="Access vetted projects building on Avalanche, with detailed information on teams, milestones, and token economics."
                  color="from-orange-500 to-orange-400"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <InvestmentCard 
                  icon={LineChart} 
                  title="Portfolio Analytics"
                  description="Track your investments, monitor project progress, and analyze performance with comprehensive analytics dashboards."
                  color="from-green-500 to-green-400"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <InvestmentCard 
                  icon={Clock} 
                  title="Early Access"
                  description="Get early access to promising projects in the Avalanche ecosystem before they reach wider markets or exchanges."
                  color="from-red-500 to-red-400"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Investment Plans */}
        <section className="container px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">Investment <span className="text-gradient">Plans</span></h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Choose the perfect plan to invest in Avalanche ecosystem projects with milestone-based funding.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Individual Investor */}
              <div className="glass rounded-xl border border-white/10 p-8 relative">
                <h3 className="text-2xl font-medium mb-2">Individual Investor</h3>
                <div className="text-gray-400 mb-6">Free</div>
                <p className="text-gray-300 mb-8">
                  Perfect for individual investors exploring Avalanche projects.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Invest in public projects</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Vote on milestones</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Basic portfolio tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Community access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
                
                <Button className="w-full" asChild>
                  <Link to="/investor-dashboard">
                    Start Investing
                  </Link>
                </Button>
              </div>
              
              {/* Angel Investor */}
              <div className="glass rounded-xl border border-primary/30 p-8 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <h3 className="text-2xl font-medium mb-2">Angel Investor</h3>
                <div className="text-gray-400 mb-6">2% fee/month</div>
                <p className="text-gray-300 mb-8">
                  For serious investors backing early-stage projects.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Early access to projects</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Milestone governance voting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Advanced portfolio analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Founder direct communication</span>
                  </li>
                </ul>
                
                <Button className="w-full button-gradient" asChild>
                  <Link to="/investor-dashboard">
                    Start Investing
                  </Link>
                </Button>
              </div>
              
              {/* Institutional */}
              <div className="glass rounded-xl border border-white/10 p-8 relative">
                <h3 className="text-2xl font-medium mb-2">Institutional</h3>
                <div className="text-gray-400 mb-6">Custom</div>
                <p className="text-gray-300 mb-8">
                  Enterprise-grade solutions for investment firms.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Custom investment terms</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Private deal flow access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Advanced milestone governance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>API integration</span>
                  </li>
                </ul>
                
                <Button className="w-full" asChild>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Process */}
        <section className="container px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">Investment <span className="text-gradient">Process</span></h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our streamlined process makes it easy to invest in promising Avalanche ecosystem projects.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass rounded-xl border border-white/10 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">1. Discover</h3>
                <p className="text-gray-300">
                  Browse through vetted projects in the Avalanche ecosystem and review detailed information.
                </p>
              </div>
              
              <div className="glass rounded-xl border border-white/10 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">2. Invest</h3>
                <p className="text-gray-300">
                  Connect your wallet and invest in projects you believe in with full transparency.
                </p>
              </div>
              
              <div className="glass rounded-xl border border-white/10 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center mx-auto mb-6">
                  <Vote className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">3. Govern</h3>
                <p className="text-gray-300">
                  Vote on milestone completions and participate in project governance decisions.
                </p>
              </div>
              
              <div className="glass rounded-xl border border-white/10 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center mx-auto mb-6">
                  <BadgeDollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">4. Earn</h3>
                <p className="text-gray-300">
                  Receive returns through revenue sharing and equity as projects grow and succeed.
                </p>
              </div>
            </div>
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
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                  How much can I invest?
                </h3>
                <p className="text-gray-300">
                  There's no minimum investment amount for most projects. Each project sets its own 
                  minimum contribution, which is clearly displayed on the project page. This allows 
                  investors of all sizes to participate in funding innovative Avalanche projects.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass rounded-xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                  How is my investment protected?
                </h3>
                <p className="text-gray-300">
                  Your investment is secured through our milestone-based funding model. Funds are held in 
                  smart contracts and only released when milestones are completed and verified by community 
                  governance. This ensures projects must deliver before receiving funding.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass rounded-xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                  How do I receive returns?
                </h3>
                <p className="text-gray-300">
                  Returns come in two forms: equity ownership and revenue sharing. Equity gives you 
                  ownership in the project, while revenue sharing provides ongoing returns as the 
                  project generates income. Both are managed through smart contracts for transparency.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass rounded-xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                  What wallets are supported?
                </h3>
                <p className="text-gray-300">
                  We support all major Avalanche-compatible wallets including Core Wallet, MetaMask, 
                  and other Web3 wallets that support the C-Chain. Simply connect your preferred wallet 
                  to start investing in projects on our platform.
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
                  Start Investing Today
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Join the Avalaunch community and discover innovative projects building the future of the Avalanche ecosystem.
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
                    <Link to="/investor-dashboard">
                      Investor Dashboard <BarChart3 className="ml-2 w-4 h-4" />
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

export default ForInvestors;
