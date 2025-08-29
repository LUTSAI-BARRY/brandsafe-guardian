import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/lib/data";

export function FeaturesSection() {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'success':
        return 'bg-success/10 text-success';
      case 'destructive':
        return 'bg-destructive/10 text-destructive';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'accent':
        return 'bg-accent/10 text-accent-foreground';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-2">app features</p>
          <h2 className="text-3xl font-bold mb-4" data-testid="text-features-title">
            What We Do For You.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow"
              data-testid={`card-feature-${index}`}
            >
              <CardContent className="p-8">
                <div className={`w-12 h-12 ${getColorClasses(feature.color)} rounded-lg flex items-center justify-center mb-6`}>
                  <i className={`${feature.icon} text-xl`} />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
