import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useMobile } from '@/hooks/use-mobile';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  initials: string;
  color: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, title, initials, color }) => {
  return (
    <div className="testimonial-slide w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
      <div className="testimonial-card bg-white rounded-xl p-6 shadow-md h-full">
        <div className="flex items-center mb-4">
          <div className="text-yellow-400 flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="italic text-muted-foreground mb-4">
          "{quote}"
        </p>
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full ${color} overflow-hidden mr-3 flex items-center justify-center text-white`}>
            <span className="font-bold text-lg">{initials}</span>
          </div>
          <div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useMobile();

  const testimonials = [
    {
      quote: "A VW Tech transformou completamente meu negócio online. O site que desenvolveram não só é bonito, mas também funcional e otimizado para vendas. O atendimento foi impecável do início ao fim.",
      name: "Carlos Mendes",
      title: "Empreendedor Digital",
      initials: "CM",
      color: "bg-primary"
    },
    {
      quote: "Eu tinha uma cafeteria e dependia apenas de clientes locais, mas sabia que precisava de uma presença online para crescer. A VW Tech criou uma solução perfeita que atraiu novos clientes desde o lançamento.",
      name: "Renata Oliveira",
      title: "Proprietária de Cafeteria",
      initials: "RO",
      color: "bg-accent"
    },
    {
      quote: "Procurei a VW Tech quando percebi que estava perdendo vendas por não estar online. Eles entenderam meu negócio e criaram uma loja virtual que superou todas as minhas expectativas. O ROI foi impressionante.",
      name: "Marcos Silva",
      title: "Lojista",
      initials: "MS",
      color: "bg-secondary"
    },
    {
      quote: "A solução de e-commerce que a VW Tech desenvolveu para minha empresa não só é bonita visualmente, mas também extremamente funcional. As vendas aumentaram 150% nos primeiros três meses.",
      name: "Juliana Rios",
      title: "Empresária",
      initials: "JR",
      color: "bg-primary-light"
    }
  ];

  useEffect(() => {
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".testimonials-title", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 50,
          opacity: 0,
          duration: 0.8
        });

        gsap.from(".testimonials-divider", {
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

        gsap.from(".testimonials-description", {
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
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const slidesToShow = isMobile ? 1 : window.innerWidth >= 1024 ? 3 : 2;
  const maxSlides = testimonials.length - slidesToShow;

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: `-${currentSlide * (100 / slidesToShow)}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [currentSlide, slidesToShow]);

  return (
    <section ref={sectionRef} id="depoimentos" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="testimonials-title text-3xl md:text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
          <div className="testimonials-divider w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="testimonials-description text-muted-foreground max-w-2xl mx-auto">
            Veja por que nossos clientes confiam na VW Tech para suas soluções digitais.
          </p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="testimonial-carousel relative">
          <div className="overflow-hidden">
            <motion.div 
              ref={sliderRef}
              className="testimonial-slider flex transition-transform duration-500 ease-in-out"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {testimonials.map((testimonial, index) => (
                <Testimonial
                  key={index}
                  quote={testimonial.quote}
                  name={testimonial.name}
                  title={testimonial.title}
                  initials={testimonial.initials}
                  color={testimonial.color}
                />
              ))}
            </motion.div>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex justify-center mt-10 gap-3">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors p-0 ${
                currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide >= maxSlides}
              className={`w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors p-0 ${
                currentSlide >= maxSlides ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
