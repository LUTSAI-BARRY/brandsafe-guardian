import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-2">feedback</p>
          <h2 className="text-3xl font-bold mb-4" data-testid="text-testimonials-title">
            What people are talking about.
          </h2>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          data-testid="carousel-testimonials"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name} portrait`}
                      className="w-16 h-16 rounded-full mb-4 object-cover"
                      data-testid={`img-testimonial-${testimonial.id}`}
                    />
                    <p className="text-muted-foreground mb-4 flex-grow" data-testid={`text-testimonial-quote-${testimonial.id}`}>
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <div className="font-semibold" data-testid={`text-testimonial-name-${testimonial.id}`}>
                        — {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${testimonial.id}`}>
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
