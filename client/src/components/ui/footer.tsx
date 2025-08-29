import { Shield } from "lucide-react";

export function Footer() {
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
                <a href="#features" className="hover:text-white transition-colors" data-testid="footer-link-features">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors" data-testid="footer-link-pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="footer-link-api">
                  API Docs
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="footer-link-about">
                  About
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors" data-testid="footer-link-blog">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="footer-link-careers">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="footer-link-privacy">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="footer-link-terms">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="footer-link-dmca">
                  DMCA
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 BrandSafe. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-social-twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-social-linkedin">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-social-instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
