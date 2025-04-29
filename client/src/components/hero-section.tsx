import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import gsap from 'gsap';
import { useMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        tl.from('.hero-title', { 
          opacity: 0, 
          y: 50, 
          duration: 0.8, 
          ease: 'power3.out'
        })
        .from('.hero-description', { 
          opacity: 0, 
          y: 30, 
          duration: 0.8, 
          ease: 'power3.out' 
        }, '-=0.4')
        .from('.hero-buttons', { 
          opacity: 0, 
          y: 30, 
          duration: 0.8, 
          ease: 'power3.out' 
        }, '-=0.4');
        
        if (imageRef.current) {
          gsap.from(imageRef.current, {
            opacity: 0,
            x: 100,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          });
        }
        
        // Create parallax effect for circles and blobs
        gsap.to('.hero-circle-1', {
          y: -50,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
        
        gsap.to('.hero-circle-2', {
          y: 50,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
        
        gsap.to('.hero-blob', {
          x: -30,
          y: 30,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }, heroRef);
      
      return () => ctx.revert();
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12"
    >
      {/* Background Pattern */}
      <div className="tech-pattern absolute inset-0 opacity-10"></div>
      
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-circle-1 absolute w-40 h-40 rounded-full bg-primary opacity-10 top-[10%] right-[5%] animate-pulse-slow"></div>
        <div className="hero-circle-2 absolute w-64 h-64 rounded-full bg-secondary opacity-10 bottom-[15%] left-[10%] animate-pulse-slow"></div>
        <div className="hero-blob absolute w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl -top-20 -right-20"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Hero Content */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h1 
              className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transforme seu <span className="text-primary">Negócio Digital</span> com Tecnologia de Ponta
            </motion.h1>
            <motion.p 
              className="hero-description text-lg md:text-xl text-muted-foreground mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Desenvolvemos soluções digitais customizadas que impulsionam resultados reais para sua empresa.
            </motion.p>
            <motion.div 
              className="hero-buttons flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md">
                  Solicitar Orçamento
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all">
                  Conheça Nossos Serviços
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <div ref={imageRef} className="md:w-1/2 flex justify-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80" 
                alt="Tecnologia digital avançada" 
                className="rounded-lg shadow-xl max-w-full md:max-w-md lg:max-w-lg object-cover h-auto animate-float z-10 relative"
              />
              <motion.div 
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary rounded-lg shadow-lg flex items-center justify-center z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </motion.div>
              <motion.div 
                className="absolute -top-6 -left-6 w-20 h-20 bg-primary rounded-lg shadow-lg flex items-center justify-center z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.2,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
