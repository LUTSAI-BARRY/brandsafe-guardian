import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const { toast } = useToast();

  const handleSocialClick = (platform: string) => {
    toast({
      title: `Visit our ${platform}!`,
      description: `Follow BrandSafe on ${platform} for the latest updates.`,
    });
  };

  const handleFooterLink = (section: string) => {
    toast({
      title: `${section} Page`,
      description: `Navigate to ${section} section coming soon!`,
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="text-primary text-2xl" />
              <span className="text-xl font-bold">BrandSafe</span>
            </div>
            <p className="text-gray-400">
              Piracy Protection for Content Creators.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors" data-testid="footer-link-features">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors" data-testid="footer-link-pricing">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLink('API Docs')} className="hover:text-white transition-colors" data-testid="footer-link-api">
                  API Docs
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => handleFooterLink('About')} className="hover:text-white transition-colors" data-testid="footer-link-about">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('blog')} className="hover:text-white transition-colors" data-testid="footer-link-blog">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLink('Careers')} className="hover:text-white transition-colors" data-testid="footer-link-careers">
                  Careers
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => handleFooterLink('Privacy Policy')} className="hover:text-white transition-colors" data-testid="footer-link-privacy">
                  Privacy
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLink('Terms of Service')} className="hover:text-white transition-colors" data-testid="footer-link-terms">
                  Terms
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLink('DMCA Policy')} className="hover:text-white transition-colors" data-testid="footer-link-dmca">
                  DMCA
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 BrandSafe. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <button onClick={() => handleSocialClick('Twitter')} className="text-gray-400 hover:text-white transition-colors" data-testid="footer-social-twitter">
              <i className="fab fa-twitter"></i>
            </button>
            <button onClick={() => handleSocialClick('LinkedIn')} className="text-gray-400 hover:text-white transition-colors" data-testid="footer-social-linkedin">
              <i className="fab fa-linkedin"></i>
            </button>
            <button onClick={() => handleSocialClick('Instagram')} className="text-gray-400 hover:text-white transition-colors" data-testid="footer-social-instagram">
              <i className="fab fa-instagram"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
