import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Componente de card de tecnologia simplificado (sem efeito de flip)
const TechCard = ({ 
  name, 
  color, 
  index, 
  description,
  delayFactor = 0.1 
}: {
  name: string;
  color: string;
  index: number;
  description: string;
  delayFactor?: number;
}) => {
  return (
    <motion.div
      className="tech-card-container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * delayFactor, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-xl border border-white/10 h-full flex flex-col`}>
        {/* Ícone simples */}
        <div className="tech-icon text-4xl mb-4 bg-white/10 w-14 h-14 rounded-lg flex items-center justify-center">
          <div className="text-2xl font-bold text-white">{name.charAt(0)}</div>
        </div>
        
        <h3 className="text-white font-bold text-xl mb-3">{name}</h3>
        
        <p className="text-gray-200 text-sm mt-2">
          {description}
        </p>
        
        {/* Elemento decorativo simples */}
        <div className="absolute bottom-2 right-2 w-20 h-20 bg-white/5 rounded-full -z-10"></div>
      </div>
    </motion.div>
  );
};

const TechParallaxSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Tecnologias com cores e descrições
  const technologies = [
    { 
      name: 'React', 
      color: 'from-blue-500 to-cyan-400',
      description: 'Biblioteca JavaScript para interfaces de usuário rápidas e responsivas.'
    },
    { 
      name: 'Node.js', 
      color: 'from-green-500 to-green-600',
      description: 'Ambiente JavaScript para backend eficiente e escalável.'
    },
    { 
      name: 'Vue.js', 
      color: 'from-emerald-500 to-teal-600',
      description: 'Framework progressivo para interfaces de usuário dinâmicas.'
    },
    { 
      name: 'Angular', 
      color: 'from-red-500 to-rose-600',
      description: 'Framework completo para aplicações web robustas.'
    },
    { 
      name: 'AWS', 
      color: 'from-orange-400 to-amber-600',
      description: 'Plataforma de nuvem com serviços para aplicações modernas.'
    },
    { 
      name: 'GitHub', 
      color: 'from-gray-700 to-gray-900',
      description: 'Controle de versão e colaboração para desenvolvimento.'
    },
    { 
      name: 'Docker', 
      color: 'from-blue-600 to-blue-800',
      description: 'Containerização para deploy consistente de aplicações.'
    },
    { 
      name: 'Figma', 
      color: 'from-purple-500 to-violet-600',
      description: 'Ferramenta de design de interfaces e prototipagem.'
    },
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
    >
      {/* Background simples */}
      <div className="absolute inset-0">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Glowing elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-[120px]"></div>
      </div>
      
      {/* Conteúdo simples sem efeitos 3D */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.div
            className="inline-block py-2 px-4 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-primary/30"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            TECNOLOGIAS AVANÇADAS
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
          ></motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Dominamos as melhores tecnologias para criar produtos digitais inovadores. Nossa stack
            combina ferramentas modernas para performance, escalabilidade e experiências excepcionais.
          </motion.p>
        </div>
        
        {/* Tech cards grid - sem efeitos 3D ou interações complexas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 relative z-10">
          {technologies.map((tech, index) => (
            <TechCard 
              key={index}
              name={tech.name}
              color={tech.color}
              description={tech.description}
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