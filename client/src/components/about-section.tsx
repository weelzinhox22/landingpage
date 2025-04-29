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
    <section ref={sectionRef} id="sobre" className="py-20 bg-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full tech-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Quem Somos
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
            Somos uma empresa especializada em soluções digitais que impulsionam negócios através da tecnologia inovadora.
          </motion.p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* About Image */}
          <div className="md:w-1/2 relative">
            <div className="relative z-10">
              <img 
                ref={imageRef}
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Equipe VW Tech" 
                className="about-image rounded-lg shadow-lg"
              />
              <div className="stats-card absolute -bottom-6 right-6 p-6 bg-white shadow-xl rounded-lg">
                <div className="flex gap-4 items-center">
                  <div className="text-primary text-4xl font-bold">5+</div>
                  <div className="text-sm text-muted-foreground">Anos de Experiência</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* About Content */}
          <div className="about-content md:w-1/2">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Criando Experiências Digitais Excepcionais desde 2018
            </h3>
            <p className="text-muted-foreground mb-6">
              A VW Tech nasceu com a missão de democratizar o acesso à tecnologia de ponta para empresas de todos os portes. Nosso time é composto por especialistas apaixonados por inovação e comprometidos com a excelência.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/contact">
              <Button className="bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md">
                Fale com Nossa Equipe
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
