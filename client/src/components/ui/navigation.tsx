import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-card/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Shield className="text-primary text-2xl" />
            <span className="text-xl font-bold text-foreground">BranditScan</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="nav-features"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="nav-pricing"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="nav-testimonials"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="nav-faq"
            >
              FAQ
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" data-testid="button-signin">Sign In</Button>
            <Button data-testid="button-get-started">Get Started Free</Button>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-left text-muted-foreground hover:text-primary transition-colors"
                  data-testid="mobile-nav-features"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-left text-muted-foreground hover:text-primary transition-colors"
                  data-testid="mobile-nav-pricing"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-left text-muted-foreground hover:text-primary transition-colors"
                  data-testid="mobile-nav-testimonials"
                >
                  Testimonials
                </button>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-left text-muted-foreground hover:text-primary transition-colors"
                  data-testid="mobile-nav-faq"
                >
                  FAQ
                </button>
                <div className="pt-4 border-t border-border">
                  <Button variant="ghost" className="w-full justify-start mb-2" data-testid="mobile-button-signin">
                    Sign In
                  </Button>
                  <Button className="w-full" data-testid="mobile-button-get-started">
                    Get Started Free
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
