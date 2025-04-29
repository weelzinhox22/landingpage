import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TechParallaxSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      const layers = sectionRef.current.querySelectorAll('.parallax-layer');
      
      layers.forEach((layer, i) => {
        const depth = i * 0.2;
        
        gsap.to(layer, {
          y: () => -300 * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true
          }
        });
      });
    }
  }, []);
  
  const techImages = [
    {
      src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      alt: 'Tecnologia de computação',
      position: 'left-[10%] top-[10%] w-32 h-32 md:w-40 md:h-40',
      rotation: -5
    },
    {
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      alt: 'Tecnologia de código',
      position: 'right-[15%] top-[20%] w-28 h-28 md:w-36 md:h-36',
      rotation: 8
    },
    {
      src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      alt: 'Realidade virtual',
      position: 'left-[20%] bottom-[15%] w-36 h-36 md:w-44 md:h-44',
      rotation: -7
    },
    {
      src: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      alt: 'Tecnologia de interfaces',
      position: 'right-[10%] bottom-[25%] w-32 h-32 md:w-40 md:h-40',
      rotation: 6
    },
    {
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      alt: 'Desenvolvimento web',
      position: 'left-[40%] top-[40%] w-28 h-28 md:w-32 md:h-32',
      rotation: 0
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white"
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-8 opacity-20"></div>
        <div className="parallax-layer absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-800 to-transparent"></div>
        </div>
        
        {/* Tech images */}
        {techImages.map((img, index) => (
          <div 
            key={index} 
            className={`parallax-layer absolute ${img.position} z-10`}
            style={{ transform: `rotate(${img.rotation}deg)` }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="rounded-lg shadow-2xl object-cover w-full h-full"
              />
              <div className="absolute inset-0 rounded-lg border border-white/20 bg-gradient-to-br from-primary/20 via-transparent to-secondary/30"></div>
            </motion.div>
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tecnologias <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Inovadoras</span>
          </motion.h2>
          
          <motion.div 
            className="h-1 w-20 bg-primary mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Utilizamos as tecnologias mais avançadas do mercado para entregar soluções de alta qualidade e desempenho excepcional.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {['React', 'Node.js', 'TypeScript', 'GSAP'].map((tech, i) => (
              <motion.div 
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg mb-3">
                  <div className="text-primary font-bold text-2xl">{tech.charAt(0)}</div>
                </div>
                <p className="font-medium">{tech}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Custom styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .bg-grid-white\/5 {
          background-color: rgba(255, 255, 255, 0.05);
        }
        .bg-grid-8 {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}} />
    </section>
  );
};

export default TechParallaxSection;