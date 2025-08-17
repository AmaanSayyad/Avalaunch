import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ExploreProjects = () => {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-32 pb-12"
      >
        <div className="max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-normal mb-4 tracking-tight text-left">
            <span className="text-white font-medium">
              Discover and Fund
            </span>
            <br />
            <span className="text-gradient">
              Avalanche Projects
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl text-left"
          >
            Browse innovative projects building on Avalanche. Invest with milestone-based funding to ensure transparency and accountability.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Button size="lg" className="button-gradient">
              Connect Wallet to Invest
            </Button>
            <Button size="lg" variant="outline" className="border-white/20" onClick={() => window.location.href = "/create-project"}>
              Submit Your Project <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <ProjectsGrid />
      
      {/* CTA Section */}
      <section className="container px-4 py-20 relative bg-black">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have a project idea for Avalanche?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Submit your project to BuildnFund and connect with investors who believe in the Avalanche ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="button-gradient" onClick={() => window.location.href = "/create-project"}>
              Submit Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20">
              Learn About Our Process
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ExploreProjects;
