"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Angel Investor",
    avatar: "/lovable-uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png",
    content: "BuildnFund's milestone-based funding has transformed how I invest in crypto projects. The transparency and accountability ensure I only fund projects that deliver on their promises.",
  },
  {
    name: "Michael Rodriguez",
    role: "Institutional Investor",
    avatar: "/lovable-uploads/1e2a48dc-059b-4919-a1ed-44685d771a32.png",
    content: "As an institutional investor, BuildnFund provides us with the governance tools we need to properly manage investments. The milestone voting system has significantly reduced our risk.",
  },
  {
    name: "Emily Watson",
    role: "Project Founder",
    avatar: "/lovable-uploads/5830bd79-3511-41dc-af6c-8db32d91fc2c.png",
    content: "Launching our project on BuildnFund helped us establish credibility and connect with serious investors. The milestone structure forced us to be disciplined about our development roadmap.",
  },
  {
    name: "David Kim",
    role: "Crypto Fund Manager",
    avatar: "/lovable-uploads/7cc724d4-3e14-4e7c-9e7a-8d613fde54d0.png",
    content: "BuildnFund has become our go-to platform for Avalanche ecosystem investments. The detailed analytics and milestone tracking help us make data-driven investment decisions.",
  },
  {
    name: "Lisa Thompson",
    role: "Retail Investor",
    avatar: "/lovable-uploads/86329743-ee49-4f2e-96f7-50508436273d.png",
    content: "I love how BuildnFund gives me a voice in project governance. Being able to vote on milestones makes me feel more connected to the projects I invest in.",
  },
  {
    name: "James Wilson",
    role: "DeFi Developer",
    avatar: "/lovable-uploads/a2c0bb3a-a47b-40bf-ba26-d79f2f9e741b.png",
    content: "The milestone system on BuildnFund is brilliant. It ensures developers stay accountable and investors get transparency. This is the future of crypto funding.",
  },
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
            Join the growing community of investors and founders on BuildnFund
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar} />
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
                      <AvatarImage src={testimonial.avatar} />
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