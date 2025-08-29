import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

export function HeroSection() {
  const [brandName, setBrandName] = useState("");

  const handleScan = () => {
    if (brandName.trim()) {
      // TODO: Implement scan functionality
      console.log("Scanning brand:", brandName);
    }
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-background to-muted" id="hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="inline-flex items-center px-4 py-2 mb-6" data-testid="badge-award">
            <Award className="mr-2 h-4 w-4" />
            Most Trusted. Award Winning.
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Piracy Protection for{" "}
            <span className="gradient-text">Content Creators</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
            BranditScan is the industry's most trusted and advanced brand protection service. 
            It safeguards your brand by identifying, monitoring, and removing counterfeit content and infringements.
          </p>
          
          <Button 
            size="lg" 
            className="text-lg font-semibold hover:scale-105 transition-all transform shadow-lg mb-12"
            data-testid="button-free-protection"
          >
            30 Days Free Protection
          </Button>
        </div>

        {/* Instant Check Section */}
        <div className="max-w-md mx-auto">
          <Card className="shadow-brand">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center" data-testid="text-instant-check">
                Instant Check
              </h3>
              <p className="text-muted-foreground text-center mb-4" data-testid="text-check-description">
                Do you have any infringements?
              </p>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter your brand name..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="flex-1"
                  data-testid="input-brand-name"
                />
                <Button 
                  onClick={handleScan}
                  data-testid="button-scan-now"
                >
                  Scan Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
