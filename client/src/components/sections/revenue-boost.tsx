import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function RevenueBoosting() {
  const benefits = [
    "Increase legitimate traffic by removing competing pirated content",
    "Protect brand reputation from counterfeit associations", 
    "Reduce customer confusion and lost sales"
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Reclaim Your Revenue</p>
            <h2 className="text-3xl font-bold mb-6" data-testid="text-revenue-title">
              BrandSafe will help you boost revenue, mitigate scams using your name & increase traffic by ensuring fans access your legitimate content first.
            </h2>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3" data-testid={`benefit-item-${index}`}>
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Check className="text-success-foreground text-xs" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            
            <Button size="lg" data-testid="button-get-started-revenue">
              Get Started
            </Button>
          </div>
          
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Analytics dashboard showing brand protection metrics" 
              className="rounded-xl shadow-lg w-full h-auto"
              data-testid="img-analytics-dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
