import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function GooglePartnership() {
  return (
    <section className="py-16 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-2">partnership</p>
        <h2 className="text-3xl font-bold mb-8" data-testid="text-trusted-google">
          Trusted By Google
        </h2>
        <p className="text-lg text-muted-foreground mb-8" data-testid="text-tcrp-description">
          The Trusted Copyright Removal Program (TCRP) is designed to enable
          high-volume submitters that send high quality notices to submit copyright removal
          requests on Google Search, Blogger, Docs...
        </p>
        
        <Card className="inline-block shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <i className="fab fa-google text-4xl text-primary" />
              <div className="text-left">
                <div className="font-bold text-lg" data-testid="text-official-member">
                  Official Member
                </div>
                <div className="text-muted-foreground" data-testid="text-google-program">
                  Google Trusted Copyright Removal Program
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <Button size="lg" data-testid="button-get-started-google">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
