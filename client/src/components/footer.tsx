import { Link } from 'wouter';
import Logo from './ui/logo';

const Footer = () => {
  const services = [
    { label: "Criação de Sites", href: "/services#websites" },
    { label: "Lojas Virtuais", href: "/services#ecommerce" },
    { label: "Aplicativos Mobile", href: "/services#apps" },
    { label: "Marketing Digital", href: "/services#marketing" },
    { label: "Sistemas Personalizados", href: "/services#systems" }
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Quem Somos", href: "/about" },
    { label: "Portfólio", href: "/portfolio" },
    { label: "Planos", href: "/pricing" },
    { label: "Contato", href: "/contact" }
  ];

  const contactInfo = [
    {
      icon: "map-marker-alt",
      content: "Av. Tecnologia, 1000 - Centro\nSalvador - BA, 40000-000"
    },
    {
      icon: "phone-alt",
      content: "(71) 3333-4444"
    },
    {
      icon: "envelope",
      content: "contato@vwtech.com.br"
    },
    {
      icon: "clock",
      content: "Seg-Sex: 9h às 18h"
    }
  ];

  const socialMedia = [
    { icon: "facebook-f", url: "#" },
    { icon: "twitter", url: "#" },
    { icon: "instagram", url: "#" },
    { icon: "linkedin-in", url: "#" }
  ];

  return (
    <footer className="bg-neutral-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Logo monochrome size="md" />
            </div>
            <p className="text-gray-400 mb-6">
              Transformando ideias em soluções digitais de sucesso desde 2018.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((item, index) => (
                <a key={index} href={item.url} className="text-gray-400 hover:text-white transition-colors">
                  <i className={`fab fa-${item.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Serviços</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href}>
                    <a className="text-gray-400 hover:text-white transition-colors">
                      {service.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contato</h4>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <i className={`fas fa-${info.icon} mt-1 mr-3 text-gray-400`}></i>
                  <span className="text-gray-400">{info.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} VW Tech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
