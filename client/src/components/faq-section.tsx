import { useRef } from 'react';
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
    <AccordionItem value={index} className="mb-4 border-none">
      <AccordionTrigger className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left font-semibold text-gray-800">
        <span className="faq-question">{question}</span>
      </AccordionTrigger>
      <AccordionContent className="bg-white mt-1 p-5 rounded-lg shadow-sm">
        <p className="text-gray-700 font-normal">{answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
};

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
      {/* Background Elements - simplificado e com maior opacidade */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/50"></div>
      
      {/* Static Decorative Elements com maior opacidade */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/5 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-accent/5 rounded-full"></div>
      </div>
      
      {/* Main Content with Strong Contrast */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
          <div className="text-center mb-16">
            <div className="inline-block text-primary font-semibold mb-2 bg-primary/10 px-3 py-1 rounded-full text-sm">
              Tire suas dúvidas
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Perguntas <span className="text-primary">Frequentes</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto font-medium">
              Encontre respostas para as perguntas mais comuns sobre criação de sites e soluções digitais.
            </p>
          </div>
        
          {/* FAQ Accordion - adicionado higher z-index para aparecer acima de tudo */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item"
              >
                <FAQ
                  question={faq.question}
                  answer={faq.answer}
                  index={`item-${index}`}
                />
              </div>
            ))}
          </Accordion>
        
          {/* CTA after FAQs */}
          <div className="text-center mt-16">
            <p className="text-gray-700 mb-6">Não encontrou o que procurava?</p>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
