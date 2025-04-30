import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main>
      {/* CTA Section */}
      <section id="cta-after-faq" className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-80"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="cta-content max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0.6, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Pronto para impulsionar seu negócio?
            </motion.h2>
            <motion.p 
              className="text-xl opacity-95 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0.6, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Crie um site, loja virtual ou aplicativo que realmente atrai clientes e aumenta suas vendas.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0.6, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link href="/contact">
                <Button className="bg-white text-primary hover:bg-white/90 transition-colors shadow-lg px-8 py-6 text-lg font-semibold rounded-lg">
                  Solicitar Orçamento Grátis
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 transition-all px-8 py-6 text-lg font-semibold rounded-lg">
                  Ver mais projetos
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="text-center mb-16">
        <motion.span 
          className="inline-block text-primary font-semibold mb-2 bg-primary/10 px-3 py-1 rounded-full text-sm"
          initial={{ opacity: 0.6 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Fale Conosco
        </motion.span>
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0.6, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Vamos transformar<br className="hidden md:block" />
          <span className="text-primary">sua ideia em realidade</span>
        </motion.h2>
        <motion.div 
          className="w-20 h-1 bg-secondary mx-auto mb-6"
          initial={{ width: "5rem", opacity: 0.6 }}
          whileInView={{ width: "5rem", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        ></motion.div>
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0.6, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Compartilhe suas necessidades conosco e descubra como nossos serviços de tecnologia podem impulsionar seu negócio para o próximo nível.
        </motion.p>
      </div>
    </main>
  );
} 