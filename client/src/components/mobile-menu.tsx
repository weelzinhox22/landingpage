import { motion } from 'framer-motion';
import { Link } from 'wouter';

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  onLoginClick: () => void;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, onLoginClick, onClose }) => {
  const handleNavigation = () => {
    onClose();
  };

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };

  return (
    <motion.div
      className="fixed top-[60px] left-0 bottom-0 w-full md:hidden bg-white shadow-lg z-40"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex flex-col p-5 space-y-3">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className="font-medium text-lg text-foreground hover:text-primary py-3 border-b border-gray-100"
              onClick={handleNavigation}
            >
              {item.label}
            </a>
          </Link>
        ))}
        <button
          onClick={handleLoginClick}
          className="font-medium text-lg text-primary py-3 mt-2 text-left"
        >
          Login
        </button>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
