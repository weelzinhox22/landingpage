import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { Link } from 'wouter';

interface PortfolioItemProps {
  title: string;
  description: string;
  image: string;
  category: string;
  ctaColor: string;
  index: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ 
  title, 
  description, 
  image, 
  category, 
  ctaColor,
  index 
}) => {
  return (
    <motion.div 
      className="portfolio-item group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark to-transparent opacity-0 group-hover:opacity-80 transition-opacity flex items-end">
          <div className="p-6 text-white">
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-sm opacity-80 mb-4">{description}</p>
            <Link href="/portfolio">
              <Button size="sm" className={`${ctaColor} text-white rounded-lg`}>
                Ver Projeto
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Websites', 'E-commerce', 'Aplicativos'];

  useEffect(() => {
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".portfolio-title", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 50,
          opacity: 0,
          duration: 0.8
        });

        gsap.from(".portfolio-divider", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          width: 0,
          opacity: 0,
          duration: 0.8,
          delay: 0.2
        });

        gsap.from(".portfolio-description", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.4
        });

        gsap.from(".filter-buttons-portfolio .portfolio-filter", {
          scrollTrigger: {
            trigger: ".portfolio-description",
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const portfolioItems = [
    {
      title: "Website Corporativo",
      description: "Desenvolvimento de site institucional com design moderno e responsivo.",
      image: "https://images.unsplash.com/photo-1575586238819-970defb4105d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Websites",
      ctaColor: "bg-primary"
    },
    {
      title: "E-commerce de Moda",
      description: "Loja virtual completa com gestão de estoque e integrações de pagamento.",
      image: "https://images.unsplash.com/photo-1629643501837-4cafc2809664?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "E-commerce",
      ctaColor: "bg-secondary"
    },
    {
      title: "Aplicativo de Delivery",
      description: "App para iOS e Android para entrega de alimentos com rastreamento em tempo real.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Aplicativos",
      ctaColor: "bg-accent"
    },
    {
      title: "Sistema de Gestão",
      description: "Software completo para gerenciamento empresarial com módulos personalizados.",
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Websites",
      ctaColor: "bg-primary-light"
    },
    {
      title: "Marketplace Regional",
      description: "Plataforma que conecta vendedores locais a consumidores de forma intuitiva.",
      image: "https://images.unsplash.com/photo-1621111848501-8d3634f82336?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "E-commerce",
      ctaColor: "bg-secondary-dark"
    },
    {
      title: "Landing Page de Conversão",
      description: "Página otimizada para captura de leads com alta taxa de conversão.",
      image: "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Websites",
      ctaColor: "bg-accent"
    }
  ];

  const filteredItems = activeFilter === 'Todos' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 bg-muted relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="portfolio-title text-3xl md:text-4xl font-bold mb-4">Nosso Portfólio</h2>
          <div className="portfolio-divider w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="portfolio-description text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos e fizeram a diferença para nossos clientes.
          </p>
        </div>
        
        {/* Portfolio Filter */}
        <div className="filter-buttons-portfolio flex justify-center mb-10 flex-wrap gap-2">
          {filters.map((filter, index) => (
            <Button
              key={index}
              variant={activeFilter === filter ? "default" : "outline"}
              className={`portfolio-filter px-6 py-2 ${
                activeFilter === filter 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-foreground hover:bg-gray-100'
              } rounded-full font-medium transition-colors`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <PortfolioItem
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              category={item.category}
              ctaColor={item.ctaColor}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/contact">
            <Button className="bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md">
              Quero um projeto como estes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
