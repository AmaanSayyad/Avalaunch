"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Michael Chen",
    role: "Angel Investor",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    content: "Avalaunch's milestone-based funding has transformed how I invest in crypto projects. The transparency and accountability ensure I only fund projects that deliver on their promises."
  },
  {
    name: "Sarah Johnson",
    role: "Avalanche Ecosystem Fund",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    content: "As an institutional investor, Avalaunch provides us with the governance tools we need to properly manage investments. The milestone voting system has significantly reduced our risk."
  },
  {
    name: "David Wilson",
    role: "Project Founder",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    content: "Launching our project on Avalaunch helped us establish credibility and connect with serious investors. The milestone structure forced us to be disciplined about our development roadmap."
  },
  {
    name: "Emily Zhang",
    role: "DeFi Developer",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    content: "The platform made it easy to showcase our technical milestones to investors. Being able to receive funding incrementally as we hit targets helped us manage our runway effectively."
  },
  {
    name: "James Rodriguez",
    role: "Blockchain Security Expert",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    content: "The escrow system for milestone-based funding is brilliantly implemented. It provides security for both investors and project teams while ensuring transparency throughout."
  },
  {
    name: "Lisa Thompson",
    role: "Investment Portfolio Manager",
    image: "https://avatars.githubusercontent.com/u/6789012?v=4",
    content: "Avalaunch has become our go-to platform for Avalanche ecosystem investments. The detailed analytics and milestone tracking help us make data-driven investment decisions."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 overflow-hidden bg-black">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-normal mb-4">Trusted by Investors & Founders</h2>
          <p className="text-muted-foreground text-lg">
            Join the growing community of investors and founders on Avalaunch
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-2`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;