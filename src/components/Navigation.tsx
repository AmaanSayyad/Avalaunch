import { useState, useEffect } from "react";
import { Command, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { WalletButton } from "./wallet/WalletButton";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'testimonials') {
      const testimonialSection = document.querySelector('.animate-marquee');
      if (testimonialSection) {
        const yOffset = -100; // Offset to account for the fixed header
        const y = testimonialSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (sectionId === 'cta') {
      const ctaSection = document.querySelector('.button-gradient');
      if (ctaSection) {
        const yOffset = -100;
        const y = ctaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: "Explore Projects", href: "/explore", onClick: () => window.location.href = "/explore" },
    { name: "Create Project", href: "#create", onClick: () => scrollToSection('create') },
    { name: "Governance", href: "/governance", onClick: () => window.location.href = "/governance" },
    { name: "How It Works", href: "#features", onClick: () => scrollToSection('features') },
    { name: "For Investors", href: "#for-investors", onClick: () => scrollToSection('for-investors') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto h-20 px-6">
        <nav className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Command className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">Avalaunch</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center mr-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm hover:bg-white/5"
                onClick={() => window.location.href = "/investor-dashboard"}
              >
                Investor Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm hover:bg-white/5"
                onClick={() => window.location.href = "/founder-dashboard"}
              >
                Founder Dashboard
              </Button>
              <WalletButton 
                size="sm"
                variant="default"
                className="button-gradient"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="bg-white/5 border border-white/10 hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-black/95 backdrop-blur-xl border-l border-white/10">
                <div className="flex flex-col gap-6 mt-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <Command className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Avalaunch</span>
                  </div>
                  
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-gray-200 hover:text-white transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        if (item.onClick) {
                          item.onClick();
                        }
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                  
                  <div className="border-t border-white/10 my-4 pt-6 space-y-4">
                    <h3 className="text-sm text-gray-400 font-medium uppercase tracking-wider">Dashboards</h3>
                    <Button 
                      variant="ghost"
                      className="w-full justify-start px-0 hover:bg-transparent hover:text-white"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.location.href = "/investor-dashboard";
                      }}
                    >
                      Investor Dashboard
                    </Button>
                    <Button 
                      variant="ghost"
                      className="w-full justify-start px-0 hover:bg-transparent hover:text-white"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.location.href = "/founder-dashboard";
                      }}
                    >
                      Founder Dashboard
                    </Button>
                  </div>
                  
                  <div className="mt-auto pt-6">
                    <WalletButton 
                      variant="default"
                      className="button-gradient w-full"
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;