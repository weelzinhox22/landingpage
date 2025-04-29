import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import gsap from 'gsap';
import { Link } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode, 
  faShoppingCart, 
  faMobileAlt, 
  faBullhorn, 
  faCogs 
} from '@fortawesome/free-solid-svg-icons';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  image: string;
  color: string;
  delay: number;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, image, color, delay, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Image fallbacks in case the primary image fails
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
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5, transition: { type: "spring", stiffness: 500 } }
  };
  
  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3 } }
  };
  
  const textVariants = {
    initial: { y: 20, opacity: 0 },
    hover: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      } 
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      className="h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="h-full bg-white rounded-xl overflow-hidden shadow-xl transition-all hover:-translate-y-2 duration-300 border border-gray-50">
        <div className="relative group overflow-hidden">
          <div className={`absolute inset-0 ${color} opacity-30 z-0`}></div>
          <img 
            src={imgSrc} 
            alt={title} 
            className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
            onError={handleImageError}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
            variants={overlayVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            <motion.div 
              className="absolute bottom-0 left-0 p-4 text-white"
              variants={textVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
            >
              <motion.span 
                className="inline-block mb-2 text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-1 rounded"
                variants={textVariants}
              >
                {title.split(' ')[0]}
              </motion.span>
              <motion.p 
                className="text-sm text-white/90"
                variants={textVariants}
              >
                Clique para descobrir
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <motion.div 
              className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white mr-4 shadow-md`}
              variants={iconVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
            >
              {/* Renderiza o ícone FontAwesome correto baseado no nome do ícone simplificado */}
              {icon === 'laptop' && <FontAwesomeIcon icon={faLaptopCode} className="h-6 w-6" />}
              {icon === 'cart' && <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6" />}
              {icon === 'mobile' && <FontAwesomeIcon icon={faMobileAlt} className="h-6 w-6" />}
              {icon === 'bullhorn' && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 15.75v-3A8.967 8.967 0 0 1 17.214 8c-1.995-.55-4.122-.92-6.332-1.078C10.235 6.315 9.584 6 9 6H7.5C6.172 6 5.008 6.672 4.347 7.73m3.102 9.54a23.89 23.89 0 0 1 5.454 1.31A8.967 8.967 0 0 0 18 15.75v-3a8.967 8.967 0 0 0-.784-3.75l-.729.33-.73-.33" />
                </svg>
              )}
              {icon === 'cogs' && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.431l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </motion.div>
            <h3 className="font-bold text-xl">{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
            {description}
          </p>
          <Link href="/contact">
            <Button 
              variant="ghost" 
              className={`px-0 hover:bg-transparent text-${color.replace('bg-', '')} hover:text-${color.replace('bg-', '')}/80 group`}
            >
              <span>Saiba mais</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
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

  useEffect(() => {
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".services-title", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 50,
          opacity: 0,
          duration: 0.8
        });

        gsap.from(".services-divider", {
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

        gsap.from(".services-description", {
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

        gsap.from(".filter-buttons .service-filter", {
          scrollTrigger: {
            trigger: ".services-description",
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

  const services = [
    {
      title: "Criação de Sites",
      description: "Websites responsivos e otimizados para mecanismos de busca, garantindo maior visibilidade e conversão.",
      icon: "laptop",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-primary",
      category: "Websites"
    },
    {
      title: "Lojas Virtuais",
      description: "E-commerces completos e integrados com sistemas de pagamento, aumentando suas vendas online.",
      icon: "cart",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-secondary",
      category: "E-commerce"
    },
    {
      title: "Aplicativos",
      description: "Desenvolvimento de apps nativos para Android e iOS que oferecem experiências excepcionais.",
      icon: "mobile",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-accent",
      category: "Aplicativos"
    },
    {
      title: "Marketing Digital",
      description: "Estratégias de marketing que aumentam sua presença online e atraem clientes qualificados.",
      icon: "bullhorn",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-primary-light",
      category: "Marketing"
    },
    {
      title: "Sistemas Personalizados",
      description: "Soluções sob medida para otimizar processos e melhorar a gestão do seu negócio.",
      icon: "cogs",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-secondary-dark",
      category: "Websites"
    }
  ];

  const filteredServices = activeFilter === 'Todos' 
    ? services 
    : services.filter(service => service.category === activeFilter);

  return (
    <section ref={sectionRef} id="servicos" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      
      {/* Decorative shapes */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block text-primary font-semibold mb-2 bg-primary/10 px-3 py-1 rounded-full text-sm"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            O que oferecemos
          </motion.span>
          <motion.h2 
            className="services-title text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nossos <span className="text-primary">Serviços</span>
          </motion.h2>
          <motion.div 
            className="services-divider w-20 h-1 bg-secondary mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="services-description text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Soluções digitais completas para impulsionar o crescimento e transformação do seu negócio, combinando tecnologia avançada com design inspirador.
          </motion.p>
        </div>
        
        {/* Service Categories */}
        <motion.div 
          className="filter-buttons flex justify-center mb-10 flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filters.map((filter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            >
              <Button
                variant={activeFilter === filter ? "default" : "outline"}
                className={`service-filter px-6 py-2 ${
                  activeFilter === filter 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-foreground hover:bg-gray-100'
                } rounded-full font-medium transition-all`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Services Carousel */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto max-w-7xl px-4 md:px-8"
          >
            <Carousel className="w-full" 
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4">
                {filteredServices.map((service, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <ServiceCard
                        title={service.title}
                        description={service.description}
                        icon={service.icon}
                        image={service.image}
                        color={service.color}
                        delay={index}
                        index={index}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block absolute -left-4 top-1/2 transform -translate-y-1/2">
                <CarouselPrevious className="h-12 w-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-lg" />
              </div>
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                <CarouselNext className="h-12 w-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-lg" />
              </div>
            </Carousel>
            
            {/* Mobile pagination indicators */}
            <div className="flex justify-center mt-8 gap-2 md:hidden">
              {[...Array(Math.min(3, filteredServices.length))].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* View All Services CTA */}
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/services">
            <Button 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Ver Todos os Serviços
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "loop",
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
