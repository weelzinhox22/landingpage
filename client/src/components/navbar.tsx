import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './ui/logo';
import MobileMenu from './mobile-menu';
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useMobile();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Quem Somos' },
    { href: '/services', label: 'Serviços' },
    { href: '/portfolio', label: 'Portfólio' },
    { href: '/pricing', label: 'Planos' },
    { href: '/contact', label: 'Contato' }
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'bg-white bg-opacity-95 backdrop-blur-md shadow-sm' : 'bg-white bg-opacity-80 backdrop-blur-sm'} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center">
              <Logo />
            </a>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a className={`font-medium transition-colors ${
                    isActive(item.href) 
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}>
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
          )}

          {/* Login and Menu Button */}
          <div className="flex items-center space-x-3">
            {!isMobile && (
              <Button 
                variant="outline" 
                className="hidden md:block px-4 py-2 text-primary border-primary hover:bg-primary hover:text-white transition-all"
                onClick={onLoginClick}
              >
                Login
              </Button>
            )}
            {isMobile && (
              <Button
                variant="ghost"
                className="md:hidden text-foreground hover:text-primary focus:outline-none p-0"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-2xl"
                >
                  {showMobileMenu ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </>
                  )}
                </svg>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <MobileMenu 
            navItems={navItems} 
            onLoginClick={onLoginClick} 
            onClose={() => setShowMobileMenu(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
