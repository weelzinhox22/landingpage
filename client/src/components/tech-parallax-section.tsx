import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

gsap.registerPlugin(ScrollTrigger);

const TechCard = ({ 
  icon, 
  name, 
  color, 
  index, 
  delayFactor = 0.1 
}: {
  icon: any;
  name: string;
  color: string;
  index: number;
  delayFactor?: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Descrições personalizadas para cada tecnologia
  const descriptions: {[key: string]: string} = {
    'React': 'Biblioteca JavaScript para interfaces de usuário rápidas e responsivas.',
    'Node.js': 'Ambiente JavaScript para backend eficiente e escalável.',
    'Vue.js': 'Framework progressivo para interfaces de usuário dinâmicas.',
    'Angular': 'Framework completo para aplicações web robustas.',
    'AWS': 'Plataforma de nuvem com serviços para aplicações modernas.',
    'GitHub': 'Controle de versão e colaboração para desenvolvimento.',
    'Docker': 'Containerização para deploy consistente de aplicações.',
    'Figma': 'Ferramenta de design de interfaces e prototipagem.'
  };

  const description = descriptions[name] || 'Tecnologia utilizada em projetos avançados para máximo desempenho.';

  return (
    <div
      className="tech-card-container perspective-1000 relative" 
      style={{
        perspective: '1000px',
        minHeight: '180px',
        cursor: 'pointer',
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5, 
          delay: index * delayFactor,
          type: "spring",
          stiffness: 100
        }}
        className="tech-card-flipper w-full h-full"
        style={{ 
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        onClick={handleFlip}
        whileHover={{ scale: 1.03 }}
      >
        {/* Frente do Card */}
        <div 
          className={`card-face-front flex flex-col items-center justify-center bg-gradient-to-br ${color} rounded-2xl p-6 shadow-xl border border-white/10 absolute w-full h-full`}
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            transform: 'rotateY(0deg)'
          }}
        >
          <div className="tech-icon text-5xl mb-4 z-10">
            <div className="text-3xl font-bold text-white">{name.charAt(0)}</div>
          </div>
          <h3 className="text-white font-bold text-xl z-10">{name}</h3>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -top-5 -left-5 w-20 h-20 bg-white/5 rounded-full"></div>
        </div>
        
        {/* Verso do Card */}
        <div 
          className={`card-face-back flex flex-col items-center justify-center bg-gray-800 rounded-2xl p-6 shadow-xl border border-white/10 absolute w-full h-full`}
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            transform: 'rotateY(180deg)'
          }}
        >
          <h3 className="text-white font-bold text-lg mb-3">{name}</h3>
          <p className="text-gray-300 text-sm text-center">
            {description}
          </p>
          <div className="mt-4 text-xs text-primary font-medium">Clique para voltar</div>
        </div>
      </motion.div>
    </div>
  );
};

// Simple function to create decorative elements
type FloatingElementProps = {
  delay: number;
  duration: number;
  x: string | number; 
  y: string | number;
  size: number;
  color: string;
};

