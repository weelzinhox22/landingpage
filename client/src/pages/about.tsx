import { motion } from 'framer-motion';
import AboutSection from '@/components/about-section';
import TestimonialsSection from '@/components/testimonials-section';
import CTASection from '@/components/cta-section';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const AboutPage = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = 'Quem Somos | VW Tech';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Quem Somos | VW Tech</title>
        <meta name="description" content="Conheça a VW Tech, especialistas em soluções digitais que impulsionam negócios através da tecnologia inovadora. Mais de 5 anos de experiência em desenvolvimento web." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <div className="pt-20">
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </motion.div>
  );
};

export default AboutPage;
