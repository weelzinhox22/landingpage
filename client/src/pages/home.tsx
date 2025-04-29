import { motion } from 'framer-motion';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ServicesSection from '@/components/services-section';
import PortfolioSection from '@/components/portfolio-section';
import PricingSection from '@/components/pricing-section';
import TestimonialsSection from '@/components/testimonials-section';
import FAQSection from '@/components/faq-section';
import CTASection from '@/components/cta-section';
import ContactSection from '@/components/contact-section';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = 'VW Tech - Soluções Digitais para seu Negócio';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>VW Tech - Soluções Digitais para seu Negócio</title>
        <meta name="description" content="A VW Tech desenvolve soluções digitais customizadas que impulsionam resultados reais para sua empresa. Criação de sites, lojas virtuais, aplicativos e mais." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </motion.div>
  );
};

export default HomePage;
