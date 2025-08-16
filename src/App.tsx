import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Index from "./pages/Index";
import ExploreProjects from "./pages/ExploreProjects";
import ProjectDetail from "./pages/ProjectDetail";
import InvestorDashboard from "./pages/InvestorDashboard";
import FounderDashboard from "./pages/FounderDashboard";
import FounderProjectsList from "./pages/FounderProjectsList";
import Governance from "./pages/Governance";
import CreateProject from "./pages/CreateProject";
import { config } from "./WalletConnect";
import { WagmiProvider } from "wagmi";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/explore" element={<ExploreProjects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route
                  path="/investor-dashboard"
                  element={<InvestorDashboard />}
                />
                <Route
                  path="/founder-dashboard"
                  element={<FounderProjectsList />}
                />
                <Route
                  path="/founder-dashboard/project/:id"
                  element={<FounderDashboard />}
                />
                <Route path="/governance" element={<Governance />} />
                <Route path="/create-project" element={<CreateProject />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
