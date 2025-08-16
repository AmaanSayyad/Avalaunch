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
    description: "Projects set clear milestones with specific deliverables. Funds are released only after each milestone is completed and approved by investors.",
    icon: <MilestoneIcon className="w-6 h-6" />,
    image: "/lovable-uploads/86329743-ee49-4f2e-96f7-50508436273d.png"
  },
  {
    title: "Community Governance",
    description: "Investors participate in milestone approval by voting. Funds are unlocked only when a majority of investors approve the milestone deliverables.",
    icon: <VoteIcon className="w-6 h-6" />,
    image: "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png"
  },
  {
    title: "Equity Ownership",
    description: "Invest in promising Avalanche projects and receive equity. Easily track your portfolio and project progress in a unified dashboard.",
    icon: <Wallet className="w-6 h-6" />,
    image: "/lovable-uploads/b6436838-5c1a-419a-9cdc-1f9867df073d.png"
  },
  {
    title: "Project Analytics",
    description: "Access detailed analytics on project progress, milestone completion, and funding to make informed investment decisions.",
    icon: <BarChart3 className="w-6 h-6" />,
    image: "/lovable-uploads/79f2b901-8a4e-42a5-939f-fae0828e0aef.png"
  },
  {
    title: "Avalanche Ecosystem",
    description: "Focused exclusively on Avalanche projects, with seamless Core.app integration to bring top projects to our platform.",
    icon: <Users className="w-6 h-6" />,
    image: "/lovable-uploads/a2c0bb3a-a47b-40bf-ba26-d79f2f9e741b.png"
  }
];