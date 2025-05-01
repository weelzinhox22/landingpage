import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './ui/logo';
import MobileMenu from '@/components/mobile-menu';
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';
import { useActiveSection, SectionId } from '@/hooks/use-active-section';

interface NavbarProps {
  onLoginClick: () => void;
}

// Item de navegação
type NavItem = {
  id: SectionId;
  href: string;
  fragment: string;
  label: string;
};

// Lista de itens de navegação
const NAV_ITEMS: NavItem[] = [
  { id: 'home', href: '/', fragment: '#home', label: 'Home' },
  { id: 'sobre', href: '/about', fragment: '#sobre', label: 'Quem Somos' },
  { id: 'servicos', href: '/services', fragment: '#servicos', label: 'Serviços' },
  { id: 'portfolio', href: '/portfolio', fragment: '#portfolio', label: 'Portfólio' },
  { id: 'planos', href: '/pricing', fragment: '#planos', label: 'Planos' },
  { id: 'contato', href: '/contact', fragment: '#contato', label: 'Contato' },
];

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useMobile();
  const [location] = useLocation();
  const activeSection = useActiveSection();

  // Efeito para detectar scroll e atualizar visual da navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Verificação inicial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determina se um item está ativo com base na rota ou seção
  const isActive = (id: SectionId): boolean => {
    // Caso especial e forçado para o item "contato"
    if (id === 'contato') {
      // Só está ativo se estiver na página de contato específica
      if (location === '/contact') {
        return true;
      }
      // Na página inicial, precisa ser explícito na checagem
      if (location === '/') {
        return activeSection === 'contato' && window.scrollY > window.innerHeight;
      }
      // Em todas as outras páginas, sempre inativo
      return false;
    }
    
    // Para os outros itens, lógica normal
    // Se estamos na home, usa activeSection para determinar baseado no scroll
    if (location === '/') {
      return activeSection === id;
    }
    
    // Para outras páginas, compara com a rota atual
    const item = NAV_ITEMS.find(item => item.id === id);
    if (!item) return false;
    
    return location === item.href;
  };

  // Manipula clique em links de navegação para scroll suave na home
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, fragment: string) => {
    if (location === '/' && fragment) {
      e.preventDefault();
      const element = document.querySelector(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (showMobileMenu) {
          setShowMobileMenu(false);
        }
      }
    }
  };

  // Return null instead of rendering the header to hide it completely
  return null;
};

export default Navbar; 