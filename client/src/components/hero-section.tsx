import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import gsap from 'gsap';
import { useMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  
  // 3D Effect for mouse movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    }
  };

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
        
        // Create parallax effect for floating elements
        gsap.to('.hero-shape-1', {
          y: -50,
          rotation: 15,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
        
        gsap.to('.hero-shape-2', {
          y: 30,
          rotation: -10,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
        
        gsap.to('.hero-shape-3', {
          y: -30,
          x: 30,
          rotation: 5,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
        
        // Animate code fragments
        gsap.to('.code-fragment-1', {
          y: -40,
          opacity: 0.8,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        
        gsap.to('.code-fragment-2', {
          y: 40,
          opacity: 0.7,
          duration: 13,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5
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
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      {/* Hero Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        filter: 'blur(8px) brightness(0.3)'
      }}></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-primary/30"></div>
      
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-shape-1 absolute w-40 h-40 rounded-full bg-primary/20 backdrop-blur-md top-[15%] right-[10%] animate-pulse-slow"></div>
        <div className="hero-shape-2 absolute w-64 h-64 rounded-full bg-secondary/20 backdrop-blur-md bottom-[20%] left-[5%] animate-pulse-slow"></div>
        <div className="hero-shape-3 absolute w-72 h-72 bg-accent/10 backdrop-blur-md rounded-full -top-20 -right-20"></div>
        
        {/* Floating Code Fragments */}
        <div className="code-fragment-1 absolute top-[30%] right-[25%] opacity-30 z-10 hidden md:block">
          <pre className="text-xs text-green-400 font-mono bg-black/50 backdrop-blur-sm p-2 rounded">
            {`<div className="3d-animation">`}<br/>
            &nbsp;&nbsp;{`{renderTechSolution()}`}<br/>
            {`</div>`}
          </pre>
        </div>
        <div className="code-fragment-2 absolute bottom-[35%] left-[15%] opacity-30 z-10 hidden md:block">
          <pre className="text-xs text-cyan-400 font-mono bg-black/50 backdrop-blur-sm p-2 rounded">
            {`const transform = () => {`}<br/>
            &nbsp;&nbsp;{`return business.digital();`}<br/>
            {`}`}
          </pre>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Hero Content */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h1 
              className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transforme seu <span className="text-primary">Negócio Digital</span> com Tecnologia de Ponta
            </motion.h1>
            <motion.p 
              className="hero-description text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
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
                <Button size="lg" className="bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg">
                  Solicitar Orçamento
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white rounded-lg font-medium hover:bg-white/20 transition-all backdrop-blur-sm">
                  Conheça Nossos Serviços
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Hero 3D Image */}
          <div ref={containerRef} className="md:w-1/2 flex justify-center perspective-[1000px]">
            <motion.div 
              ref={imageRef}
              className="relative"
              style={{
                rotateX: !isMobile ? rotateX : 0,
                rotateY: !isMobile ? rotateY : 0,
                transformStyle: "preserve-3d"
              }}
              initial={{ opacity: 0, z: -50 }}
              animate={{ opacity: 1, z: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative transform-gpu" style={{ transform: 'translateZ(20px)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80" 
                  alt="Tecnologia digital avançada" 
                  className="rounded-xl shadow-2xl max-w-full md:max-w-md lg:max-w-lg object-cover h-auto z-10 relative border-2 border-white/20 backdrop-blur-sm"
                />
                
                {/* 3D Floating Elements */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary rounded-xl shadow-2xl flex items-center justify-center z-30"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.8,
                    type: "spring",
                    stiffness: 200
                  }}
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-6 -left-6 w-20 h-20 bg-primary rounded-xl shadow-2xl flex items-center justify-center z-30"
                  initial={{ scale: 0, rotate: 20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 1.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 -right-12 w-16 h-16 bg-accent rounded-xl shadow-2xl flex items-center justify-center z-20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 1.5,
                    type: "spring",
                    stiffness: 150
                  }}
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-12 left-12 w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-center z-20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 1.8,
                    type: "spring", 
                    stiffness: 150
                  }}
                  style={{ transform: 'translateZ(35px)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CSS classes for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.6; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }
        `
      }} />
    </section>
  );
};

export default HeroSection;
