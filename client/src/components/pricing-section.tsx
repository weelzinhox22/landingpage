import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link } from 'wouter';

interface PricingPlanProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  accent?: boolean;
  delay: number;
  special?: string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({ 
  title, 
  price, 
  period, 
  features, 
  isPopular = false,
  accent = false,
  delay,
  special
}) => {
  return (
    <motion.div 
      className={`pricing-card bg-white rounded-xl overflow-hidden shadow-lg border ${
        isPopular ? 'border-primary transform scale-105 relative z-20' : 'border-gray-100'
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3 }
      }}
    >
      {isPopular && (
        <div className="bg-primary text-white text-center py-2 font-semibold shadow-sm z-10">
          Mais Popular
        </div>
      )}
      <div className="p-8 relative">
        {/* Novo Badge "Recomendado" */}
        {special && (
          <motion.div 
            className="absolute top-5 -right-3 transform rotate-12 bg-gradient-to-r from-secondary via-primary to-accent text-white text-xs font-bold px-4 py-1 rounded-full shadow-md z-10"
            initial={{ scale: 0.5, opacity: 0, rotate: 12 }}
            animate={{ scale: 1, opacity: 1, rotate: 12 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
          >
            {special}
          </motion.div>
        )}

        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <div className="flex items-end mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-1">{period}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-start pricing-feature"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <span className="text-green-500 mr-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
        <Link href="/contact">
          <Button 
            className={`w-full py-3 ${
              isPopular ? 'bg-primary text-white' : accent ? 'bg-white border border-secondary text-secondary hover:bg-secondary hover:text-white' : 'bg-white border border-primary text-primary hover:bg-primary hover:text-white'
            } rounded-lg font-medium transition-all`}
          >
            Contratar Agora
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Title animation
    gsap.from(".pricing-title", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8
    });

    // Divider line
    gsap.from(".pricing-divider", {
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

    // Description
    gsap.from(".pricing-description", {
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

    // Pricing cards with staggered animation
    gsap.from(".pricing-card", {
      scrollTrigger: {
        trigger: ".pricing-grid",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15
    });

    // Custom plan option
    gsap.from(".custom-plan", {
      scrollTrigger: {
        trigger: ".pricing-grid",
        start: "center 80%",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      duration: 0.8
    });
    
    // Floating elements animation
    gsap.to(".pricing-float-1", {
      y: -20,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(".pricing-float-2", {
      y: -15,
      x: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });
  }, []);

  const plans = [
    {
      title: "Plano Básico",
      price: "R$799",
      period: "/único",
      features: [
        "Criação de site simples",
        "Design responsivo",
        "Hospedagem por 6 meses",
        "Formulário de contato",
        "Links personalizados",
        "Suporte mensal (R$39,99)",
        "SEO básico"
      ],
      isPopular: false,
      accent: false
    },
    {
      title: "Plano Start II",
      price: "R$1.299",
      period: "/único",
      features: [
        "Criação de site profissional",
        "Design customizado",
        "Hospedagem por 1 ano",
        "Integração com redes sociais",
        "Suporte técnico básico",
        "SEO básico",
        "Segurança SSL"
      ],
      isPopular: true,
      accent: false
    },
    {
      title: "Plano Profissional",
      price: "R$1.999",
      period: "/único",
      features: [
        "Criação de loja virtual",
        "Design otimizado para vendas",
        "Integração com pagamentos",
        "Hospedagem por 1 ano",
        "Suporte técnico completo",
        "SEO avançado",
        "Treinamento de uso"
      ],
      isPopular: false,
      accent: false
    },
    {
      title: "Plano E-commerce",
      price: "R$2.999",
      period: "/único",
      features: [
        "Loja virtual customizada",
        "Design totalmente responsivo",
        "Hospedagem por 2 anos",
        "Integrações avançadas",
        "Consultoria estratégica SEO",
        "Suporte completo 24/7",
        "Marketing integrado"
      ],
      isPopular: false,
      accent: true,
      special: "Recomendado"
    }
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="tech-pattern absolute inset-0 opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="pricing-float-1 absolute top-40 left-10 w-64 h-64 bg-primary/5 rounded-full blur-2xl"></div>
      <div className="pricing-float-2 absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block text-primary font-semibold mb-2 bg-primary/10 px-3 py-1 rounded-full text-sm"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            PLANOS & PREÇOS
          </motion.span>
          <h2 className="pricing-title text-3xl md:text-4xl font-bold mb-4">
            Soluções para <span className="text-primary">Todos os Orçamentos</span>
          </h2>
          <div className="pricing-divider w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="pricing-description text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio e tenha um site profissional com ótimo custo-benefício.
          </p>
        </div>
        
        {/* Pricing Grid */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              isPopular={plan.isPopular}
              accent={plan.accent}
              special={plan.special}
              delay={index}
            />
          ))}
        </div>
        
        {/* Custom Plan Option */}
        <motion.div 
          className="custom-plan mt-16 bg-gradient-to-r from-primary to-accent rounded-xl p-8 shadow-lg text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ 
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
            transition: { duration: 0.2 }
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Precisa de uma solução personalizada?</h3>
              <p className="opacity-90">
                Desenvolvemos projetos sob medida que atendem às necessidades específicas do seu negócio.
              </p>
            </div>
            <Link href="/contact">
              <Button variant="secondary" className="mt-6 md:mt-0 bg-white text-primary hover:bg-white/90 transition-colors shadow-md">
                Solicitar Orçamento
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
