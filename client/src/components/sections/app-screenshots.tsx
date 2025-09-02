import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { appScreenshots } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export function AppScreenshots() {
  const { toast } = useToast();
  
  const handleAppStore = () => {
    toast({
      title: "Coming Soon!",
      description: "BrandSafe mobile app will be available on the App Store soon.",
    });
  };
  
  const handleGooglePlay = () => {
    toast({
      title: "Coming Soon!",
      description: "BrandSafe mobile app will be available on Google Play soon.",
    });
  };
  
  const handlePricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleGetStarted = () => {
    toast({
      title: "Get Started!",
      description: "Starting your BrandSafe journey with 30 days free protection.",
    });
  };
  
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-2">BrandSafe app</p>
          <h2 className="text-3xl font-bold mb-4" data-testid="text-app-title">
            Have a look at what's inside the app.
          </h2>
        </div>
        
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full mb-12"
          data-testid="carousel-app-screenshots"
        >
          <CarouselContent>
            {appScreenshots.map((screenshot) => (
              <CarouselItem key={screenshot.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <img 
                    src={screenshot.image} 
                    alt={screenshot.alt}
                    className="w-full max-w-72 mx-auto rounded-2xl shadow-lg"
                    data-testid={`img-app-screenshot-${screenshot.id}`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4" data-testid="text-download-title">
            Download from both Android and iOS
          </h3>
          <p className="text-lg text-muted-foreground mb-6" data-testid="text-users-count">
            3 Million users and counting!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={handleAppStore}
              data-testid="button-app-store"
            >
              <i className="fab fa-apple text-xl" />
              <span>App Store</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={handleGooglePlay}
              data-testid="button-google-play"
            >
              <i className="fab fa-google-play text-xl" />
              <span>Google Play</span>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={handlePricing} data-testid="button-pricing-cta">
              Pricing
            </Button>
            <Button onClick={handleGetStarted} data-testid="button-get-started-cta">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
