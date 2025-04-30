import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from 'wouter';
import { Laptop, ShoppingCart, Smartphone, Megaphone, Settings, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: keyof typeof icons;
  image: string;
  color: string;
  delay: number;
  index: number;
}

const icons = {
  laptop: Laptop,
  cart: ShoppingCart,
  mobile: Smartphone,
  megaphone: Megaphone,
  settings: Settings,
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, iconName, image, color, delay, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const fallbackImages = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
    "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  ];

  const [imgSrc, setImgSrc] = useState(image);
  
  const handleImageError = () => {
    setImgSrc(fallbackImages[index % fallbackImages.length]);
  };
  
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.15, rotate: 8, transition: { type: "spring", stiffness: 400, damping: 15 } }
  };
  
  const overlayVariants = {
    initial: { opacity: 0, backdropFilter: 'blur(0px)' },
    hover: { 
      opacity: 1, 
      backdropFilter: 'blur(4px)',
      transition: { duration: 0.4, ease: 'easeOut' } 
    }
  };
  
  const textVariants = {
    initial: { y: 15, opacity: 0 },
    hover: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.3,
        delay: 0.1,
        staggerChildren: 0.08
      } 
    }
  };
  
  const IconComponent = icons[iconName];

  return (
    <motion.div 
      ref={cardRef}
      className="h-full group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: delay * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="h-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1.5 duration-300 border border-gray-100/80">
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 ${color} opacity-20 z-0`}></div>
          <img 
            src={imgSrc} 
            alt={title} 
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
          />
          {/* Overlay Principal */}
          <motion.div 
            className="absolute inset-0" // Removido gradient, mix-blend, animate-gradient etc daqui
            variants={overlayVariants} // Anima opacidade e blur geral
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            {/* Gradiente Animado (camada separada) */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-primary/70 via-secondary/50 to-accent/60 animate-gradient-shift opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                backgroundSize: "250% 250%",
                backgroundPosition: "0% 0%",
              }}
            />
             {/* Camada Escura para Contraste */}
             <motion.div 
               className="absolute inset-0 bg-black transition-opacity duration-300"
               initial={{ opacity: 0.10 }} // Opacidade inicial baixa
               animate={{ opacity: isHovered ? 0.50 : 0.10 }} // Opacidade maior no hover
             />
            
            {/* Conteúdo de Texto (sobre as camadas de fundo) */}
            <motion.div 
              className="absolute bottom-0 left-0 p-4 text-white w-full z-10" // Adicionado z-10 para garantir que fique acima
              variants={textVariants} // Anima o texto (y e opacidade)
              // initial e animate já controlados pelo pai (overlayVariants)
            >
              <motion.span 
                className="inline-block mb-1 text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm" // Aumentado bg-black/50 e adicionado shadow
                variants={textVariants} // Herdando animação com stagger
              >
                {title.split(' ')[0]}
              </motion.span>
              <motion.p 
                className="text-sm font-medium text-white shadow-sm" // Mantido text-white e adicionado shadow
                variants={textVariants} // Herdando animação com stagger
              >
                Clique para saber mais
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
        <div className="p-5">
          <div className="flex items-center mb-3">
            <motion.div 
              className={`w-11 h-11 rounded-lg ${color} flex items-center justify-center text-white mr-3 shadow-md`}
              variants={iconVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
            >
              {IconComponent && <IconComponent className="w-5 h-5" />}
            </motion.div>
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-5 line-clamp-3">
            {description}
          </p>
          <Link href={`/project-detail?service=${encodeURIComponent(title)}`} className="inline-block">
            <Button 
              variant="ghost" 
              className={`px-0 py-1 h-auto hover:bg-transparent text-${color.replace('bg-', '')} hover:text-${color.replace('bg-', '')}/80 group/link flex items-center gap-1.5`}
            >
              <span className="font-medium text-sm">Saiba mais</span>
              <motion.div
                 initial={{ x: 0 }}
                 animate={isHovered ? { x: 3 } : { x: 0 }}
                 transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
              </motion.div>
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const filters = ['Todos', 'Websites', 'E-commerce', 'Aplicativos', 'Marketing'];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const headerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };
  
  const filterButtonContainerVariants = {
     hidden: { opacity: 0 },
     visible: {
       opacity: 1,
       transition: { staggerChildren: 0.08 }
     }
  };
  
  const filterButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 10 }
    }
  };

  const services = [
    {
      title: "Criação de Sites",
      description: "Websites responsivos e otimizados para mecanismos de busca, garantindo maior visibilidade e conversão.",
      iconName: "laptop",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-primary",
      category: "Websites"
    },
    {
      title: "Lojas Virtuais",
      description: "E-commerces completos e integrados com sistemas de pagamento, aumentando suas vendas online.",
      iconName: "cart",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-secondary",
      category: "E-commerce"
    },
    {
      title: "Aplicativos",
      description: "Desenvolvimento de apps nativos para Android e iOS que oferecem experiências excepcionais.",
      iconName: "mobile",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-accent",
      category: "Aplicativos"
    },
    {
      title: "Marketing Digital",
      description: "Estratégias de marketing que aumentam sua presença online e atraem clientes qualificados.",
      iconName: "megaphone",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-accent",
      category: "Marketing"
    },
    {
      title: "Sistemas Personalizados",
      description: "Soluções sob medida para otimizar processos e melhorar a gestão do seu negócio.",
      iconName: "settings",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-secondary",
      category: "Websites"
    }
  ];

  const filteredServices = activeFilter === 'Todos' 
    ? services 
    : services.filter(service => service.category === activeFilter);

  return (
    <motion.section 
      ref={sectionRef} 
      id="servicos" 
      className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white/80"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 -z-10 opacity-50">
        <svg className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
          <defs>
            <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
        </svg>
      </div>
      <motion.div 
        className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: '0.5s' }}
      />
      <motion.div 
        className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" 
        style={{ animationDelay: '1s' }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <motion.span 
            className="inline-block text-primary font-semibold mb-3 bg-primary/10 px-3 py-1 rounded-full text-sm"
            variants={headerItemVariants}
          >
            O que oferecemos
          </motion.span>
          <motion.h2 
            className="services-title text-4xl md:text-5xl font-bold mb-4"
             variants={headerItemVariants}
          >
            Nossos <span className="text-primary">Serviços Digitais</span>
          </motion.h2>
          <motion.div 
            className="services-divider w-20 h-1 bg-secondary mx-auto mb-6"
             variants={headerItemVariants}
             initial={{ scaleX: 0, opacity: 0 }}
             whileInView={{ scaleX: 1, opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
             style={{ transformOrigin: 'center' }}
          ></motion.div>
          <motion.p 
            className="services-description text-muted-foreground max-w-2xl mx-auto text-lg"
             variants={headerItemVariants}
          >
            Soluções digitais completas para impulsionar o crescimento e a transformação do seu negócio, combinando tecnologia de ponta com design inspirador.
          </motion.p>
        </div>
        
        <motion.div 
          className="filter-buttons flex justify-center mb-12 flex-wrap gap-3"
          variants={filterButtonContainerVariants}
        >
          {filters.map((filter) => (
            <motion.div
              key={filter}
              variants={filterButtonVariants}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={activeFilter === filter ? "default" : "outline"}
                className={`service-filter px-5 py-2 text-sm ${
                  activeFilter === filter 
                    ? 'bg-primary text-white shadow-md hover:bg-primary/90' 
                    : 'bg-white text-foreground hover:bg-gray-100 border-gray-300'
                } rounded-full font-medium transition-all duration-200`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative mx-auto max-w-7xl px-0 md:px-4"
          >
            <Carousel className="w-full" 
              opts={{
                align: "start",
                loop: filteredServices.length > 2,
              }}
            >
              <CarouselContent className="-ml-4">
                {filteredServices.map((service, index) => (
                  <CarouselItem key={service.title} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <ServiceCard
                        title={service.title}
                        description={service.description}
                        iconName={service.iconName as keyof typeof icons}
                        image={service.image}
                        color={service.color}
                        delay={index}
                        index={index}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:hidden flex gap-4">
                  <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-md" />
                  <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-md" />
               </div>
               <div className="hidden md:block absolute -left-4 lg:-left-8 top-1/2 transform -translate-y-1/2">
                  <CarouselPrevious className="h-11 w-11 rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300 shadow-lg" />
               </div>
               <div className="hidden md:block absolute -right-4 lg:-right-8 top-1/2 transform -translate-y-1/2">
                  <CarouselNext className="h-11 w-11 rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300 shadow-lg" />
               </div>
            </Carousel>
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className="flex justify-center mt-20 md:mt-16"
          variants={headerItemVariants}
        >
         <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link href="/services">
            <Button 
              size="lg"
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-base md:text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 group flex items-center gap-2"
            >
              Ver Todos os Serviços
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
         </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
