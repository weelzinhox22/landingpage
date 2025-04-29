import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { Link } from 'wouter';

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".cta-content > *", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 30,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="cta-after-faq" ref={sectionRef} className="py-16 bg-primary text-white relative overflow-hidden">
      {/* Background mais simples */}
      <div className="absolute inset-0 bg-primary"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-80"></div>
      
      {/* Elementos decorativos sutis */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="cta-content max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pronto para impulsionar seu negócio?
          </motion.h2>
          <motion.p 
            className="text-xl opacity-95 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Crie um site, loja virtual ou aplicativo que realmente atrai clientes e aumenta suas vendas.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 transition-colors shadow-lg px-8 py-6 text-lg font-semibold rounded-lg">
                Solicitar Orçamento Grátis
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 transition-all px-8 py-6 text-lg font-semibold rounded-lg">
                Ver mais projetos
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
