import { motion } from 'framer-motion';
import ServicesSection from '@/components/services-section';
import FAQSection from '@/components/faq-section';
import CTASection from '@/components/cta-section';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const ServicesPage = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = 'Serviços | VW Tech';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Serviços | VW Tech</title>
        <meta name="description" content="Conheça os serviços da VW Tech: criação de sites, lojas virtuais, aplicativos, marketing digital e sistemas personalizados. Soluções digitais completas para empresas." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <div className="pt-20">
        <ServicesSection />
        <FAQSection />
        <CTASection />
      </div>
    </motion.div>
  );
};

export default ServicesPage;
