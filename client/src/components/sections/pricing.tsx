import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Starting your free trial!",
      description: "Redirecting to registration for your 30-day free trial.",
    });
  };

  const handleAgencies = () => {
    toast({
      title: "Agency Solutions",
      description: "Contact our sales team for custom agency pricing and features.",
    });
  };

  const handleStudios = () => {
    toast({
      title: "Studio Solutions", 
      description: "Contact our sales team for bulk studio licensing and management.",
    });
  };

  const features = [
    "Unlimited DMCA Takedowns",
    "Unlimited Google Delisting", 
    "Unlimited Self-Submissions",
    "Social Media Takedowns",
    "Auto-Takedowns",
    "3 Brand Names",
    "Email Reports",
    "Daily Scans"
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-2">Our rates</p>
          <h2 className="text-3xl font-bold mb-8" data-testid="text-pricing-title">
            Best value in the industry.
          </h2>
          
          <div className="inline-flex bg-muted rounded-lg p-1">
            <Button 
              variant={!isAnnual ? "secondary" : "ghost"}
              onClick={() => setIsAnnual(false)}
              className="px-4 py-2 rounded-md"
              data-testid="button-monthly"
            >
              Monthly
            </Button>
            <Button 
              variant={isAnnual ? "secondary" : "ghost"}
              onClick={() => setIsAnnual(true)}
              className="px-4 py-2 rounded-md"
              data-testid="button-annual"
            >
              Annual
            </Button>
          </div>
        </div>

        <Card className="border-2 border-primary rounded-2xl relative">
          <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
            Most Popular
          </Badge>
          
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4" data-testid="text-plan-name">Premium</h3>
              
              <div className="mb-4">
                <div className="text-5xl font-bold" data-testid="text-price-free">FREE</div>
                <div className="text-muted-foreground" data-testid="text-first-month">FIRST MONTH</div>
              </div>
              
              <div className="text-muted-foreground mb-2" data-testid="text-then-price">
                then {isAnnual ? '5,000 KES/yr' : '500 KES/mo'}
              </div>
              
              {isAnnual && (
                <div className="text-success font-semibold" data-testid="text-annual-savings">
                  6,000 KES value - 2 FREE MONTHS
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3" data-testid={`feature-item-${index}`}>
                  <Check className="text-success h-5 w-5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="w-full" onClick={handleGetStarted} data-testid="button-get-started-free">
              Get Started For Free
            </Button>
            
            <p className="text-center text-muted-foreground text-sm mt-4" data-testid="text-no-commitments">
              No commitments, cancel anytime.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4" data-testid="text-agency-studio">
            Are You An Agency or a Studio?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={handleAgencies} data-testid="button-for-agencies">
              For Agencies
            </Button>
            <Button variant="outline" onClick={handleStudios} data-testid="button-for-studios">
              For Studios  
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
