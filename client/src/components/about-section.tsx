import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { Link } from 'wouter';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (sectionRef.current && imageRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".about-image", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          x: -100,
          opacity: 0,
          duration: 1
        });

        gsap.from(".stats-card", {
          scrollTrigger: {
            trigger: ".about-image",
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.3
        });

        gsap.from(".about-content > *", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const features = [
    {
      title: "Expertise Técnica",
      description: "Profissionais qualificados com as mais recentes tecnologias."
    },
    {
      title: "Atendimento Personalizado",
      description: "Soluções sob medida para seus objetivos específicos."
    },
    {
      title: "Resultados Comprovados",
      description: "Histórico de sucesso com mais de 200 projetos entregues."
    },
    {
      title: "Suporte Contínuo",
      description: "Acompanhamento completo em todas as etapas do projeto."
    }
  ];

  return (
    <section ref={sectionRef} id="sobre" className="py-24 relative overflow-hidden">
      {/* Background Pattern and Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-muted/30"></div>
      <div className="absolute top-0 left-0 w-full h-full tech-pattern opacity-5 z-0"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
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
            Nossa História
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Quem <span className="text-primary">Somos</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-secondary mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Uma jornada de inovação, transformação digital e compromisso com o sucesso dos nossos clientes.
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Left Side - Image with Parallax Effect */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                ref={imageRef}
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Equipe VW Tech" 
                className="about-image w-full h-auto transform transition-transform duration-700 hover:scale-105"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              
              {/* Stats Cards */}
              <div className="stats-card absolute -bottom-6 -right-6 p-6 bg-white shadow-xl rounded-lg border border-gray-100">
                <div className="flex gap-4 items-center">
                  <div className="text-primary text-4xl font-bold">5+</div>
                  <div className="text-sm text-muted-foreground">Anos de<br />Inovação</div>
                </div>
              </div>
              
              <div className="stats-card absolute top-6 -left-6 p-4 bg-white shadow-xl rounded-lg border border-gray-100">
                <div className="flex gap-3 items-center">
                  <div className="text-secondary text-3xl font-bold">200+</div>
                  <div className="text-xs text-muted-foreground">Projetos<br />Entregues</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* About Content */}
          <motion.div 
            className="about-content lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Uma startup que nasceu da visão de dois amigos apaixonados por tecnologia 
            </h3>
            <p className="text-muted-foreground mb-4">
              A VW Tech começou em 2018 quando Vítor e Wagner, dois amigos com ideias inovadoras e uma paixão compartilhada por tecnologia, decidiram unir forças para criar soluções digitais que realmente fizessem a diferença no mercado.
            </p>
            <p className="text-muted-foreground mb-6">
              Desde o início, nossa missão foi clara: democratizar o acesso à tecnologia de ponta e transformar a maneira como as empresas interagem com o mundo digital. Começamos em um pequeno escritório, com grandes sonhos e uma determinação inabalável.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="mr-4 mt-1 text-primary bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link href="/about">
              <Button className="bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg px-6 py-2.5">
                Conheça nossa história completa
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Timeline Section */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">Nossa Jornada</h3>
          
          <div className="relative">
            {/* Timeline central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent"></div>
            
            {/* Timeline events */}
            <div className="relative z-10">
              {/* 2018 - Founding */}
              <motion.div 
                className="mb-16 md:mb-24 flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="md:w-1/2 md:pr-16 md:text-right mb-6 md:mb-0">
                  <h4 className="text-xl font-bold mb-2">2018 - Fundação</h4>
                  <p className="text-muted-foreground">Vítor e Wagner iniciam a VW Tech em um pequeno escritório compartilhado, com o primeiro cliente sendo uma startup local de e-commerce.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white z-10">
                  <span className="font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-16 hidden md:block"></div>
              </motion.div>
              
              {/* 2020 - Growth */}
              <motion.div 
                className="mb-16 md:mb-24 flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="md:w-1/2 md:pr-16 hidden md:block"></div>
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white z-10">
                  <span className="font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-16 md:text-left mb-6 md:mb-0">
                  <h4 className="text-xl font-bold mb-2">2020 - Crescimento</h4>
                  <p className="text-muted-foreground">Expansão da equipe para 10 pessoas e mudança para um escritório maior. Alcançamos a marca de 50 projetos entregues.</p>
                </div>
              </motion.div>
              
              {/* 2022 - Expansion */}
              <motion.div 
                className="mb-16 md:mb-24 flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="md:w-1/2 md:pr-16 md:text-right mb-6 md:mb-0">
                  <h4 className="text-xl font-bold mb-2">2022 - Expansão</h4>
                  <p className="text-muted-foreground">Abertura de um segundo escritório e início de operações internacionais com clientes na América Latina.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white z-10">
                  <span className="font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-16 hidden md:block"></div>
              </motion.div>
              
              {/* 2024 - Today */}
              <motion.div 
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="md:w-1/2 md:pr-16 hidden md:block"></div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white z-10">
                  <span className="font-bold">4</span>
                </div>
                <div className="md:w-1/2 md:pl-16 md:text-left mb-6 md:mb-0">
                  <h4 className="text-xl font-bold mb-2">2024 - Hoje</h4>
                  <p className="text-muted-foreground">Equipe de 25 especialistas, mais de 200 projetos concluídos e reconhecimento como uma das empresas mais inovadoras do setor de tecnologia.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
