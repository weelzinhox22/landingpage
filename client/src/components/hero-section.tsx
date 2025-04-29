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
      
      <div className="container mx-auto px-4 z-20 relative">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Hero Content - com posicionamento absoluto para garantir que sempre apareça */}
          <div className="md:w-1/2 mb-12 md:mb-0 z-30 relative">
            <div className="bg-black/50 backdrop-blur-md p-6 md:p-8 rounded-lg border border-white/20 shadow-2xl">
              {/* Fixed and simplified content to avoid disappearing */}
              <div className="static text-box">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                  Transforme seu <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Negócio Digital</span> com Tecnologia de Ponta
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
                  Desenvolvemos soluções digitais customizadas que impulsionam resultados reais para sua empresa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="inline-block">
                    <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary/90 transition-colors">
                      Solicitar Orçamento
                    </button>
                  </a>
                  <a href="/services" className="inline-block">
                    <button className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/20 transition-all backdrop-blur-sm flex items-center">
                      Conheça Nossos Serviços
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero 3D Device Mockup */}
          <div ref={containerRef} className="md:w-1/2 flex justify-center perspective-[1200px]">
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
              whileInView={{ opacity: 1, z: 0 }}
              viewport={{ once: true }}
            >
              {/* Device Frame */}
              <div className="relative transform-gpu" style={{ transform: 'translateZ(20px)' }}>
                {/* Moldura do dispositivo */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl max-w-full md:max-w-md lg:max-w-lg border-[12px] border-gray-900 bg-gray-800">
                  {/* Tela */}
                  <div className="aspect-[9/16] w-full relative overflow-hidden">
                    {/* Gradiente na tela para efeito visual */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
                    
                    {/* Conteúdo do mockup */}
                    <div className="relative h-full w-full flex flex-col">
                      {/* Barra de status */}
                      <div className="flex justify-between items-center p-2 bg-gray-900">
                        <div className="text-white text-xs">9:41</div>
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                      </div>
                      
                      {/* UI da App */}
                      <div className="flex-1 bg-gray-800 relative overflow-hidden">
                        {/* Elementos de UI */}
                        <img 
                          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80" 
                          alt="Dashboard de aplicativo" 
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay de UI */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
                            <div className="w-36 h-2 bg-white/70 rounded-full mb-2"></div>
                            <div className="w-24 h-2 bg-white/50 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 3D Floating Elements - Mais modernos e relacionados a tecnologia */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary rounded-xl shadow-2xl flex items-center justify-center z-30"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, delay: 0.8, type: "spring", stiffness: 200 }}
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <div className="bg-white/10 backdrop-blur-md w-full h-full rounded-xl p-3">
                    <div className="bg-white/20 w-full h-3 rounded-full mb-2"></div>
                    <div className="bg-white/20 w-3/4 h-3 rounded-full mb-2"></div>
                    <div className="bg-white/20 w-1/2 h-3 rounded-full"></div>
                    <div className="absolute right-2 bottom-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-8 -left-8 w-20 h-20 bg-primary rounded-xl shadow-2xl overflow-hidden z-30"
                  initial={{ scale: 0, rotate: 20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, delay: 1.2, type: "spring", stiffness: 200 }}
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent"></div>
                  <div className="relative z-10 h-full w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/3 -right-10 w-16 h-16 bg-accent/80 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center z-20 overflow-hidden"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.5, type: "spring", stiffness: 150 }}
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-10 left-8 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center z-20 p-1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ duration: 0.7, delay: 1.8, type: "spring", stiffness: 150 }}
                  style={{ transform: 'translateZ(35px)' }}
                >
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full w-full h-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </motion.div>
                
                {/* Círculos decorativos de partículas */}
                <motion.div 
                  className="absolute -bottom-4 -left-20 w-6 h-6 bg-primary/50 rounded-full blur-sm"
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transform: 'translateZ(10px)' }}
                ></motion.div>
                
                <motion.div 
                  className="absolute top-10 -right-16 w-4 h-4 bg-secondary/50 rounded-full blur-sm"
                  animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  style={{ transform: 'translateZ(5px)' }}
                ></motion.div>
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