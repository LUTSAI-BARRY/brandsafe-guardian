import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { instagramImages } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    message: ""
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.fullName || !contactForm.email || !contactForm.message) {
      toast({
        title: "Please fill all fields",
        description: "Name, email, and message are all required.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Message sent successfully!",
      description: `Thanks ${contactForm.fullName}! We'll get back to you within 24 hours.`,
    });
    setContactForm({ fullName: "", email: "", message: "" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast({
        title: "Please enter your email",
        description: "Email address is required for newsletter subscription.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Successfully subscribed!",
      description: "Welcome to BrandSafe newsletter! Check your email for confirmation.",
    });
    setNewsletterEmail("");
  };

  const handleSocialClick = (platform: string) => {
    toast({
      title: `Visit our ${platform}!`,
      description: `Follow BrandSafe on ${platform} for updates and tips.`,
    });
  };

  const handleInstagramFollow = () => {
    toast({
      title: "Follow us on Instagram!",
      description: "Get daily tips and updates from the BrandSafe community.",
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
      title: "Ready to protect your brand!",
      description: "Starting your free 30-day trial with BrandSafe.",
    });
  };

  return (
    <>
      {/* Contact Forms Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <p className="text-sm font-medium text-muted-foreground mb-2">contact</p>
                <h3 className="text-2xl font-bold mb-6" data-testid="text-contact-title">
                  Write message
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={contactForm.fullName}
                      onChange={(e) => setContactForm(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                      data-testid="input-contact-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      data-testid="input-contact-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      data-testid="textarea-contact-message"
                    />
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-submit-contact">
                    Submit Reply
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardContent className="p-8">
                <p className="text-sm font-medium text-muted-foreground mb-2">subscribe</p>
                <h3 className="text-2xl font-bold mb-6" data-testid="text-newsletter-title">
                  Our newsletter
                </h3>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="newsletterEmail">Email address</Label>
                    <Input
                      id="newsletterEmail"
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      data-testid="input-newsletter-email"
                    />
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-subscribe">
                    Subscribe
                  </Button>
                </form>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">Follow us on social media</p>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => handleSocialClick('Twitter')}
                      className="w-10 h-10 bg-muted text-muted-foreground rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      data-testid="link-social-twitter"
                    >
                      <i className="fab fa-twitter" />
                    </button>
                    <button 
                      onClick={() => handleSocialClick('LinkedIn')}
                      className="w-10 h-10 bg-muted text-muted-foreground rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      data-testid="link-social-linkedin"
                    >
                      <i className="fab fa-linkedin" />
                    </button>
                    <button 
                      onClick={() => handleSocialClick('Instagram')}
                      className="w-10 h-10 bg-muted text-muted-foreground rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      data-testid="link-social-instagram"
                    >
                      <i className="fab fa-instagram" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full mb-8"
            data-testid="carousel-instagram"
          >
            <CarouselContent>
              {instagramImages.map((image, index) => (
                <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <img 
                    src={image} 
                    alt={`Instagram post ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                    data-testid={`img-instagram-${index}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          <div className="text-center">
            <Button variant="outline" onClick={handleInstagramFollow} data-testid="button-follow-instagram">
              Follow us on Instagram
            </Button>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-2">Join BrandSafe</p>
          <h2 className="text-3xl font-bold mb-8" data-testid="text-join-title">
            Join BrandSafe and get your FIRST MONTH FREE!
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={handlePricing} data-testid="button-pricing-join">
              Pricing
            </Button>
            <Button onClick={handleGetStarted} data-testid="button-get-started-join">
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