const FloatingElement = ({ delay, duration, x, y, size, color }: FloatingElementProps) => {
  return (
    <motion.div
      className={`absolute z-10 rounded-full ${color}`}
      style={{ 
        x, 
        y, 
        width: size, 
        height: size,
        filter: 'blur(8px)'
      }}
      animate={{
        y: [y, typeof y === 'string' ? y : Number(y) - 20, y],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const TechParallaxSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // 3D effect variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = (e.clientX - rect.left - rect.width / 2) / 20;
      const newY = (e.clientY - rect.top - rect.height / 2) / 20;
      x.set(newX);
      y.set(-newY); // Invertido para efeito natural de inclinação
      setMousePosition({ x: newX, y: newY });
    }
  };

  const resetMouse = () => {
    x.set(0);
    y.set(0);
  };
  
  // Tecnologias com ícones e cores
  const technologies = [
    { name: 'React', icon: null, color: 'from-blue-500 to-cyan-400' },
    { name: 'Node.js', icon: null, color: 'from-green-500 to-green-600' },
    { name: 'Vue.js', icon: null, color: 'from-emerald-500 to-teal-600' },
    { name: 'Angular', icon: null, color: 'from-red-500 to-rose-600' },
    { name: 'AWS', icon: null, color: 'from-orange-400 to-amber-600' },
    { name: 'GitHub', icon: null, color: 'from-gray-700 to-gray-900' },
    { name: 'Docker', icon: null, color: 'from-blue-600 to-blue-800' },
    { name: 'Figma', icon: null, color: 'from-purple-500 to-violet-600' },
  ];
  
  // Simplified decorative elements
  
  // Parallax effect with GSAP
  useEffect(() => {
    if (sectionRef.current) {
      // Parallax effect for background
      gsap.to('.tech-bg-grid', {
        y: '-30%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
      
      // Parallax effect for floating icons (slower)
      gsap.to('.floating-icon', {
        y: '-15%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      });
      
      // Particles effect
      const particles = document.querySelectorAll('.tech-particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: -100 - (i % 3) * 50,
          x: (i % 2 === 0) ? 50 : -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true
          }
        });
      });
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
    >
      {/* 3D Parallax background */}
      <div className="absolute inset-0 overflow-hidden tech-bg-grid">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Glowing elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full filter blur-[80px]"></div>
        <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-[100px]"></div>
        
        {/* Floating decorative elements */}
        <div className="floating-elements">
          <FloatingElement delay={0} duration={5} x="10%" y="15%" size={60} color="bg-primary/30" />
          <FloatingElement delay={0.5} duration={7} x="85%" y="40%" size={80} color="bg-secondary/30" />
          <FloatingElement delay={1.2} duration={6} x="25%" y="75%" size={70} color="bg-accent/30" />
          <FloatingElement delay={2} duration={8} x="75%" y="20%" size={50} color="bg-primary/20" />
          <FloatingElement delay={1.5} duration={6.5} x="65%" y="70%" size={90} color="bg-secondary/20" />
          <FloatingElement delay={0.8} duration={7.5} x="15%" y="60%" size={40} color="bg-accent/20" />
        </div>
        
        {/* Particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className={`tech-particle absolute rounded-full bg-white/10 backdrop-blur-sm tech-particle-${i}`}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          ></div>
        ))}
      </div>
      
      {/* Content with 3D effect */}
      <div 
        ref={containerRef} 
        className="container mx-auto px-4 relative z-20 perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetMouse}
      >
        <motion.div
          className="max-w-6xl mx-auto text-center mb-16"
          style={{ 
            transformStyle: "preserve-3d",
            rotateX: y,
            rotateY: x
          }}
        >
          <motion.div
            className="inline-block py-2 px-4 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-primary/30"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ transform: "translateZ(40px)" }}
          >
            TECNOLOGIAS AVANÇADAS
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transform: "translateZ(60px)" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
              Stack Tecnológica
            </span>{" "}
            de Última Geração
          </motion.h2>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ transform: "translateZ(30px)" }}
          ></motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transform: "translateZ(20px)" }}
          >
            Dominamos as melhores tecnologias para criar produtos digitais inovadores. Nossa stack
            combina ferramentas modernas para performance, escalabilidade e experiências excepcionais.
          </motion.p>
        </motion.div>
        
        {/* 3D Tech cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 relative z-10">
          {technologies.map((tech, index) => (
            <TechCard 
              key={index}
              icon={tech.icon}
              name={tech.name}
              color={tech.color}
              index={index}
              delayFactor={0.1}
            />
          ))}
        </div>
        
        {/* Features section - Estilizado */}
        <motion.div 
          className="mt-24 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-primary/30 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full filter blur-[80px] z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-[80px] z-0"></div>
          
          <div className="relative z-10">
            {/* Title with glowing effect */}
            <div className="text-center mb-12">
              <div className="inline-block py-1 px-4 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-primary/30">
                DIFERENCIAIS
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-100 to-white">
                Por que nossas tecnologias se destacam
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
            </div>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Desempenho Excepcional", 
                  description: "Nossas soluções garantem velocidade e resposta instantânea, melhorando a experiência do usuário.",
                  delay: 0.1,
                  icon: "⚡",
                  color: "from-cyan-500 to-blue-600"
                },
                {
                  title: "Escalabilidade Garantida", 
                  description: "Arquitetura que suporta crescimento, de startups a grandes empresas.",
                  delay: 0.3,
                  icon: "📈",
                  color: "from-green-500 to-emerald-600"
                },
                {
                  title: "Segurança Avançada", 
                  description: "Implementamos as melhores práticas de segurança para proteger seus dados e usuários.",
                  delay: 0.5,
                  icon: "🔒",
                  color: "from-purple-500 to-indigo-600"
                },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="feature-card group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 + item.delay }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 h-full shadow-lg relative overflow-hidden group-hover:border-primary/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    
                    {/* Icon with styled container */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg text-2xl transform group-hover:rotate-12 transition-transform`}>
                      <span className="">{item.icon}</span>
                    </div>
                    
                    <h4 className="text-2xl font-bold mb-4 text-white">{item.title}</h4>
                    <p className="text-gray-300 text-lg">{item.description}</p>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
                    <div className="absolute top-8 right-8 w-4 h-4 bg-white/20 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Custom styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .bg-grid-pattern {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        
        .tech-card {
          height: 180px;
          transform-style: preserve-3d;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}} />
    </section>
  );
};

export default TechParallaxSection;