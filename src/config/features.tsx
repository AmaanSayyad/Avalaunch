import { ShieldCheck, Wallet, BarChart3, Users } from "lucide-react";

// Custom Milestone icon since it's not in lucide-react
function MilestoneIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
      <path d="M12 13v8" />
      <path d="M12 3v3" />
    </svg>
  );
}

// Custom Vote icon since it's not in lucide-react
function VoteIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 12 2 2 4-4" />
      <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
      <path d="M22 19H2" />
    </svg>
  );
}

export const features = [
  {
    title: "Milestone-Based Funding",
    description: "Projects define clear milestones with deliverables. Funds are released only when milestones are completed and approved by investors.",
    icon: <MilestoneIcon className="w-6 h-6" />,
    image: "/lovable-uploads/86329743-ee49-4f2e-96f7-50508436273d.png"
  },
  {
    title: "Community Governance",
    description: "Investors vote on milestone completion. Funds are released only when 50% or more investors approve the milestone deliverables.",
    icon: <VoteIcon className="w-6 h-6" />,
    image: "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png"
  },
  {
    title: "Equity Ownership",
    description: "Receive equity in promising Avalanche projects. Track your portfolio and project progress in a comprehensive dashboard.",
    icon: <Wallet className="w-6 h-6" />,
    image: "/lovable-uploads/b6436838-5c1a-419a-9cdc-1f9867df073d.png"
  },
  {
    title: "Project Analytics",
    description: "Detailed analytics on project progress, milestone completion rates, and funding statistics to help you make informed investment decisions.",
    icon: <BarChart3 className="w-6 h-6" />,
    image: "/lovable-uploads/79f2b901-8a4e-42a5-939f-fae0828e0aef.png"
  },
  {
    title: "Avalanche Ecosystem",
    description: "Exclusively focused on Avalanche projects, integrating with Core.app to bring the best projects to our funding platform.",
    icon: <Users className="w-6 h-6" />,
    image: "/lovable-uploads/a2c0bb3a-a47b-40bf-ba26-d79f2f9e741b.png"
  }
];