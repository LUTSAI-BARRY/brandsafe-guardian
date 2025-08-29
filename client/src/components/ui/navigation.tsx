import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signInForm, setSignInForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({ name: "", email: "", password: "" });
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome back!",
      description: "Sign in functionality would connect to your backend here.",
    });
    setShowSignIn(false);
    setSignInForm({ email: "", password: "" });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account created!",
      description: "Your free 30-day trial has started. Welcome to BrandSafe!",
    });
    setShowSignUp(false);
    setSignUpForm({ name: "", email: "", password: "" });
  };

  const handleGetStarted = () => {
    setShowSignUp(true);
  };

  return (
    <nav className="fixed top-0 w-full bg-card/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Shield className="text-primary text-2xl" />
            <span className="text-xl font-bold text-foreground">BrandSafe</span>
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
            <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
              <DialogTrigger asChild>
                <Button variant="ghost" data-testid="button-signin">Sign In</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign In to BrandSafe</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInForm.email}
                      onChange={(e) => setSignInForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      data-testid="input-signin-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInForm.password}
                      onChange={(e) => setSignInForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      data-testid="input-signin-password"
                    />
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-signin-submit">
                    Sign In
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => { setShowSignIn(false); setShowSignUp(true); }}
                      className="text-primary hover:underline"
                    >
                      Sign up here
                    </button>
                  </p>
                </form>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
              <DialogTrigger asChild>
                <Button onClick={handleGetStarted} data-testid="button-get-started">Get Started Free</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start Your Free 30-Day Trial</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={signUpForm.name}
                      onChange={(e) => setSignUpForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      data-testid="input-signup-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpForm.email}
                      onChange={(e) => setSignUpForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      data-testid="input-signup-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signUpForm.password}
                      onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      data-testid="input-signup-password"
                    />
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-signup-submit">
                    Start Free Trial
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => { setShowSignUp(false); setShowSignIn(true); }}
                      className="text-primary hover:underline"
                    >
                      Sign in here
                    </button>
                  </p>
                </form>
              </DialogContent>
            </Dialog>
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
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start mb-2" 
                    onClick={() => { setIsOpen(false); setShowSignIn(true); }}
                    data-testid="mobile-button-signin"
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full" 
                    onClick={() => { setIsOpen(false); setShowSignUp(true); }}
                    data-testid="mobile-button-get-started"
                  >
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
