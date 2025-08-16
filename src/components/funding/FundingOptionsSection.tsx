import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "../pricing/CardSpotlight";

const FundingTier = ({
  name,
  equity,
  description,
  features,
  isPopular,
  buttonText,
}: {
  name: string;
  equity: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}) => (
  <CardSpotlight className={`h-full ${isPopular ? "border-primary" : "border-white/10"} border-2`}>
    <div className="relative h-full p-6 flex flex-col">
      {isPopular && (
        <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          Recommended
        </span>
      )}
      <h3 className="text-xl font-medium mb-2 text-left">{name}</h3>
      <div className="mb-4 text-left">
        <span className="text-4xl font-bold">{equity}</span>
        <span className="text-gray-400"> equity</span>
      </div>
      <p className="text-gray-400 mb-6 text-left">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-300 text-left">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="button-gradient w-full">
        {buttonText} <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  </CardSpotlight>
);

export const FundingOptionsSection = () => {
  return (
    <section className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          Choose Your{" "}
          <span className="text-gradient font-medium">Funding Path</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Select the perfect funding strategy for your Avalanche ecosystem project with milestone-based equity offerings
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FundingTier
          name="Seed Stage"
          equity="5-10%"
          description="For early-stage projects with a working prototype or MVP"
          features={[
            "Up to 50,000 AVAX funding",
            "3-4 milestone structure",
            "Basic investor dashboard",
            "Community support",
            "Monthly progress updates"
          ]}
          buttonText="Apply for Seed Funding"
        />
        <FundingTier
          name="Growth Stage"
          equity="10-15%"
          description="For projects with traction seeking to scale their solution"
          features={[
            "Up to 200,000 AVAX funding",
            "4-6 milestone structure",
            "Advanced analytics dashboard",
            "Marketing support",
            "Investor networking events",
            "Technical advisory"
          ]}
          isPopular
          buttonText="Apply for Growth Funding"
        />
        <FundingTier
          name="Strategic Partnership"
          equity="Custom"
          description="For established projects seeking strategic investment"
          features={[
            "Custom funding structure",
            "Flexible milestone planning",
            "Ecosystem integration support",
            "Co-development opportunities",
            "Dedicated success manager",
            "Enterprise partnership access",
            "Cross-chain expansion support"
          ]}
          buttonText="Discuss Partnership"
        />
      </div>
    </section>
  );
};
