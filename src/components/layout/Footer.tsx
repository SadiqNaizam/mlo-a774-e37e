import React from 'react';
import { Link } from 'react-router-dom';
import { AppWindow } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const linkStyles = "text-sm text-muted-foreground hover:text-primary transition-colors";

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1 pr-8">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <AppWindow className="h-6 w-6" />
              <span className="font-bold text-lg">Storefront Mirror</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted source for discovering great apps.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/app-listing" className={linkStyles}>Apps</Link></li>
              <li><Link to="/app-listing?category=games" className={linkStyles}>Games</Link></li>
              <li><Link to="/app-listing?filter=featured" className={linkStyles}>Featured</Link></li>
              <li><Link to="/app-listing?filter=top-free" className={linkStyles}>Top Free</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className={linkStyles}>About Us</Link></li>
              <li><Link to="/careers" className={linkStyles}>Careers</Link></li>
              <li><Link to="/press" className={linkStyles}>Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms-of-service" className={linkStyles}>Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className={linkStyles}>Privacy Policy</Link></li>
              <li><Link to="/contact" className={linkStyles}>Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Storefront Mirror, Inc. All rights reserved.
          </p>
          {/* Social media links could go here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;