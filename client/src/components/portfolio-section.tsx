import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Fallback image if the main one fails to load
  const fallbackImages = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  ][index % 6];

  const [imgSrc, setImgSrc] = useState(image);
  
  const handleImageError = () => {
    setImgSrc(fallbackImages);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="portfolio-item group cursor-pointer transform-gpu"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        rotateX, 
        rotateY,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-xl shadow-2xl border border-white/10 h-full">
        <div className="bg-gradient-to-br from-black/30 to-primary/10 absolute inset-0 opacity-50 z-10"></div>
        <img 
          src={imgSrc}
          alt={title} 
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          onError={handleImageError}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex flex-col justify-end z-20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="p-6 text-white transform-gpu" style={{ transform: "translateZ(40px)" }}>
            <motion.span 
              className="text-xs font-semibold uppercase tracking-wider bg-primary/80 text-white px-2 py-1 rounded mb-3 inline-block"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {category}
            </motion.span>
            <motion.h3 
              className="font-bold text-xl mb-2"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h3>
            <motion.p 
              className="text-sm text-gray-300 mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.p>
            <Link href={`/project/${title.toLowerCase().replace(/\s+/g, '-')}`}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  size="sm" 
                  className={`${ctaColor} hover:brightness-110 text-white rounded-lg shadow-lg`}
                  style={{ transform: "translateZ(60px)" }}
                >
                  Ver Projeto
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
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
        
        // Animate portfolio grid
        gsap.from(".portfolio-grid-container", {
          scrollTrigger: {
            trigger: ".filter-buttons-portfolio",
            start: "bottom 70%",
            toggleActions: "play none none none"
          },
          y: 50,
          opacity: 0,
          duration: 0.8
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  // Updated portfolio items with ensured working images
  const portfolioItems = [
    {
      title: "Website Corporativo",
      description: "Desenvolvimento de site institucional com design moderno e responsivo.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Websites",
      ctaColor: "bg-primary"
    },
    {
      title: "E-commerce de Moda",
      description: "Loja virtual completa com gestão de estoque e integrações de pagamento.",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "E-commerce",
      ctaColor: "bg-secondary"
    },
    {
      title: "Aplicativo de Delivery",
      description: "App para iOS e Android para entrega de alimentos com rastreamento em tempo real.",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Aplicativos",
      ctaColor: "bg-accent"
    },
    {
      title: "Sistema de Gestão",
      description: "Software completo para gerenciamento empresarial com módulos personalizados.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Websites",
      ctaColor: "bg-primary-light"
    },
    {
      title: "Marketplace Regional",
      description: "Plataforma que conecta vendedores locais a consumidores de forma intuitiva.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "E-commerce",
      ctaColor: "bg-secondary-dark"
    },
    {
      title: "Landing Page de Conversão",
      description: "Página otimizada para captura de leads com alta taxa de conversão.",
      image: "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Websites",
      ctaColor: "bg-accent"
    }
  ];

  const filteredItems = activeFilter === 'Todos' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 bg-gradient-to-b from-muted to-muted/50 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
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
              } rounded-full font-medium transition-colors shadow-md`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        
        {/* Portfolio Grid with 3D hover effect */}
        <motion.div 
          className="portfolio-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
        >
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
        </motion.div>
        
        <div className="text-center mt-12">
          <Link href="/portfolio">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all shadow-lg px-6 py-2.5">
              Ver todos os projetos
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Custom CSS for 3D effects */}
      <style dangerouslySetInnerHTML={{__html: `
        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }
      `}} />
    </section>
  );
};

export default PortfolioSection;
