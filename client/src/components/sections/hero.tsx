import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Award, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function HeroSection() {
  const [brandName, setBrandName] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const { toast } = useToast();

  const generateScanResults = (brand: string) => {
    const brands = {
      "daraja plus": {
        infringements: 23,
        severity: "high",
        platforms: ["Facebook", "Instagram", "Twitter", "Website clones"],
        description: "Multiple fake social media accounts and counterfeit websites detected"
      },
      "royco": {
        infringements: 45,
        severity: "critical", 
        platforms: ["E-commerce sites", "Social media", "YouTube", "Blogs"],
        description: "Extensive counterfeiting across multiple platforms with fake product listings"
      },
      "absa": {
        infringements: 12,
        severity: "medium",
        platforms: ["Phishing sites", "Social media", "Mobile apps"],
        description: "Phishing attempts and fake banking apps detected"
      }
    };
    
    const normalizedBrand = brand.toLowerCase().trim();
    return brands[normalizedBrand as keyof typeof brands] || {
      infringements: Math.floor(Math.random() * 30) + 5,
      severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      platforms: ["Social media", "E-commerce", "Blogs", "Forums"].slice(0, Math.floor(Math.random() * 3) + 1),
      description: "Various brand infringements detected across digital platforms"
    };
  };

  const handleScan = async () => {
    if (!brandName.trim()) {
      toast({
        title: "Please enter a brand name",
        description: "Enter your brand name to scan for infringements",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    setScanResults(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const results = generateScanResults(brandName);
      setScanResults(results);
      setIsScanning(false);
      
      toast({
        title: "Scan completed!",
        description: `Found ${results.infringements} potential infringements for ${brandName}`,
      });
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-50";
      case "high": return "text-orange-600 bg-orange-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const handleGetStarted = () => {
    toast({
      title: "Get Started!",
      description: "Redirecting to registration...",
    });
    // In a real app, this would redirect to signup
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
            BrandSafe is the industry's most trusted and advanced brand protection service. 
            It safeguards your brand by identifying, monitoring, and removing counterfeit content and infringements.
          </p>
          
          <Button 
            size="lg" 
            className="text-lg font-semibold hover:scale-105 transition-all transform shadow-lg mb-12"
            onClick={handleGetStarted}
            data-testid="button-free-protection"
          >
            30 Days Free Protection
          </Button>
        </div>

        {/* Instant Check Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-brand">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center" data-testid="text-instant-check">
                Instant Check
              </h3>
              <p className="text-muted-foreground text-center mb-4" data-testid="text-check-description">
                Do you have any infringements?
              </p>
              <div className="flex space-x-2 mb-4">
                <Input
                  type="text"
                  placeholder="Enter your brand name (try: daraja plus, royco, absa)..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                  className="flex-1"
                  data-testid="input-brand-name"
                  disabled={isScanning}
                />
                <Button 
                  onClick={handleScan}
                  disabled={isScanning}
                  data-testid="button-scan-now"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    "Scan Now"
                  )}
                </Button>
              </div>
              
              {/* Scan Results */}
              {scanResults && (
                <Alert className={`mt-4 ${getSeverityColor(scanResults.severity)}`} data-testid="scan-results">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">
                          {scanResults.infringements} infringements found for "{brandName}"
                        </span>
                        <Badge variant={scanResults.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {scanResults.severity.toUpperCase()} RISK
                        </Badge>
                      </div>
                      <p className="text-sm">{scanResults.description}</p>
                      <div className="text-sm">
                        <span className="font-medium">Platforms detected: </span>
                        {scanResults.platforms.join(", ")}
                      </div>
                      <Button size="sm" className="mt-2" onClick={handleGetStarted}>
                        Start Free Protection
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {isScanning && (
                <div className="mt-4 text-center text-muted-foreground" data-testid="scanning-indicator">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                  <p>Scanning web for brand infringements...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
