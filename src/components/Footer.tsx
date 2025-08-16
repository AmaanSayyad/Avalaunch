import { Github, Twitter } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-20">
      <div className="container px-4">
        <div className="glass glass-hover rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Avalaunch</h3>
              <p className="text-sm text-muted-foreground">
                Empowering the Avalanche ecosystem with milestone-based equity funding.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Explore Projects
                  </a>
                </li>
                <li>
                  <a href="#create" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Submit Project
                  </a>
                </li>
                <li>
                  <a href="#governance" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Governance
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Investor Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Founder Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Milestone Best Practices
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Rezaul Arif. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;