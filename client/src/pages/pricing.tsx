import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

interface Plan {
  id: number;
  name: string;
  price: string;
  features: string[];
}

export default function Pricing() {
  const [, setLocation] = useLocation();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/plans`);
      const data = await response.json();
      setPlans(data.plans || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
      // Fallback plans if API fails
      setPlans([
        {
          id: 1,
          name: "Bronze",
          price: "KES 499/month",
          features: [
            "Basic brand monitoring",
            "1 brand protected",
            "Weekly reports",
            "Email alerts",
            "Basic support"
          ]
        },
        {
          id: 2,
          name: "Silver",
          price: "KES 1999/month",
          features: [
            "Advanced brand monitoring",
            "Up to 3 brands",
            "Daily monitoring",
            "Priority alerts",
            "Real-time notifications",
            "Priority support",
            "Basic analytics"
          ]
        },
        {
          id: 3,
          name: "Gold",
          price: "KES 3999/month",
          features: [
            "Comprehensive brand protection",
            "Unlimited brands",
            "Real-time monitoring",
            "Advanced analytics",
            "Custom alerts",
            "24/7 premium support",
            "API access",
            "White-label options"
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = (planName: string) => {
    // Store selected plan in localStorage for signup flow
    localStorage.setItem("selectedPlan", planName);
    setLocation("/signup");
  };

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "bronze":
        return "🥉";
      case "silver":
        return "🥈";
      case "gold":
        return "🥇";
      default:
        return "📦";
    }
  };

  const isPopular = (planName: string) => planName.toLowerCase() === "silver";

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading pricing plans...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Protect Your Brand Online
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose the perfect plan to safeguard your brand's reputation across the internet. 
              From basic monitoring to comprehensive protection.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="px-4 py-2">
                <Check className="w-4 h-4 mr-2" />
                No setup fees
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Check className="w-4 h-4 mr-2" />
                Cancel anytime
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Check className="w-4 h-4 mr-2" />
                24/7 monitoring
              </Badge>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative transition-all duration-300 hover:shadow-xl ${
                    isPopular(plan.name) 
                      ? "border-primary shadow-lg scale-105" 
                      : "hover:scale-105"
                  }`}
                >
                  {isPopular(plan.name) && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className="text-4xl mb-4">{getPlanIcon(plan.name)}</div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-primary">
                      {plan.price}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="pt-6">
                    <Button 
                      className="w-full" 
                      size="lg"
                      variant={isPopular(plan.name) ? "default" : "outline"}
                      onClick={() => handleGetStarted(plan.name)}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
                  <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What happens if I cancel?</h3>
                  <p className="text-muted-foreground">Your monitoring will continue until the end of your billing period. No cancellation fees.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do you offer custom plans?</h3>
                  <p className="text-muted-foreground">Yes, we offer enterprise plans for large organizations. Contact us for more information.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
