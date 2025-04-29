import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import gsap from 'gsap';
import { Link } from 'wouter';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  image: string;
  color: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, image, color, delay }) => {
  return (
    <motion.div 
      className="h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className="h-full bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl duration-300">
        <div className={`p-1 ${color}`}>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white mr-3`}>
              <i className={icon}></i>
            </div>
            <h3 className="font-bold text-xl">{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            {description}
          </p>
          <Link href="/contact">
            <Button 
              variant="ghost" 
              className={`px-0 hover:bg-transparent text-${color.replace('bg-', '')} hover:text-${color.replace('bg-', '')}/80`}
            >
              <span>Saiba mais</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
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
      icon: "fas fa-laptop-code",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-primary",
      category: "Websites"
    },
    {
      title: "Lojas Virtuais",
      description: "E-commerces completos e integrados com sistemas de pagamento, aumentando suas vendas online.",
      icon: "fas fa-shopping-cart",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-secondary",
      category: "E-commerce"
    },
    {
      title: "Aplicativos",
      description: "Desenvolvimento de apps nativos para Android e iOS que oferecem experiências excepcionais.",
      icon: "fas fa-mobile-alt",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-accent",
      category: "Aplicativos"
    },
    {
      title: "Marketing Digital",
      description: "Estratégias de marketing que aumentam sua presença online e atraem clientes qualificados.",
      icon: "fas fa-bullhorn",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-primary-light",
      category: "Marketing"
    },
    {
      title: "Sistemas Personalizados",
      description: "Soluções sob medida para otimizar processos e melhorar a gestão do seu negócio.",
      icon: "fas fa-cogs",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-secondary-dark",
      category: "Websites"
    }
  ];

  const filteredServices = activeFilter === 'Todos' 
    ? services 
    : services.filter(service => service.category === activeFilter);

  return (
    <section ref={sectionRef} id="servicos" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="services-title text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
          <div className="services-divider w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="services-description text-muted-foreground max-w-2xl mx-auto">
            Soluções digitais completas para impulsionar o crescimento da sua empresa.
          </p>
        </div>
        
        {/* Service Categories */}
        <div className="filter-buttons flex justify-center mb-10 flex-wrap gap-2">
          {filters.map((filter, index) => (
            <Button
              key={index}
              variant={activeFilter === filter ? "default" : "outline"}
              className={`service-filter px-6 py-2 ${
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
        
        {/* Services Carousel */}
        <div className="relative mx-auto max-w-7xl px-8">
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
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
              <CarouselPrevious className="h-12 w-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white" />
            </div>
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
              <CarouselNext className="h-12 w-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white" />
            </div>
          </Carousel>
        </div>
        
        {/* View All Services CTA */}
        <div className="flex justify-center mt-12">
          <Link href="/services">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-full"
            >
              Ver Todos os Serviços
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
