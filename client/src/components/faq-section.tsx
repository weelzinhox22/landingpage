import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface FAQProps {
  question: string;
  answer: string;
  index: string;
}

const FAQ: React.FC<FAQProps> = ({ question, answer, index }) => {
  return (
    <AccordionItem value={index} className="mb-4">
      <AccordionTrigger className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left font-medium">
        {question}
      </AccordionTrigger>
      <AccordionContent className="bg-white mt-1 p-4 rounded-lg">
        <p className="text-muted-foreground">{answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
};

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".faq-title", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 50,
          opacity: 0,
          duration: 0.8
        });

        gsap.from(".faq-divider", {
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

        gsap.from(".faq-description", {
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

        gsap.from(".faq-items .faq-item", {
          scrollTrigger: {
            trigger: ".faq-description",
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const faqs = [
    {
      question: "Por que criar um site ou aplicativo para meu negócio?",
      answer: "Ter presença digital é essencial nos dias de hoje. Um site ou aplicativo bem desenvolvido aumenta sua visibilidade, atrai novos clientes, melhora sua credibilidade e pode gerar vendas 24/7. É um investimento que traz retorno contínuo para seu negócio."
    },
    {
      question: "Qual é o tempo médio para desenvolver um site ou e-commerce?",
      answer: "O tempo de desenvolvimento varia de acordo com a complexidade do projeto. Um site institucional simples pode levar de 2 a 4 semanas, enquanto um e-commerce completo pode levar de 6 a 12 semanas. Sempre estabelecemos um cronograma detalhado no início do projeto."
    },
    {
      question: "Quais são as vantagens de ter um site responsivo?",
      answer: "Um site responsivo se adapta automaticamente a diferentes tamanhos de tela (desktop, tablet, smartphone). Isso melhora a experiência do usuário, é favorecido pelo Google nos rankings de busca, reduz a taxa de rejeição e aumenta o tempo de permanência dos visitantes."
    },
    {
      question: "O que é SEO e por que é importante para meu site?",
      answer: "SEO (Search Engine Optimization) é o conjunto de técnicas para melhorar o posicionamento do seu site nos resultados de busca como Google. Um bom SEO aumenta a visibilidade do seu negócio, traz tráfego qualificado e gratuito, gerando mais leads e vendas com menor custo por aquisição."
    },
    {
      question: "Qual a diferença entre um site simples e uma loja virtual?",
      answer: "Um site simples geralmente apresenta informações sobre a empresa, produtos ou serviços, enquanto uma loja virtual (e-commerce) permite a realização de compras online. A loja virtual inclui catálogo de produtos, carrinho de compras, gateway de pagamento, gestão de estoque e outras funcionalidades específicas para vendas."
    }
  ];

  return (
    <section ref={sectionRef} id="faq" className="py-20 relative bg-white overflow-hidden">
      {/* Background Gradient - sem animação para não sumir ao rolar */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-primary/5 to-background/30"></div>
      
      {/* Decorative Elements - posições fixas para não causar problemas ao rolar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fixed-decorative absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="fixed-decorative absolute bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="fixed-decorative absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
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
            Tire suas dúvidas
          </motion.span>
          <motion.h2 
            className="faq-title text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Perguntas <span className="text-primary">Frequentes</span>
          </motion.h2>
          <motion.div 
            className="faq-divider w-20 h-1 bg-secondary mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="faq-description text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Encontre respostas para as perguntas mais comuns sobre criação de sites e soluções digitais.
          </motion.p>
        </div>
        
        {/* FAQ Accordion - adicionado higher z-index para aparecer acima de tudo */}
        <motion.div 
          className="faq-items max-w-3xl mx-auto relative z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <FAQ
                  question={faq.question}
                  answer={faq.answer}
                  index={`item-${index}`}
                />
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        
        {/* CTA after FAQs */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-muted-foreground mb-6">Não encontrou o que procurava?</p>
          <Link href="/contact">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg shadow-md"
            >
              Fale Conosco
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Estilo já aplicado via className */}
    </section>
  );
};

export default FAQSection;
