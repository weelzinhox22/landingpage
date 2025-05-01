import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import type { SectionId } from '@/hooks/use-active-section';

// Interface para um item de navegação
interface NavItem {
  id: SectionId;
  href: string;
  fragment: string;
  label: string;
}

// Props do componente MobileMenu
interface MobileMenuProps {
  navItems: NavItem[];
  activeSection: SectionId;
  onLoginClick: () => void;
  onClose: () => void;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, fragment: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  navItems, 
  activeSection, 
  onLoginClick, 
  onClose, 
  onNavigate 
}) => {
  const [location] = useLocation();

  // Determina se um item do menu está ativo
  const isActive = (id: SectionId): boolean => {
    // Caso especial para o item "contato"
    if (id === 'contato') {
      // Só está ativo na página de contato específica
      if (location === '/contact') {
        return true;
      }
      // Na home, verificação específica
      if (location === '/') {
        return activeSection === 'contato' && window.scrollY > window.innerHeight;
      }
      // Em outras páginas, nunca ativo
      return false;
    }
    
    // Na página inicial, usa o activeSection baseado no scroll
    if (location === '/') {
      return activeSection === id;
    }
    
    // Em outras páginas, verifica a rota atual
    const item = navItems.find(item => item.id === id);
    if (!item) return false;
    
    return location === item.href;
  };

  return (
    <motion.div
      className="fixed inset-0 top-[60px] md:hidden bg-white z-40 shadow-lg mobile-menu"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col h-full p-5 pt-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.id);
          
          return (
            <Link 
              key={item.id} 
              href={location === '/' ? item.fragment : item.href}
            >
              <a
                className={`flex items-center px-4 py-3 rounded-md font-medium text-base transition-colors duration-200 relative`}
                onClick={(e) => onNavigate(e, item.fragment)}
                aria-current={active ? 'page' : undefined}
              >
                {/* Indicador visual para item ativo */}
                {active && (
                  <motion.span
                    layoutId="mobileNavIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Texto do item */}
                <span className={`relative z-10 ${active ? 'text-primary font-semibold' : 'text-foreground'}`}>
                  {item.label}
                </span>
              </a>
            </Link>
          );
        })}
        
        <div className="mt-6 pt-6 border-t border-gray-100"></div>
        
        {/* Botão de Login */}
        <div className="pt-2">
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-1.5 px-5 py-3 bg-primary text-primary-foreground rounded-full"
            onClick={() => {
              onLoginClick();
              onClose();
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            <span className="font-medium text-sm">Login</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu; 