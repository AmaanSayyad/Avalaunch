import { motion } from "framer-motion";
import { features } from "@/config/features";

export const FeaturesSection = () => {
  return (
    <section className="container px-4 py-24">
      {/* Header Section */}
      <div className="max-w-2xl mb-20">
        <h2 className="text-5xl md:text-6xl font-normal mb-6 tracking-tight text-left">
          How <span className="text-gradient">BuildnFund</span> Works
        </h2>
        <p className="text-lg md:text-xl text-gray-400 text-left">
          Our milestone-based equity funding platform ensures transparency, accountability, and successful project delivery for the Avalanche ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium">{feature.title}</h3>
              </div>
            </div>
            
            {/* Card Body */}
            <div className="p-6 flex-grow">
              <p className="text-gray-300 mb-6">
                {feature.description}
              </p>
              
              <div className="mt-auto">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-lg w-full h-auto border border-white/10"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};