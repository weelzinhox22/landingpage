import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, FileText } from 'lucide-react'; // Ícones para os botões

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section 
      id="cta-after-faq" 
      ref={sectionRef} 
      className="py-20 md:py-28 text-white relative overflow-hidden"
    >
      {/* Fundo com gradiente animado e efeito mesh */}
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift mix-blend-multiply"
        style={{ backgroundSize: '200% 200%' }} 
      />
      {/* Efeito de overlay sutil para melhorar legibilidade */}
      <div className="absolute inset-0 -z-10 bg-black/30 backdrop-blur-sm"></div>

      {/* Elementos decorativos modernos (substituir círculos) */}
      <motion.div 
        className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-50"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-60"
        animate={{ scale: [1, 0.9, 1], rotate: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      
      <motion.div 
        className="container mx-auto px-4 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          variants={itemVariants}
        >
          Pronto para <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary/80">impulsionar</span> seu negócio?
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Transforme sua visão em realidade. Crie um site, loja virtual ou aplicativo que não só atrai clientes, mas também converte e eleva suas vendas a um novo patamar.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl px-8 py-3 text-base md:text-lg font-semibold rounded-full w-full sm:w-auto flex items-center gap-2 group"
              >
                <FileText className="w-5 h-5 group-hover:animate-pulse" />
                Solicitar Orçamento Grátis
              </Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/portfolio">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/80 text-white hover:bg-white/10 hover:border-white transition-all shadow-lg hover:shadow-xl px-8 py-3 text-base md:text-lg font-semibold rounded-full w-full sm:w-auto flex items-center gap-2 group"
              >
                Ver mais projetos 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
